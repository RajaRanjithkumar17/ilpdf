import type { Metadata } from 'next';
import { getPdfToolMetadata, getPdfToolJsonLd } from '@/lib/seo/pdfToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import JpgToPdfClient from './JpgToPdfClient';

export const metadata: Metadata = getPdfToolMetadata('jpg-to-pdf');

export default function JpgToPdfPage() {
  const schemas = getPdfToolJsonLd('jpg-to-pdf');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <JpgToPdfClient />
    </>
  );
}
