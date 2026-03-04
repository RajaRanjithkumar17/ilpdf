'use client';

import ToolPage from '@/components/ToolPage';
import { getToolById } from '@/lib/tools';
import { convertViaBackend } from '@/lib/pdf/convertViaBackend';

export default function PdfToTextClient() {
  const tool = getToolById('pdf-to-text')!;
  return (
    <ToolPage
      tool={tool}
      process={(files, _fields, onProgress) =>
        convertViaBackend(files[0], 'txt', onProgress)
      }
    />
  );
}
