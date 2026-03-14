'use client';

import ToolPage from '@/components/ToolPage';
import { getToolById } from '@/lib/tools';
import { getPdfToolSeoContent } from '@/lib/seo/pdfToolSeo';
import { compressPdf } from '@/lib/pdf/compress';

export default function CompressClient() {
  const tool = getToolById('compress-pdf')!;
  const seoContent = getPdfToolSeoContent('compress-pdf');
  return (
    <ToolPage
      tool={tool}
      process={(files, fields, onProgress) =>
        compressPdf(files[0], fields.quality, onProgress)
      }
      seoContent={seoContent}
    />
  );
}
