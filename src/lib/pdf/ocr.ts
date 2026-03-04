import { createWorker, PSM } from 'tesseract.js';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { loadPdfJs, renderPageToCanvas, pdfBlob } from './utils';

export async function ocrPdf(
  file: File,
  onProgress?: (percent: number) => void,
): Promise<Blob> {
  const pdfjs = await loadPdfJs();
  const bytes = new Uint8Array(await file.arrayBuffer());
  const srcDoc = await pdfjs.getDocument({ data: bytes }).promise;
  const numPages = srcDoc.numPages;

  // Create output PDF
  const outPdf = await PDFDocument.create();
  const font = await outPdf.embedFont(StandardFonts.Helvetica);

  // Create Tesseract worker
  const worker = await createWorker('eng');
  await worker.setParameters({ tessedit_pageseg_mode: PSM.AUTO });

  const renderScale = 2.0; // higher resolution for better OCR

  for (let i = 1; i <= numPages; i++) {
    onProgress?.(Math.round(((i - 1) / numPages) * 100));

    // Render page to canvas
    const canvas = await renderPageToCanvas(srcDoc, i, renderScale);

    // Get original page dimensions (in PDF points)
    const srcPage = await srcDoc.getPage(i);
    const viewport = srcPage.getViewport({ scale: 1.0 });
    const pageWidth = viewport.width;
    const pageHeight = viewport.height;

    // Embed the page image into the new PDF
    const imgDataUrl = canvas.toDataURL('image/jpeg', 0.92);
    const imgBase64 = imgDataUrl.split(',')[1];
    const imgBytes = Uint8Array.from(atob(imgBase64), c => c.charCodeAt(0));
    const jpgImage = await outPdf.embedJpg(imgBytes);

    const page = outPdf.addPage([pageWidth, pageHeight]);

    // Draw the original page as a background image
    page.drawImage(jpgImage, {
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight,
    });

    // Run OCR on the canvas
    const { data } = await worker.recognize(canvas);

    // Collect all words: blocks → paragraphs → lines → words
    const allWords: { text: string; bbox: { x0: number; y0: number; x1: number; y1: number } }[] = [];
    for (const block of data.blocks ?? []) {
      for (const para of block.paragraphs) {
        for (const line of para.lines) {
          for (const w of line.words) {
            allWords.push(w);
          }
        }
      }
    }

    // Overlay nearly-invisible text for each recognized word
    // This makes the PDF searchable and text-selectable
    for (const word of allWords) {
      const { bbox, text: wordText } = word;
      if (!wordText.trim()) continue;

      // Convert Tesseract coordinates (top-left origin, at renderScale)
      // to PDF coordinates (bottom-left origin, at scale 1.0)
      const x = bbox.x0 / renderScale;
      const h = (bbox.y1 - bbox.y0) / renderScale;
      const y = pageHeight - (bbox.y0 / renderScale) - h;

      // Size the font to roughly fit the bounding box height
      const fontSize = Math.max(4, h * 0.85);

      page.drawText(wordText, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
        opacity: 0.01,
      });
    }
  }

  await worker.terminate();
  srcDoc.destroy();

  onProgress?.(100);
  return pdfBlob(await outPdf.save());
}
