'use client';

import ToolPage from '@/components/ToolPage';
import { getToolById } from '@/lib/tools';
import { getPdfToolSeoContent } from '@/lib/seo/pdfToolSeo';
import { rotatePdf } from '@/lib/pdf/rotate';

export default function RotateClient() {
  const tool = getToolById('rotate-pdf')!;
  const seoContent = getPdfToolSeoContent('rotate-pdf');
  return (
    <ToolPage
      tool={tool}
      process={(files, fields) => rotatePdf(files[0], fields.angle)}
      seoContent={seoContent}
    />
  );
}
