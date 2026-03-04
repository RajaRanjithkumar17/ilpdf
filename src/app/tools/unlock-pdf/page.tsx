import type { Metadata } from 'next';
import { getPdfToolMetadata, getPdfToolJsonLd } from '@/lib/seo/pdfToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import UnlockClient from './UnlockClient';

export const metadata: Metadata = getPdfToolMetadata('unlock-pdf');

export default function UnlockPage() {
  const schemas = getPdfToolJsonLd('unlock-pdf');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <UnlockClient />
    </>
  );
}
