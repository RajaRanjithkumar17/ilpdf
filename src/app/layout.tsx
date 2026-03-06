import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ilovepdfpink.com'),
  title: {
    default: 'iLovePDF Pink — Free Online PDF & Image Tools | Merge, Split, Compress, Convert',
    template: '%s | iLovePDF Pink',
  },
  description:
    'Free, private, local PDF & image tools. Merge, split, compress, convert PDFs. Compress, resize, crop, convert images — all processed locally in your browser. No uploads, no cloud, no sign-up.',
  keywords:
    'PDF tools, merge PDF, split PDF, compress PDF, PDF to Word, PDF to JPG, convert PDF, image tools, compress image, image compressor, photo compressor, webp to jpg, heic to jpg, resize image, crop image, free PDF tools, free image tools, online PDF editor, online image editor, ilovepdf',
  alternates: {
    canonical: 'https://www.ilovepdfpink.com',
  },
  openGraph: {
    title: 'iLovePDF Pink — Free Online PDF Tools',
    description:
      'Merge, split, compress, convert, and edit PDFs for free. 100% private — all processing happens locally in your browser.',
    type: 'website',
    url: 'https://www.ilovepdfpink.com',
    siteName: 'iLovePDF Pink',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iLovePDF Pink — Free Online PDF Tools',
    description:
      'Merge, split, compress, convert, and edit PDFs for free. 100% private — runs locally in your browser.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'VDPSNxRwcP9OTIH0w1-DJhlO1XR7HZIesT6ZgnhKAr4',
  },
  icons: {
    icon: '/favicon.png',
  },
  publisher: 'iLovePDF Pink',
};

const footerTools = [
  { name: 'Merge PDF', href: '/tools/merge-pdf' },
  { name: 'Split PDF', href: '/tools/split-pdf' },
  { name: 'Compress PDF', href: '/tools/compress-pdf' },
  { name: 'PDF to Word', href: '/tools/pdf-to-word' },
  { name: 'PDF to JPG', href: '/tools/pdf-to-jpg' },
  { name: 'Rotate PDF', href: '/tools/rotate-pdf' },
];

const footerConvert = [
  { name: 'JPG to PDF', href: '/tools/jpg-to-pdf' },
  { name: 'PDF to Excel', href: '/tools/pdf-to-excel' },
  { name: 'PDF to PowerPoint', href: '/tools/pdf-to-ppt' },
  { name: 'PDF to Text', href: '/tools/pdf-to-text' },
];

const footerMore = [
  { name: 'Watermark PDF', href: '/tools/watermark-pdf' },
  { name: 'Protect PDF', href: '/tools/protect-pdf' },
  { name: 'Unlock PDF', href: '/tools/unlock-pdf' },
  { name: 'Delete Pages', href: '/tools/delete-pdf-pages' },
  { name: 'Reorder Pages', href: '/tools/reorder-pdf-pages' },
  { name: 'Redact PDF', href: '/tools/redact-pdf' },
  { name: 'OCR PDF', href: '/tools/ocr-pdf' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'iLovePDF Pink',
              url: 'https://www.ilovepdfpink.com',
              description:
                'Free, privacy-first PDF and image tools. All processing happens locally in your browser.',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'iLovePDF Pink',
              url: 'https://www.ilovepdfpink.com',
              description:
                'Free online PDF and image tools. Merge, split, compress, convert PDFs. Compress, resize, crop images. 100% private.',
            }),
          }}
        />
        <Header />

        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 pt-14 pb-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Footer grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 pb-10 border-b border-gray-800">
              {/* Popular tools */}
              <div>
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">
                  Popular Tools
                </h4>
                <ul className="space-y-2.5">
                  {footerTools.map((t) => (
                    <li key={t.href}>
                      <Link
                        href={t.href}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Convert */}
              <div>
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">
                  Convert
                </h4>
                <ul className="space-y-2.5">
                  {footerConvert.map((t) => (
                    <li key={t.href}>
                      <Link
                        href={t.href}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* More tools */}
              <div>
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">
                  More Tools
                </h4>
                <ul className="space-y-2.5">
                  {footerMore.map((t) => (
                    <li key={t.href}>
                      <Link
                        href={t.href}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image Tools */}
              <div>
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">
                  Image Tools
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { name: 'All Image Tools', href: '/image' },
                    { name: 'Compress Image', href: '/image/compress-image' },
                    { name: 'Resize Image', href: '/image/resize-image' },
                    { name: 'Remove Background', href: '/image/remove-bg' },
                    { name: 'Crop Image', href: '/image/crop-image' },
                    { name: 'WebP to JPG', href: '/image/webp-to-jpg' },
                    { name: 'HEIC to JPG', href: '/image/heic-to-jpg' },
                    { name: 'Upscale Image', href: '/image/upscale-image' },
                    { name: 'Blur Face', href: '/image/blur-face' },
                  ].map((t) => (
                    <li key={t.href}>
                      <Link
                        href={t.href}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* About */}
              <div>
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">
                  About
                </h4>
                <ul className="space-y-2.5">
                  <li>
                    <Link href="/" className="text-sm hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <span className="text-sm">Privacy-first PDF processing</span>
                  </li>
                  <li>
                    <span className="text-sm">No cloud uploads</span>
                  </li>
                  <li>
                    <span className="text-sm">100% free, no sign-up</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-white">IL PDF</span>
                <span className="text-xs text-gray-500">
                  Free online PDF & image tools
                </span>
              </div>
              <div className="text-xs text-gray-500 text-center sm:text-right space-y-1">
                <p>
                  All files are processed locally in your browser. Nothing is
                  uploaded to any server.
                </p>
                <p>&copy; {new Date().getFullYear()} IL PDF. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
