import type { Metadata } from 'next';
import { getImageToolMetadata, getImageToolJsonLd } from '@/lib/seo/imageToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import CompressClient from './CompressClient';

export const metadata: Metadata = getImageToolMetadata('compress-image');

export default function CompressPage() {
  const schemas = getImageToolJsonLd('compress-image');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <CompressClient />
    </>
  );
}
