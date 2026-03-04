import type { Metadata } from 'next';
import { getPdfToolMetadata, getPdfToolJsonLd } from '@/lib/seo/pdfToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import RotateClient from './RotateClient';

export const metadata: Metadata = getPdfToolMetadata('rotate-pdf');

export default function RotatePage() {
  const schemas = getPdfToolJsonLd('rotate-pdf');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <RotateClient />
    </>
  );
}
