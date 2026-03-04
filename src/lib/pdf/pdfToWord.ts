import { loadPdfJs } from './utils';

/**
 * Converts PDF to Word using pdfjs-dist text extraction.
 * Groups text items into lines by Y-position, detects alignment
 * (left / center / right) from X margins, and writes paragraphs
 * into a DOCX built with the `docx` package.
 */
export async function pdfToWord(
  file: File,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  const pdfjs = await loadPdfJs();

  const bytes = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjs.getDocument({ data: bytes }).promise;
  const totalPages = pdf.numPages;

  if (totalPages === 0) throw new Error('This PDF has no pages.');

  const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    PageBreak,
    HeadingLevel,
    AlignmentType,
  } = await import('docx');

  const allParagraphs: InstanceType<typeof Paragraph>[] = [];

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.0 });
    const pageWidth = viewport.width;
    const content = await page.getTextContent();

    type LineItem = {
      text: string;
      fontSize: number;
      x: number;
      width: number;
    };

    // ── Group text items by Y coordinate (round to 3pt to merge same line) ──
    const lineMap = new Map<number, LineItem[]>();

    for (const raw of content.items) {
      if (!('str' in raw) || !raw.str.trim()) continue;

      const item = raw as typeof raw & { width?: number };
      const t = (item as any).transform as number[];
      // Font size from the vertical scale component
      const fontSize = Math.round(Math.abs(t[3]) || Math.abs(t[0]) || 12);
      const x = t[4];
      const y = Math.round(t[5] / 3) * 3; // group items within ~3pt on same line
      const w = typeof item.width === 'number' ? item.width : 0;

      if (!lineMap.has(y)) lineMap.set(y, []);
      lineMap.get(y)!.push({ text: item.str, fontSize, x, width: w });
    }

    // ── Sort lines top-to-bottom (PDF Y: larger = closer to top) ──
    const sortedYs = Array.from(lineMap.keys()).sort((a, b) => b - a);

    for (const y of sortedYs) {
      const items = lineMap.get(y)!;

      // Sort items left-to-right within the line
      items.sort((a, b) => a.x - b.x);

      // Build text: insert a space when there is a visible gap between items
      let lineText = '';
      for (let i = 0; i < items.length; i++) {
        const cur = items[i];
        if (i === 0) {
          lineText += cur.text;
        } else {
          const prev = items[i - 1];
          const prevEnd = prev.x + prev.width;
          const gap = cur.x - prevEnd;
          const approxSpaceWidth = (prev.fontSize || 12) * 0.25;
          if (gap > approxSpaceWidth) lineText += ' ';
          lineText += cur.text;
        }
      }

      lineText = lineText.trim();
      if (!lineText) continue;

      // ── Detect alignment from left / right margins ──
      const leftX = items[0].x;
      const lastIt = items[items.length - 1];
      const rightX = lastIt.x + lastIt.width;
      const leftMargin = leftX;
      const rightMargin = pageWidth - rightX;

      let alignment: (typeof AlignmentType)[keyof typeof AlignmentType] =
        AlignmentType.LEFT;
      if (Math.abs(leftMargin - rightMargin) < pageWidth * 0.05) {
        // margins are nearly equal → centered
        alignment = AlignmentType.CENTER;
      } else if (rightMargin < leftMargin && rightMargin < pageWidth * 0.08) {
        // text is pushed right → right-aligned
        alignment = AlignmentType.RIGHT;
      }

      // ── Heading heuristic from font size ──
      const maxFontSize = Math.max(...items.map((i) => i.fontSize));
      let heading: (typeof HeadingLevel)[keyof typeof HeadingLevel] | undefined;
      if (maxFontSize >= 22) heading = HeadingLevel.HEADING_1;
      else if (maxFontSize >= 16) heading = HeadingLevel.HEADING_2;
      else if (maxFontSize >= 13) heading = HeadingLevel.HEADING_3;

      allParagraphs.push(
        new Paragraph({
          heading,
          alignment,
          spacing: { before: 60, after: 60 },
          children: [
            new TextRun({
              text: lineText,
              size: Math.round(maxFontSize * 2), // docx uses half-points
              bold: maxFontSize >= 13,
            }),
          ],
        })
      );
    }

    // Page break between pages (not after last)
    if (pageNum < totalPages) {
      allParagraphs.push(new Paragraph({ children: [new PageBreak()] }));
    }

    onProgress?.(Math.round((pageNum / totalPages) * 100));
  }

  pdf.destroy();

  if (allParagraphs.length === 0) {
    throw new Error(
      'No text found in this PDF. It may be a scanned document — try a different tool.'
    );
  }

  const doc = new Document({
    sections: [{ children: allParagraphs }],
  });

  return Packer.toBlob(doc);
}
