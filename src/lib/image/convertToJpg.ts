import { loadImageAsCanvas, canvasToBlob } from './utils';

export async function convertToJpg(
  file: File,
  quality: string,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  const q = (parseInt(quality, 10) || 92) / 100;

  onProgress?.(30);
  const canvas = await loadImageAsCanvas(file);

  // For JPG output, fill transparent areas with white background
  if (file.type === 'image/png') {
    const tmp = document.createElement('canvas');
    tmp.width = canvas.width;
    tmp.height = canvas.height;
    const ctx = tmp.getContext('2d')!;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, tmp.width, tmp.height);
    ctx.drawImage(canvas, 0, 0);

    onProgress?.(70);
    const blob = await canvasToBlob(tmp, 'image/jpeg', q);
    onProgress?.(100);
    return blob;
  }

  onProgress?.(70);
  const blob = await canvasToBlob(canvas, 'image/jpeg', q);
  onProgress?.(100);
  return blob;
}
