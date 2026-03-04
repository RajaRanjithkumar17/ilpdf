'use client';

import ImageToolPage from '@/components/ImageToolPage';
import { getImageToolById } from '@/lib/imageTools';
import { compressImage } from '@/lib/image/compress';

export default function CompressClient() {
  const tool = getImageToolById('compress-image')!;
  return (
    <ImageToolPage
      tool={tool}
      process={(files, fields, onProgress) =>
        compressImage(files[0], fields.quality || '80', onProgress)
      }
    />
  );
}
