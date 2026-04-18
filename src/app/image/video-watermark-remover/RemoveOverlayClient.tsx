'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

type Stage = 'upload' | 'ready' | 'processing' | 'done' | 'error';

interface Mask {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface DragState {
  mode: 'move' | 'resize';
  startMouseX: number;
  startMouseY: number;
  startMask: Mask;
}

const TOOL_COLOR = '#7c3aed';
const MAX_FILE_MB = 500;

function getMimeType(): string {
  const candidates = [
    'video/mp4;codecs=avc1',
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
  ];
  for (const mime of candidates) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(mime)) {
      return mime;
    }
  }
  return 'video/webm';
}

function getExtension(mimeType: string): string {
  return mimeType.startsWith('video/mp4') ? 'mp4' : 'webm';
}

/**
 * Content-aware inpaint for a rectangular mask.
 *
 * Phase 1 – Seed each masked pixel by blending the 4 nearest non-masked
 *   border pixels (left/right/top/bottom edge) weighted by inverse distance.
 *   This instantly reconstructs gradients and flat backgrounds.
 *
 * Phase 2 – Run a few Laplacian smoothing passes (only over the mask) so the
 *   seeded values blend seamlessly with each other and remove blockiness.
 */
function inpaintRect(
  ctx: CanvasRenderingContext2D,
  m: Mask,
  W: number,
  H: number
): void {
  const mx = Math.max(0, Math.round(m.x));
  const my = Math.max(0, Math.round(m.y));
  const mw = Math.min(Math.round(m.w), W - mx);
  const mh = Math.min(Math.round(m.h), H - my);
  if (mw <= 0 || mh <= 0) return;

  const full = ctx.getImageData(0, 0, W, H);
  const d = full.data;
  const stride = W * 4;

  // Border sample positions (1 px outside mask, clamped to canvas)
  const lx = Math.max(0, mx - 1);
  const rx = Math.min(W - 1, mx + mw);
  const ty = Math.max(0, my - 1);
  const by = Math.min(H - 1, my + mh);

  // Phase 1: seed each masked pixel with inverse-distance blend from 4 sides
  // Use a separate float buffer so writes don't affect reads within the same frame
  const buf = new Float32Array(mw * mh * 3);

  for (let row = 0; row < mh; row++) {
    for (let col = 0; col < mw; col++) {
      const px = mx + col;
      const py = my + row;

      // Inverse distance to each border sample (add 0.5 so centre pixels aren't ∞)
      const wL = 1 / (px - lx + 0.5);
      const wR = 1 / (rx - px + 0.5);
      const wT = 1 / (py - ty + 0.5);
      const wB = 1 / (by - py + 0.5);
      const wSum = wL + wR + wT + wB;

      const lOff = py * stride + lx * 4;
      const rOff = py * stride + rx * 4;
      const tOff = ty * stride + px * 4;
      const bOff = by * stride + px * 4;

      const bi = (row * mw + col) * 3;
      for (let c = 0; c < 3; c++) {
        buf[bi + c] =
          (d[lOff + c] * wL + d[rOff + c] * wR +
           d[tOff + c] * wT + d[bOff + c] * wB) / wSum;
      }
    }
  }

  // Phase 2: a few Laplacian smoothing passes to remove seam artefacts
  // (only masked interior pixels are updated; buf acts as double-buffer)
  const tmp = new Float32Array(buf.length);
  const SMOOTH = 12;
  for (let iter = 0; iter < SMOOTH; iter++) {
    for (let row = 0; row < mh; row++) {
      for (let col = 0; col < mw; col++) {
        const bi = (row * mw + col) * 3;

        // 4-connected neighbours — if a neighbour is outside the mask,
        // read the original border pixel from `d` (known value), otherwise
        // read from buf (filled value).
        const getC = (r: number, c2: number, ch: number): number => {
          if (r < 0 || r >= mh || c2 < 0 || c2 >= mw) {
            // outside mask → use original pixel from full imageData
            const npx = Math.min(W - 1, Math.max(0, mx + c2));
            const npy = Math.min(H - 1, Math.max(0, my + r));
            return d[npy * stride + npx * 4 + ch];
          }
          return buf[(r * mw + c2) * 3 + ch];
        };

        for (let ch = 0; ch < 3; ch++) {
          tmp[bi + ch] = (
            getC(row - 1, col, ch) +
            getC(row + 1, col, ch) +
            getC(row, col - 1, ch) +
            getC(row, col + 1, ch)
          ) / 4;
        }
      }
    }
    buf.set(tmp);
  }

  // Write filled region back into the full imageData
  for (let row = 0; row < mh; row++) {
    for (let col = 0; col < mw; col++) {
      const pi = (my + row) * stride + (mx + col) * 4;
      const bi = (row * mw + col) * 3;
      d[pi]     = Math.round(buf[bi]);
      d[pi + 1] = Math.round(buf[bi + 1]);
      d[pi + 2] = Math.round(buf[bi + 2]);
    }
  }

  ctx.putImageData(full, 0, 0);
}

export default function RemoveOverlayClient() {
  const [stage, setStage] = useState<Stage>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState('');
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultMime, setResultMime] = useState('video/webm');
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  // Video natural dimensions (filled when metadata loads)
  const [videoDims, setVideoDims] = useState({ w: 1920, h: 1080 });
  // Mask in video-space pixels
  const [mask, setMask] = useState<Mask>({ x: 1740, y: 20, w: 160, h: 60 });

  const videoRef = useRef<HTMLVideoElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cancelRef = useRef(false);
  const dragStateRef = useRef<DragState | null>(null);

  // ─── File Handling ───────────────────────────────────────────────────────────
  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith('video/')) {
      setError('Please upload a video file (MP4, MOV, WebM).');
      return;
    }
    if (f.size > MAX_FILE_MB * 1024 * 1024) {
      setError('File is too large. Maximum 500 MB.');
      return;
    }
    setError('');
    setFile(f);
    setVideoSrc(URL.createObjectURL(f));
    setStage('ready');
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  // ─── Video Metadata ──────────────────────────────────────────────────────────
  const handleVideoMeta = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const vw = v.videoWidth || 1920;
    const vh = v.videoHeight || 1080;
    setVideoDims({ w: vw, h: vh });
    // Default mask: top-right corner watermark
    setMask({ x: vw - 180, y: 20, w: 160, h: 60 });
    // Show estimated processing time (real-time = same duration as video)
    if (v.duration > 60) {
      const mins = Math.floor(v.duration / 60);
      const secs = Math.round(v.duration % 60);
      setError(
        `ℹ️ This video is ${mins}m ${secs}s — processing will take roughly the same time. Keep this tab active.`
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Reset ───────────────────────────────────────────────────────────────────
  function handleReset() {
    cancelRef.current = true;
    if (videoSrc) URL.revokeObjectURL(videoSrc);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setStage('upload');
    setFile(null);
    setVideoSrc(null);
    setResultUrl(null);
    setProgress(0);
    setProgressMsg('');
    setError('');
    cancelRef.current = false;
  }

  // ─── Processing ──────────────────────────────────────────────────────────────
  async function handleProcess() {
    const v = videoRef.current;
    if (!v || !file) return;

    cancelRef.current = false;
    setStage('processing');
    setProgress(0);
    setProgressMsg('Initialising...');

    try {
      const mimeType = getMimeType();
      if (!MediaRecorder.isTypeSupported(mimeType.split(';')[0])) {
        throw new Error(
          'Your browser does not support video recording. Please use Chrome or Firefox.'
        );
      }

      // --- Build hidden canvas + recorder ---
      const canvas = document.createElement('canvas');
      canvas.width = videoDims.w;
      canvas.height = videoDims.h;
      const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

      // Combine canvas video track with original audio
      const canvasStream = canvas.captureStream(30);
      const videoStream = (v as any).captureStream
        ? (v as any).captureStream()
        : null;

      const tracks = [...canvasStream.getVideoTracks()];
      if (videoStream) {
        videoStream.getAudioTracks().forEach((t: MediaStreamTrack) => tracks.push(t));
      }

      // Match source bitrate so output size ≈ input size
      const sourceBitrate = Math.round((file.size * 8) / v.duration);
      const videoBitrate = Math.max(300_000, Math.min(sourceBitrate, 12_000_000));

      const recorder = new MediaRecorder(new MediaStream(tracks), {
        mimeType,
        videoBitsPerSecond: videoBitrate,
      });

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.start(200);

      // --- Play video and process each frame in real time ---
      v.currentTime = 0;
      v.muted = true;
      await v.play();

      const duration = v.duration;

      await new Promise<void>((resolve, reject) => {
        let rafId: number;

        function tick() {
          if (cancelRef.current) {
            v!.pause();
            recorder.stop();
            resolve();
            return;
          }

          ctx.drawImage(v!, 0, 0, videoDims.w, videoDims.h);
          inpaintRect(ctx, mask, videoDims.w, videoDims.h);

          const pct = Math.min(99, Math.round((v!.currentTime / duration) * 100));
          setProgress(pct);
          setProgressMsg(
            `Processing frame ${Math.round(v!.currentTime * 30)} / ${Math.round(duration * 30)}...`
          );

          if (v!.ended || v!.currentTime >= duration) {
            recorder.stop();
            resolve();
          } else {
            rafId = requestAnimationFrame(tick);
          }
        }

        v!.onended = () => {
          cancelAnimationFrame(rafId);
          recorder.stop();
          resolve();
        };

        v!.onerror = () => {
          cancelAnimationFrame(rafId);
          reject(new Error('Video playback error'));
        };

        rafId = requestAnimationFrame(tick);
      });

      if (cancelRef.current) {
        setStage('ready');
        setProgress(0);
        return;
      }

      // Wait for recorder to flush
      await new Promise<void>((resolve) => {
        recorder.onstop = () => resolve();
      });

      setProgressMsg('Finalising...');
      setProgress(100);

      const blob = new Blob(chunks, { type: mimeType });
      setResultUrl(URL.createObjectURL(blob));
      setResultMime(mimeType);
      setStage('done');
    } catch (err: unknown) {
      if (cancelRef.current) return;
      setError(err instanceof Error ? err.message : 'Processing failed. Please try again.');
      setStage('error');
    }
  }

  function handleCancel() {
    cancelRef.current = true;
    videoRef.current?.pause();
    setStage('ready');
    setProgress(0);
    setProgressMsg('');
  }

  function handleDownload() {
    if (!resultUrl || !file) return;
    const ext = getExtension(resultMime);
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = file.name.replace(/\.[^.]+$/, '') + `-no-watermark.${ext}`;
    a.click();
  }

  // ─── Draggable Mask Overlay ───────────────────────────────────────────────────
  // The preview container has exact video aspect ratio via CSS aspect-ratio.
  // We map preview coords ↔ video coords using simple scaling.

  function getPreviewScale(): { sx: number; sy: number } {
    const el = previewRef.current;
    if (!el) return { sx: 1, sy: 1 };
    return {
      sx: videoDims.w / el.clientWidth,
      sy: videoDims.h / el.clientHeight,
    };
  }

  function onMaskMouseDown(
    e: React.MouseEvent,
    mode: 'move' | 'resize'
  ) {
    e.preventDefault();
    e.stopPropagation();
    dragStateRef.current = {
      mode,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startMask: { ...mask },
    };
  }

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      const ds = dragStateRef.current;
      if (!ds) return;
      const { sx, sy } = getPreviewScale();
      const dx = (e.clientX - ds.startMouseX) * sx;
      const dy = (e.clientY - ds.startMouseY) * sy;

      setMask((prev) => {
        if (ds.mode === 'move') {
          return {
            ...prev,
            x: Math.max(0, Math.min(videoDims.w - prev.w, ds.startMask.x + dx)),
            y: Math.max(0, Math.min(videoDims.h - prev.h, ds.startMask.y + dy)),
          };
        } else {
          // resize: clamp min 20px
          return {
            ...prev,
            w: Math.max(20, Math.min(videoDims.w - ds.startMask.x, ds.startMask.w + dx)),
            h: Math.max(20, Math.min(videoDims.h - ds.startMask.y, ds.startMask.h + dy)),
          };
        }
      });
    }

    function onMouseUp() {
      dragStateRef.current = null;
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [videoDims]);

  // Mask position as CSS percentages for the overlay div
  const maskStyle = {
    left: `${(mask.x / videoDims.w) * 100}%`,
    top: `${(mask.y / videoDims.h) * 100}%`,
    width: `${(mask.w / videoDims.w) * 100}%`,
    height: `${(mask.h / videoDims.h) * 100}%`,
  };

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/quicktime,video/webm,video/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) handleFile(e.target.files[0]);
        }}
      />

      {/* ═══════════ UPLOAD HERO ═══════════ */}
      {stage === 'upload' && (
        <section className="bg-gradient-to-b from-violet-50 to-white pt-12 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
              style={{ backgroundColor: '#7c3aed22', color: TOOL_COLOR }}
            >
              ✨ 100% In-Browser — No Uploads
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              Remove Video Overlay
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
              Remove watermarks &amp; static overlays from any video — frame by frame,
              entirely in your browser. No uploads ever.
            </p>

            {/* Drop Zone */}
            <div
              className={`max-w-xl mx-auto border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer bg-white ${
                dragOver
                  ? 'border-violet-400 bg-violet-50 scale-[1.02]'
                  : 'border-gray-300 hover:border-violet-300 hover:shadow-lg'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => { fileInputRef.current!.value = ''; fileInputRef.current!.click(); }}
            >
              <div
                className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#7c3aed22' }}
              >
                <svg className="w-8 h-8" style={{ color: TOOL_COLOR }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82V15a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-gray-700 mb-1">Upload Video</p>
              <p className="text-sm text-gray-400 mb-6">or drag &amp; drop here</p>
              <button
                onClick={(e) => { e.stopPropagation(); fileInputRef.current!.value = ''; fileInputRef.current!.click(); }}
                className="px-8 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90 active:scale-[0.98] shadow-lg"
                style={{ backgroundColor: TOOL_COLOR }}
              >
                Choose Video
              </button>
              <p className="text-xs text-gray-400 mt-5">MP4, MOV, WebM · Max 500 MB · Processing time = video duration</p>
            </div>

            {error && (
              <p
                className={`mt-6 font-medium ${
                  error.startsWith('ℹ️')
                    ? 'text-blue-600'
                    : 'text-red-600'
                }`}
              >
                {error}
              </p>
            )}

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-12">
              {['🔒 No uploads ever', '⚡ Real-time processing', '🎬 Audio preserved', '🆓 Completely free'].map((f) => (
                <span key={f} className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm text-gray-600 shadow-sm">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ READY — VIDEO PREVIEW + MASK EDITOR ═══════════ */}
      {(stage === 'ready' || stage === 'processing') && file && (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
          <div className="max-w-3xl w-full space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {stage === 'ready' ? 'Adjust the Overlay Mask' : 'Processing…'}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {stage === 'ready'
                  ? 'Drag the purple box to cover the watermark. Drag the ↘ handle to resize.'
                  : progressMsg}
              </p>
            </div>

            {/* Video + Mask Overlay */}
            <div className="bg-black rounded-xl overflow-hidden shadow-xl">
              <div
                ref={previewRef}
                className="relative w-full select-none"
                style={{ aspectRatio: `${videoDims.w} / ${videoDims.h}` }}
              >
                {/* Hidden video for processing */}
                <video
                  ref={videoRef}
                  src={videoSrc ?? undefined}
                  className="w-full h-full object-fill"
                  muted
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={handleVideoMeta}
                />

                {/* Mask box */}
                <div
                  className="absolute border-2 border-white rounded cursor-move group"
                  style={{
                    ...maskStyle,
                    backgroundColor: 'rgba(124,58,237,0.35)',
                    borderColor: TOOL_COLOR,
                    pointerEvents: stage === 'processing' ? 'none' : 'auto',
                  }}
                  onMouseDown={(e) => onMaskMouseDown(e, 'move')}
                >
                  {/* Label */}
                  <span
                    className="absolute -top-6 left-0 text-xs font-bold px-2 py-0.5 rounded text-white whitespace-nowrap"
                    style={{ backgroundColor: TOOL_COLOR }}
                  >
                    Overlay mask
                  </span>
                  {/* Resize handle */}
                  <div
                    className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-center justify-center"
                    onMouseDown={(e) => onMaskMouseDown(e, 'resize')}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
                      <path d="M9 1L1 9M9 5L5 9M9 9H1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Processing overlay */}
                {stage === 'processing' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-3xl font-bold mb-1">{progress}%</div>
                      <div className="text-sm opacity-75">{progressMsg}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Progress bar */}
              {stage === 'processing' && (
                <div className="h-1.5 bg-gray-800">
                  <div
                    className="h-full transition-all duration-200"
                    style={{ width: `${progress}%`, backgroundColor: TOOL_COLOR }}
                  />
                </div>
              )}
            </div>

            {/* Mask coords readout */}
            {stage === 'ready' && (
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                <span>x: <strong>{Math.round(mask.x)}px</strong></span>
                <span>y: <strong>{Math.round(mask.y)}px</strong></span>
                <span>w: <strong>{Math.round(mask.w)}px</strong></span>
                <span>h: <strong>{Math.round(mask.h)}px</strong></span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {stage === 'ready' && (
                <>
                  <button
                    onClick={handleProcess}
                    className="py-4 px-10 rounded-xl text-white font-semibold text-lg transition-all hover:opacity-90 active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
                    style={{ backgroundColor: TOOL_COLOR }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Remove Watermark
                  </button>
                  <button
                    onClick={handleReset}
                    className="py-4 px-8 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                  >
                    Choose Different Video
                  </button>
                </>
              )}

              {stage === 'processing' && (
                <button
                  onClick={handleCancel}
                  className="py-4 px-8 rounded-xl border-2 border-red-400 text-red-600 font-semibold hover:bg-red-50 transition-all"
                >
                  Cancel
                </button>
              )}
            </div>

            {/* Info note */}
            {stage === 'ready' && (
              <p className="text-center text-xs text-gray-400">
                Processing happens in real-time — a 30s video takes ~30s. Audio is preserved.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ═══════════ DONE ═══════════ */}
      {stage === 'done' && resultUrl && (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-lg">
              <div className="text-5xl mb-3">✅</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Overlay Removed!</h3>
              <p className="text-gray-500 text-sm mb-6">
                Your video has been processed. Preview it below and download when ready.
              </p>

              {/* Result preview */}
              <div className="bg-black rounded-xl overflow-hidden mb-6">
                <video
                  src={resultUrl}
                  controls
                  className="w-full max-h-72 object-contain"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleDownload}
                  className="py-4 px-10 rounded-xl text-white font-semibold text-lg transition-all hover:opacity-90 active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
                  style={{ backgroundColor: TOOL_COLOR }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Video
                </button>
                <button
                  onClick={handleReset}
                  className="py-4 px-8 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                >
                  Process Another Video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ ERROR ═══════════ */}
      {stage === 'error' && (
        <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl border border-red-200 p-10 text-center shadow">
              <div className="text-5xl mb-4">❌</div>
              <h3 className="text-xl font-semibold text-red-700 mb-2">Something went wrong</h3>
              <p className="text-gray-500 mb-6">{error}</p>
              <button
                onClick={handleReset}
                className="py-3 px-8 rounded-xl text-white font-semibold hover:opacity-90 transition-all"
                style={{ backgroundColor: TOOL_COLOR }}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
