'use client';

import ImageToolPage from '@/components/ImageToolPage';
import { getImageToolById } from '@/lib/imageTools';
import { blurFace } from '@/lib/image/blurFace';

export default function BlurFaceClient() {
  const tool = getImageToolById('blur-face')!;
  return (
    <ImageToolPage
      tool={tool}
      process={(files, _fields, onProgress) =>
        blurFace(files[0], onProgress)
      }
    />
  );
}
