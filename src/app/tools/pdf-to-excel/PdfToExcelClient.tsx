'use client';

import ToolPage from '@/components/ToolPage';
import { getToolById } from '@/lib/tools';
import { getPdfToolSeoContent } from '@/lib/seo/pdfToolSeo';
import { convertViaBackend } from '@/lib/pdf/convertViaBackend';

export default function PdfToExcelClient() {
  const tool = getToolById('pdf-to-excel')!;
  const seoContent = getPdfToolSeoContent('pdf-to-excel');
  return (
    <ToolPage
      tool={tool}
      process={(files, _fields, onProgress) =>
        convertViaBackend(files[0], 'xlsx', onProgress)
      }
      seoContent={seoContent}
    />
  );
}
