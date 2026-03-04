import type { Metadata } from 'next';
import { getImageToolMetadata, getImageToolJsonLd } from '@/lib/seo/imageToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import WebpToJpgClient from './WebpToJpgClient';

export const metadata: Metadata = getImageToolMetadata('webp-to-jpg');

export default function WebpToJpgPage() {
  const schemas = getImageToolJsonLd('webp-to-jpg');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <WebpToJpgClient />
    </>
  );
}
