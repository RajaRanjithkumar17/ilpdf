'use client';

import ToolPage from '@/components/ToolPage';
import { getToolById } from '@/lib/tools';
import { getPdfToolSeoContent } from '@/lib/seo/pdfToolSeo';
import { splitPdf } from '@/lib/pdf/split';

export default function SplitClient() {
  const tool = getToolById('split-pdf')!;
  const seoContent = getPdfToolSeoContent('split-pdf');
  return (
    <ToolPage
      tool={tool}
      process={(files, fields) =>
        splitPdf(
          files[0],
          parseInt(fields.fromPage, 10),
          parseInt(fields.toPage, 10)
        )
      }
      seoContent={seoContent}
    />
  );
}
