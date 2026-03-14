'use client';

import ToolPage from '@/components/ToolPage';
import { getToolById } from '@/lib/tools';
import { getPdfToolSeoContent } from '@/lib/seo/pdfToolSeo';
import { deletePagesPdf } from '@/lib/pdf/deletePages';

export default function DeletePagesClient() {
  const tool = getToolById('delete-pdf-pages')!;
  const seoContent = getPdfToolSeoContent('delete-pdf-pages');
  return (
    <ToolPage
      tool={tool}
      process={(files, fields) => deletePagesPdf(files[0], fields.pages)}
      seoContent={seoContent}
    />
  );
}
