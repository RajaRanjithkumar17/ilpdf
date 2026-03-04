import type { Metadata } from 'next';
import { getImageToolMetadata, getImageToolJsonLd } from '@/lib/seo/imageToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import BlurFaceClient from './BlurFaceClient';

export const metadata: Metadata = getImageToolMetadata('blur-face');

export default function BlurFacePage() {
  const schemas = getImageToolJsonLd('blur-face');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <BlurFaceClient />
    </>
  );
}
