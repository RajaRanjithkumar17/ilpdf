import type { Metadata } from 'next';
import { getPdfToolMetadata, getPdfToolJsonLd } from '@/lib/seo/pdfToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import RedactClient from './RedactClient';

export const metadata: Metadata = getPdfToolMetadata('redact-pdf');

export default function RedactPage() {
  const schemas = getPdfToolJsonLd('redact-pdf');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <RedactClient />
    </>
  );
}
