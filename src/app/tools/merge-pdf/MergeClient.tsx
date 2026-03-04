'use client';

import ToolPage from '@/components/ToolPage';
import { getToolById } from '@/lib/tools';
import { mergePdfs } from '@/lib/pdf/merge';

export default function MergeClient() {
  const tool = getToolById('merge-pdf')!;
  return <ToolPage tool={tool} process={(files) => mergePdfs(files)} />;
}
