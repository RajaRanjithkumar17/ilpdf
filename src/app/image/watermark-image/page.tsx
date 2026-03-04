import type { Metadata } from 'next';
import { getImageToolMetadata, getImageToolJsonLd } from '@/lib/seo/imageToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import WatermarkClient from './WatermarkClient';

export const metadata: Metadata = getImageToolMetadata('watermark-image');

export default function WatermarkPage() {
  const schemas = getImageToolJsonLd('watermark-image');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <WatermarkClient />
    </>
  );
}
