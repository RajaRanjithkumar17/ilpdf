import type { Metadata } from 'next';

const DOMAIN = 'https://www.ilovepdfpink.com';

interface FaqItem {
  question: string;
  answer: string;
}

interface ImageToolSeoData {
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

const IMAGE_TOOL_SEO: Record<string, ImageToolSeoData> = {
  'compress-image': {
    title: 'Compress Image Online Free — Reduce Photo File Size',
    description:
      'Compress images online for free. Reduce JPG, PNG, and WebP file sizes while maintaining quality. Best free image compressor and photo compressor — 100% private, no uploads.',
    keywords:
      'compress image, image compressor, photo compressor, reduce image size, compress jpg, compress png, compress photo online, image compression tool, reduce photo file size',
    canonical: `${DOMAIN}/image/compress-image`,
    ogTitle: 'Compress Image Online Free — Best Image & Photo Compressor',
    ogDescription:
      'Reduce image file sizes for free. Works with JPG, PNG, and WebP. No uploads — everything stays on your device.',
    applicationName: 'Image Compressor',
    featureList: [
      'Compress JPG, PNG, and WebP images',
      'Adjustable quality slider (10-100%)',
      'Batch compression for multiple files',
      'Before/after preview with size comparison',
      '100% client-side processing, no uploads',
    ],
    faqItems: [
      {
        question: 'How do I compress an image without losing quality?',
        answer:
          'Use the quality slider to set compression between 70-90%. This gives significant file size reduction with minimal visible quality loss. Our tool shows a before/after preview so you can verify the result.',
      },
      {
        question: 'What image formats can I compress?',
        answer:
          'Our image compressor supports JPG/JPEG, PNG, and WebP formats. You can compress multiple images at once using batch processing.',
      },
      {
        question: 'Is this image compressor really free?',
        answer:
          'Yes, 100% free with no limits, no sign-up, and no watermarks. All processing happens in your browser — your images are never uploaded to any server.',
      },
    ],
  },

  'webp-to-jpg': {
    title: 'WebP to JPG Converter — Convert WebP to JPG Online Free',
    description:
      'Convert WebP to JPG online for free. Fast, private WebP to JPG converter that works in your browser. No uploads, no sign-up. Batch convert multiple WebP images to JPG format.',
    keywords:
      'webp to jpg, convert webp to jpg, webp to jpeg, webp converter, webp to jpg converter online, change webp to jpg, free webp to jpg',
    canonical: `${DOMAIN}/image/webp-to-jpg`,
    ogTitle: 'WebP to JPG Converter — Free Online Tool',
    ogDescription:
      'Convert WebP images to JPG format instantly. Free, private, no uploads required.',
    applicationName: 'WebP to JPG Converter',
    featureList: [
      'Convert WebP images to universally compatible JPG',
      'Batch conversion for multiple files',
      'No quality loss during conversion',
      'Instant download after conversion',
      '100% client-side, no server uploads',
    ],
    faqItems: [
      {
        question: 'Why convert WebP to JPG?',
        answer:
          'While WebP offers better compression, JPG is universally supported across all devices, email clients, and applications. Converting to JPG ensures maximum compatibility.',
      },
      {
        question: 'Does converting WebP to JPG reduce quality?',
        answer:
          'The conversion preserves the visual quality of your image. JPG uses its own compression, but at high quality settings the difference is imperceptible.',
      },
      {
        question: 'Can I convert multiple WebP files at once?',
        answer:
          'Yes, our WebP to JPG converter supports batch processing. Upload multiple WebP files and they will all be converted to JPG simultaneously.',
      },
    ],
  },

  'heic-to-jpg': {
    title: 'HEIC to JPG Converter — Convert iPhone Photos to JPG Free',
    description:
      'Convert HEIC to JPG online for free. Transform iPhone HEIC/HEIF photos to universally compatible JPG format. Private, fast HEIC to JPG converter — no uploads, runs in your browser.',
    keywords:
      'heic to jpg, convert heic to jpg, heic to jpeg, heic converter, iphone photo to jpg, heif to jpg, heic to jpg converter online free',
    canonical: `${DOMAIN}/image/heic-to-jpg`,
    ogTitle: 'HEIC to JPG Converter — Convert iPhone Photos Free',
    ogDescription:
      'Convert iPhone HEIC/HEIF photos to JPG instantly. Free, private, no uploads.',
    applicationName: 'HEIC to JPG Converter',
    featureList: [
      'Convert HEIC/HEIF photos to JPG',
      'Batch conversion for multiple iPhone photos',
      'Preserves image quality and metadata',
      'Works with all iPhone and iPad photos',
      '100% client-side, photos never leave your device',
    ],
    faqItems: [
      {
        question: 'What is a HEIC file?',
        answer:
          'HEIC (High Efficiency Image Container) is the default photo format on iPhones and iPads since iOS 11. It offers better compression than JPG but is not universally supported on Windows PCs, Android devices, and many websites.',
      },
      {
        question: 'Can I convert multiple HEIC files at once?',
        answer:
          'Yes, our HEIC to JPG converter supports batch processing. Upload multiple HEIC files and they will all be converted to JPG in one go.',
      },
      {
        question: 'Will converting HEIC to JPG reduce photo quality?',
        answer:
          'The conversion maintains excellent visual quality. JPG is a well-established format that preserves photo details at high quality settings.',
      },
    ],
  },

  'resize-image': {
    title: 'Resize Image Online Free — Change Image Dimensions',
    description:
      'Resize images online for free. Change image dimensions to any custom size. Perfect for social media, web optimization, and print. Supports JPG, PNG, and WebP — 100% private.',
    keywords:
      'resize image, image resizer, resize photo, change image size, resize image online, resize photo online, image size changer, resize jpg, resize png',
    canonical: `${DOMAIN}/image/resize-image`,
    ogTitle: 'Resize Image Online Free — Change Image Dimensions',
    ogDescription:
      'Resize images to any dimension for free. Works with JPG, PNG, and WebP. No uploads needed.',
    applicationName: 'Image Resizer',
    featureList: [
      'Resize images to custom dimensions',
      'Maintain aspect ratio option',
      'Supports JPG, PNG, and WebP',
      'Instant preview of resized image',
      '100% client-side processing',
    ],
  },

  'crop-image': {
    title: 'Crop Image Online Free — Interactive Image Cropper',
    description:
      'Crop images online for free with an interactive editor. Choose from preset aspect ratios (1:1, 4:3, 16:9) or draw a custom crop area. Rule-of-thirds grid overlay for perfect composition.',
    keywords:
      'crop image, image cropper, crop photo, crop image online, crop picture, image crop tool, photo cropper, crop jpg, crop png',
    canonical: `${DOMAIN}/image/crop-image`,
    ogTitle: 'Crop Image Online Free — Interactive Image Cropper',
    ogDescription:
      'Crop images with an interactive editor. Preset aspect ratios, rule-of-thirds grid, custom crop. Free and private.',
    applicationName: 'Image Cropper',
    featureList: [
      'Interactive canvas-based crop editor',
      'Preset aspect ratios (1:1, 4:3, 16:9, etc.)',
      'Rule-of-thirds grid overlay',
      'Custom crop area selection',
      '100% client-side, no uploads',
    ],
  },

  'convert-to-jpg': {
    title: 'Convert to JPG Online Free — PNG, WebP, BMP to JPG',
    description:
      'Convert images to JPG format online for free. Transform PNG, WebP, BMP, and other formats to universally compatible JPG. Adjustable quality — 100% private, no uploads.',
    keywords:
      'convert to jpg, png to jpg, image to jpg, convert image to jpg, bmp to jpg, convert png to jpg online, image to jpeg converter',
    canonical: `${DOMAIN}/image/convert-to-jpg`,
    ogTitle: 'Convert to JPG Online Free — PNG, WebP, BMP to JPG',
    ogDescription:
      'Convert PNG, WebP, BMP images to JPG format for free. Adjustable quality, no uploads.',
    applicationName: 'Image to JPG Converter',
    featureList: [
      'Convert PNG, WebP, BMP to JPG',
      'Adjustable output quality',
      'Batch conversion support',
      'Instant download',
      '100% client-side processing',
    ],
  },

  'convert-from-jpg': {
    title: 'Convert JPG to PNG or WebP — Free JPG Converter',
    description:
      'Convert JPG images to PNG or WebP format online for free. Get transparent backgrounds with PNG or smaller file sizes with WebP. 100% private — no uploads required.',
    keywords:
      'jpg to png, jpg to webp, convert jpg, jpg converter, jpeg to png, convert jpg to png online, jpg to webp converter',
    canonical: `${DOMAIN}/image/convert-from-jpg`,
    ogTitle: 'Convert JPG to PNG or WebP — Free Online Converter',
    ogDescription:
      'Convert JPG images to PNG or WebP format for free. No uploads, runs in your browser.',
    applicationName: 'JPG Converter',
    featureList: [
      'Convert JPG to PNG format',
      'Convert JPG to WebP format',
      'Preserve image quality',
      'Instant download',
      '100% client-side processing',
    ],
  },

  'upscale-image': {
    title: 'Upscale Image Online Free — AI Image Enhancer',
    description:
      'Upscale and enhance image resolution online for free. AI-powered upscaling enlarges small or low-resolution images while preserving details. Supports JPG, PNG, and WebP.',
    keywords:
      'upscale image, image upscaler, enhance image, increase image resolution, ai upscale, image enhancer, enlarge image, upscale photo',
    canonical: `${DOMAIN}/image/upscale-image`,
    ogTitle: 'Upscale Image Online Free — AI Image Enhancer',
    ogDescription:
      'Enhance image resolution with AI-powered upscaling. Free, private, no uploads.',
    applicationName: 'Image Upscaler',
    featureList: [
      'AI-powered image upscaling',
      'Multiple upscale factors (2x, 4x)',
      'Preserves details and sharpness',
      'Supports JPG, PNG, and WebP',
      '100% client-side processing',
    ],
  },

  'watermark-image': {
    title: 'Add Watermark to Image Online Free — Image Watermark Tool',
    description:
      'Add text watermarks to images online for free. Customize font, size, color, opacity, and position. Protect your photos and artwork — 100% private, no uploads.',
    keywords:
      'watermark image, add watermark, image watermark, photo watermark, watermark tool, add text watermark, watermark photos online',
    canonical: `${DOMAIN}/image/watermark-image`,
    ogTitle: 'Add Watermark to Image Online Free',
    ogDescription:
      'Add customizable text watermarks to your images for free. No uploads needed.',
    applicationName: 'Image Watermark Tool',
    featureList: [
      'Add text watermarks to images',
      'Customizable font, size, and color',
      'Adjustable opacity and position',
      'Batch watermarking support',
      '100% client-side processing',
    ],
  },

  'rotate-image': {
    title: 'Rotate Image Online Free — 90, 180, 270 Degrees',
    description:
      'Rotate images online for free. Rotate photos by 90, 180, or 270 degrees instantly. Fix sideways or upside-down photos without quality loss. Supports JPG, PNG, and WebP.',
    keywords:
      'rotate image, rotate photo, image rotator, rotate image online, rotate picture, rotate jpg, flip image, rotate photo 90 degrees',
    canonical: `${DOMAIN}/image/rotate-image`,
    ogTitle: 'Rotate Image Online Free — 90, 180, 270 Degrees',
    ogDescription:
      'Rotate images by 90, 180, or 270 degrees for free. No uploads, no quality loss.',
    applicationName: 'Image Rotator',
    featureList: [
      'Rotate images by 90, 180, or 270 degrees',
      'No quality loss during rotation',
      'Supports JPG, PNG, and WebP',
      'Instant preview and download',
      '100% client-side processing',
    ],
  },

  'blur-face': {
    title: 'Blur Faces in Photos Online Free — Privacy Face Blur Tool',
    description:
      'Automatically detect and blur faces in photos online for free. AI-powered face detection with adjustable blur intensity. Protect privacy in images — 100% client-side.',
    keywords:
      'blur face, face blur, blur face in photo, blur faces online, face blur tool, anonymize photo, blur face privacy, face detection blur',
    canonical: `${DOMAIN}/image/blur-face`,
    ogTitle: 'Blur Faces in Photos Online Free — AI Face Blur',
    ogDescription:
      'Automatically detect and blur faces in photos for free. AI-powered, private, no uploads.',
    applicationName: 'Face Blur Tool',
    featureList: [
      'Automatic AI face detection',
      'Adjustable blur intensity',
      'Works with multiple faces',
      'Supports JPG, PNG, and WebP',
      '100% client-side, photos never leave your device',
    ],
  },

  'remove-bg': {
    title: 'Remove Background from Image — Free Background Remover',
    description:
      'Remove image backgrounds automatically in 5 seconds with just one click. Do not spend hours manually picking pixels. Upload your photo now',
    keywords:
      'remove bg, background remover, bg remove, remove background, bg remover, remove image background, background eraser, delete background from photo',
    canonical: `${DOMAIN}/image/remove-bg`,
    ogTitle: 'Remove Background from Image — Free Background Remover',
    ogDescription:
      'Remove image backgrounds automatically in 5 seconds with just one click. Do not spend hours manually picking pixels. Upload your photo now. Private — no uploads required.',
    applicationName: 'Background Remover',
    featureList: [
      'AI-powered background removal',
      'Works with JPG, PNG, and WebP images',
      'Instant processing in browser',
      'Download as PNG with transparent background',
      '100% client-side, images never leave your device',
    ],
    faqItems: [
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
    ],
  },
};

export function getImageToolMetadata(toolId: string): Metadata {
  const seo = IMAGE_TOOL_SEO[toolId];
  if (!seo) throw new Error(`No SEO data for image tool: ${toolId}`);

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

export function getImageToolJsonLd(toolId: string): object[] {
  const seo = IMAGE_TOOL_SEO[toolId];
  if (!seo) return [];

  const schemas: object[] = [];

  // WebApplication schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: seo.applicationName,
    url: seo.canonical,
    applicationCategory: 'Multimedia',
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
        name: 'Image Tools',
        item: `${DOMAIN}/image`,
      },
      {
        '@type': 'ListItem',
        position: 3,
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
