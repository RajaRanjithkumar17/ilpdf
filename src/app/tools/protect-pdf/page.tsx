import type { Metadata } from 'next';
import { getPdfToolMetadata, getPdfToolJsonLd } from '@/lib/seo/pdfToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import ProtectClient from './ProtectClient';

export const metadata: Metadata = getPdfToolMetadata('protect-pdf');

export default function ProtectPage() {
  const schemas = getPdfToolJsonLd('protect-pdf');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <ProtectClient />
    </>
  );
}
