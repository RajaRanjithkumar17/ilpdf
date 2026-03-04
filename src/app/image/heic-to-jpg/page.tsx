import type { Metadata } from 'next';
import { getImageToolMetadata, getImageToolJsonLd } from '@/lib/seo/imageToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import HeicToJpgClient from './HeicToJpgClient';

export const metadata: Metadata = getImageToolMetadata('heic-to-jpg');

export default function HeicToJpgPage() {
  const schemas = getImageToolJsonLd('heic-to-jpg');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <HeicToJpgClient />
    </>
  );
}
