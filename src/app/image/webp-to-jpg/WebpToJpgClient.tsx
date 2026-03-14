'use client';

import ImageToolPage from '@/components/ImageToolPage';
import { getImageToolById } from '@/lib/imageTools';
import { getImageToolSeoContent } from '@/lib/seo/imageToolSeo';
import { webpToJpg } from '@/lib/image/webpToJpg';

export default function WebpToJpgClient() {
  const tool = getImageToolById('webp-to-jpg')!;
  const seoContent = getImageToolSeoContent('webp-to-jpg');
  return (
    <ImageToolPage
      tool={tool}
      process={(files, _fields, onProgress) =>
        webpToJpg(files[0], onProgress)
      }
      seoContent={seoContent}
    />
  );
}
