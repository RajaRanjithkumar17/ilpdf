'use client';

import ImageToolPage from '@/components/ImageToolPage';
import { getImageToolById } from '@/lib/imageTools';
import { getImageToolSeoContent } from '@/lib/seo/imageToolSeo';
import { heicToJpg } from '@/lib/image/heicToJpg';

export default function HeicToJpgClient() {
  const tool = getImageToolById('heic-to-jpg')!;
  const seoContent = getImageToolSeoContent('heic-to-jpg');
  return (
    <ImageToolPage
      tool={tool}
      process={(files, _fields, onProgress) =>
        heicToJpg(files[0], onProgress)
      }
      seoContent={seoContent}
    />
  );
}
