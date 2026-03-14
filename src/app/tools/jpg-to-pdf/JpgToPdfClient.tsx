'use client';

import ToolPage from '@/components/ToolPage';
import { getToolById } from '@/lib/tools';
import { getPdfToolSeoContent } from '@/lib/seo/pdfToolSeo';
import { jpgToPdf } from '@/lib/pdf/jpgToPdf';

export default function JpgToPdfClient() {
  const tool = getToolById('jpg-to-pdf')!;
  const seoContent = getPdfToolSeoContent('jpg-to-pdf');
  return <ToolPage tool={tool} process={(files) => jpgToPdf(files)} seoContent={seoContent} />;
}
