import type { Metadata } from 'next';
import { getPdfToolMetadata, getPdfToolJsonLd } from '@/lib/seo/pdfToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import WatermarkClient from './WatermarkClient';

export const metadata: Metadata = getPdfToolMetadata('watermark-pdf');

export default function WatermarkPage() {
  const schemas = getPdfToolJsonLd('watermark-pdf');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <WatermarkClient />
    </>
  );
}
