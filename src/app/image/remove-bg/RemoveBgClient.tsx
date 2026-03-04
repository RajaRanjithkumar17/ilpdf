'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { removeBackground } from '@/lib/image/removeBg';
import { downloadBlob } from '@/lib/pdf/utils';
import { formatFileSize } from '@/lib/image/utils';

type Stage = 'upload' | 'processing' | 'done' | 'error';

const TOOL_COLOR = '#e91e63';

interface RemoveBgClientProps {
  faqs: { question: string; answer: string }[];
  features: { icon: string; title: string; description: string }[];
  useCases: { title: string; description: string; image: string }[];
}

export default function RemoveBgClient({ faqs, features, useCases }: RemoveBgClientProps) {
  const [stage, setStage] = useState<Stage>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [resultPreview, setResultPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((newFile: File) => {
    setFile(newFile);
    setError('');
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (!file) {
      setOriginalPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setOriginalPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleProcess = async () => {
    if (!file) return;

    setStage('processing');
    setProgress(0);
    setProgressMessage('Loading AI model...');
    setError('');

    try {
      const blob = await removeBackground(file, (p) => {
        setProgress(p);
        if (p < 20) {
          setProgressMessage('Loading AI model...');
        } else if (p < 90) {
          setProgressMessage('Removing background...');
        } else {
          setProgressMessage('Finishing up...');
        }
      });
      setResultBlob(blob);

      const url = URL.createObjectURL(blob);
      setResultPreview(url);

      setStage('done');
    } catch (err: any) {
      setError(err.message || 'Background removal failed');
      setStage('error');
    }
  };

  const handleDownload = () => {
    if (resultBlob && file) {
      const baseName = file.name.replace(/\.[^.]+$/, '');
      downloadBlob(resultBlob, `${baseName}-no-bg.png`);
    }
  };

  const handleReset = () => {
    if (resultPreview) URL.revokeObjectURL(resultPreview);
    setStage('upload');
    setFile(null);
    setProgress(0);
    setProgressMessage('');
    setResultBlob(null);
    setResultPreview(null);
    setError('');
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={(e) => {
          if (e.target.files?.[0]) handleFile(e.target.files[0]);
        }}
        className="hidden"
      />

      {/* ═══════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════ */}
      {stage === 'upload' && !file && (
        <>
          <section className="bg-gradient-to-b from-pink-50 to-white pt-12 pb-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                Remove Image Background
              </h1>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
                <span className="text-pink-500 font-semibold">100% Automatic</span> and{' '}
                <span className="text-pink-500 font-semibold">Free</span>
              </p>

              {/* Upload area - remove.bg style */}
              <div
                className={`max-w-xl mx-auto border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer bg-white ${
                  dragOver
                    ? 'border-pink-400 bg-pink-50 scale-[1.02]'
                    : 'border-gray-300 hover:border-pink-300 hover:shadow-lg'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={openFilePicker}
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-pink-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  Upload Image
                </p>
                <p className="text-sm text-gray-400 mb-5">
                  or drag & drop your image here
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openFilePicker();
                  }}
                  className="px-8 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90 active:scale-[0.98] shadow-lg"
                  style={{ backgroundColor: TOOL_COLOR }}
                >
                  Upload Image
                </button>
                <p className="text-xs text-gray-400 mt-5">
                  JPG, PNG, WebP • Max ~10MB recommended
                </p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-16 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {features.map((f) => (
                  <div key={f.title} className="text-center">
                    <div className="text-3xl mb-2">{f.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                    <p className="text-sm text-gray-500">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  One tool, endless uses
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto">
                  Create transparent background images for any project
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {useCases.map((uc) => (
                  <div
                    key={uc.title}
                    className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all"
                  >
                    <div className="text-4xl mb-4">{uc.image}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{uc.title}</h3>
                    <p className="text-sm text-gray-500">{uc.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Trust Banner */}
          <section className="bg-gray-900 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-3">
                Background removal built for privacy
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                Unlike other tools, we process everything locally in your browser.
                Your images never leave your device — because we don&apos;t have servers.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm font-medium">100% Client-Side</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-sm font-medium">No Uploads</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm font-medium">AI-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm font-medium">Free Forever</span>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Frequently asked questions
                </h2>
                <p className="text-gray-500">Everything you need to know</p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-900 hover:bg-gray-100">
                      {faq.question}
                      <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-pink-50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to remove backgrounds?
              </h2>
              <p className="text-gray-500 mb-6 max-w-xl mx-auto">
                Upload an image and see the magic happen. No sign-up, no limits, no watermarks.
              </p>
              <button
                onClick={openFilePicker}
                className="px-10 py-4 rounded-xl text-white font-semibold text-lg transition-all hover:opacity-90 active:scale-[0.98] shadow-lg"
                style={{ backgroundColor: TOOL_COLOR }}
              >
                Upload Image
              </button>
            </div>
          </section>
        </>
      )}

      {/* ═══════════════════════════════════
          FILE SELECTED - READY TO PROCESS
          ═══════════════════════════════════ */}
      {stage === 'upload' && file && (
        <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
          <div className="max-w-xl w-full">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to Remove Background</h2>

              {originalPreview && (
                <div className="mb-6">
                  <div className="relative inline-block">
                    <img
                      src={originalPreview}
                      alt="Original"
                      className="max-h-72 max-w-full object-contain rounded-lg"
                    />
                    <button
                      onClick={() => setFile(null)}
                      className="absolute -top-2 -right-2 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-500 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    {file.name} • {formatFileSize(file.size)}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleProcess}
                  className="py-4 px-10 rounded-xl text-white font-semibold text-lg transition-all hover:opacity-90 active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
                  style={{ backgroundColor: TOOL_COLOR }}
                >
                  Remove Background
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button
                  onClick={() => setFile(null)}
                  className="py-4 px-8 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                >
                  Choose Different Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════
          PROCESSING
          ═══════════════════════════════════ */}
      {stage === 'processing' && (
        <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
              <div className="inline-block animate-spin text-5xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {progressMessage}
              </h3>
              <div className="max-w-sm mx-auto">
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: TOOL_COLOR,
                    }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">{progress}%</p>
              </div>
              {progress < 20 && (
                <p className="text-xs text-gray-400 mt-4">
                  First time? Downloading AI model (~20MB)...
                </p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                Everything runs locally in your browser
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════
          DONE - RESULT
          ═══════════════════════════════════ */}
      {stage === 'done' && originalPreview && resultPreview && (
        <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
          <div className="max-w-3xl w-full">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">✅</div>
                <h3 className="text-2xl font-bold text-gray-900">Background Removed!</h3>
              </div>

              {/* Before / After comparison */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                    Original
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <img
                      src={originalPreview}
                      alt="Original"
                      className="max-h-64 mx-auto object-contain rounded"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {file && formatFileSize(file.size)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                    Background Removed
                  </p>
                  <div
                    className="rounded-lg p-3 border border-gray-100"
                    style={{
                      background: 'repeating-conic-gradient(#e5e7eb 0% 25%, white 0% 50%) 50% / 16px 16px'
                    }}
                  >
                    <img
                      src={resultPreview}
                      alt="Result"
                      className="max-h-64 mx-auto object-contain rounded"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {resultBlob && formatFileSize(resultBlob.size)} • PNG
                  </p>
                </div>
              </div>

              {/* Transparent background indicator */}
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Transparent background ready
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleDownload}
                  className="py-4 px-10 rounded-xl text-white font-semibold text-lg transition-all hover:opacity-90 active:scale-[0.98] shadow-lg"
                  style={{ backgroundColor: TOOL_COLOR }}
                >
                  Download HD
                </button>
                <button
                  onClick={handleReset}
                  className="py-4 px-8 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                >
                  Remove Another Background
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════
          ERROR
          ═══════════════════════════════════ */}
      {stage === 'error' && (
        <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl border border-red-200 p-10 text-center">
              <div className="text-5xl mb-4">❌</div>
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                Something went wrong
              </h3>
              <p className="text-gray-500 mb-6">{error}</p>
              <button
                onClick={handleReset}
                className="py-3 px-8 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}