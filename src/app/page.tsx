import type { Metadata } from 'next';
import { tools } from '@/lib/tools';
import ToolGrid from '@/components/ToolGrid';
import Link from 'next/link';
import { JsonLdScripts } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'iLovePDF Pink — Free Online PDF & Image Tools | Merge, Split, Compress, Convert',
  description:
    'Free, private, local PDF & image tools. Merge, split, compress, convert PDFs. Compress, resize, crop, convert images — all processed locally in your browser. No uploads, no cloud, no sign-up.',
  keywords:
    'PDF tools, merge PDF, split PDF, compress PDF, PDF to Word, PDF to JPG, convert PDF, image tools, compress image, resize image, crop image, free PDF tools, online PDF editor, ilovepdf',
  alternates: {
    canonical: 'https://www.ilovepdfpink.com',
  },
  openGraph: {
    title: 'iLovePDF Pink — Free Online PDF & Image Tools',
    description:
      'Merge, split, compress, convert, and edit PDFs for free. 100% private — all processing happens locally in your browser.',
    type: 'website',
    url: 'https://www.ilovepdfpink.com',
    siteName: 'iLovePDF Pink',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iLovePDF Pink — Free Online PDF & Image Tools',
    description:
      'Merge, split, compress, convert, and edit PDFs for free. 100% private — runs locally in your browser.',
  },
};

const features = [
  {
    icon: '🔒',
    title: '100% Private & Secure',
    description:
      'Your files never leave your computer. All processing happens locally in your browser — no uploads, no cloud servers, no data collection.',
  },
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description:
      'No waiting for server uploads and downloads. Files are processed instantly on your machine using modern browser APIs.',
  },
  {
    icon: '💰',
    title: 'Completely Free',
    description:
      'Every tool is free to use with no hidden limits, no watermarks, and no sign-up required. Use as much as you need.',
  },
  {
    icon: '🌐',
    title: 'Works Offline',
    description:
      'Once loaded, our tools work without an internet connection. Process your PDFs anywhere, anytime — even on a plane.',
  },
  {
    icon: '📱',
    title: 'Any Device, Any Browser',
    description:
      'Works on desktop, tablet, and mobile. Compatible with Chrome, Firefox, Safari, Edge, and all modern browsers.',
  },
  {
    icon: '🛡️',
    title: 'No Installation Required',
    description:
      'No software to download or install. Open your browser, pick a tool, and start working with your PDFs immediately.',
  },
];

const popularTools = [
  {
    id: 'merge-pdf',
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into a single document. Drag and drop to reorder pages before merging. Perfect for assembling reports, portfolios, and presentations from multiple sources.',
  },
  {
    id: 'compress-pdf',
    title: 'Compress PDF',
    description: 'Reduce your PDF file size by up to 90% while maintaining readable quality. Choose between maximum compression for email attachments or light compression that preserves selectable text.',
  },
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    description: 'Convert PDF documents to editable Word (.docx) files. Text, headings, and formatting are preserved so you can edit your documents in Microsoft Word or Google Docs.',
  },
  {
    id: 'split-pdf',
    title: 'Split PDF',
    description: 'Extract specific page ranges from a PDF to create a new, smaller document. Ideal for pulling out individual chapters, sections, or pages from large documents.',
  },
  {
    id: 'protect-pdf',
    title: 'Protect PDF',
    description: 'Add AES-128 password encryption to your PDF files. Prevent unauthorized access to sensitive documents like contracts, financial records, and personal information.',
  },
  {
    id: 'redact-pdf',
    title: 'Redact PDF',
    description: 'Permanently remove sensitive information from PDFs by drawing black boxes over text, images, and graphics. Ideal for legal documents, government filings, and privacy compliance.',
  },
];

const faqs = [
  {
    question: 'Is it really free to use?',
    answer:
      'Yes, all tools are completely free with no limits, no watermarks, and no account required. There are no premium tiers or hidden charges.',
  },
  {
    question: 'Are my files safe?',
    answer:
      'Absolutely. Your files are processed entirely in your browser and never leave your computer. We don\'t upload, store, or have access to any of your documents. Once you close the tab, all data is gone.',
  },
  {
    question: 'What file size limits are there?',
    answer:
      'Since everything runs locally in your browser, there are no server-imposed file size limits. Performance depends on your device\'s memory and processing power. Most modern devices handle files up to 100 MB without issues.',
  },
  {
    question: 'Do I need to install any software?',
    answer:
      'No installation is needed. Our tools run directly in your web browser using modern JavaScript APIs. Just open the website and start working with your PDFs.',
  },
  {
    question: 'Which browsers are supported?',
    answer:
      'All modern browsers are supported including Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, and Brave. We recommend using the latest version for the best experience.',
  },
  {
    question: 'Can I use these tools on my phone or tablet?',
    answer:
      'Yes, our tools are fully responsive and work on mobile devices and tablets. Upload files from your device\'s file picker or cloud storage app and process them right in your mobile browser.',
  },
  {
    question: 'How does the OCR tool work?',
    answer:
      'Our OCR (Optical Character Recognition) tool uses Tesseract.js to analyze scanned PDF pages and recognize text. It creates a searchable PDF with an invisible text layer over the original page images, making the content selectable and searchable.',
  },
  {
    question: 'Is the redaction permanent?',
    answer:
      'Yes. Our Redact PDF tool permanently removes content under the redaction boxes. The original text and images are replaced with solid black fills in the output PDF — the redacted content cannot be recovered.',
  },
];

export default function HomePage() {
  const jsonLdSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Free Online PDF Tools',
      url: 'https://www.ilovepdfpink.com',
      description:
        'Free online PDF tools for merging, splitting, compressing, converting, rotating, watermarking, protecting, and redacting PDFs. 100% private — all processing happens in your browser.',
      isPartOf: {
        '@type': 'WebSite',
        name: 'iLovePDF Pink',
        url: 'https://www.ilovepdfpink.com',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <>
      <JsonLdScripts schemas={jsonLdSchemas} />
      {/* ═══════ HERO ═══════ */}
      <section className="bg-gradient-to-b from-white to-gray-50 pt-16 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-5">
            Every tool you need to work with PDFs
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            Merge, split, compress, convert, rotate, unlock, redact, and
            watermark — all processed locally on your device. Your files never
            leave your computer.
          </p>
        </div>
      </section>

      {/* ═══════ TOOL GRID — Tabbed Filter ═══════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <ToolGrid tools={tools} />
      </section>

      {/* ═══════ WHY CHOOSE US — Features ═══════ */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Why choose IL PDF?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              The privacy-first PDF toolkit trusted by users who care about
              security, speed, and simplicity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              How it works
            </h2>
            <p className="text-gray-500">
              Three simple steps to process any PDF
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Pick a tool',
                description:
                  'Choose from our suite of PDF tools — merge, split, compress, convert, redact, and more.',
              },
              {
                step: '2',
                title: 'Upload your file',
                description:
                  'Drag and drop your PDF or click to browse. Your file stays on your device the entire time.',
              },
              {
                step: '3',
                title: 'Download the result',
                description:
                  'Processing happens instantly in your browser. Download your finished file with one click.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-red-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ POPULAR TOOLS — Detailed SEO Content ═══════ */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Popular PDF tools
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Our most-used tools with detailed descriptions of what each one
              can do for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((pt) => {
              const tool = tools.find((t) => t.id === pt.id);
              return (
                <Link
                  key={pt.id}
                  href={`/tools/${pt.id}`}
                  className="group block bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all"
                >
                  {tool && (
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${tool.color}15` }}
                    >
                      <span dangerouslySetInnerHTML={{ __html: tool.icon }} />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors mb-2">
                    {pt.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {pt.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ TRUST BANNER ═══════ */}
      <section className="bg-gray-900 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            The PDF toolkit built for privacy
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Unlike cloud-based PDF tools, IL PDF processes everything locally in
            your browser. Your sensitive documents, contracts, financial records,
            and personal files never touch our servers — because we don&apos;t have any.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-300">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium">Client-Side Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm font-medium">No Data Collection</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Works Offline</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-medium">Instant Processing</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ ABOUT ═══════ */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-5">
                About IL PDF
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>
                  IL PDF is a comprehensive, privacy-focused PDF toolkit
                  designed for individuals and professionals who value data
                  security. Every tool runs entirely in your browser using
                  cutting-edge web technologies — no server, no cloud, no
                  compromise.
                </p>
                <p>
                  Built with modern web standards including WebAssembly and the
                  Canvas API, our tools deliver desktop-grade PDF processing
                  performance right in your browser tab. From simple tasks like
                  merging and splitting to advanced operations like OCR text
                  recognition and permanent redaction, IL PDF handles it all.
                </p>
                <p>
                  We believe that working with your documents should be simple,
                  fast, and private. That&apos;s why IL PDF will always be free,
                  with no accounts, no tracking, and no data collection.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-50 rounded-xl p-6 text-center border border-red-100">
                <div className="text-3xl font-bold text-red-600 mb-1">{tools.length}+</div>
                <div className="text-sm text-gray-600 font-medium">PDF Tools</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-1">0</div>
                <div className="text-sm text-gray-600 font-medium">Files Uploaded</div>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100">
                <div className="text-3xl font-bold text-green-600 mb-1">100%</div>
                <div className="text-sm text-gray-600 font-medium">Client-Side</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 text-center border border-purple-100">
                <div className="text-3xl font-bold text-purple-600 mb-1">Free</div>
                <div className="text-sm text-gray-600 font-medium">Forever</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Frequently asked questions
            </h2>
            <p className="text-gray-500">
              Everything you need to know about IL PDF
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to work with your PDFs?
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Pick a tool above or start with our most popular options below. No
            sign-up, no installation — just fast, private PDF processing.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/tools/merge-pdf"
              className="px-6 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
            >
              Merge PDF
            </Link>
            <Link
              href="/tools/compress-pdf"
              className="px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors"
            >
              Compress PDF
            </Link>
            <Link
              href="/tools/pdf-to-word"
              className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 transition-colors"
            >
              PDF to Word
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
