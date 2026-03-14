'use client';

import ToolPage from '@/components/ToolPage';
import { getToolById } from '@/lib/tools';
import { getPdfToolSeoContent } from '@/lib/seo/pdfToolSeo';
import { pdfToJpg } from '@/lib/pdf/pdfToJpg';

export default function PdfToJpgClient() {
  const tool = getToolById('pdf-to-jpg')!;
  const seoContent = getPdfToolSeoContent('pdf-to-jpg');
  return (
    <ToolPage
      tool={tool}
      process={(files, _fields, onProgress) => pdfToJpg(files[0], onProgress)}
      seoContent={seoContent}
    />
  );
}
