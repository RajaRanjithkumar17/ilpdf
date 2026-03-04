import type { Metadata } from 'next';
import { getImageToolMetadata, getImageToolJsonLd } from '@/lib/seo/imageToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import CropClient from './CropClient';

export const metadata: Metadata = getImageToolMetadata('crop-image');

export default function CropPage() {
  const schemas = getImageToolJsonLd('crop-image');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <CropClient />
    </>
  );
}
