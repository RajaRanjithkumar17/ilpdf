import type { Metadata } from 'next';
import { getPdfToolMetadata, getPdfToolJsonLd } from '@/lib/seo/pdfToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import PdfToWordClient from './PdfToWordClient';

export const metadata: Metadata = getPdfToolMetadata('pdf-to-word');

export default function PdfToWordPage() {
  const schemas = getPdfToolJsonLd('pdf-to-word');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <PdfToWordClient />
    </>
  );
}
