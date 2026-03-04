'use client';

import ImageToolPage from '@/components/ImageToolPage';
import { getImageToolById } from '@/lib/imageTools';
import { webpToJpg } from '@/lib/image/webpToJpg';

export default function WebpToJpgClient() {
  const tool = getImageToolById('webp-to-jpg')!;
  return (
    <ImageToolPage
      tool={tool}
      process={(files, _fields, onProgress) =>
        webpToJpg(files[0], onProgress)
      }
    />
  );
}
