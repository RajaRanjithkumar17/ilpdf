'use client';

import ImageToolPage from '@/components/ImageToolPage';
import { getImageToolById } from '@/lib/imageTools';
import { getImageToolSeoContent } from '@/lib/seo/imageToolSeo';
import { convertToJpg } from '@/lib/image/convertToJpg';

export default function ConvertToJpgClient() {
  const tool = getImageToolById('convert-to-jpg')!;
  const seoContent = getImageToolSeoContent('convert-to-jpg');
  return (
    <ImageToolPage
      tool={tool}
      process={(files, fields, onProgress) =>
        convertToJpg(files[0], fields.quality || '92', onProgress)
      }
      seoContent={seoContent}
    />
  );
}
