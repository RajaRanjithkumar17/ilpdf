import type { Metadata } from 'next';
import { getPdfToolMetadata, getPdfToolJsonLd } from '@/lib/seo/pdfToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import PdfToJpgClient from './PdfToJpgClient';

export const metadata: Metadata = getPdfToolMetadata('pdf-to-jpg');

export default function PdfToJpgPage() {
  const schemas = getPdfToolJsonLd('pdf-to-jpg');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <PdfToJpgClient />
    </>
  );
}
