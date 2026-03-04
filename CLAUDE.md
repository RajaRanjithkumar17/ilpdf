# CLAUDE.md — Agent Context for iLovePDF Pink

## Project Overview
**iLovePDF Pink** is a privacy-first PDF & Image tools web app. All processing happens client-side in the browser — no server uploads.

- **Domain**: https://www.ilovepdfpink.com
- **Monorepo root**: `/Users/ranjith/Documents/ilpdf/`
- **Frontend**: `frontend/` — the only active package

## Tech Stack
- **Framework**: Next.js 15 (App Router) with `output: 'standalone'`
- **React**: 19 (`'use client'` for all tool pages)
- **CSS**: Tailwind CSS 4 (via `@tailwindcss/postcss`)
- **Language**: TypeScript 5.7+
- **Package manager**: npm

## Quick Commands
```bash
cd frontend
npm run dev        # Start dev server
npm run build      # Production build (always run after changes)
npm run format     # Prettier format
```

## Project Structure
```
frontend/src/
├── app/
│   ├── page.tsx              # Homepage (PDF tools only)
│   ├── layout.tsx            # Root layout (Header + Footer)
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── tools/                # PDF tool pages
│   │   ├── merge-pdf/page.tsx
│   │   ├── split-pdf/page.tsx
│   │   ├── compress-pdf/page.tsx
│   │   └── ... (17 PDF tools total)
│   └── image/                # Image tool pages
│       ├── page.tsx           # Image homepage (/image)
│       ├── compress-image/page.tsx
│       ├── crop-image/page.tsx  # Custom interactive canvas editor
│       └── ... (11 image tools total)
├── components/
│   ├── Header.tsx            # Mega menu with PDF + Image sections
│   ├── ToolPage.tsx          # Reusable PDF tool page component
│   ├── ImageToolPage.tsx     # Reusable Image tool page component
│   ├── ToolGrid.tsx          # PDF homepage tool grid
│   └── ToolCard.tsx          # Individual tool card
└── lib/
    ├── tools.ts              # PDF tool registry (Tool interface + tools array)
    ├── imageTools.ts         # Image tool registry (imageTools array)
    ├── pdf/                  # PDF processor functions
    │   ├── merge.ts, split.ts, compress.ts, ...
    │   └── utils.ts          # downloadBlob, formatFileSize
    └── image/                # Image processor functions
        ├── compress.ts, resize.ts, crop.ts, rotate.ts, ...
        └── utils.ts          # formatFileSize for images
```

## Key Patterns

### Tool Registry
Every tool is defined in a registry file (`lib/tools.ts` for PDF, `lib/imageTools.ts` for image):
```typescript
interface Tool {
  id: string;          // e.g. 'merge-pdf', 'compress-image'
  name: string;
  description: string;
  href: string;        // Route path
  color: string;       // Hex color
  icon: string;        // Inline SVG string
  acceptTypes: string; // File input accept
  multiple: boolean;
  fields?: ToolField[];
  category?: 'pdf' | 'image';
}
```

### Adding a New Tool
1. Add tool definition to `lib/tools.ts` or `lib/imageTools.ts`
2. Create processor in `lib/pdf/` or `lib/image/` (signature: `(files, fields, onProgress?) => Promise<Blob>`)
3. Create page at `app/tools/<id>/page.tsx` or `app/image/<id>/page.tsx`
4. Update Header.tsx mega menu, layout.tsx footer, sitemap.ts

### Processor Function Signature
```typescript
// PDF processors
type ProcessorFn = (files: File[], fields: Record<string, string>, onProgress?: (p: number) => void) => Promise<Blob>;

// Image processors
type ImageProcessorFn = (files: File[], fields: Record<string, string>, onProgress?: (p: number) => void) => Promise<Blob>;
```

### Route Patterns
- PDF tools: `/tools/<tool-id>` (e.g. `/tools/merge-pdf`)
- Image tools: `/image/<tool-id>` (e.g. `/image/compress-image`)
- PDF homepage: `/`
- Image homepage: `/image`

### Reusable Page Components
- **ToolPage** (`components/ToolPage.tsx`): Used by most PDF tool pages. Handles upload → processing → download flow.
- **ImageToolPage** (`components/ImageToolPage.tsx`): Used by most image tool pages. Same flow pattern with image-specific features (validation, auto-fill dimensions).
- **Custom pages**: `crop-image` (canvas editor) and `html-to-image` have custom page components.

## Conventions
- All processing is client-side only — no API calls for file processing
- SVG icons are stored as strings in tool definitions, rendered via `dangerouslySetInnerHTML`
- Always run `npm run build` after changes to verify compilation
- Use dynamic imports for heavy libraries (heic2any, face-api, etc.)
- Tailwind classes only — no custom CSS except `component.css`
- No server components for tool pages — all use `'use client'`

## Key Dependencies
- **pdf-lib**: PDF manipulation (merge, split, rotate, watermark, etc.)
- **pdfjs-dist**: PDF rendering (pdf-to-jpg, compress via render)
- **browser-image-compression**: Image compression
- **tesseract.js**: OCR
- **jspdf**: Creating PDFs from images
- **docx**: PDF to Word conversion
- **xlsx**: PDF to Excel conversion
- **heic2any**: HEIC to JPG conversion
- **html-to-image**: HTML to image conversion
- **@vladmandic/face-api**: Face detection for blur

## Current State (as of March 2026)
- 17 PDF tools: all functional
- 11 image tools: all functional (html-to-image was removed)
- Crop tool: interactive canvas with manual selection, aspect ratio presets, rule-of-thirds grid
