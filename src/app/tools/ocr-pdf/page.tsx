import type { Metadata } from 'next';
import { getPdfToolMetadata, getPdfToolJsonLd } from '@/lib/seo/pdfToolSeo';
import { JsonLdScripts } from '@/components/JsonLd';
import OcrClient from './OcrClient';

export const metadata: Metadata = getPdfToolMetadata('ocr-pdf');

export default function OCRPage() {
  const schemas = getPdfToolJsonLd('ocr-pdf');
  return (
    <>
      <JsonLdScripts schemas={schemas} />
      <OcrClient />
    </>
  );
}
