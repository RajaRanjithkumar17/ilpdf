'use client';

import ImageToolPage from '@/components/ImageToolPage';
import { getImageToolById } from '@/lib/imageTools';
import { heicToJpg } from '@/lib/image/heicToJpg';

export default function HeicToJpgClient() {
  const tool = getImageToolById('heic-to-jpg')!;
  return (
    <ImageToolPage
      tool={tool}
      process={(files, _fields, onProgress) =>
        heicToJpg(files[0], onProgress)
      }
    />
  );
}
