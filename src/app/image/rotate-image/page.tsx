import type { Metadata } from 'next';
import { getImageToolMetadata, getImageToolJsonLd } from '@/lib/seo/imageToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import RotateClient from './RotateClient';

export const metadata: Metadata = getImageToolMetadata('rotate-image');

export default function RotatePage() {
  const schemas = getImageToolJsonLd('rotate-image');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <RotateClient />
    </>
  );
}
