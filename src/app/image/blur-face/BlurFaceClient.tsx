'use client';

import ImageToolPage from '@/components/ImageToolPage';
import { getImageToolById } from '@/lib/imageTools';
import { getImageToolSeoContent } from '@/lib/seo/imageToolSeo';
import { blurFace } from '@/lib/image/blurFace';

export default function BlurFaceClient() {
  const tool = getImageToolById('blur-face')!;
  const seoContent = getImageToolSeoContent('blur-face');
  return (
    <ImageToolPage
      tool={tool}
      process={(files, _fields, onProgress) =>
        blurFace(files[0], onProgress)
      }
      seoContent={seoContent}
    />
  );
}
