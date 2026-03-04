import type { Metadata } from 'next';
import { imageTools } from '@/lib/imageTools';
import ToolCard from '@/components/ToolCard';
import Link from 'next/link';
import { JsonLdScripts } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Free Online Image Tools — Compress, Resize, Convert, Crop Images',
  description:
    'Free online image tools: compress images, resize photos, convert WebP to JPG, HEIC to JPG, crop, rotate, watermark, and upscale. 100% private — all processing runs locally in your browser.',
  keywords:
    'image tools, compress image, image compressor, photo compressor, resize image, webp to jpg, heic to jpg, convert image, crop image, rotate image, free image tools, online image editor',
  alternates: {
    canonical: 'https://www.ilovepdfpink.com/image',
  },
  openGraph: {
    title: 'Free Online Image Tools — Compress, Resize, Convert, Crop',
    description:
      'Compress, resize, crop, convert, rotate, watermark, and upscale images for free. 100% private — everything runs in your browser.',
    type: 'website',
    url: 'https://www.ilovepdfpink.com/image',
    siteName: 'iLovePDF Pink',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Image Tools — iLovePDF Pink',
    description:
      'Compress, resize, crop, convert, and edit images for free. 100% private, runs in your browser.',
  },
};

const popularImageTools = [
  {
    id: 'compress-image',
    title: 'Compress Image',
    description:
      'Reduce image file size while maintaining quality. Perfect for web optimization, email attachments, and saving storage space. Supports JPG, PNG, and WebP formats.',
  },
  {
    id: 'resize-image',
    title: 'Resize Image',
    description:
      'Change image dimensions to any custom size. Ideal for social media posts, website banners, profile pictures, and print-ready images.',
  },
  {
    id: 'convert-to-jpg',
    title: 'Convert to JPG',
    description:
      'Convert PNG, WebP, BMP, and other image formats to universally compatible JPG. Adjustable quality slider lets you balance file size and visual quality.',
  },
  {
    id: 'rotate-image',
    title: 'Rotate Image',
    description:
      'Rotate images by 90, 180, or 270 degrees. Fix sideways or upside-down photos instantly without any quality loss.',
  },
  {
    id: 'crop-image',
    title: 'Crop Image',
    description:
      'Crop images to the perfect size with an interactive editor. Choose from preset aspect ratios like 1:1, 4:3, and 16:9, or draw a custom crop area.',
  },
  {
    id: 'upscale-image',
    title: 'Upscale Image',
    description:
      'Enhance image resolution with AI-powered upscaling. Enlarge small or low-resolution images while preserving details and sharpness.',
  },
];

const faqs = [
  {
    question: 'What image formats are supported?',
    answer:
      'Our tools support all major image formats including JPG/JPEG, PNG, WebP, BMP, TIFF, GIF, and HEIC/HEIF. Different tools may support different format combinations depending on the operation.',
  },
  {
    question: 'Is there a file size limit?',
    answer:
      'Since everything runs locally in your browser, there are no server-imposed limits. Performance depends on your device — most modern devices handle images up to 50 MB without issues.',
  },
  {
    question: 'Are my images uploaded anywhere?',
    answer:
      'No. All image processing happens entirely in your browser using the Canvas API and WebAssembly. Your images never leave your device — we have no servers to upload to.',
  },
  {
    question: 'Will I lose image quality?',
    answer:
      'It depends on the tool. Lossless operations like rotate, crop, and resize to PNG preserve full quality. Compression and JPG conversion use adjustable quality sliders so you control the tradeoff.',
  },
  {
    question: 'Can I process multiple images at once?',
    answer:
      'Yes, tools like Compress Image, Convert to JPG, and Rotate Image support batch processing. Upload multiple files and they will all be processed together.',
  },
];

export default function ImageHomePage() {
  const jsonLdSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Free Online Image Tools',
      url: 'https://www.ilovepdfpink.com/image',
      description:
        'Free online image tools for compressing, resizing, cropping, converting, rotating, watermarking, and upscaling images. 100% private — all processing happens in your browser.',
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
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.ilovepdfpink.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Image Tools',
          item: 'https://www.ilovepdfpink.com/image',
        },
      ],
    },
  ];

  return (
    <>
      <JsonLdScripts schemas={jsonLdSchemas} />
      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-gray-50 pt-16 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-5">
            Every tool you need to edit images
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            Compress, resize, crop, convert, rotate, watermark, and upscale
            images — all processed locally on your device. Your files never
            leave your computer.
          </p>
        </div>
      </section>

      {/* Tool Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {imageTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              How it works
            </h2>
            <p className="text-gray-500">
              Three simple steps to process any image
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Pick a tool',
                description:
                  'Choose from our suite of image tools — compress, resize, crop, convert, rotate, and more.',
              },
              {
                step: '2',
                title: 'Upload your image',
                description:
                  'Drag and drop your image or click to browse. Your file stays on your device the entire time.',
              },
              {
                step: '3',
                title: 'Download the result',
                description:
                  'See a before/after preview with file size comparison, then download your processed image.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-green-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
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

      {/* Popular Image Tools */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Popular image tools
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Our most-used image tools with detailed descriptions of what each
              one can do for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularImageTools.map((pt) => {
              const tool = imageTools.find((t) => t.id === pt.id);
              return (
                <Link
                  key={pt.id}
                  href={tool?.href || '#'}
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
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors mb-2">
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

      {/* Trust banner */}
      <section className="bg-gray-900 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Image processing built for privacy
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Unlike cloud-based image tools, IL PDF processes everything locally
            in your browser using the Canvas API. Your photos and images never
            touch our servers — because we don&apos;t have any.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-300">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium">100% Client-Side</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm font-medium">No Uploads</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-medium">Instant Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm font-medium">Free Forever</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Frequently asked questions
            </h2>
            <p className="text-gray-500">
              Everything you need to know about our image tools
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

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to edit your images?
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Pick a tool above or start with our most popular options below. No
            sign-up, no installation — just fast, private image processing.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/image/compress-image"
              className="px-6 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
            >
              Compress Image
            </Link>
            <Link
              href="/image/resize-image"
              className="px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors"
            >
              Resize Image
            </Link>
            <Link
              href="/image/convert-to-jpg"
              className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 transition-colors"
            >
              Convert to JPG
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
