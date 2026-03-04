'use client';

import ImageToolPage from '@/components/ImageToolPage';
import { getImageToolById } from '@/lib/imageTools';
import { resizeImage } from '@/lib/image/resize';

export default function ResizeClient() {
  const tool = getImageToolById('resize-image')!;
  return (
    <ImageToolPage
      tool={tool}
      process={(files, fields, onProgress) =>
        resizeImage(files[0], fields.width, fields.height, onProgress)
      }
    />
  );
}
