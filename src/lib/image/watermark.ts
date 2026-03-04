import { loadImageAsCanvas, canvasToBlob } from './utils';

export async function watermarkImage(
  file: File,
  text: string,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  if (!text.trim()) throw new Error('Watermark text is required');

  onProgress?.(20);
  const canvas = await loadImageAsCanvas(file);
  const ctx = canvas.getContext('2d')!;

  onProgress?.(50);

  // Calculate font size relative to image (roughly 5% of diagonal)
  const diagonal = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);
  const fontSize = Math.max(16, Math.round(diagonal * 0.05));

  ctx.save();
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.font = `bold ${fontSize}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Rotate and tile the watermark
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(-Math.PI / 6); // -30 degrees

  const spacingX = fontSize * text.length * 0.7;
  const spacingY = fontSize * 3;
  const cols = Math.ceil(diagonal / spacingX) + 2;
  const rows = Math.ceil(diagonal / spacingY) + 2;

  for (let r = -rows; r <= rows; r++) {
    for (let c = -cols; c <= cols; c++) {
      const x = c * spacingX;
      const y = r * spacingY;
      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);
    }
  }

  ctx.restore();

  onProgress?.(80);
  const type = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  const quality = type === 'image/png' ? undefined : 0.92;
  const blob = await canvasToBlob(canvas, type, quality);

  onProgress?.(100);
  return blob;
}
