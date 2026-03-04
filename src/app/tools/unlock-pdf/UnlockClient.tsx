'use client';

import ToolPage from '@/components/ToolPage';
import { getToolById } from '@/lib/tools';
import { unlockPdf } from '@/lib/pdf/unlock';

export default function UnlockClient() {
  const tool = getToolById('unlock-pdf')!;
  return (
    <ToolPage
      tool={tool}
      process={(files, fields) => unlockPdf(files[0], fields.password)}
    />
  );
}
