import type { Metadata } from 'next';
import { getPdfToolMetadata, getPdfToolJsonLd } from '@/lib/seo/pdfToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import SplitClient from './SplitClient';

export const metadata: Metadata = getPdfToolMetadata('split-pdf');

export default function SplitPage() {
  const schemas = getPdfToolJsonLd('split-pdf');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <SplitClient />
    </>
  );
}
