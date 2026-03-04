import type { Metadata } from 'next';

const DOMAIN = 'https://www.ilovepdfpink.com';

interface FaqItem {
  question: string;
  answer: string;
}

interface PdfToolSeoData {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  applicationName: string;
  featureList: string[];
  faqItems?: FaqItem[];
}

const PDF_TOOL_SEO: Record<string, PdfToolSeoData> = {
  'merge-pdf': {
    title: 'Merge PDF Online Free — Combine PDF Files Into One',
    description:
      'Merge PDF files online for free. Combine multiple PDFs into a single document with drag-and-drop reordering. 100% private — no uploads, all processing happens in your browser.',
    keywords:
      'pdf smart, pdfsmart,smart pdf,merge pdf, combine pdf, merge pdf files, pdf merger, join pdf, merge pdf online free, combine pdf files into one, pdf combiner',
    canonical: `${DOMAIN}/tools/merge-pdf`,
    ogTitle: 'Merge PDF Online Free — Combine Multiple PDFs',
    ogDescription:
      'Combine multiple PDF files into one document for free. Drag and drop to reorder. No uploads, 100% private.',
    applicationName: 'PDF Merger',
    featureList: [
      'Combine multiple PDF files into one',
      'Drag-and-drop reordering',
      'No file size limits',
      'Maintains original formatting',
      '100% client-side processing, no uploads',
    ],
    faqItems: [
      {
        question: 'How do I merge PDF files for free?',
        answer:
          'Upload your PDF files, drag to reorder if needed, and click the process button. Your merged PDF is ready to download instantly — all processing happens in your browser.',
      },
      {
        question: 'Is there a limit to how many PDFs I can merge?',
        answer:
          'There are no server-imposed limits. You can merge as many PDFs as your device can handle. Most modern devices process dozens of files without issues.',
      },
      {
        question: 'Will merging affect the quality of my PDFs?',
        answer:
          'No. Our merger preserves the original content, formatting, bookmarks, and links exactly as they are in the source files.',
      },
    ],
  },

  'split-pdf': {
    title: 'Split PDF Online Free — Extract Pages from PDF',
    description:
      'Split PDF files online for free. Extract specific page ranges from a PDF to create smaller documents. Private, fast PDF splitter — no uploads, runs in your browser.',
    keywords:
      'pdf smart, pdfsmart,smart pdf,split pdf, pdf splitter, extract pages from pdf, split pdf online, separate pdf pages, pdf page extractor, split pdf free',
    canonical: `${DOMAIN}/tools/split-pdf`,
    ogTitle: 'Split PDF Online Free — Extract Pages from PDF',
    ogDescription:
      'Extract specific pages from a PDF file for free. No uploads, private and instant.',
    applicationName: 'PDF Splitter',
    featureList: [
      'Extract specific page ranges',
      'Create smaller PDF documents',
      'Define custom from/to page numbers',
      'Instant processing and download',
      '100% client-side, no server uploads',
    ],
    faqItems: [
      {
        question: 'How do I split a PDF into separate pages?',
        answer:
          'Upload your PDF, enter the page range you want to extract (e.g., pages 1 to 5), and click process. The selected pages will be extracted as a new PDF.',
      },
      {
        question: 'Can I extract non-consecutive pages?',
        answer:
          'The current tool extracts a consecutive range of pages. For non-consecutive pages, run the tool multiple times with different ranges.',
      },
    ],
  },

  'compress-pdf': {
    title: 'Compress PDF Online Free — Reduce PDF File Size',
    description:
      'Compress PDF files online for free. Reduce PDF file size by up to 90% with adjustable compression levels. Perfect for email attachments — 100% private, no uploads.',
    keywords:
      'pdf smart, pdfsmart,smart pdf, compress pdf, reduce pdf size, pdf compressor, compress pdf online, shrink pdf, make pdf smaller, reduce pdf file size free, pdf compression tool',
    canonical: `${DOMAIN}/tools/compress-pdf`,
    ogTitle: 'Compress PDF Online Free — Reduce PDF File Size',
    ogDescription:
      'Reduce PDF file size by up to 90% for free. Adjustable compression. No uploads, 100% private.',
    applicationName: 'PDF Compressor',
    featureList: [
      'Reduce PDF file size by up to 90%',
      'Four compression levels to choose from',
      'Light compression preserves selectable text',
      'Maximum compression for smallest file size',
      '100% client-side processing, no uploads',
    ],
    faqItems: [
      {
        question: 'How much can I compress a PDF?',
        answer:
          'File size reduction depends on the content. Image-heavy PDFs can be reduced by up to 90%. Text-heavy PDFs with the "Light" option preserve selectable text with moderate reduction.',
      },
      {
        question: 'Will compression affect PDF quality?',
        answer:
          'The "Light" and "Minimal" options preserve text quality. The "Maximum" and "Balanced" options render pages as images, which reduces quality but achieves much smaller file sizes.',
      },
      {
        question: 'What compression levels are available?',
        answer:
          'Four levels: Maximum compression (renders as images), Balanced (renders as images), Light (strips metadata, keeps text), and Minimal (re-save only, keeps text).',
      },
    ],
  },

  'jpg-to-pdf': {
    title: 'JPG to PDF Converter — Convert Images to PDF Free',
    description:
      'Convert JPG, PNG, and WebP images to PDF online for free. Combine multiple images into a single PDF document. Fast, private image to PDF converter — no uploads.',
    keywords:
      'pdf smart, pdfsmart,smart pdf, jpg to pdf, convert jpg to pdf, image to pdf, png to pdf, photo to pdf, jpg to pdf converter, images to pdf online free',
    canonical: `${DOMAIN}/tools/jpg-to-pdf`,
    ogTitle: 'JPG to PDF Converter — Convert Images to PDF Free',
    ogDescription:
      'Convert JPG, PNG, and WebP images to PDF for free. Combine multiple images. No uploads required.',
    applicationName: 'JPG to PDF Converter',
    featureList: [
      'Convert JPG, PNG, and WebP to PDF',
      'Combine multiple images into one PDF',
      'Maintains image quality',
      'Instant processing and download',
      '100% client-side, no server uploads',
    ],
  },

  'pdf-to-jpg': {
    title: 'PDF to JPG Converter — Convert PDF Pages to Images Free',
    description:
      'Convert PDF to JPG images online for free. Each PDF page becomes a high-quality JPG image, downloaded as a ZIP file. Private PDF to image converter — no uploads.',
    keywords:
      'pdf smart, pdfsmart,smart pdf,pdf to jpg, convert pdf to jpg, pdf to image, pdf to jpeg, pdf to jpg converter, pdf page to image, extract images from pdf',
    canonical: `${DOMAIN}/tools/pdf-to-jpg`,
    ogTitle: 'PDF to JPG Converter — Convert PDF to Images Free',
    ogDescription:
      'Convert PDF pages to high-quality JPG images for free. Downloads as ZIP. No uploads.',
    applicationName: 'PDF to JPG Converter',
    featureList: [
      'Convert every PDF page to JPG',
      'High-quality image output',
      'Download all images as ZIP',
      'Progress tracking during conversion',
      '100% client-side processing',
    ],
  },

  'pdf-to-word': {
    title: 'PDF to Word Converter — Convert PDF to DOCX Free',
    description:
      'Convert PDF to Word (DOCX) online for free. Transform PDF documents into editable Word files with preserved formatting. Works with Microsoft Word and Google Docs.',
    keywords:
      'pdf smart, pdfsmart,smart pdf,pdf to word, convert pdf to word, pdf to docx, pdf to word converter, pdf to editable word, pdf to doc online free',
    canonical: `${DOMAIN}/tools/pdf-to-word`,
    ogTitle: 'PDF to Word Converter — Convert PDF to DOCX Free',
    ogDescription:
      'Convert PDF documents to editable Word files for free. Formatting preserved. Works with Word and Google Docs.',
    applicationName: 'PDF to Word Converter',
    featureList: [
      'Convert PDF to editable DOCX format',
      'Preserves text and formatting',
      'Compatible with Microsoft Word and Google Docs',
      'Progress tracking during conversion',
      'Fast, private conversion',
    ],
  },

  'pdf-to-excel': {
    title: 'PDF to Excel Converter — Convert PDF Tables to XLSX Free',
    description:
      'Convert PDF to Excel (XLSX) online for free. Extract tables and data from PDF documents into editable spreadsheets. Perfect for financial reports and data analysis.',
    keywords:
      'pdf smart, pdfsmart,smart pdf,pdf to excel, convert pdf to excel, pdf to xlsx, pdf to spreadsheet, extract tables from pdf, pdf to excel converter free',
    canonical: `${DOMAIN}/tools/pdf-to-excel`,
    ogTitle: 'PDF to Excel Converter — Convert PDF to XLSX Free',
    ogDescription:
      'Extract tables and data from PDFs into editable Excel spreadsheets for free. Fast and private.',
    applicationName: 'PDF to Excel Converter',
    featureList: [
      'Convert PDF tables to XLSX spreadsheets',
      'Extract data for analysis',
      'Compatible with Microsoft Excel and Google Sheets',
      'Progress tracking during conversion',
      'Fast, private conversion',
    ],
  },

  'pdf-to-ppt': {
    title: 'PDF to PowerPoint Converter — Convert PDF to PPTX Free',
    description:
      'Convert PDF to PowerPoint (PPTX) online for free. Transform PDF slides into editable presentations. Works with Microsoft PowerPoint and Google Slides.',
    keywords:
      'pdf to ppt, pdf to powerpoint, convert pdf to pptx, pdf to presentation, pdf to slides, pdf to powerpoint converter free',
    canonical: `${DOMAIN}/tools/pdf-to-ppt`,
    ogTitle: 'PDF to PowerPoint Converter — Convert PDF to PPTX Free',
    ogDescription:
      'Convert PDF slides to editable PowerPoint presentations for free. Fast and private.',
    applicationName: 'PDF to PowerPoint Converter',
    featureList: [
      'Convert PDF to editable PPTX format',
      'Preserves slide layout and formatting',
      'Compatible with PowerPoint and Google Slides',
      'Progress tracking during conversion',
      'Fast, private conversion',
    ],
  },

  'pdf-to-text': {
    title: 'PDF to Text Converter — Extract Text from PDF Free',
    description:
      'Extract text from PDF files online for free. Convert PDF documents to plain text (.txt) files. Perfect for copying content, indexing, and text analysis.',
    keywords:
      'pdf to text, extract text from pdf, pdf to txt, pdf text extractor, copy text from pdf, pdf to plain text free',
    canonical: `${DOMAIN}/tools/pdf-to-text`,
    ogTitle: 'PDF to Text Converter — Extract Text from PDF Free',
    ogDescription:
      'Extract all text content from PDF documents into plain text files for free. Fast and private.',
    applicationName: 'PDF to Text Converter',
    featureList: [
      'Extract all text from PDF documents',
      'Output as plain text (.txt) file',
      'Preserves text structure',
      'Progress tracking during extraction',
      'Fast, private processing',
    ],
  },

  'rotate-pdf': {
    title: 'Rotate PDF Online Free — Rotate PDF Pages 90, 180, 270',
    description:
      'Rotate PDF pages online for free. Rotate all pages by 90, 180, or 270 degrees. Fix sideways or upside-down PDF documents instantly — 100% private, no uploads.',
    keywords:
      'rotate pdf, rotate pdf pages, pdf rotator, rotate pdf online, turn pdf sideways, flip pdf, rotate pdf 90 degrees free',
    canonical: `${DOMAIN}/tools/rotate-pdf`,
    ogTitle: 'Rotate PDF Online Free — 90, 180, 270 Degrees',
    ogDescription:
      'Rotate PDF pages by 90, 180, or 270 degrees for free. Fix sideways PDFs instantly. No uploads.',
    applicationName: 'PDF Rotator',
    featureList: [
      'Rotate pages by 90, 180, or 270 degrees',
      'Rotate all pages at once',
      'No quality loss during rotation',
      'Instant processing and download',
      '100% client-side, no uploads',
    ],
  },

  'watermark-pdf': {
    title: 'Add Watermark to PDF Online Free — PDF Watermark Tool',
    description:
      'Add text watermarks to PDF documents online for free. Customize your watermark text to protect and brand your documents. 100% private — no uploads.',
    keywords:
      'watermark pdf, add watermark to pdf, pdf watermark, pdf watermark tool, stamp pdf, text watermark pdf, watermark pdf online free',
    canonical: `${DOMAIN}/tools/watermark-pdf`,
    ogTitle: 'Add Watermark to PDF Online Free',
    ogDescription:
      'Add custom text watermarks to your PDF documents for free. No uploads, 100% private.',
    applicationName: 'PDF Watermark Tool',
    featureList: [
      'Add text watermarks to every page',
      'Customizable watermark text',
      'Diagonal watermark placement',
      'Instant processing and download',
      '100% client-side, no uploads',
    ],
  },

  'delete-pdf-pages': {
    title: 'Delete PDF Pages Online Free — Remove Pages from PDF',
    description:
      'Delete specific pages from a PDF online for free. Remove unwanted pages by page number. Fast, private PDF page remover — no uploads, runs in your browser.',
    keywords:
      'delete pdf pages, remove pages from pdf, pdf page remover, delete pages in pdf, remove pdf pages online free',
    canonical: `${DOMAIN}/tools/delete-pdf-pages`,
    ogTitle: 'Delete PDF Pages Online Free — Remove Pages from PDF',
    ogDescription:
      'Remove specific pages from any PDF for free. Enter page numbers and download. No uploads.',
    applicationName: 'PDF Page Remover',
    featureList: [
      'Delete specific pages by number',
      'Remove multiple pages at once',
      'Preserves remaining content',
      'Instant processing and download',
      '100% client-side, no uploads',
    ],
  },

  'reorder-pdf-pages': {
    title: 'Reorder PDF Pages Online Free — Rearrange PDF Pages',
    description:
      'Rearrange PDF page order online for free. Define a custom page sequence to reorganize your PDF document. 100% private — no uploads, all processing in your browser.',
    keywords:
      'reorder pdf pages, rearrange pdf, reorder pdf, rearrange pdf pages, change pdf page order, reorganize pdf free',
    canonical: `${DOMAIN}/tools/reorder-pdf-pages`,
    ogTitle: 'Reorder PDF Pages Online Free — Rearrange Page Order',
    ogDescription:
      'Rearrange PDF page order with a custom sequence for free. No uploads, 100% private.',
    applicationName: 'PDF Page Reorder Tool',
    featureList: [
      'Define custom page order',
      'Rearrange pages in any sequence',
      'Preserves all page content',
      'Instant processing and download',
      '100% client-side, no uploads',
    ],
  },

  'protect-pdf': {
    title: 'Protect PDF with Password — Encrypt PDF Online Free',
    description:
      'Password-protect your PDF files online for free. Add AES-128 encryption to prevent unauthorized access. Secure contracts, financials, and personal documents — 100% private.',
    keywords:
      'protect pdf, password protect pdf, encrypt pdf, pdf password, lock pdf, secure pdf, encrypt pdf online free, pdf encryption tool',
    canonical: `${DOMAIN}/tools/protect-pdf`,
    ogTitle: 'Protect PDF with Password — Encrypt PDF Free',
    ogDescription:
      'Add password encryption to your PDF files for free. AES-128 security. No uploads, 100% private.',
    applicationName: 'PDF Encryption Tool',
    featureList: [
      'AES-128 password encryption',
      'Prevent unauthorized access',
      'Protect sensitive documents',
      'Instant processing and download',
      '100% client-side, no uploads',
    ],
    faqItems: [
      {
        question: 'How secure is the PDF encryption?',
        answer:
          'We use AES-128 encryption, a widely trusted standard. The password is never transmitted anywhere — encryption happens entirely in your browser.',
      },
      {
        question: 'Can I remove the password later?',
        answer:
          'Yes, use our Unlock PDF tool. Enter the password you set and download an unprotected copy of the document.',
      },
    ],
  },

  'unlock-pdf': {
    title: 'Unlock PDF Online Free — Remove PDF Password',
    description:
      'Unlock password-protected PDF files online for free. Remove PDF password restrictions to enable editing, printing, and copying. 100% private — runs in your browser.',
    keywords:
      'unlock pdf, remove pdf password, pdf unlocker, unlock pdf online, remove pdf protection, pdf password remover free',
    canonical: `${DOMAIN}/tools/unlock-pdf`,
    ogTitle: 'Unlock PDF Online Free — Remove Password Protection',
    ogDescription:
      'Remove password protection from PDF files for free. No uploads, 100% private.',
    applicationName: 'PDF Unlocker',
    featureList: [
      'Remove PDF password protection',
      'Enable editing, printing, and copying',
      'Requires original password',
      'Instant processing and download',
      '100% client-side, no uploads',
    ],
  },

  'ocr-pdf': {
    title: 'OCR PDF Online Free — Make Scanned PDFs Searchable',
    description:
      'OCR scanned PDF documents online for free. Convert non-selectable PDFs into searchable, selectable text using Tesseract.js. 100% private — no uploads, runs in your browser.',
    keywords:
      'ocr pdf, pdf ocr, scanned pdf to text, make pdf searchable, ocr pdf online free, optical character recognition pdf, searchable pdf',
    canonical: `${DOMAIN}/tools/ocr-pdf`,
    ogTitle: 'OCR PDF Online Free — Make Scanned PDFs Searchable',
    ogDescription:
      'Convert scanned PDFs into searchable documents with OCR for free. No uploads, 100% private.',
    applicationName: 'PDF OCR Tool',
    featureList: [
      'Optical character recognition for scanned PDFs',
      'Creates searchable text layer',
      'Powered by Tesseract.js',
      'Progress tracking during OCR',
      '100% client-side, no server uploads',
    ],
    faqItems: [
      {
        question: 'How does PDF OCR work?',
        answer:
          'OCR (Optical Character Recognition) analyzes scanned page images and recognizes text characters. Our tool creates an invisible text layer over the original page images, making content selectable and searchable.',
      },
      {
        question: 'What languages does the OCR support?',
        answer:
          'The default model supports English text recognition. It uses Tesseract.js, which provides high-accuracy text recognition for printed text.',
      },
    ],
  },

  'redact-pdf': {
    title: 'Redact PDF Online Free — Permanently Remove Sensitive Info',
    description:
      'Redact PDF documents online for free. Draw black boxes over sensitive text, images, and graphics to permanently remove information. Ideal for legal and compliance — 100% private.',
    keywords:
      'redact pdf, pdf redaction, remove sensitive info from pdf, black out pdf text, pdf redaction tool, redact pdf online free, censor pdf',
    canonical: `${DOMAIN}/tools/redact-pdf`,
    ogTitle: 'Redact PDF Online Free — Remove Sensitive Information',
    ogDescription:
      'Permanently redact sensitive information from PDF documents for free. No uploads, 100% private.',
    applicationName: 'PDF Redaction Tool',
    featureList: [
      'Interactive canvas-based redaction editor',
      'Draw redaction boxes over sensitive content',
      'Permanent, irreversible redaction',
      'Multi-page support with zoom controls',
      '100% client-side, no uploads',
    ],
    faqItems: [
      {
        question: 'Is the redaction permanent?',
        answer:
          'Yes. Our tool permanently removes content under redaction boxes. The original text and images are replaced with solid black fills — the redacted content cannot be recovered.',
      },
      {
        question: 'What can I redact from a PDF?',
        answer:
          'You can redact any content — text, images, signatures, account numbers, personal information, and more. Simply draw boxes over the areas you want to permanently remove.',
      },
    ],
  },
};

export function getPdfToolMetadata(toolId: string): Metadata {
  const seo = PDF_TOOL_SEO[toolId];
  if (!seo) throw new Error(`No SEO data for PDF tool: ${toolId}`);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical,
    },
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      type: 'website',
      url: seo.canonical,
      siteName: 'iLovePDF Pink',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.ogTitle,
      description: seo.ogDescription,
    },
  };
}

export function getPdfToolJsonLd(toolId: string): object[] {
  const seo = PDF_TOOL_SEO[toolId];
  if (!seo) return [];

  const schemas: object[] = [];

  // WebApplication schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: seo.applicationName,
    url: seo.canonical,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: seo.featureList,
    description: seo.description,
    browserRequirements: 'Requires a modern web browser with JavaScript enabled',
    author: {
      '@type': 'Organization',
      name: 'iLovePDF Pink',
      url: DOMAIN,
    },
  });

  // BreadcrumbList schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: DOMAIN,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: seo.applicationName,
        item: seo.canonical,
      },
    ],
  });

  // FAQPage schema (for tools with FAQ items)
  if (seo.faqItems && seo.faqItems.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: seo.faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return schemas;
}
