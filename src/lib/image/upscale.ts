import { loadImageAsCanvas, canvasToBlob } from './utils';

/**
 * Simple 2x upscale using canvas high-quality bicubic interpolation.
 * For a true AI upscaler, we'd use upscaler.js, but this gives good
 * results without the ~50MB model download.
 */
export async function upscaleImage(
  file: File,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  onProgress?.(20);
  const srcCanvas = await loadImageAsCanvas(file);
  const scale = 2;

  onProgress?.(40);
  const canvas = document.createElement('canvas');
  canvas.width = srcCanvas.width * scale;
  canvas.height = srcCanvas.height * scale;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(srcCanvas, 0, 0, canvas.width, canvas.height);

  onProgress?.(80);
  const blob = await canvasToBlob(canvas, 'image/png');
  onProgress?.(100);
  return blob;
}
