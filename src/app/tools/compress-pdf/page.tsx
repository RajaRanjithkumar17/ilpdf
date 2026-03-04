import type { Metadata } from 'next';
import { getPdfToolMetadata, getPdfToolJsonLd } from '@/lib/seo/pdfToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import CompressClient from './CompressClient';

export const metadata: Metadata = getPdfToolMetadata('compress-pdf');

export default function CompressPage() {
  const schemas = getPdfToolJsonLd('compress-pdf');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <CompressClient />
    </>
  );
}
