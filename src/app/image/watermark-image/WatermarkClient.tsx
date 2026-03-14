'use client';

import ImageToolPage from '@/components/ImageToolPage';
import { getImageToolById } from '@/lib/imageTools';
import { getImageToolSeoContent } from '@/lib/seo/imageToolSeo';
import { watermarkImage } from '@/lib/image/watermark';

export default function WatermarkClient() {
  const tool = getImageToolById('watermark-image')!;
  const seoContent = getImageToolSeoContent('watermark-image');
  return (
    <ImageToolPage
      tool={tool}
      process={(files, fields, onProgress) =>
        watermarkImage(files[0], fields.text || '', onProgress)
      }
      seoContent={seoContent}
    />
  );
}
