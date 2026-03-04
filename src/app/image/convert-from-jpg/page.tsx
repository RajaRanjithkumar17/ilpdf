import type { Metadata } from 'next';
import { getImageToolMetadata, getImageToolJsonLd } from '@/lib/seo/imageToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import ConvertFromJpgClient from './ConvertFromJpgClient';

export const metadata: Metadata = getImageToolMetadata('convert-from-jpg');

export default function ConvertFromJpgPage() {
  const schemas = getImageToolJsonLd('convert-from-jpg');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <ConvertFromJpgClient />
    </>
  );
}
