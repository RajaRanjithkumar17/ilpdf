import type { Metadata } from 'next';
import { getPdfToolMetadata, getPdfToolJsonLd } from '@/lib/seo/pdfToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import DeletePagesClient from './DeletePagesClient';

export const metadata: Metadata = getPdfToolMetadata('delete-pdf-pages');

export default function DeletePagesPage() {
  const schemas = getPdfToolJsonLd('delete-pdf-pages');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <DeletePagesClient />
    </>
  );
}
