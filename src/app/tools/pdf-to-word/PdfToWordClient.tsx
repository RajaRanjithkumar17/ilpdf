'use client';

import ToolPage from '@/components/ToolPage';
import { getToolById } from '@/lib/tools';
import { getPdfToolSeoContent } from '@/lib/seo/pdfToolSeo';
import { convertViaBackend } from '@/lib/pdf/convertViaBackend';

export default function PdfToWordClient() {
  const tool = getToolById('pdf-to-word')!;
  const seoContent = getPdfToolSeoContent('pdf-to-word');
  return (
    <ToolPage
      tool={tool}
      process={(files, _fields, onProgress) =>
        convertViaBackend(files[0], 'docx', onProgress)
      }
      seoContent={seoContent}
    />
  );
}
