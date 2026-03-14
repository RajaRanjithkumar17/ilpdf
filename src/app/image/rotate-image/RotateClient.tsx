'use client';

import ImageToolPage from '@/components/ImageToolPage';
import { getImageToolById } from '@/lib/imageTools';
import { getImageToolSeoContent } from '@/lib/seo/imageToolSeo';
import { rotateImage } from '@/lib/image/rotate';

export default function RotateClient() {
  const tool = getImageToolById('rotate-image')!;
  const seoContent = getImageToolSeoContent('rotate-image');
  return (
    <ImageToolPage
      tool={tool}
      process={(files, fields, onProgress) =>
        rotateImage(files[0], fields.angle || '90', onProgress)
      }
      seoContent={seoContent}
    />
  );
}
