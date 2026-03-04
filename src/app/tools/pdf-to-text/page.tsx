import type { Metadata } from 'next';
import { getPdfToolMetadata, getPdfToolJsonLd } from '@/lib/seo/pdfToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import PdfToTextClient from './PdfToTextClient';

export const metadata: Metadata = getPdfToolMetadata('pdf-to-text');

export default function PdfToTextPage() {
  const schemas = getPdfToolJsonLd('pdf-to-text');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <PdfToTextClient />
    </>
  );
}
