'use client';

import ToolPage from '@/components/ToolPage';
import { getToolById } from '@/lib/tools';
import { watermarkPdf } from '@/lib/pdf/watermark';

export default function WatermarkClient() {
  const tool = getToolById('watermark-pdf')!;
  return (
    <ToolPage
      tool={tool}
      process={(files, fields) => watermarkPdf(files[0], fields.text)}
    />
  );
}
