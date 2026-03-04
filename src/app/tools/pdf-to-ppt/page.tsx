import type { Metadata } from 'next';
import { getPdfToolMetadata, getPdfToolJsonLd } from '@/lib/seo/pdfToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import PdfToPptClient from './PdfToPptClient';

export const metadata: Metadata = getPdfToolMetadata('pdf-to-ppt');

export default function PdfToPptPage() {
  const schemas = getPdfToolJsonLd('pdf-to-ppt');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <PdfToPptClient />
    </>
  );
}
