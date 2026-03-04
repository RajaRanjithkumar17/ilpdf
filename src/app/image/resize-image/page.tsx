import type { Metadata } from 'next';
import { getImageToolMetadata, getImageToolJsonLd } from '@/lib/seo/imageToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import ResizeClient from './ResizeClient';

export const metadata: Metadata = getImageToolMetadata('resize-image');

export default function ResizePage() {
  const schemas = getImageToolJsonLd('resize-image');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <ResizeClient />
    </>
  );
}
