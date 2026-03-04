/**
 * Shared image utilities for browser-based image processing.
 */

/** Load a File as an HTMLImageElement */
export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}

/** Load a File and draw it onto a canvas, returning the canvas */
export async function loadImageAsCanvas(
  file: File
): Promise<HTMLCanvasElement> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);
  return canvas;
}

/** Convert a canvas to a Blob */
export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string = 'image/jpeg',
  quality: number = 0.92
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas toBlob failed'));
      },
      type,
      quality
    );
  });
}

/** Get image dimensions from a File */
export async function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  const img = await loadImage(file);
  return { width: img.naturalWidth, height: img.naturalHeight };
}

/** Format bytes to human-readable string */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
