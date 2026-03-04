import type { Metadata } from 'next';
import { JsonLdScripts } from '@/components/JsonLd';
import RemoveBgClient from './RemoveBgClient';

const DOMAIN = 'https://www.ilovepdfpink.com';

export const metadata: Metadata = {
  title: 'Remove Background from Image — Free Background Remover',
  description:
    'Remove image background online for free. AI-powered background remover that works instantly in your browser. Remove bg from any photo — 100% private, no uploads.',
  keywords:
    'remove bg, background remover, bg remove, remove background, bg remover, remove image background, background eraser, delete background from photo, transparent background',
  alternates: {
    canonical: `${DOMAIN}/image/remove-bg`,
  },
  openGraph: {
    title: 'Remove Background from Image — Free Background Remover',
    description:
      'Remove background from any image instantly. AI-powered, free, and private — no uploads required.',
    type: 'website',
    url: `${DOMAIN}/image/remove-bg`,
    siteName: 'iLovePDF Pink',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remove Background from Image — Free Background Remover',
    description:
      'Remove background from any image instantly. AI-powered, free, and private.',
  },
};

const faqs = [
  {
    question: 'How does the background remover work?',
    answer:
      'Our tool uses advanced AI models that run directly in your browser. The AI analyzes your image and separates the foreground subject from the background, creating a clean cutout with a transparent background.',
  },
  {
    question: 'Is this background remover really free?',
    answer:
      'Yes, 100% free with no limits, no sign-up, and no watermarks. All processing happens in your browser — your images are never uploaded to any server.',
  },
  {
    question: 'What image formats are supported?',
    answer:
      'You can upload JPG, JPEG, PNG, and WebP images. The output is always a PNG file with a transparent background.',
  },
  {
    question: 'How long does background removal take?',
    answer:
      'Most images are processed in 5-15 seconds depending on image size. The first time you use the tool, it needs to download the AI model (about 20MB), which may take a few extra seconds.',
  },
  {
    question: 'Are my images uploaded to a server?',
    answer:
      'No. All processing happens entirely in your browser using WebAssembly and ONNX models. Your images never leave your device — we have no servers to upload to.',
  },
  {
    question: 'Can I use this for e-commerce product photos?',
    answer:
      'Absolutely! Our background remover is perfect for creating clean product images with transparent backgrounds for online stores, marketplaces like Amazon and eBay, and social media.',
  },
];

const features = [
  {
    icon: '⚡',
    title: 'Instant Results',
    description: 'Background removed in seconds using AI running directly in your browser.',
  },
  {
    icon: '🔒',
    title: '100% Private',
    description: 'Your images never leave your device. No uploads, no cloud processing.',
  },
  {
    icon: '💰',
    title: 'Completely Free',
    description: 'No limits, no sign-up, no watermarks. Use as much as you need.',
  },
  {
    icon: '✨',
    title: 'High Quality',
    description: 'AI-powered edge detection for clean, professional cutouts.',
  },
];

const useCases = [
  {
    title: 'E-commerce Product Photos',
    description: 'Create clean product images with transparent backgrounds for your online store.',
    image: '🛒',
  },
  {
    title: 'Professional Headshots',
    description: 'Remove backgrounds from portrait photos for LinkedIn, resumes, and profiles.',
    image: '👤',
  },
  {
    title: 'Social Media Graphics',
    description: 'Design eye-catching posts and stories with subjects on transparent backgrounds.',
    image: '📱',
  },
  {
    title: 'Marketing Materials',
    description: 'Prepare images for banners, flyers, and promotional content.',
    image: '📢',
  },
  {
    title: 'Logo & Graphic Design',
    description: 'Extract logos and graphics from images for design projects.',
    image: '🎨',
  },
  {
    title: 'Presentations',
    description: 'Create professional slides with clean, background-free images.',
    image: '📊',
  },
];

export default function RemoveBgPage() {
  const jsonLdSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Background Remover',
      url: `${DOMAIN}/image/remove-bg`,
      applicationCategory: 'Multimedia',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'AI-powered background removal',
        'Works with JPG, PNG, and WebP images',
        'Instant processing in browser',
        'Download as PNG with transparent background',
        '100% client-side, images never leave your device',
      ],
      description:
        'Remove image background online for free. AI-powered background remover that works instantly in your browser.',
      browserRequirements: 'Requires a modern web browser with JavaScript enabled',
      author: {
        '@type': 'Organization',
        name: 'iLovePDF Pink',
        url: DOMAIN,
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
          item: DOMAIN,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Image Tools',
          item: `${DOMAIN}/image`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Remove Background',
          item: `${DOMAIN}/image/remove-bg`,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLdScripts schemas={jsonLdSchemas} />
      <RemoveBgClient faqs={faqs} features={features} useCases={useCases} />
    </>
  );
}