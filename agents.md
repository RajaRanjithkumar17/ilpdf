# agents.md — Detailed Architecture Reference

## File-by-File Reference

### Tool Registries

#### `src/lib/tools.ts`
- Exports `Tool` and `ToolField` interfaces (shared by PDF and image tools)
- Exports `tools: Tool[]` — array of 17 PDF tool definitions
- Exports `getToolById(id: string): Tool | undefined`
- Each tool has: id, name, description, href, color, icon (SVG string), acceptTypes, multiple, optional fields

#### `src/lib/imageTools.ts`
- Exports `imageTools: Tool[]` — array of 11 image tool definitions
- Exports `getImageToolById(id: string): Tool | undefined`
- Image tool IDs: compress-image, resize-image, crop-image, convert-to-jpg, convert-from-jpg, webp-to-jpg, heic-to-jpg, upscale-image, watermark-image, rotate-image, blur-face

### PDF Tool IDs (17 total)
merge-pdf, split-pdf, compress-pdf, jpg-to-pdf, pdf-to-jpg, pdf-to-word, pdf-to-excel, pdf-to-ppt, pdf-to-text, rotate-pdf, watermark-pdf, delete-pdf-pages, reorder-pdf-pages, protect-pdf, unlock-pdf, ocr-pdf, redact-pdf

### Reusable Components

#### `src/components/ToolPage.tsx`
- Props: `toolId: string`, `processFn: (files, fields, onProgress) => Promise<Blob>`
- Stages: upload → processing → done → error
- Features: drag & drop upload, field rendering (text/select/number/password/range), progress bar, download button
- Looks up tool config via `getToolById(toolId)` from `lib/tools.ts`

#### `src/components/ImageToolPage.tsx`
- Props: `toolId: string`, `processFn: (files, fields, onProgress) => Promise<Blob>`
- Same stage pattern as ToolPage but for image tools
- Extra features: required field validation, auto-fill width/height from image dimensions
- Has `getOutputFileName(toolId, originalName)` helper for download filenames
- Looks up tool config via `getImageToolById(toolId)` from `lib/imageTools.ts`

#### `src/components/Header.tsx`
- Responsive header with mega dropdown menu
- Two sections in mega menu: PDF TOOLS and IMAGE TOOLS
- PDF tools link to `/tools/<id>`, Image tools link to `/image/<id>`
- Hardcoded tool links — must be updated manually when adding/removing tools

#### `src/components/ToolGrid.tsx`
- Grid display of PDF tools grouped by category
- Categories: Most Popular, Convert, Organize, Security
- Used on PDF homepage (`app/page.tsx`) only

#### `src/components/ToolCard.tsx`
- Individual tool card with icon, name, description
- Accepts a `Tool` object as prop

### Layout & Pages

#### `src/app/layout.tsx`
- Root layout with `<Header />` and footer
- Footer has 5-column grid: PDF Tools (col 1-2), Image Tools (col 3), Company, Legal
- Hardcoded footer links — must be updated when adding/removing tools

#### `src/app/page.tsx`
- PDF homepage at `/`
- Hero section, ToolGrid, stats, trust banner, FAQ, CTA
- Imports only `tools` from `lib/tools.ts` (PDF only)

#### `src/app/image/page.tsx`
- Image homepage at `/image`
- Green accent color (vs red for PDF homepage)
- Displays all image tools in a grid
- Imports `imageTools` from `lib/imageTools.ts`

#### `src/app/sitemap.ts`
- Dynamic sitemap generation
- Includes: `/`, `/image`, all PDF tool URLs, all image tool URLs
- Auto-generates from `tools` and `imageTools` arrays

### Processor Files

#### PDF Processors (`src/lib/pdf/`)
| File | Purpose |
|------|---------|
| merge.ts | Merge multiple PDFs into one |
| split.ts | Extract page range from PDF |
| compress.ts | Compress PDF (multiple quality levels) |
| jpgToPdf.ts | Convert images to PDF |
| pdfToJpg.ts | Render PDF pages as JPG images (ZIP) |
| pdfToWord.ts | Convert PDF to DOCX |
| pdfToExcelService.ts | Convert PDF tables to XLSX |
| pdfToPptService.ts | Convert PDF to PPTX |
| pdfToTextService.ts | Extract text from PDF |
| rotate.ts | Rotate PDF pages |
| watermark.ts | Add text watermark to PDF |
| deletePages.ts | Remove pages from PDF |
| reorder.ts | Rearrange PDF page order |
| protect.ts | Encrypt PDF with password |
| unlock.ts | Remove PDF password |
| ocr.ts | OCR using tesseract.js |
| redact.ts | Redact text/areas in PDF |
| utils.ts | downloadBlob(), formatFileSize() |
| convertViaBackend.ts | Unused/legacy backend conversion |

#### Image Processors (`src/lib/image/`)
| File | Purpose |
|------|---------|
| compress.ts | Compress images using browser-image-compression |
| resize.ts | Resize to specified dimensions via Canvas |
| crop.ts | Crop image given x, y, w, h via Canvas |
| rotate.ts | Rotate image by 90/180/270 via Canvas |
| convertToJpg.ts | Convert PNG/WebP/BMP to JPG via Canvas |
| convertFromJpg.ts | Convert JPG to PNG/WebP via Canvas |
| webpToJpg.ts | WebP to JPG with white background fill |
| heicToJpg.ts | HEIC to JPG via heic2any (dynamic import) |
| upscale.ts | 2x upscale using Canvas |
| watermark.ts | Tiled rotated text watermark via Canvas |
| blurFace.ts | Face detection + pixelation via face-api (dynamic import) |
| htmlToImage.ts | HTML to PNG via html-to-image (REMOVED from tool registry, file may still exist) |
| utils.ts | formatFileSize() |

### Standard Tool Page Template
Most tool pages follow this pattern:
```tsx
'use client';
import ToolPage from '@/components/ToolPage';
import { processFn } from '@/lib/pdf/processorFile';

export default function ToolNamePage() {
  return <ToolPage toolId="tool-id" processFn={processFn} />;
}
```

Image tool pages:
```tsx
'use client';
import ImageToolPage from '@/components/ImageToolPage';
import { processFn } from '@/lib/image/processorFile';

export default function ToolNamePage() {
  return <ImageToolPage toolId="tool-id" processFn={processFn} />;
}
```

### Custom Pages (non-standard)
- **`app/image/crop-image/page.tsx`**: Interactive canvas-based crop editor with:
  - Manual click-drag selection (uses refs for drag state to avoid React closure issues)
  - Aspect ratio presets (Free, 1:1, 4:3, 16:9, 3:2)
  - Rule-of-thirds grid overlay
  - Corner drag handles for resizing
  - Move mode (click inside crop area) vs new selection mode (click outside/near edges)
  - Light grey overlay on non-selected area

### Checklist: Adding a New Tool
1. [ ] Add tool definition to `lib/tools.ts` or `lib/imageTools.ts`
2. [ ] Create processor file in `lib/pdf/` or `lib/image/`
3. [ ] Create page route in `app/tools/<id>/page.tsx` or `app/image/<id>/page.tsx`
4. [ ] Add link to `Header.tsx` mega menu
5. [ ] Add link to `layout.tsx` footer
6. [ ] Sitemap auto-updates from tool arrays (no manual change needed)
7. [ ] Run `npm run build` to verify

### Checklist: Removing a Tool
1. [ ] Remove from tool registry (`lib/tools.ts` or `lib/imageTools.ts`)
2. [ ] Delete page route directory
3. [ ] Delete processor file (or keep if shared)
4. [ ] Remove from `Header.tsx` mega menu
5. [ ] Remove from `layout.tsx` footer
6. [ ] Remove from `ImageToolPage.tsx` filename map (if image tool)
7. [ ] Run `npm run build` to verify

### Known Patterns & Gotchas
- **Canvas interactions**: Use refs (not state) for drag state in mouse handlers to avoid React closure timing issues
- **Heavy libraries**: Always use dynamic `import()` for heic2any, face-api, html-to-image — they're large and shouldn't be in the main bundle
- **SVG icons**: Stored as raw SVG strings in tool definitions, rendered with `dangerouslySetInnerHTML={{ __html: tool.icon }}`
- **File downloads**: Use `downloadBlob()` from `lib/pdf/utils.ts`
- **No server-side processing**: Everything runs in the browser. No API routes for file processing.
- **PDF worker**: Copied to `public/` via postinstall script (`pdfjs-dist/build/pdf.worker.min.mjs`)
