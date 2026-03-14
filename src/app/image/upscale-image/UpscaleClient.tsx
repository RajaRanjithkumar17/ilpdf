'use client';

import ImageToolPage from '@/components/ImageToolPage';
import { getImageToolById } from '@/lib/imageTools';
import { getImageToolSeoContent } from '@/lib/seo/imageToolSeo';
import { upscaleImage } from '@/lib/image/upscale';

export default function UpscaleClient() {
  const tool = getImageToolById('upscale-image')!;
  const seoContent = getImageToolSeoContent('upscale-image');
  return (
    <ImageToolPage
      tool={tool}
      process={(files, _fields, onProgress) =>
        upscaleImage(files[0], onProgress)
      }
      seoContent={seoContent}
    />
  );
}
