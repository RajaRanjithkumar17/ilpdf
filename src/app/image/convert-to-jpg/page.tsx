import type { Metadata } from 'next';
import { getImageToolMetadata, getImageToolJsonLd } from '@/lib/seo/imageToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import ConvertToJpgClient from './ConvertToJpgClient';

export const metadata: Metadata = getImageToolMetadata('convert-to-jpg');

export default function ConvertToJpgPage() {
  const schemas = getImageToolJsonLd('convert-to-jpg');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <ConvertToJpgClient />
    </>
  );
}
