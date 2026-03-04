/**
 * Browser-compatible PDF → TXT conversion.
 * Migrated from backend/src/services/pdfToTextService.js
 *
 * Changes from the backend version:
 *  - Accepts a File instead of a file-system path (no fs module in browser)
 *  - Uses pdfjs-dist for text extraction instead of pdf-parse (Node-only)
 *  - Returns a Blob instead of writing to an output path
 */
import { loadPdfJs } from './utils';

export async function pdfToText(
  file: File,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  try {
    const pdfjs = await loadPdfJs();
    const bytes = new Uint8Array(await file.arrayBuffer());
    const pdf = await pdfjs.getDocument({ data: bytes }).promise;

    let text = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();

      // Replicate extractPdfText: join all string items with spaces
      const pageText = content.items
        .filter((item): item is typeof item & { str: string } => 'str' in item)
        .map((item) => (item as any).str as string)
        .join(' ');

      text += pageText + '\n';
      onProgress?.(Math.round((pageNum / pdf.numPages) * 100));
    }

    pdf.destroy();

    // Return Blob equivalent of fs.writeFileSync(outputFilePath, text, 'utf-8')
    return new Blob([text], { type: 'text/plain' });
  } catch (error) {
    throw new Error(
      `Failed to convert PDF to Text: ${(error as Error).message}`
    );
  }
}
