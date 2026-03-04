/**
 * Remove background from image using @imgly/background-removal
 * Runs entirely in-browser using ONNX models + WebAssembly
 */

export async function removeBackground(
  file: File,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  onProgress?.(10);

  // Dynamic import to reduce initial bundle size
  const { removeBackground: removeBg } = await import('@imgly/background-removal');

  onProgress?.(20);

  // Process the image - the library handles model download internally
  const blob = await removeBg(file, {
    progress: (key, current, total) => {
      // Map progress to 20-90 range
      const progressValue = Math.round((current / total) * 70) + 20;
      onProgress?.(Math.min(progressValue, 90));
    },
  });

  onProgress?.(100);
  return blob;
}