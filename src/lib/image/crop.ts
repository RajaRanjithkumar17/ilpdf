import { loadImageAsCanvas, canvasToBlob } from './utils';

export async function cropImage(
  file: File,
  x: number,
  y: number,
  width: number,
  height: number,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  if (width < 1 || height < 1) throw new Error('Invalid crop dimensions');

  onProgress?.(20);
  const srcCanvas = await loadImageAsCanvas(file);

  onProgress?.(50);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(srcCanvas, x, y, width, height, 0, 0, width, height);

  onProgress?.(80);
  const type = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  const quality = type === 'image/png' ? undefined : 0.92;
  const blob = await canvasToBlob(canvas, type, quality);

  onProgress?.(100);
  return blob;
}
