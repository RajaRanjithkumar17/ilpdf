import { loadImageAsCanvas, canvasToBlob } from './utils';

export async function convertFromJpg(
  file: File,
  format: string,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  onProgress?.(30);
  const canvas = await loadImageAsCanvas(file);

  onProgress?.(70);
  const mimeType = format === 'webp' ? 'image/webp' : 'image/png';
  const quality = format === 'webp' ? 0.92 : undefined;
  const blob = await canvasToBlob(canvas, mimeType, quality);

  onProgress?.(100);
  return blob;
}
