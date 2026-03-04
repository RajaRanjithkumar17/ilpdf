import { loadImageAsCanvas, canvasToBlob } from './utils';

export async function rotateImage(
  file: File,
  angle: string,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  const degrees = parseInt(angle, 10) || 90;

  onProgress?.(20);
  const srcCanvas = await loadImageAsCanvas(file);
  const sw = srcCanvas.width;
  const sh = srcCanvas.height;

  onProgress?.(50);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  // Swap dimensions for 90° and 270°
  if (degrees === 90 || degrees === 270) {
    canvas.width = sh;
    canvas.height = sw;
  } else {
    canvas.width = sw;
    canvas.height = sh;
  }

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((degrees * Math.PI) / 180);
  ctx.drawImage(srcCanvas, -sw / 2, -sh / 2);

  onProgress?.(80);
  const type = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  const quality = type === 'image/png' ? undefined : 0.92;
  const blob = await canvasToBlob(canvas, type, quality);

  onProgress?.(100);
  return blob;
}
