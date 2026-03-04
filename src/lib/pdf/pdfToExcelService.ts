/**
 * Browser-compatible PDF → XLSX conversion with table detection.
 *
 * Uses pdfjs-dist text item positions (x, y coordinates) to:
 * 1. Group text items into rows by Y position
 * 2. Detect separate table groups by vertical gaps & column structure
 * 3. Create a separate Excel sheet for each detected table
 * 4. Merge tables that span across pages (same column structure)
 */
import { loadPdfJs } from './utils';

interface TextItem {
  str: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface RowData {
  items: TextItem[];
  y: number; // representative Y of the row
}

interface TableGroup {
  rows: string[][];
  colCount: number;
}

/* ── Row grouping by Y coordinate ── */

function groupIntoRows(items: TextItem[], tolerance: number): RowData[] {
  if (items.length === 0) return [];

  const sorted = [...items].sort((a, b) => b.y - a.y);

  const rows: RowData[] = [];
  let currentItems: TextItem[] = [sorted[0]];
  let currentY = sorted[0].y;

  for (let i = 1; i < sorted.length; i++) {
    if (Math.abs(sorted[i].y - currentY) <= tolerance) {
      currentItems.push(sorted[i]);
    } else {
      currentItems.sort((a, b) => a.x - b.x);
      rows.push({ items: currentItems, y: currentY });
      currentItems = [sorted[i]];
      currentY = sorted[i].y;
    }
  }
  currentItems.sort((a, b) => a.x - b.x);
  rows.push({ items: currentItems, y: currentY });

  return rows;
}

/* ── Split rows into table groups using vertical gaps ── */

function splitIntoTableGroups(
  rows: RowData[],
  medianHeight: number
): RowData[][] {
  if (rows.length === 0) return [];

  // Compute gaps between consecutive rows
  const gaps: number[] = [];
  for (let i = 1; i < rows.length; i++) {
    gaps.push(Math.abs(rows[i - 1].y - rows[i].y));
  }

  // A gap > 2.5x the median line height indicates a table boundary
  const gapThreshold = medianHeight * 2.5;

  const groups: RowData[][] = [];
  let current: RowData[] = [rows[0]];

  for (let i = 1; i < rows.length; i++) {
    if (gaps[i - 1] > gapThreshold) {
      groups.push(current);
      current = [rows[i]];
    } else {
      current.push(rows[i]);
    }
  }
  groups.push(current);

  return groups;
}

/* ── Column detection ── */

function detectColumns(rows: RowData[], tolerance: number): number[] {
  const allX: number[] = [];
  for (const row of rows) {
    for (const item of row.items) {
      allX.push(item.x);
    }
  }
  allX.sort((a, b) => a - b);
  if (allX.length === 0) return [];

  const clusters: number[][] = [[allX[0]]];
  for (let i = 1; i < allX.length; i++) {
    const lastCluster = clusters[clusters.length - 1];
    const lastVal = lastCluster[lastCluster.length - 1];
    if (allX[i] - lastVal <= tolerance) {
      lastCluster.push(allX[i]);
    } else {
      clusters.push([allX[i]]);
    }
  }

  return clusters.map((c) => Math.min(...c));
}

function assignColumn(x: number, colBoundaries: number[]): number {
  for (let i = colBoundaries.length - 1; i >= 0; i--) {
    if (x >= colBoundaries[i] - 5) return i;
  }
  return 0;
}

/* ── Build string rows from text items ── */

function buildRowArrays(
  rows: RowData[],
  colBoundaries: number[]
): string[][] {
  const result: string[][] = [];

  for (const row of rows) {
    const colTexts = new Map<number, string>();
    for (const item of row.items) {
      if (!item.str.trim()) continue;
      const col = assignColumn(item.x, colBoundaries);
      const existing = colTexts.get(col);
      if (existing !== undefined) {
        colTexts.set(col, existing + ' ' + item.str.trim());
      } else {
        colTexts.set(col, item.str.trim());
      }
    }
    const rowArr: string[] = new Array(colBoundaries.length).fill('');
    for (const [col, text] of colTexts) {
      if (col < rowArr.length) rowArr[col] = text;
    }
    if (rowArr.some((cell) => cell !== '')) {
      result.push(rowArr);
    }
  }

  return result;
}

/* ── Main export ── */

export async function pdfToExcel(
  file: File,
  onProgress?: (percent: number) => void
): Promise<Blob> {
  try {
    const pdfjs = await loadPdfJs();
    const bytes = new Uint8Array(await file.arrayBuffer());
    const pdf = await pdfjs.getDocument({ data: bytes }).promise;

    // Collected tables: each entry = { colCount, rows[][] }
    // Tables with same colCount from consecutive pages get merged.
    const tables: TableGroup[] = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const viewport = page.getViewport({ scale: 1 });

      const items: TextItem[] = [];
      for (const rawItem of content.items) {
        if (!('str' in rawItem)) continue;
        const item = rawItem as any;
        if (!item.str || item.str.trim() === '') continue;
        items.push({
          str: item.str,
          x: item.transform[4] as number,
          y: item.transform[5] as number,
          width: item.width as number,
          height: item.height as number,
        });
      }

      if (items.length === 0) {
        onProgress?.(Math.round((pageNum / pdf.numPages) * 90));
        continue;
      }

      const heights = items.map((it) => it.height).sort((a, b) => a - b);
      const medianHeight = heights[Math.floor(heights.length / 2)] || 10;
      const rowTolerance = medianHeight * 0.5;
      const colTolerance = viewport.width * 0.015;

      const allRows = groupIntoRows(items, rowTolerance);
      const groups = splitIntoTableGroups(allRows, medianHeight);

      for (const groupRows of groups) {
        if (groupRows.length === 0) continue;

        const colBoundaries = detectColumns(groupRows, colTolerance);
        const colCount = colBoundaries.length;
        const stringRows = buildRowArrays(groupRows, colBoundaries);
        if (stringRows.length === 0) continue;

        // Try to merge with last table if same column count (continuation)
        const lastTable = tables[tables.length - 1];
        if (lastTable && lastTable.colCount === colCount && colCount >= 3) {
          // Same structured table continuing on next page — merge rows
          lastTable.rows.push(...stringRows);
        } else {
          tables.push({ rows: stringRows, colCount });
        }
      }

      onProgress?.(Math.round((pageNum / pdf.numPages) * 90));
    }

    pdf.destroy();

    // Build workbook with one sheet per table
    const XLSX = await import('xlsx');
    const workbook = XLSX.utils.book_new();

    if (tables.length === 0) {
      const ws = XLSX.utils.aoa_to_sheet([
        ['Content'],
        ['No data extracted from PDF'],
      ]);
      XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    } else {
      const usedNames = new Set<string>();

      for (let t = 0; t < tables.length; t++) {
        const table = tables[t];
        const rows = table.rows;
        const colCount = table.colCount;

        // Normalize row lengths
        for (const row of rows) {
          while (row.length < colCount) row.push('');
        }

        // Trim empty trailing columns
        let cols = colCount;
        while (cols > 0 && rows.every((row) => row[cols - 1] === '')) {
          for (const row of rows) row.pop();
          cols--;
        }

        if (rows.length === 0 || cols === 0) continue;

        // Generate sheet name — try to use first cell content as hint
        let sheetName: string;
        if (tables.length === 1) {
          sheetName = 'Table 1';
        } else {
          // Use first non-empty cell from first row as a name hint
          const hint = rows[0].find((c) => c.trim())?.trim() || '';
          const cleanHint = hint
            .replace(/[\\/*?:\[\]]/g, '')
            .substring(0, 20)
            .trim();
          sheetName = cleanHint || `Table ${t + 1}`;
        }

        // Ensure unique name (Excel max 31 chars)
        let finalName = sheetName.substring(0, 31);
        let counter = 2;
        while (usedNames.has(finalName)) {
          finalName = `${sheetName.substring(0, 27)} (${counter})`;
          counter++;
        }
        usedNames.add(finalName);

        const worksheet = XLSX.utils.aoa_to_sheet(rows);

        // Auto-size columns
        const colWidths: number[] = [];
        for (let c = 0; c < cols; c++) {
          let max = 8;
          for (const row of rows) {
            if (row[c]) max = Math.max(max, row[c].length);
          }
          colWidths.push(Math.min(max + 2, 50));
        }
        worksheet['!cols'] = colWidths.map((w) => ({ wch: w }));

        XLSX.utils.book_append_sheet(workbook, worksheet, finalName);
      }
    }

    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    onProgress?.(100);

    return new Blob([wbout], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
  } catch (error) {
    throw new Error(
      `Failed to convert PDF to Excel: ${(error as Error).message}`
    );
  }
}
