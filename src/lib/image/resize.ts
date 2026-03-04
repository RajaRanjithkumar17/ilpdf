import { loadImageAsCanvas, canvasToBlob } from './utils';

export async function resizeImage(
  file: File,
  width: string,
  height: string,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  const w = parseInt(width, 10);
  const h = parseInt(height, 10);
  if (!w || !h || w < 1 || h < 1) {
    throw new Error('Invalid dimensions');
  }

  onProgress?.(20);
  const srcCanvas = await loadImageAsCanvas(file);

  onProgress?.(50);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(srcCanvas, 0, 0, w, h);

  onProgress?.(80);
  // Preserve original format
  const type = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  const quality = type === 'image/png' ? undefined : 0.92;
  const blob = await canvasToBlob(canvas, type, quality);

  onProgress?.(100);
  return blob;
}
