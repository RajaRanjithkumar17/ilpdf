import type { Metadata } from 'next';
import { getPdfToolMetadata, getPdfToolJsonLd } from '@/lib/seo/pdfToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import ReorderClient from './ReorderClient';

export const metadata: Metadata = getPdfToolMetadata('reorder-pdf-pages');

export default function ReorderPage() {
  const schemas = getPdfToolJsonLd('reorder-pdf-pages');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <ReorderClient />
    </>
  );
}
