import type { Metadata } from 'next';

const DOMAIN = 'https://www.ilovepdfpink.com';

interface FaqItem {
  question: string;
  answer: string;
}

interface HowToStep {
  name: string;
  text: string;
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
  howToSteps?: HowToStep[];
}

const PDF_TOOL_SEO: Record<string, PdfToolSeoData> = {
  'merge-pdf': {
    title: 'Merge PDF Online Free | Combine PDF Files Into One Document',
    description:
      'Merge PDF files online for free. Combine multiple PDFs into a single document with drag-and-drop reordering. Best free PDF merger — no uploads, no sign-up, 100% private browser processing.',
    keywords:
      'pdf smart, pdfsmart, smart pdf, merge pdf, combine pdf, merge pdf online free, pdf merger, combine pdf files, join pdf, merge pdf files, pdf combiner, merge pdf online, combine pdf online free, pdf joiner, merge pdf files online free, combine multiple pdfs into one, pdf merge tool, merge pdf documents',
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
      {
        question: 'Are my PDF files safe when merging?',
        answer:
          'Yes, all processing happens in your browser. Your files are never uploaded to any server.',
      },
      {
        question: 'Can I merge password-protected PDFs?',
        answer:
          "You'll need to unlock them first using our Unlock PDF tool, then merge the unlocked files.",
      },
      {
        question: 'Can I reorder files before merging?',
        answer:
          'Yes, simply drag and drop to rearrange the file order before clicking the merge button.',
      },
    ],
    howToSteps: [
      {
        name: 'Select PDF files',
        text: "Click 'Choose Files' or drag and drop the PDF files you want to merge.",
      },
      {
        name: 'Arrange file order',
        text: 'Drag and drop to reorder files in the sequence you want them merged.',
      },
      {
        name: 'Merge PDFs',
        text: "Click the 'Merge PDF' button to combine all files into one document.",
      },
      {
        name: 'Download result',
        text: "Your merged PDF is ready — click 'Download' to save it to your device.",
      },
    ],
  },

  'split-pdf': {
    title:
      'Split PDF Online Free | Split PDF Pages Into Separate Files',
    description:
      'Split PDF online for free. Split PDF pages into separate files, extract specific page ranges, or separate a PDF into individual pages. Free PDF splitter — 100% private, no uploads.',
    keywords:
      'split pdf, split pdf online, split pdf pages, split pdf free, split pdf pages into separate files, split pdf online free, pdf splitter, separate pdf pages, extract pages from pdf, split pdf into individual pages, pdf page extractor, split pdf file',
    canonical: `${DOMAIN}/tools/split-pdf`,
    ogTitle: 'Split PDF Online Free — Split PDF Pages Into Separate Files',
    ogDescription:
      'Split PDF pages into separate files for free. Extract specific page ranges. No uploads, 100% private.',
    applicationName: 'PDF Splitter',
    featureList: [
      'Split PDF pages into separate files',
      'Extract specific page ranges',
      'Create smaller PDF documents',
      'Define custom from/to page numbers',
      'Instant processing and download',
      '100% client-side, no server uploads',
    ],
    faqItems: [
      {
        question: 'How do I split PDF pages into separate files?',
        answer:
          'Upload your PDF, enter the page range you want to extract (e.g., pages 1 to 5), and click process. The selected pages will be split into a new separate PDF file.',
      },
      {
        question: 'Can I split a PDF into individual pages?',
        answer:
          'Yes, extract one page at a time by setting the same start and end page number. Repeat for each page you need as a separate file.',
      },
      {
        question: 'Can I extract non-consecutive pages?',
        answer:
          'The current tool extracts a consecutive range of pages. For non-consecutive pages, run the tool multiple times with different ranges.',
      },
      {
        question: 'Is this PDF splitter really free?',
        answer:
          'Yes, our PDF splitter is 100% free with no limits, no sign-up, and no watermarks. All splitting happens in your browser.',
      },
      {
        question: 'Will splitting affect the quality?',
        answer:
          'No. The extracted pages maintain their original quality, formatting, and content exactly as in the source PDF.',
      },
      {
        question: 'Can I split a PDF on my phone?',
        answer:
          'Yes, our online PDF splitter works on any device with a modern web browser, including iPhones, Android phones, and tablets.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload your PDF',
        text: "Click 'Choose Files' or drag and drop the PDF you want to split.",
      },
      {
        name: 'Enter page range',
        text: 'Specify the starting and ending page numbers for the pages you want to extract.',
      },
      {
        name: 'Split PDF',
        text: "Click the 'Split PDF' button to extract the selected pages.",
      },
      {
        name: 'Download result',
        text: 'Download your new PDF containing only the extracted pages.',
      },
    ],
  },

  'compress-pdf': {
    title:
      'PDF Compressor Online Free | Compress PDF to 200KB, 100KB, 50KB',
    description:
      'Free PDF compressor online — compress PDF to 200KB, 100KB, 500KB, or 50KB. Reduce PDF file size by up to 90% with adjustable compression levels. Best free PDF compressor — 100% private, no uploads.',
    keywords:
      'pdf compressor, compress pdf, pdf compressor online free, free pdf compressor, compress pdf to 200kb, pdf compressor to 100kb, compress pdf to 500kb, pdf compressor to 50kb, reduce pdf size, compress pdf online, shrink pdf, make pdf smaller, reduce pdf file size free, pdf compression tool, pdf compressor to 200kb',
    canonical: `${DOMAIN}/tools/compress-pdf`,
    ogTitle: 'Free PDF Compressor Online — Compress PDF to Any Size',
    ogDescription:
      'Compress PDF to 200KB, 100KB, or 50KB for free. Reduce PDF file size by up to 90%. No uploads, 100% private.',
    applicationName: 'PDF Compressor',
    featureList: [
      'Compress PDF to 200KB, 100KB, 500KB, or 50KB',
      'Reduce PDF file size by up to 90%',
      'Four compression levels to choose from',
      'Light compression preserves selectable text',
      'Maximum compression for smallest file size',
      '100% client-side processing, no uploads',
    ],
    faqItems: [
      {
        question: 'How do I compress a PDF to 200KB?',
        answer:
          'Upload your PDF and select the "Balanced" or "Maximum" compression level. The Maximum option renders pages as images for the smallest file size, easily reaching 200KB or less for most documents.',
      },
      {
        question: 'How do I compress a PDF to 100KB or 50KB?',
        answer:
          'Use the "Maximum" compression level for the smallest possible file size. Image-heavy PDFs can be reduced to under 100KB or even 50KB. Text-only documents may need the Maximum setting for this level of reduction.',
      },
      {
        question: 'Can I compress a PDF to 500KB?',
        answer:
          'Yes, the "Balanced" compression level typically reduces PDFs to around 500KB. For larger files, try the "Maximum" level for more aggressive compression.',
      },
      {
        question: 'Will compression affect PDF quality?',
        answer:
          'The "Light" and "Minimal" options preserve text quality. The "Maximum" and "Balanced" options render pages as images, which reduces quality but achieves much smaller file sizes — ideal for email attachments.',
      },
      {
        question: 'What compression levels are available?',
        answer:
          'Four levels: Maximum compression (renders as images, smallest size), Balanced (renders as images), Light (strips metadata, keeps selectable text), and Minimal (re-save only, keeps text).',
      },
      {
        question: 'Is this PDF compressor really free?',
        answer:
          'Yes, 100% free with no limits, no sign-up, and no watermarks. All compression happens in your browser — your files are never uploaded to any server.',
      },
      {
        question: 'Is it safe to compress PDFs online?',
        answer:
          'Completely safe — your files never leave your device. Unlike other PDF compressors, our tool processes everything locally in your browser with zero server uploads.',
      },
      {
        question: 'Can I compress multiple PDFs?',
        answer:
          'Currently, our tool processes one PDF at a time. Upload, compress, download, and repeat for additional files.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload your PDF',
        text: "Click 'Choose Files' or drag and drop the PDF you want to compress.",
      },
      {
        name: 'Select compression level',
        text: 'Choose from Maximum, Balanced, Light, or Minimal compression based on your needs.',
      },
      {
        name: 'Compress PDF',
        text: "Click the 'Compress PDF' button to reduce the file size.",
      },
      {
        name: 'Download compressed file',
        text: 'Download your smaller PDF file instantly.',
      },
    ],
  },

  'jpg-to-pdf': {
    title: 'JPG to PDF Converter Free | Convert Images to PDF Online',
    description:
      'Convert JPG, PNG, and WebP images to PDF online for free. Combine multiple images into a single PDF document. Best free image to PDF converter — no uploads, no sign-up, works on any device.',
    keywords:
      'pdf smart, pdfsmart, smart pdf, jpg to pdf, jpg to pdf converter, convert jpg to pdf, image to pdf, image to pdf converter, photo to pdf, picture to pdf, png to pdf, jpg to pdf online free, convert image to pdf, jpg to pdf converter online free, multiple images to pdf, photo to pdf converter',
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
    faqItems: [
      {
        question: 'Can I convert multiple images to one PDF?',
        answer:
          'Yes, upload multiple images and they\'ll all be combined into a single PDF document, one image per page.',
      },
      {
        question: 'What image formats are supported?',
        answer:
          'JPG/JPEG, PNG, WebP, and TIFF images can all be converted to PDF.',
      },
      {
        question: 'Will the image quality be preserved?',
        answer:
          'Yes, images are embedded at their original resolution. No quality is lost during conversion.',
      },
      {
        question: 'Is there a file size limit?',
        answer:
          'No server-imposed limits. Your device handles the processing, so it depends on your available memory.',
      },
      {
        question: 'Can I reorder images before converting?',
        answer:
          'Yes, drag and drop to arrange images in the order you want them to appear in the PDF.',
      },
    ],
    howToSteps: [
      {
        name: 'Select images',
        text: "Click 'Choose Files' or drag and drop JPG, PNG, or WebP images.",
      },
      {
        name: 'Arrange image order',
        text: 'Drag and drop to reorder images as you want them in the PDF.',
      },
      {
        name: 'Convert to PDF',
        text: "Click the 'JPG to PDF' button to create your PDF document.",
      },
      {
        name: 'Download PDF',
        text: 'Download your new PDF containing all the images.',
      },
    ],
  },

  'pdf-to-jpg': {
    title: 'PDF to JPG Converter Free | Convert PDF Pages to Images Online',
    description:
      'Convert PDF to JPG images online for free. Each PDF page becomes a high-quality JPG image, downloaded as a ZIP file. Best free PDF to image converter — no uploads, no sign-up required.',
    keywords:
      'pdf smart, pdfsmart, smart pdf, pdf to jpg, pdf to jpg converter, convert pdf to jpg, pdf to image, pdf to jpeg, pdf to png, pdf to image converter, convert pdf to image, pdf to jpg online free, extract images from pdf, pdf to jpg converter online free, pdf page to image',
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
    faqItems: [
      {
        question: 'How many pages can I convert?',
        answer:
          'All pages are converted. Each page becomes a separate JPG image, downloaded together as a ZIP file.',
      },
      {
        question: 'What quality are the output images?',
        answer:
          'Pages are rendered as high-resolution JPG images suitable for printing and sharing.',
      },
      {
        question: 'Can I convert specific pages only?',
        answer:
          'Currently, all pages are converted. Use our Split PDF tool first to extract specific pages.',
      },
      {
        question: 'Are my files uploaded to a server?',
        answer:
          'No. Everything runs in your browser — your PDF never leaves your device.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload your PDF',
        text: "Click 'Choose Files' or drag and drop the PDF you want to convert.",
      },
      {
        name: 'Start conversion',
        text: "Click the 'PDF to JPG' button to begin converting each page.",
      },
      {
        name: 'Wait for processing',
        text: 'The tool converts each page to a high-quality JPG image with progress tracking.',
      },
      {
        name: 'Download ZIP',
        text: 'Download the ZIP file containing all your JPG images.',
      },
    ],
  },

  'pdf-to-word': {
    title:
      'PDF to Word Converter Free | Convert PDF to Editable Word Online',
    description:
      'Convert PDF to editable Word (DOCX) online for free. Best free PDF to Word converter — no download, no sign-up. Works offline in your browser. Compatible with Microsoft Word, Google Docs & LibreOffice.',
    keywords:
      'pdf smart, pdfsmart, smart pdf, pdf to word converter free offline, convert pdf to editable word, pdf to word converter i love pdf, pdf to word converter adobe, pdf to word converter free download for windows 10, pdf to word converter canva, pdf to word converter app download, pdf to word editable free, pdf to word, convert pdf to word, pdf to docx, pdf to word converter, pdf to editable word, pdf to doc online free',
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
    faqItems: [
      {
        question: 'Is this PDF to Word converter free offline?',
        answer:
          'Yes! Our PDF to Word converter works entirely in your browser — no internet upload needed. Your files never leave your device, making it a true offline-capable, free PDF to Word converter with no download required.',
      },
      {
        question: 'How do I convert PDF to editable Word?',
        answer:
          'Simply upload your PDF, click "Convert", and download the editable Word (DOCX) file. The converter extracts text, tables, and formatting so you can edit the document freely in Microsoft Word, Google Docs, or LibreOffice.',
      },
      {
        question:
          'Is there a PDF to Word converter free download for Windows 10?',
        answer:
          "No download is needed! Our web-based PDF to Word converter works on Windows 10, Mac, Linux, and mobile — right in your browser. It's 100% free with no installation, no sign-up, and no watermarks.",
      },
      {
        question: 'Can I convert multiple PDFs to Word at once?',
        answer:
          'Currently the tool converts one PDF at a time for best quality. Simply convert each file — processing is fast since everything runs locally in your browser.',
      },
      {
        question: 'How does this compare to Adobe PDF to Word converter?',
        answer:
          'Unlike Adobe Acrobat which requires a paid subscription, our PDF to Word converter is completely free. It preserves text and formatting while keeping your files private — no cloud upload needed.',
      },
      {
        question: 'Will formatting be preserved when converting PDF to Word?',
        answer:
          'The tool preserves text, tables, and basic formatting. Complex layouts may vary slightly. For scanned PDFs, use our OCR PDF tool first to add a text layer, then convert to Word.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload your PDF',
        text: "Click 'Choose Files' or drag and drop the PDF you want to convert to editable Word.",
      },
      {
        name: 'Convert PDF to Word',
        text: "Click the 'PDF to Word' button to start the free conversion process.",
      },
      {
        name: 'Wait for processing',
        text: 'The tool extracts text and formatting from your PDF — all processing happens in your browser, no upload needed.',
      },
      {
        name: 'Download editable DOCX',
        text: 'Download your editable Word document (.docx) file. Open it in Microsoft Word, Google Docs, or any compatible app.',
      },
    ],
  },

  'pdf-to-excel': {
    title:
      'PDF to Excel Converter Free | Convert PDF Tables to XLSX Online',
    description:
      'Convert PDF to Excel (XLSX) online for free. Extract tables and data from PDF documents into editable spreadsheets. Best free PDF to Excel converter — no uploads, no sign-up, works on any device.',
    keywords:
      'pdf smart, pdfsmart, smart pdf, pdf to excel, convert pdf to excel, pdf to xlsx, pdf to spreadsheet, extract tables from pdf, pdf to excel converter free, pdf to excel online free, pdf to excel converter online, pdf table to excel, pdf to csv, export pdf to excel',
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
    faqItems: [
      {
        question: 'Does it preserve table structure?',
        answer:
          'The tool extracts tables and data as accurately as possible. Best results come from PDFs with clear table formatting.',
      },
      {
        question: 'Can I convert scanned PDF tables?',
        answer:
          'For scanned PDFs, use our OCR tool first, then convert to Excel.',
      },
      {
        question: 'Is this free?',
        answer:
          'Yes, completely free with no limits or sign-up required.',
      },
      {
        question: 'Does it work with Google Sheets?',
        answer:
          'Yes, the output XLSX file is compatible with Excel, Google Sheets, and LibreOffice Calc.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload your PDF',
        text: "Click 'Choose Files' or drag and drop the PDF containing tables or data.",
      },
      {
        name: 'Convert to Excel',
        text: "Click the 'PDF to Excel' button to extract data.",
      },
      {
        name: 'Wait for processing',
        text: 'Tables and data are extracted from your PDF.',
      },
      {
        name: 'Download XLSX',
        text: 'Download your editable Excel spreadsheet.',
      },
    ],
  },

  'pdf-to-ppt': {
    title: 'PDF to PowerPoint Converter Free | Convert PDF to PPTX Online',
    description:
      'Convert PDF to PowerPoint (PPTX) online for free. Transform PDF slides into editable presentations. Works with Microsoft PowerPoint and Google Slides.',
    keywords:
      'pdf smart, pdfsmart, smart pdf, pdf to ppt, pdf to powerpoint, convert pdf to ppt, pdf to pptx, pdf to powerpoint converter, pdf to ppt converter free, pdf to powerpoint online free, convert pdf to powerpoint, pdf to slides, pdf to presentation, pdf to ppt converter online',
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
    faqItems: [
      {
        question: 'How are PDF pages converted to slides?',
        answer:
          'Each PDF page becomes one PowerPoint slide, preserving the visual layout.',
      },
      {
        question: 'Can I edit the slides after conversion?',
        answer:
          'Yes, the output PPTX file is fully editable in PowerPoint and Google Slides.',
      },
      {
        question: 'Is this conversion free?',
        answer:
          'Yes, completely free. No sign-up, no watermarks, no limits.',
      },
      {
        question: 'What about animations and transitions?',
        answer:
          "Since PDFs don't contain animations, the slides will be static. You can add transitions after conversion.",
      },
    ],
    howToSteps: [
      {
        name: 'Upload your PDF',
        text: "Click 'Choose Files' or drag and drop the PDF you want to convert.",
      },
      {
        name: 'Convert to PowerPoint',
        text: "Click the 'PDF to PowerPoint' button to start conversion.",
      },
      {
        name: 'Wait for processing',
        text: 'Each PDF page is converted to a slide.',
      },
      {
        name: 'Download PPTX',
        text: 'Download your editable PowerPoint presentation.',
      },
    ],
  },

  'pdf-to-text': {
    title: 'PDF to Text Converter Free | Extract Text from PDF Online',
    description:
      'Extract text from PDF files online for free. Convert PDF documents to plain text (.txt) files. Perfect for copying content, indexing, and text analysis.',
    keywords:
      'pdf smart, pdfsmart, smart pdf, pdf to text, extract text from pdf, pdf to txt, pdf text extractor, copy text from pdf, pdf to text converter free, convert pdf to text, pdf to text online free, pdf text extraction, get text from pdf',
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
    faqItems: [
      {
        question: 'Will the text formatting be preserved?',
        answer:
          'The tool extracts plain text content. Formatting like bold, italic, and fonts are not preserved in .txt files.',
      },
      {
        question: 'Can I extract text from scanned PDFs?',
        answer:
          'For scanned PDFs, use our OCR PDF tool first to add a searchable text layer.',
      },
      {
        question: 'Is this free?',
        answer:
          'Yes, completely free with no limits. No sign-up needed.',
      },
      {
        question: 'What encoding is the output?',
        answer:
          'The text file uses UTF-8 encoding, supporting international characters.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload your PDF',
        text: "Click 'Choose Files' or drag and drop the PDF to extract text from.",
      },
      {
        name: 'Extract text',
        text: "Click the 'PDF to Text' button to start extraction.",
      },
      {
        name: 'Wait for processing',
        text: 'All text content is extracted from your PDF.',
      },
      {
        name: 'Download TXT',
        text: 'Download your plain text (.txt) file.',
      },
    ],
  },

  'rotate-pdf': {
    title: 'Rotate PDF Online Free | Turn & Flip PDF Pages',
    description:
      'Rotate PDF pages online for free. Rotate all pages by 90, 180, or 270 degrees. Fix sideways or upside-down PDF documents instantly — 100% private, no uploads.',
    keywords:
      'pdf smart, pdfsmart, smart pdf, rotate pdf, rotate pdf online, rotate pdf pages, flip pdf, rotate pdf free, rotate pdf permanently, rotate pdf pages online free, turn pdf sideways, rotate pdf 90 degrees, pdf rotator, rotate pdf online free',
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
    faqItems: [
      {
        question: 'Can I rotate specific pages?',
        answer:
          'Currently, all pages are rotated by the same angle. For selective rotation, process the PDF multiple times with different page ranges using Split and Merge.',
      },
      {
        question: 'Will rotation affect quality?',
        answer:
          'No. Rotation is a lossless operation — all content, text, and images remain exactly as they were.',
      },
      {
        question: 'Can I rotate a PDF on my phone?',
        answer:
          'Yes, our tool works on any device with a modern browser.',
      },
      {
        question: 'What rotation angles are available?',
        answer:
          "You can rotate by 90\u00B0 clockwise, 180\u00B0 (upside down), or 270\u00B0 (90\u00B0 counter-clockwise).",
      },
    ],
    howToSteps: [
      {
        name: 'Upload your PDF',
        text: "Click 'Choose Files' or drag and drop the PDF you want to rotate.",
      },
      {
        name: 'Select rotation angle',
        text: "Choose 90\u00B0, 180\u00B0, or 270\u00B0 rotation.",
      },
      {
        name: 'Rotate PDF',
        text: "Click the 'Rotate PDF' button to apply the rotation.",
      },
      {
        name: 'Download result',
        text: 'Download your rotated PDF file.',
      },
    ],
  },

  'watermark-pdf': {
    title: 'Watermark PDF Online Free | Add Text Stamps to PDF',
    description:
      'Add text watermarks to PDF documents online for free. Customize your watermark text to protect and brand your documents. 100% private — no uploads.',
    keywords:
      'pdf smart, pdfsmart, smart pdf, watermark pdf, add watermark to pdf, pdf watermark, watermark pdf online free, stamp pdf, add text to pdf, pdf watermark tool, text watermark pdf, watermark pdf free, add watermark to pdf online, pdf stamp tool',
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
    faqItems: [
      {
        question: 'Can I customize the watermark appearance?',
        answer:
          'Enter any text you want. The watermark appears diagonally across each page.',
      },
      {
        question: 'Is the watermark on every page?',
        answer:
          'Yes, the watermark is applied to all pages in the PDF.',
      },
      {
        question: 'Can I remove a watermark later?',
        answer:
          'Watermarks applied by this tool are permanently embedded. Keep your original unwatermarked file as a backup.',
      },
      {
        question: 'Will the watermark cover my content?',
        answer:
          'The watermark is semi-transparent and placed diagonally so your content remains readable.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload your PDF',
        text: "Click 'Choose Files' or drag and drop the PDF to watermark.",
      },
      {
        name: 'Enter watermark text',
        text: 'Type the text you want as a watermark (e.g., CONFIDENTIAL, DRAFT).',
      },
      {
        name: 'Apply watermark',
        text: "Click the 'Add Watermark' button to stamp every page.",
      },
      {
        name: 'Download result',
        text: 'Download your watermarked PDF.',
      },
    ],
  },

  'delete-pdf-pages': {
    title: 'Delete PDF Pages Online Free | Remove Pages from PDF',
    description:
      'Delete specific pages from a PDF online for free. Remove unwanted pages by page number. Fast, private PDF page remover — no uploads, runs in your browser.',
    keywords:
      'pdf smart, pdfsmart, smart pdf, delete pdf pages, remove pages from pdf, delete pages from pdf online free, pdf page remover, remove pdf pages, extract pages from pdf, delete pages in pdf, remove pdf pages online free, pdf page deleter',
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
    faqItems: [
      {
        question: 'Can I delete multiple pages at once?',
        answer:
          "Yes, enter comma-separated page numbers like '2, 4, 6' to remove multiple pages.",
      },
      {
        question: 'Will the remaining pages be renumbered?',
        answer:
          'Yes, the remaining pages are automatically renumbered in sequence.',
      },
      {
        question: 'Can I undo page deletion?',
        answer:
          'No, the deletion is permanent in the output file. Your original file is never modified.',
      },
      {
        question: 'What if I enter an invalid page number?',
        answer:
          'The tool validates your input and warns you if any page number is out of range.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload your PDF',
        text: "Click 'Choose Files' or drag and drop the PDF to edit.",
      },
      {
        name: 'Enter page numbers',
        text: 'Type the page numbers to delete, separated by commas (e.g., 2, 4, 6).',
      },
      {
        name: 'Delete pages',
        text: "Click the 'Delete Pages' button to remove the specified pages.",
      },
      {
        name: 'Download result',
        text: 'Download the PDF with the selected pages removed.',
      },
    ],
  },

  'reorder-pdf-pages': {
    title: 'Reorder PDF Pages Online Free | Rearrange PDF Page Order',
    description:
      'Rearrange PDF page order online for free. Define a custom page sequence to reorganize your PDF document. 100% private — no uploads, all processing in your browser.',
    keywords:
      'pdf smart, pdfsmart, smart pdf, reorder pdf pages, rearrange pdf pages, organize pdf pages, reorder pdf online free, rearrange pages in pdf, change pdf page order, reorganize pdf free, reorder pdf, sort pdf pages, pdf page organizer',
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
    faqItems: [
      {
        question: 'How do I specify the new page order?',
        answer:
          "Enter page numbers separated by commas in the desired order. For example, '3,1,2' puts page 3 first, then page 1, then page 2.",
      },
      {
        question: "What happens to pages I don't list?",
        answer:
          'Pages not included in your sequence will be omitted from the output.',
      },
      {
        question: 'Can I duplicate pages?',
        answer:
          'Yes, you can include the same page number multiple times to duplicate it.',
      },
      {
        question: 'Is the original file modified?',
        answer:
          'No, a new PDF is created with the reordered pages. Your original file is untouched.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload your PDF',
        text: "Click 'Choose Files' or drag and drop the PDF to reorder.",
      },
      {
        name: 'Enter new page order',
        text: 'Type the page numbers in your desired sequence (e.g., 3,1,2,5,4).',
      },
      {
        name: 'Reorder pages',
        text: "Click the 'Reorder Pages' button to create the new arrangement.",
      },
      {
        name: 'Download result',
        text: 'Download your PDF with the new page order.',
      },
    ],
  },

  'protect-pdf': {
    title: 'Protect PDF with Password | Encrypt PDF Online Free',
    description:
      'Password-protect your PDF files online for free. Add AES-128 encryption to prevent unauthorized access. Secure contracts, financials, and personal documents — 100% private.',
    keywords:
      'pdf smart, pdfsmart, smart pdf, protect pdf, password protect pdf, lock pdf, encrypt pdf, pdf password protection, protect pdf online free, add password to pdf, encrypt pdf online free, pdf encryption tool, secure pdf, lock pdf with password, password protect pdf free',
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
      {
        question: 'What encryption standard is used?',
        answer:
          'We use AES-128 encryption, a widely trusted standard for document security.',
      },
      {
        question: 'Will the encrypted PDF work everywhere?',
        answer:
          'Yes, password-protected PDFs are compatible with all major PDF readers including Adobe Acrobat, Preview, and browser-based viewers.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload your PDF',
        text: "Click 'Choose Files' or drag and drop the PDF you want to protect.",
      },
      {
        name: 'Set a password',
        text: 'Enter and confirm a strong password (minimum 4 characters).',
      },
      {
        name: 'Encrypt PDF',
        text: "Click the 'Protect PDF' button to apply AES-128 encryption.",
      },
      {
        name: 'Download protected file',
        text: 'Download your password-protected PDF.',
      },
    ],
  },

  'unlock-pdf': {
    title: 'Unlock PDF Online Free | Remove PDF Password Protection',
    description:
      'Unlock password-protected PDF files online for free. Remove PDF password restrictions to enable editing, printing, and copying. 100% private — runs in your browser.',
    keywords:
      'pdf smart, pdfsmart, smart pdf, unlock pdf, remove pdf password, unlock pdf online free, pdf password remover, unprotect pdf, remove password from pdf, pdf unlocker, unlock pdf online, remove pdf protection, pdf password remover free, unlock pdf free',
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
    faqItems: [
      {
        question: 'Do I need the password?',
        answer:
          'Yes, you must know the original password to unlock a PDF. This tool cannot crack or bypass passwords.',
      },
      {
        question: 'What restrictions does unlocking remove?',
        answer:
          'Unlocking removes all restrictions including editing, printing, and copying limitations.',
      },
      {
        question: 'Is it legal to unlock a PDF?',
        answer:
          'Yes, if you are the owner or have authorization to access the document.',
      },
      {
        question: 'Can I unlock multiple PDFs?',
        answer:
          'Process one PDF at a time. Upload, unlock, download, and repeat.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload protected PDF',
        text: "Click 'Choose Files' or drag and drop the password-protected PDF.",
      },
      {
        name: 'Enter password',
        text: 'Type the PDF password to decrypt the file.',
      },
      {
        name: 'Unlock PDF',
        text: "Click the 'Unlock PDF' button to remove the password protection.",
      },
      {
        name: 'Download unlocked file',
        text: 'Download the PDF without any password restrictions.',
      },
    ],
  },

  'ocr-pdf': {
    title: 'OCR PDF Online Free | Make Scanned PDFs Searchable',
    description:
      'OCR scanned PDF documents online for free. Convert non-selectable PDFs into searchable, selectable text using Tesseract.js. 100% private — no uploads, runs in your browser.',
    keywords:
      'pdf smart, pdfsmart, smart pdf, ocr pdf, pdf ocr, make pdf searchable, ocr pdf online free, scanned pdf to text, text recognition pdf, searchable pdf, ocr pdf free, optical character recognition pdf, pdf ocr online, convert scanned pdf to text, ocr pdf converter',
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
      {
        question: 'How accurate is the OCR?',
        answer:
          'The OCR uses Tesseract.js which provides high accuracy for clearly printed English text. Handwritten text may not be recognized.',
      },
      {
        question: 'Will the OCR change how my PDF looks?',
        answer:
          'No, the original page appearance is preserved. An invisible text layer is added on top of the page images.',
      },
      {
        question: "Can I search the OCR'd PDF?",
        answer:
          'Yes, after OCR processing, you can use Ctrl+F to search for text within the PDF.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload scanned PDF',
        text: "Click 'Choose Files' or drag and drop the scanned PDF to process.",
      },
      {
        name: 'Start OCR',
        text: "Click the 'OCR PDF' button to begin text recognition.",
      },
      {
        name: 'Wait for processing',
        text: 'The tool analyzes each page and recognizes text characters. This may take a minute for large documents.',
      },
      {
        name: 'Download searchable PDF',
        text: 'Download your PDF with the added searchable text layer.',
      },
    ],
  },

  'redact-pdf': {
    title: 'Redact PDF Online Free | Permanently Remove Sensitive Info',
    description:
      'Redact PDF documents online for free. Draw black boxes over sensitive text, images, and graphics to permanently remove information. Ideal for legal and compliance — 100% private.',
    keywords:
      'pdf smart, pdfsmart, smart pdf, redact pdf, redact pdf online free, black out text in pdf, pdf redaction tool, remove sensitive information pdf, censor pdf, pdf redaction, blackout pdf, redact pdf free, hide text in pdf, pdf redactor online',
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
      {
        question: 'Can I undo redaction?',
        answer:
          'No. Redaction is permanent and irreversible — the content under redaction boxes is completely destroyed.',
      },
      {
        question: 'Does redaction work on scanned PDFs?',
        answer:
          'Yes, the tool renders pages as images and applies black fills over your selected areas, regardless of the content type.',
      },
      {
        question: 'Is this suitable for legal documents?',
        answer:
          'Yes, our redaction permanently removes content. However, always verify the output to ensure all sensitive information is fully covered.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload your PDF',
        text: "Click 'Choose Files' or drag and drop the PDF containing sensitive information.",
      },
      {
        name: 'Draw redaction boxes',
        text: 'Use the interactive editor to draw black boxes over areas you want to permanently remove.',
      },
      {
        name: 'Apply redaction',
        text: "Click the 'Redact PDF' button to permanently remove the selected content.",
      },
      {
        name: 'Download redacted PDF',
        text: 'Download your PDF with sensitive information permanently removed.',
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

export function getPdfToolSeoContent(toolId: string) {
  const seo = PDF_TOOL_SEO[toolId];
  if (!seo) return undefined;

  // Build related tools list (all PDF tools except current)
  const allToolIds = Object.keys(PDF_TOOL_SEO);
  const relatedTools = allToolIds
    .filter((id) => id !== toolId)
    .slice(0, 8)
    .map((id) => {
      const t = PDF_TOOL_SEO[id];
      return {
        name: t.applicationName,
        href: `/tools/${id}`,
        color: '#e74c3c',
        description: t.description.split('.')[0] + '.',
      };
    });

  return {
    howToSteps: seo.howToSteps,
    faqItems: seo.faqItems,
    relatedTools,
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '2847',
      bestRating: '5',
      worstRating: '1',
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

  // HowTo schema (for tools with how-to steps)
  if (seo.howToSteps && seo.howToSteps.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to ${seo.applicationName.replace(' Tool', '').replace('PDF ', '')} a PDF`,
      description: seo.description,
      step: seo.howToSteps.map((step, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: step.name,
        text: step.text,
      })),
      tool: {
        '@type': 'HowToTool',
        name: seo.applicationName,
      },
    });
  }

  return schemas;
}
