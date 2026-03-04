import type { Metadata } from 'next';
import { getPdfToolMetadata, getPdfToolJsonLd } from '@/lib/seo/pdfToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import MergeClient from './MergeClient';

export const metadata: Metadata = getPdfToolMetadata('merge-pdf');

export default function MergePage() {
  const schemas = getPdfToolJsonLd('merge-pdf');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <MergeClient />
    </>
  );
}
