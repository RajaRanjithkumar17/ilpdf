/**
 * Browser-compatible PDF → PPTX conversion.
 * Migrated from backend/src/services/pdfToPptService.js
 *
 * Changes from the backend version:
 *  - Accepts a File instead of a file-system path (no fs module in browser)
 *  - Uses pdfjs-dist for text extraction instead of pdf-parse (Node-only)
 *  - Returns a Blob instead of writing via pres.writeFile() (Node-only)
 *    (uses pres.write('arraybuffer') which works in both browser and Node)
 */
import { loadPdfJs } from './utils';

export async function pdfToPpt(
  file: File,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  try {
    // --- Extract text using pdfjs-dist (replaces extractPdfText / pdf-parse) ---
    const pdfjs = await loadPdfJs();
    const bytes = new Uint8Array(await file.arrayBuffer());
    const pdf = await pdfjs.getDocument({ data: bytes }).promise;

    let text = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();

      const pageText = content.items
        .filter((item): item is typeof item & { str: string } => 'str' in item)
        .map((item) => (item as any).str as string)
        .join(' ');

      text += pageText + '\n';
      onProgress?.(Math.round((pageNum / pdf.numPages) * 50));
    }

    pdf.destroy();

    // --- Same slide-building logic as backend pdfToPptService.js ---
    const PptxGenJs = (await import('pptxgenjs')).default;
    const pres = new PptxGenJs();
    pres.defineLayout({ name: 'LAYOUT1', master: 'MASTER1' } as any);

    // Split text into chunks (~500 characters per slide)
    const chunkSize = 500;
    const chunks: string[] = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.substring(i, i + chunkSize));
    }

    // If no chunks, create a blank slide
    if (chunks.length === 0) {
      chunks.push('Empty PDF');
    }

    // Create slides
    chunks.forEach((chunk, index) => {
      const slide = pres.addSlide();

      // Add title
      slide.addText(`Slide ${index + 1}`, {
        x: 0.5,
        y: 0.3,
        w: 9,
        h: 0.5,
        fontSize: 24,
        bold: true,
        color: '003366',
      });

      // Add content
      slide.addText(chunk, {
        x: 0.5,
        y: 1.0,
        w: 9,
        h: 5.5,
        fontSize: 12,
        color: '333333',
        wrap: true,
        valign: 'top',
      });

      // Add footer
      slide.addText(`Page ${index + 1} of ${chunks.length}`, {
        x: 0.5,
        y: 6.5,
        w: 9,
        h: 0.3,
        fontSize: 10,
        color: '999999',
        align: 'right',
      });
    });

    // Return as Blob (browser-compatible replacement for pres.writeFile())
    const data = (await pres.write({
      outputType: 'arraybuffer',
    })) as ArrayBuffer;
    onProgress?.(100);

    return new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    });
  } catch (error) {
    throw new Error(
      `Failed to convert PDF to PowerPoint: ${(error as Error).message}`
    );
  }
}
