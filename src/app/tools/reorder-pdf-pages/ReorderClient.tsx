'use client';

import ToolPage from '@/components/ToolPage';
import { getToolById } from '@/lib/tools';
import { getPdfToolSeoContent } from '@/lib/seo/pdfToolSeo';
import { reorderPdf } from '@/lib/pdf/reorder';

export default function ReorderClient() {
  const tool = getToolById('reorder-pdf-pages')!;
  const seoContent = getPdfToolSeoContent('reorder-pdf-pages');
  return (
    <ToolPage
      tool={tool}
      process={(files, fields) => reorderPdf(files[0], fields.pageOrder)}
      seoContent={seoContent}
    />
  );
}
