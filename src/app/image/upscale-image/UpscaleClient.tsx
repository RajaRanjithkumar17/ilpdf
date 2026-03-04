'use client';

import ImageToolPage from '@/components/ImageToolPage';
import { getImageToolById } from '@/lib/imageTools';
import { upscaleImage } from '@/lib/image/upscale';

export default function UpscaleClient() {
  const tool = getImageToolById('upscale-image')!;
  return (
    <ImageToolPage
      tool={tool}
      process={(files, _fields, onProgress) =>
        upscaleImage(files[0], onProgress)
      }
    />
  );
}
