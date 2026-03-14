'use client';

import ToolPage from '@/components/ToolPage';
import { getToolById } from '@/lib/tools';
import { getPdfToolSeoContent } from '@/lib/seo/pdfToolSeo';
import { protectPdf } from '@/lib/pdf/protect';

export default function ProtectClient() {
  const tool = getToolById('protect-pdf')!;
  const seoContent = getPdfToolSeoContent('protect-pdf');
  return (
    <ToolPage
      tool={tool}
      process={(files, fields) => protectPdf(files[0], fields.password)}
      seoContent={seoContent}
    />
  );
}
