export async function compressImage(
  file: File,
  quality: string,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  const imageCompression = (await import('browser-image-compression')).default;

  const q = parseInt(quality, 10) || 80;
  // Map quality percentage to maxSizeMB (lower quality = smaller max size)
  const maxSizeMB = (q / 100) * (file.size / (1024 * 1024));

  const result = await imageCompression(file, {
    maxSizeMB: Math.max(maxSizeMB, 0.05),
    maxWidthOrHeight: 4096,
    useWebWorker: true,
    onProgress: (p: number) => onProgress?.(Math.round(p)),
    fileType: file.type as string,
  });

  onProgress?.(100);
  return result;
}
