'use client';

import ToolPage from '@/components/ToolPage';
import { getToolById } from '@/lib/tools';
import { getPdfToolSeoContent } from '@/lib/seo/pdfToolSeo';
import { unlockPdf } from '@/lib/pdf/unlock';

export default function UnlockClient() {
  const tool = getToolById('unlock-pdf')!;
  const seoContent = getPdfToolSeoContent('unlock-pdf');
  return (
    <ToolPage
      tool={tool}
      process={(files, fields) => unlockPdf(files[0], fields.password)}
      seoContent={seoContent}
    />
  );
}
