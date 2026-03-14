'use client';

import ImageToolPage from '@/components/ImageToolPage';
import { getImageToolById } from '@/lib/imageTools';
import { getImageToolSeoContent } from '@/lib/seo/imageToolSeo';
import { resizeImage } from '@/lib/image/resize';

export default function ResizeClient() {
  const tool = getImageToolById('resize-image')!;
  const seoContent = getImageToolSeoContent('resize-image');
  return (
    <ImageToolPage
      tool={tool}
      process={(files, fields, onProgress) =>
        resizeImage(files[0], fields.width, fields.height, onProgress)
      }
      seoContent={seoContent}
    />
  );
}
