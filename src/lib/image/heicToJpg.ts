export async function heicToJpg(
  file: File,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  onProgress?.(10);

  const heic2any = (await import('heic2any')).default;

  onProgress?.(30);
  const result = await heic2any({
    blob: file,
    toType: 'image/jpeg',
    quality: 0.92,
  });

  onProgress?.(100);
  // heic2any can return a single Blob or an array
  return Array.isArray(result) ? result[0] : result;
}
