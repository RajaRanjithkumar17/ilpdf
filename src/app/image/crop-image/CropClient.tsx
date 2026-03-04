'use client';

import { useState, useRef, useEffect } from 'react';
import { getImageToolById } from '@/lib/imageTools';
import { cropImage } from '@/lib/image/crop';
import { downloadBlob } from '@/lib/pdf/utils';
import { formatFileSize } from '@/lib/image/utils';

type Stage = 'upload' | 'crop' | 'processing' | 'done' | 'error';

const PRESETS = [
  { label: 'Free', ratio: 0 },
  { label: '1:1', ratio: 1 },
  { label: '4:3', ratio: 4 / 3 },
  { label: '16:9', ratio: 16 / 9 },
  { label: '3:2', ratio: 3 / 2 },
];

export default function CropClient() {
  const tool = getImageToolById('crop-image')!;
  const [stage, setStage] = useState<Stage>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultPreview, setResultPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Crop state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [cropRect, setCropRect] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [preset, setPreset] = useState(0);
  const [scale, setScale] = useState(1);

  // Use refs for drag state so mouse handlers always read latest values
  const draggingRef = useRef<string | null>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const newSelectOriginRef = useRef({ x: 0, y: 0 });
  const cropRectRef = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const scaleRef = useRef(1);
  const presetRef = useRef(0);

  // Keep refs in sync with state
  useEffect(() => { cropRectRef.current = cropRect; }, [cropRect]);
  useEffect(() => { scaleRef.current = scale; }, [scale]);
  useEffect(() => { presetRef.current = preset; }, [preset]);

  // Load image when file changes
  useEffect(() => {
    if (!file) return;
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      imgRef.current = img;
      setImgLoaded(true);
      const inset = Math.min(100, img.naturalWidth / 4, img.naturalHeight / 4);
      const rect = { x: inset, y: inset, w: img.naturalWidth - inset * 2, h: img.naturalHeight - inset * 2 };
      setCropRect(rect);
      cropRectRef.current = rect;
      setStage('crop');
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, [file]);

  // Draw canvas
  useEffect(() => {
    if (!imgLoaded || !canvasRef.current || !imgRef.current) return;
    const canvas = canvasRef.current;
    const img = imgRef.current;
    const ctx = canvas.getContext('2d')!;

    const maxW = Math.min(700, window.innerWidth - 48);
    const s = Math.min(maxW / img.naturalWidth, 500 / img.naturalHeight, 1);
    setScale(s);
    scaleRef.current = s;
    canvas.width = img.naturalWidth * s;
    canvas.height = img.naturalHeight * s;

    // Draw image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Light grey overlay on non-selected area
    ctx.fillStyle = 'rgba(200,200,200,0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Clear crop area (show bright)
    const cx = cropRect.x * s;
    const cy = cropRect.y * s;
    const cw = cropRect.w * s;
    const ch = cropRect.h * s;
    ctx.clearRect(cx, cy, cw, ch);
    ctx.drawImage(
      img,
      cropRect.x, cropRect.y, cropRect.w, cropRect.h,
      cx, cy, cw, ch
    );

    // Border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(cx, cy, cw, ch);

    // Rule-of-thirds grid
    if (cw > 30 && ch > 30) {
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo(cx + (cw * i) / 3, cy);
        ctx.lineTo(cx + (cw * i) / 3, cy + ch);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx, cy + (ch * i) / 3);
        ctx.lineTo(cx + cw, cy + (ch * i) / 3);
        ctx.stroke();
      }
    }

    // Corner handles
    const hs = 10;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#e67e22';
    ctx.lineWidth = 2;
    for (const [hx, hy] of [
      [cx, cy], [cx + cw, cy], [cx, cy + ch], [cx + cw, cy + ch],
    ]) {
      ctx.fillRect(hx - hs / 2, hy - hs / 2, hs, hs);
      ctx.strokeRect(hx - hs / 2, hy - hs / 2, hs, hs);
    }
  }, [imgLoaded, cropRect, scale]);

  const getMousePos = (e: React.MouseEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const s = scaleRef.current;
    return {
      x: (e.clientX - rect.left) / s,
      y: (e.clientY - rect.top) / s,
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const pos = getMousePos(e);
    const { x, y, w, h } = cropRectRef.current;
    const threshold = 12 / scaleRef.current;

    // Check corners first — resize handles
    if (Math.abs(pos.x - x) < threshold && Math.abs(pos.y - y) < threshold) {
      draggingRef.current = 'tl';
    } else if (Math.abs(pos.x - (x + w)) < threshold && Math.abs(pos.y - y) < threshold) {
      draggingRef.current = 'tr';
    } else if (Math.abs(pos.x - x) < threshold && Math.abs(pos.y - (y + h)) < threshold) {
      draggingRef.current = 'bl';
    } else if (Math.abs(pos.x - (x + w)) < threshold && Math.abs(pos.y - (y + h)) < threshold) {
      draggingRef.current = 'br';
    } else if (
      // Well inside crop rect (not near edges) — move it
      pos.x > x + threshold && pos.x < x + w - threshold &&
      pos.y > y + threshold && pos.y < y + h - threshold
    ) {
      draggingRef.current = 'move';
    } else {
      // Near edges or outside — start a new selection
      newSelectOriginRef.current = { x: pos.x, y: pos.y };
      const newRect = { x: Math.round(pos.x), y: Math.round(pos.y), w: 1, h: 1 };
      setCropRect(newRect);
      cropRectRef.current = newRect;
      draggingRef.current = 'new';
    }
    dragStartRef.current = pos;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const mode = draggingRef.current;
    if (!mode || !imgRef.current) return;
    const pos = getMousePos(e);
    const imgW = imgRef.current.naturalWidth;
    const imgH = imgRef.current.naturalHeight;
    const ratio = presetRef.current;

    if (mode === 'new') {
      const ox = newSelectOriginRef.current.x;
      const oy = newSelectOriginRef.current.y;
      let nx = Math.min(ox, pos.x);
      let ny = Math.min(oy, pos.y);
      let nw = Math.abs(pos.x - ox);
      let nh = ratio > 0 ? nw / ratio : Math.abs(pos.y - oy);
      if (ratio > 0 && pos.y < oy) ny = oy - nh;
      nx = Math.max(0, nx);
      ny = Math.max(0, ny);
      nw = Math.min(imgW - nx, nw);
      nh = Math.min(imgH - ny, nh);
      const newRect = { x: Math.round(nx), y: Math.round(ny), w: Math.round(Math.max(1, nw)), h: Math.round(Math.max(1, nh)) };
      setCropRect(newRect);
      cropRectRef.current = newRect;
      return;
    }

    const dx = pos.x - dragStartRef.current.x;
    const dy = pos.y - dragStartRef.current.y;
    let { x, y, w, h } = cropRectRef.current;

    if (mode === 'move') {
      x = Math.max(0, Math.min(imgW - w, x + dx));
      y = Math.max(0, Math.min(imgH - h, y + dy));
    } else if (mode === 'br') {
      w = Math.max(20, Math.min(imgW - x, w + dx));
      h = ratio > 0 ? w / ratio : Math.max(20, Math.min(imgH - y, h + dy));
    } else if (mode === 'tl') {
      const newW = Math.max(20, w - dx);
      const newH = ratio > 0 ? newW / ratio : Math.max(20, h - dy);
      x = x + (w - newW);
      y = y + (h - newH);
      w = newW;
      h = newH;
    } else if (mode === 'tr') {
      w = Math.max(20, Math.min(imgW - x, w + dx));
      const newH = ratio > 0 ? w / ratio : Math.max(20, h - dy);
      y = y + (h - newH);
      h = newH;
    } else if (mode === 'bl') {
      const newW = Math.max(20, w - dx);
      x = x + (w - newW);
      w = newW;
      h = ratio > 0 ? w / ratio : Math.max(20, Math.min(imgH - y, h + dy));
    }

    // Clamp
    x = Math.max(0, x);
    y = Math.max(0, y);
    w = Math.min(imgW - x, w);
    h = Math.min(imgH - y, h);

    const newRect = { x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(h) };
    setCropRect(newRect);
    cropRectRef.current = newRect;
    dragStartRef.current = pos;
  };

  const handleMouseUp = () => {
    draggingRef.current = null;
  };

  const handlePresetClick = (ratio: number) => {
    setPreset(ratio);
    presetRef.current = ratio;
    if (!imgRef.current) return;
    const imgW = imgRef.current.naturalWidth;
    const imgH = imgRef.current.naturalHeight;

    if (ratio === 0) {
      // Free mode — inset 100px from edges
      const inset = Math.min(100, imgW / 4, imgH / 4);
      const newRect = { x: inset, y: inset, w: imgW - inset * 2, h: imgH - inset * 2 };
      setCropRect(newRect);
      cropRectRef.current = newRect;
    } else {
      // Compute the largest centered crop rect that fits the ratio
      let w: number, h: number;
      if (imgW / imgH > ratio) {
        h = imgH;
        w = Math.round(h * ratio);
      } else {
        w = imgW;
        h = Math.round(w / ratio);
      }
      const x = Math.round((imgW - w) / 2);
      const y = Math.round((imgH - h) / 2);
      const newRect = { x, y, w, h };
      setCropRect(newRect);
      cropRectRef.current = newRect;
    }
  };

  const handleCrop = async () => {
    if (!file) return;
    setStage('processing');
    try {
      const blob = await cropImage(file, cropRect.x, cropRect.y, cropRect.w, cropRect.h);
      setResultBlob(blob);
      setResultPreview(URL.createObjectURL(blob));
      setStage('done');
    } catch (err: any) {
      setError(err.message);
      setStage('error');
    }
  };

  const handleReset = () => {
    if (resultPreview) URL.revokeObjectURL(resultPreview);
    setStage('upload');
    setFile(null);
    setResultBlob(null);
    setResultPreview(null);
    setImgLoaded(false);
    setError('');
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={tool.acceptTypes}
        onChange={(e) => { if (e.target.files?.[0]) setFile(e.target.files[0]); }}
        className="hidden"
      />

      {stage === 'upload' && (
        <div
          className="max-w-3xl mx-auto px-4 py-12"
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]); }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex w-12 h-12 rounded-2xl items-center justify-center text-3xl mb-4" style={{ backgroundColor: `${tool.color}15` }}>
              <span dangerouslySetInnerHTML={{ __html: tool.icon }} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
            <p className="mt-2 text-gray-500">{tool.description}</p>
          </div>
          <div className={`border-2 border-dashed rounded-xl p-16 text-center transition-all ${dragOver ? 'border-orange-400 bg-orange-50' : 'border-gray-300 bg-white'}`}>
            <div className="text-5xl mb-4">{dragOver ? '📥' : '🖼️'}</div>
            <p className="text-xl font-semibold text-gray-700 mb-4">Select an image to crop</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-3.5 rounded-xl text-white font-semibold text-base transition-all hover:opacity-90 active:scale-[0.98] shadow-sm"
              style={{ backgroundColor: tool.color }}
            >
              Choose File
            </button>
          </div>
        </div>
      )}

      {stage === 'crop' && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Crop your image</h2>
            <p className="text-gray-500 mt-1">Click & drag to select an area, or drag corners to adjust</p>
          </div>

          {/* Aspect ratio presets */}
          <div className="flex justify-center gap-2 mb-6">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => handlePresetClick(p.ratio)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  preset === p.ratio
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Canvas */}
          <div className="flex justify-center mb-4">
            <canvas
              ref={canvasRef}
              className="cursor-crosshair rounded-lg shadow-lg"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
          </div>

          {/* Crop info */}
          <div className="text-center text-sm text-gray-500 mb-6">
            {cropRect.w} x {cropRect.h} px
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleCrop}
              className="px-8 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: tool.color }}
            >
              Crop Image
            </button>
            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {stage === 'processing' && (
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="inline-block animate-spin text-4xl mb-4">⚙️</div>
            <h3 className="text-lg font-semibold text-gray-900">Cropping...</h3>
          </div>
        </div>
      )}

      {stage === 'done' && (
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <div className="text-5xl mb-3">✅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Cropped!</h3>
            {resultPreview && (
              <div className="mb-6">
                <img src={resultPreview} alt="Cropped" className="max-h-64 mx-auto rounded-lg shadow" />
              </div>
            )}
            {resultBlob && file && (
              <p className="text-sm text-gray-500 mb-6">
                {formatFileSize(file.size)} → {formatFileSize(resultBlob.size)}
              </p>
            )}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => { if (resultBlob) downloadBlob(resultBlob, `${file!.name.replace(/\.[^.]+$/, '')}-cropped.jpg`); }}
                className="px-8 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: tool.color }}
              >
                Download
              </button>
              <button onClick={handleReset} className="px-8 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all">
                Crop another
              </button>
            </div>
          </div>
        </div>
      )}

      {stage === 'error' && (
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl border border-red-200 p-12 text-center">
            <div className="text-5xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-red-700 mb-2">Something went wrong</h3>
            <p className="text-gray-500 mb-6">{error}</p>
            <button onClick={handleReset} className="py-3 px-8 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all">
              Try again
            </button>
          </div>
        </div>
      )}
    </>
  );
}
