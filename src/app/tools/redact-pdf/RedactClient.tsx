'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { getToolById } from '@/lib/tools';
import { downloadBlob } from '@/lib/pdf/utils';
import { redactPdf, type RedactionBox } from '@/lib/pdf/redact';
import type { PDFDocumentProxy } from 'pdfjs-dist';

type Stage = 'upload' | 'editor' | 'processing' | 'done' | 'error';

export default function RedactClient() {
  const tool = getToolById('redact-pdf')!;

  const [stage, setStage] = useState<Stage>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  // PDF state
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [zoom, setZoom] = useState(1.0);
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });

  // Redaction state
  const [redactions, setRedactions] = useState<RedactionBox[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(null);
  const [drawCurrent, setDrawCurrent] = useState<{ x: number; y: number } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load PDF when file changes
  useEffect(() => {
    if (!file) return;
    let cancelled = false;

    async function load() {
      try {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
        const bytes = new Uint8Array(await file!.arrayBuffer());
        const doc = await pdfjs.getDocument({ data: bytes }).promise;
        if (cancelled) { doc.destroy(); return; }
        setPdfDoc(doc);
        setTotalPages(doc.numPages);
        setCurrentPage(1);
        setStage('editor');
      } catch {
        setError('Failed to load PDF');
        setStage('error');
      }
    }

    load();
    return () => { cancelled = true; };
  }, [file]);

  // Render current page on canvas
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;
    let cancelled = false;

    async function renderPage() {
      const page = await pdfDoc!.getPage(currentPage);
      const viewport = page.getViewport({ scale: zoom });

      const canvas = canvasRef.current!;
      canvas.width = viewport.width * window.devicePixelRatio;
      canvas.height = viewport.height * window.devicePixelRatio;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      setPageSize({ width: viewport.width / zoom, height: viewport.height / zoom });

      const ctx = canvas.getContext('2d')!;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

      await page.render({ canvasContext: ctx, viewport }).promise;

      if (!cancelled) drawOverlay();
    }

    renderPage();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfDoc, currentPage, zoom]);

  // Redraw overlay when redactions change
  useEffect(() => {
    drawOverlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redactions, currentPage, zoom, isDrawing, drawStart, drawCurrent]);

  function drawOverlay() {
    const overlay = overlayCanvasRef.current;
    const main = canvasRef.current;
    if (!overlay || !main) return;

    overlay.width = main.width;
    overlay.height = main.height;
    overlay.style.width = main.style.width;
    overlay.style.height = main.style.height;

    const ctx = overlay.getContext('2d')!;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    ctx.clearRect(0, 0, overlay.width, overlay.height);

    // Draw existing redaction boxes for current page
    const pageRedactions = redactions.filter(r => r.page === currentPage);
    for (const box of pageRedactions) {
      // Convert from PDF coords (bottom-left) to canvas coords (top-left)
      const cx = box.x * zoom;
      const cy = (pageSize.height - box.y - box.height) * zoom;
      const cw = box.width * zoom;
      const ch = box.height * zoom;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(cx, cy, cw, ch);
      ctx.strokeStyle = 'rgba(220, 38, 38, 0.8)';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx, cy, cw, ch);
    }

    // Draw the rectangle currently being drawn
    if (isDrawing && drawStart && drawCurrent) {
      const x = Math.min(drawStart.x, drawCurrent.x);
      const y = Math.min(drawStart.y, drawCurrent.y);
      const w = Math.abs(drawCurrent.x - drawStart.x);
      const h = Math.abs(drawCurrent.y - drawStart.y);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = 'rgba(220, 38, 38, 1)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(x, y, w, h);
      ctx.setLineDash([]);
    }
  }

  function getCanvasCoords(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = overlayCanvasRef.current!.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    if (e.button !== 0) return; // left click only
    const coords = getCanvasCoords(e);
    setIsDrawing(true);
    setDrawStart(coords);
    setDrawCurrent(coords);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;
    setDrawCurrent(getCanvasCoords(e));
  }

  function handleMouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isDrawing || !drawStart) return;
    const end = getCanvasCoords(e);

    // Minimum size threshold (5px) to avoid accidental clicks
    const w = Math.abs(end.x - drawStart.x);
    const h = Math.abs(end.y - drawStart.y);

    if (w > 5 && h > 5) {
      // Convert canvas coords to PDF coords (bottom-left origin)
      const canvasX = Math.min(drawStart.x, end.x);
      const canvasY = Math.min(drawStart.y, end.y);
      const canvasW = w;
      const canvasH = h;

      // Remove zoom from coordinates to get PDF-space values
      const pdfX = canvasX / zoom;
      const pdfW = canvasW / zoom;
      const pdfH = canvasH / zoom;
      // Flip Y: PDF origin is bottom-left
      const pdfY = pageSize.height - (canvasY / zoom) - pdfH;

      setRedactions(prev => [
        ...prev,
        { page: currentPage, x: pdfX, y: pdfY, width: pdfW, height: pdfH },
      ]);
    }

    setIsDrawing(false);
    setDrawStart(null);
    setDrawCurrent(null);
  }

  function undoLast() {
    setRedactions(prev => {
      // Remove the last redaction for the current page
      const lastIdx = prev.findLastIndex(r => r.page === currentPage);
      if (lastIdx === -1) return prev;
      return prev.filter((_, i) => i !== lastIdx);
    });
  }

  function clearPage() {
    setRedactions(prev => prev.filter(r => r.page !== currentPage));
  }

  async function applyRedactions() {
    if (!file || redactions.length === 0) return;
    setStage('processing');

    try {
      const blob = await redactPdf(file, redactions);
      setResultBlob(blob);
      setStage('done');
    } catch (err: any) {
      setError(err.message || 'Redaction failed');
      setStage('error');
    }
  }

  function handleReset() {
    setStage('upload');
    setFile(null);
    setPdfDoc(null);
    setCurrentPage(1);
    setTotalPages(0);
    setZoom(1.0);
    setRedactions([]);
    setResultBlob(null);
    setError('');
  }

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const f = Array.from(newFiles)[0];
    if (f) setFile(f);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const currentPageRedactionCount = redactions.filter(r => r.page === currentPage).length;
  const totalRedactionCount = redactions.length;

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={(e) => { if (e.target.files) handleFiles(e.target.files); }}
        className="hidden"
      />

      {/* ───── UPLOAD ───── */}
      {stage === 'upload' && (
        <div
          className="max-w-3xl mx-auto px-4 py-12"
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <div className="text-center mb-8">
            <div
              className="inline-flex w-12 h-12 rounded-2xl items-center justify-center text-3xl mb-4"
              style={{ backgroundColor: `${tool.color}15` }}
            >
              <span dangerouslySetInnerHTML={{ __html: tool.icon }} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
            <p className="mt-2 text-gray-500">{tool.description}</p>
          </div>

          <div className={`border-2 border-dashed rounded-xl p-16 text-center transition-all ${
            dragOver ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
          }`}>
            <div className="text-5xl mb-4">{dragOver ? '📥' : '📄'}</div>
            <p className="text-xl font-semibold text-gray-700 mb-4">
              {dragOver ? 'Drop file here' : 'Select a PDF file'}
            </p>
            <button
              onClick={() => { fileInputRef.current!.value = ''; fileInputRef.current!.click(); }}
              className="px-8 py-3.5 rounded-xl text-white font-semibold text-base transition-all hover:opacity-90 active:scale-[0.98] shadow-sm"
              style={{ backgroundColor: tool.color }}
            >
              Choose File
            </button>
            <p className="text-sm text-gray-400 mt-4">or drag & drop anywhere</p>
          </div>
        </div>
      )}

      {/* ───── EDITOR ───── */}
      {stage === 'editor' && (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
          {/* Main canvas area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
              <div className="flex items-center gap-2">
                {/* Page navigation */}
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                <span className="text-sm text-gray-600 min-w-[80px] text-center">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom controls */}
                <button
                  onClick={() => setZoom(z => Math.max(0.5, +(z - 0.25).toFixed(2)))}
                  disabled={zoom <= 0.5}
                  className="w-8 h-8 rounded-lg border border-gray-300 text-sm font-bold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  −
                </button>
                <span className="text-sm text-gray-600 min-w-[50px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom(z => Math.min(3, +(z + 0.25).toFixed(2)))}
                  disabled={zoom >= 3}
                  className="w-8 h-8 rounded-lg border border-gray-300 text-sm font-bold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  +
                </button>
                <button
                  onClick={() => setZoom(1)}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm hover:bg-gray-50"
                >
                  Reset
                </button>
              </div>

              <div className="flex items-center gap-2">
                {/* Undo / Clear */}
                <button
                  onClick={undoLast}
                  disabled={currentPageRedactionCount === 0}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Undo
                </button>
                <button
                  onClick={clearPage}
                  disabled={currentPageRedactionCount === 0}
                  className="px-3 py-1.5 rounded-lg border border-red-300 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Clear Page
                </button>
              </div>
            </div>

            {/* Canvas container */}
            <div
              ref={containerRef}
              className="flex-1 overflow-auto bg-gray-100 flex items-start justify-center p-4"
            >
              <div className="relative inline-block shadow-lg">
                <canvas ref={canvasRef} className="block" />
                <canvas
                  ref={overlayCanvasRef}
                  className="absolute top-0 left-0 block"
                  style={{ cursor: 'crosshair' }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={() => {
                    if (isDrawing) {
                      setIsDrawing(false);
                      setDrawStart(null);
                      setDrawCurrent(null);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="w-full lg:w-72 shrink-0 border-t lg:border-t-0 lg:border-l border-gray-200 bg-white p-5 flex flex-col">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Redactions</h2>

            {/* Help text */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-800 leading-relaxed">
                Click and drag on the PDF to draw black redaction boxes. Redacted areas will be permanently removed when applied.
              </p>
            </div>

            {/* Redaction stats */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">This page</span>
                <span className="font-semibold text-gray-700">{currentPageRedactionCount} area{currentPageRedactionCount !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total</span>
                <span className="font-semibold text-gray-700">{totalRedactionCount} area{totalRedactionCount !== 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Per-page summary */}
            {totalPages > 0 && (
              <div className="flex-1 overflow-auto mb-4">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Pages</p>
                <div className="space-y-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => {
                    const count = redactions.filter(r => r.page === p).length;
                    return (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          p === currentPage
                            ? 'bg-gray-100 font-semibold text-gray-900'
                            : 'hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        <span>Page {p}</span>
                        {count > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center font-bold">
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Apply button */}
            <button
              onClick={applyRedactions}
              disabled={totalRedactionCount === 0}
              className={`w-full py-3.5 px-6 rounded-xl text-white font-semibold text-base transition-all flex items-center justify-center gap-2 ${
                totalRedactionCount === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:opacity-90 active:scale-[0.98]'
              }`}
              style={{ backgroundColor: tool.color }}
            >
              Apply Redactions
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <button
              onClick={handleReset}
              className="mt-2 w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Choose a different file
            </button>
          </div>
        </div>
      )}

      {/* ───── PROCESSING / DONE / ERROR ───── */}
      {(stage === 'processing' || stage === 'done' || stage === 'error') && (
        <div className="max-w-3xl mx-auto px-4 py-12">
          {stage === 'processing' && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <div className="inline-block animate-spin text-4xl mb-4">⚙️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Applying redactions...</h3>
              <div className="max-w-xs mx-auto">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: '100%',
                      backgroundColor: tool.color,
                      animation: 'pulse 1.5s ease-in-out infinite',
                    }}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4">Everything runs locally in your browser</p>
            </div>
          )}

          {stage === 'done' && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Redaction Complete!</h3>
              <p className="text-gray-500 mb-6">
                {totalRedactionCount} area{totalRedactionCount !== 1 ? 's' : ''} redacted. Your file is ready to download.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => { if (resultBlob) downloadBlob(resultBlob, 'redacted.pdf'); }}
                  className="py-3 px-8 rounded-xl text-white font-semibold transition-all hover:opacity-90"
                  style={{ backgroundColor: tool.color }}
                >
                  Download redacted.pdf
                </button>
                <button
                  onClick={handleReset}
                  className="py-3 px-8 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                >
                  Process another file
                </button>
              </div>
            </div>
          )}

          {stage === 'error' && (
            <div className="bg-white rounded-xl border border-red-200 p-12 text-center">
              <div className="text-5xl mb-4">❌</div>
              <h3 className="text-xl font-semibold text-red-700 mb-2">Something went wrong</h3>
              <p className="text-gray-500 mb-6">{error}</p>
              <button
                onClick={handleReset}
                className="py-3 px-8 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
