'use client';

import ToolPage from '@/components/ToolPage';
import { getToolById } from '@/lib/tools';
import { ocrPdf } from '@/lib/pdf/ocr';

export default function OcrClient() {
  const tool = getToolById('ocr-pdf')!;
  return (
    <ToolPage
      tool={tool}
      process={(files, _fields, onProgress) => ocrPdf(files[0], onProgress)}
    />
  );
}
