/**
 * PDF conversion dispatcher — fully client-side (no backend API call).
 *
 * Previously this sent the file to a backend Express server.
 * Now it dispatches to browser-native service functions so the app
 * works without any server.
 *
 * Supported formats:
 *   'docx'  → pdfToWord    (src/lib/pdf/pdfToWord.ts)
 *   'txt'   → pdfToText    (src/lib/pdf/pdfToTextService.ts)
 *   'xlsx'  → pdfToExcel   (src/lib/pdf/pdfToExcelService.ts)
 *   'pptx'  → pdfToPpt     (src/lib/pdf/pdfToPptService.ts)
 */
import { pdfToWord } from './pdfToWord';
import { pdfToText } from './pdfToTextService';
import { pdfToExcel } from './pdfToExcelService';
import { pdfToPpt } from './pdfToPptService';

export async function convertViaBackend(
  file: File,
  format: string,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  switch (format) {
    case 'docx':
      return pdfToWord(file, onProgress);
    case 'txt':
      return pdfToText(file, onProgress);
    case 'xlsx':
      return pdfToExcel(file, onProgress);
    case 'pptx':
      return pdfToPpt(file, onProgress);
    default:
      throw new Error(`Unsupported conversion format: ${format}`);
  }
}
