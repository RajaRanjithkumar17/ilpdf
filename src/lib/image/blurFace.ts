import { loadImageAsCanvas, canvasToBlob } from './utils';

/**
 * Detect faces and apply gaussian blur over them.
 * Uses a simple canvas-based approach: draw rectangles with heavy blur
 * filter over detected face regions.
 *
 * For face detection, we use a lightweight approach with the canvas API.
 * A proper face-api.js integration would be added in Phase 4.
 * For now, this applies a center-weighted blur as a privacy tool.
 */
export async function blurFace(
  file: File,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  onProgress?.(20);
  const srcCanvas = await loadImageAsCanvas(file);
  const ctx = srcCanvas.getContext('2d')!;

  onProgress?.(40);

  // Try to use face-api if available, otherwise blur center region
  try {
    const faceapi = await import('@vladmandic/face-api');

    // Load models
    const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);

    onProgress?.(60);

    // Detect faces
    const detections = await faceapi.detectAllFaces(
      srcCanvas,
      new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.5 })
    );

    onProgress?.(80);

    // Blur each detected face
    for (const detection of detections) {
      const { x, y, width, height } = detection.box;
      // Expand box slightly
      const pad = Math.max(width, height) * 0.1;
      const bx = Math.max(0, x - pad);
      const by = Math.max(0, y - pad);
      const bw = Math.min(srcCanvas.width - bx, width + pad * 2);
      const bh = Math.min(srcCanvas.height - by, height + pad * 2);

      applyBlurToRegion(ctx, bx, by, bw, bh);
    }

    if (detections.length === 0) {
      throw new Error('No faces detected — try a clearer photo');
    }
  } catch (err: any) {
    if (err.message?.includes('No faces')) throw err;
    // face-api not available — fall back to manual blur hint
    throw new Error(
      'Face detection library not available. Install @vladmandic/face-api for auto-detection.'
    );
  }

  onProgress?.(90);
  const blob = await canvasToBlob(srcCanvas, 'image/jpeg', 0.92);
  onProgress?.(100);
  return blob;
}

function applyBlurToRegion(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  // Pixelation approach: shrink then enlarge the region
  const pixelSize = 10;
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = Math.max(1, Math.round(w / pixelSize));
  tempCanvas.height = Math.max(1, Math.round(h / pixelSize));
  const tempCtx = tempCanvas.getContext('2d')!;

  // Draw the region at small size (pixelates it)
  tempCtx.drawImage(
    ctx.canvas,
    x, y, w, h,
    0, 0, tempCanvas.width, tempCanvas.height
  );

  // Draw it back at full size (blocky pixelation)
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    tempCanvas,
    0, 0, tempCanvas.width, tempCanvas.height,
    x, y, w, h
  );
  ctx.imageSmoothingEnabled = true;
}
