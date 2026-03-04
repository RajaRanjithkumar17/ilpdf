import type { Metadata } from 'next';
import { getImageToolMetadata, getImageToolJsonLd } from '@/lib/seo/imageToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import UpscaleClient from './UpscaleClient';

export const metadata: Metadata = getImageToolMetadata('upscale-image');

export default function UpscalePage() {
  const schemas = getImageToolJsonLd('upscale-image');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <UpscaleClient />
    </>
  );
}
