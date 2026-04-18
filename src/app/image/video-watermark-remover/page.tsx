import type { Metadata } from 'next';
import { JsonLdScripts } from '@/components/JsonLd';
import RemoveOverlayClient from './RemoveOverlayClient';

const DOMAIN = 'https://www.ilovepdfpink.com';

export const metadata: Metadata = {
  title: 'Video Watermark Remover — Free Online Tool, No Upload',
  description:
    'Remove watermarks and static overlays from videos for free. Frame-by-frame pixel reconstruction runs entirely in your browser — nothing is ever uploaded.',
  keywords:
    'video watermark remover, remove watermark from video, video logo remover, remove overlay from video, free video watermark remover, online video watermark remover, watermark eraser video, no upload video editor',
  alternates: {
    canonical: `${DOMAIN}/image/video-watermark-remover`,
  },
  openGraph: {
    title: 'Video Watermark Remover — Free & Private',
    description:
      'Remove watermarks and overlays from videos in seconds. Everything runs in your browser — no uploads, no account, completely free.',
    type: 'website',
    url: `${DOMAIN}/image/video-watermark-remover`,
    siteName: 'iLovePDF Pink',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video Watermark Remover — Free & Private',
    description:
      'Remove watermarks from videos in your browser. No uploads, no account needed.',
  },
};

const faqs = [
  {
    question: 'How does the video watermark remover work?',
    answer:
      'For every video frame we paint it onto an HTML5 Canvas, then reconstruct the watermark region using content-aware pixel blending — sampling the colours from all four surrounding edges and smoothing inward. No AI model or server is needed.',
  },
  {
    question: 'Is my video uploaded anywhere?',
    answer:
      'No. All processing uses the Canvas API and MediaRecorder entirely in your browser. Your video never leaves your device.',
  },
  {
    question: 'What video formats are supported?',
    answer:
      'You can upload MP4, MOV, and WebM files up to 500 MB and 60 seconds. The output format is MP4 or WebM depending on your browser.',
  },
  {
    question: 'Why does processing take as long as the video?',
    answer:
      'The video plays in real-time while each frame is processed through a canvas, keeping audio perfectly in sync without requiring a codec library. A 30 s clip takes roughly 30 s.',
  },
  {
    question: 'Can I reposition the removal box?',
    answer:
      'Yes — drag the purple mask box over the watermark to reposition it. Use the ↘ resize handle in the bottom-right corner to adjust its size before clicking Remove Watermark.',
  },
  {
    question: 'Will the removed area look perfect?',
    answer:
      'Results are best on uniform backgrounds, gradients, or blurred areas. The tool blends surrounding pixels inward so the fill matches the background naturally. Very complex or highly textured backgrounds may show minor artefacts.',
  },
];

const features = [
  { icon: '🔒', title: 'Private by design', description: 'Video never leaves your device.' },
  { icon: '🎯', title: 'Adjustable mask', description: 'Drag & resize to fit any watermark.' },
  { icon: '🎵', title: 'Audio preserved', description: 'Original audio track is kept intact.' },
  { icon: '🆓', title: 'Free forever', description: 'No sign-up, no limits, no watermarks added.' },
];

export default function VideoWatermarkRemoverPage() {
  const jsonLdSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Video Watermark Remover',
      url: `${DOMAIN}/image/video-watermark-remover`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
        'Drag-to-position watermark mask',
        'Content-aware pixel reconstruction',
        'Audio preserved in output',
        '100% client-side — no uploads',
        'Free, no sign-up required',
      ],
      description:
        'Remove watermarks and static overlays from videos for free. Frame-by-frame processing runs entirely in your browser.',
      browserRequirements:
        'Requires a modern browser with Canvas API and MediaRecorder support (Chrome, Firefox, Edge)',
      author: { '@type': 'Organization', name: 'iLovePDF Pink', url: DOMAIN },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: DOMAIN },
        { '@type': 'ListItem', position: 2, name: 'Image & Video Tools', item: `${DOMAIN}/image` },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Video Watermark Remover',
          item: `${DOMAIN}/image/video-watermark-remover`,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLdScripts schemas={jsonLdSchemas} />
      <RemoveOverlayClient />

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {features.map((f) => (
              <div key={f.title}>
                <div className="text-3xl mb-2">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently asked questions</h2>
            <p className="text-gray-500">Everything you need to know</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-900 hover:bg-gray-50">
                  {faq.question}
                  <svg
                    className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
