import { PDFDocument, rgb } from 'pdf-lib';
import { pdfBlob } from './utils';

export interface RedactionBox {
  /** 1-indexed page number */
  page: number;
  /** x position in PDF coordinate space (origin bottom-left) */
  x: number;
  /** y position in PDF coordinate space (origin bottom-left) */
  y: number;
  /** width in PDF points */
  width: number;
  /** height in PDF points */
  height: number;
}

export async function redactPdf(
  file: File,
  redactions: RedactionBox[],
): Promise<Blob> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const pdf = await PDFDocument.load(bytes);
  const pages = pdf.getPages();

  for (const box of redactions) {
    const pageIndex = box.page - 1;
    if (pageIndex < 0 || pageIndex >= pages.length) continue;

    const page = pages[pageIndex];
    page.drawRectangle({
      x: box.x,
      y: box.y,
      width: box.width,
      height: box.height,
      color: rgb(0, 0, 0),
    });
  }

  return pdfBlob(await pdf.save());
}
