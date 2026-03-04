import type { Metadata } from 'next';
import { getPdfToolMetadata, getPdfToolJsonLd } from '@/lib/seo/pdfToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import PdfToExcelClient from './PdfToExcelClient';

export const metadata: Metadata = getPdfToolMetadata('pdf-to-excel');

export default function PdfToExcelPage() {
  const schemas = getPdfToolJsonLd('pdf-to-excel');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <PdfToExcelClient />
    </>
  );
}
