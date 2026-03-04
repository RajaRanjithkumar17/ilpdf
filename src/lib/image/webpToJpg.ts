import { loadImageAsCanvas, canvasToBlob } from './utils';

export async function webpToJpg(
  file: File,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  onProgress?.(30);
  const canvas = await loadImageAsCanvas(file);

  // Fill white background for JPG (no transparency)
  const tmp = document.createElement('canvas');
  tmp.width = canvas.width;
  tmp.height = canvas.height;
  const ctx = tmp.getContext('2d')!;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, tmp.width, tmp.height);
  ctx.drawImage(canvas, 0, 0);

  onProgress?.(70);
  const blob = await canvasToBlob(tmp, 'image/jpeg', 0.92);
  onProgress?.(100);
  return blob;
}
