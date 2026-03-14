'use client';

import ToolPage from '@/components/ToolPage';
import { getToolById } from '@/lib/tools';
import { getPdfToolSeoContent } from '@/lib/seo/pdfToolSeo';
import { ocrPdf } from '@/lib/pdf/ocr';

export default function OcrClient() {
  const tool = getToolById('ocr-pdf')!;
  const seoContent = getPdfToolSeoContent('ocr-pdf');
  return (
    <ToolPage
      tool={tool}
      process={(files, _fields, onProgress) => ocrPdf(files[0], onProgress)}
      seoContent={seoContent}
    />
  );
}
