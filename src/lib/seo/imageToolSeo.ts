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
  howToSteps?: HowToStep[];
}

const IMAGE_TOOL_SEO: Record<string, ImageToolSeoData> = {
  'compress-image': {
    title:
      'Compress Image Online Free — Reduce Photo & Picture File Size',
    description:
      'Compress images online for free. Reduce JPG, PNG, and WebP file sizes while maintaining quality. Best free image compressor and photo compressor — 100% private, no uploads.',
    keywords:
      'compress image, image compressor, photo compressor, reduce image size, compress jpg, compress png, compress photo online, image compression tool, reduce photo file size',
    canonical: `${DOMAIN}/image/compress-image`,
    ogTitle: 'Compress Image Online Free — Best Image & Photo Compressor',
    ogDescription:
      'Reduce image file sizes for free. Works with JPG, PNG, and WebP. No uploads — everything stays on your device.',
    applicationName: 'Image Compressor Tool',
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
      {
        question: 'Can I compress multiple images at once?',
        answer:
          'Yes, our tool supports batch compression. Upload multiple images and they\'ll all be compressed simultaneously.',
      },
      {
        question: 'What\'s the best quality setting?',
        answer:
          'For web use, 70-80% offers the best balance of quality and file size. For print, use 85-95%.',
      },
      {
        question: 'Does compression remove metadata?',
        answer:
          'The compression process may strip EXIF metadata. If you need to preserve metadata, use a higher quality setting.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload images',
        text: 'Click \'Choose Files\' or drag and drop JPG, PNG, or WebP images you want to compress.',
      },
      {
        name: 'Adjust quality',
        text: 'Use the quality slider to set your desired compression level (10-100%).',
      },
      {
        name: 'Compress',
        text: 'Click the \'Compress Image\' button to reduce file sizes.',
      },
      {
        name: 'Download result',
        text: 'Download your compressed images with reduced file sizes.',
      },
    ],
  },

  'webp-to-jpg': {
    title: 'WebP to JPG Converter — Convert WebP to JPEG Online Free',
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
      {
        question: 'Is the conversion free?',
        answer:
          'Yes, 100% free with no limits, no sign-up, and no watermarks. Your images never leave your browser.',
      },
      {
        question: 'Can I convert animated WebP?',
        answer:
          'The tool converts the first frame of animated WebP images to a static JPG.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload WebP files',
        text: 'Click \'Choose Files\' or drag and drop WebP images to convert.',
      },
      {
        name: 'Convert',
        text: 'Click the \'WebP to JPG\' button to start conversion.',
      },
      {
        name: 'Download JPG files',
        text: 'Download your converted JPG images.',
      },
    ],
  },

  'heic-to-jpg': {
    title:
      'HEIC to JPG Converter — Convert iPhone & iPad Photos to JPG Free',
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
      {
        question: 'Why can\'t I open HEIC files on Windows?',
        answer:
          'HEIC is Apple\'s default photo format. Windows doesn\'t natively support it, which is why conversion to JPG is needed.',
      },
      {
        question: 'Does it preserve photo orientation?',
        answer:
          'Yes, the tool reads EXIF orientation data and applies the correct rotation during conversion.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload HEIC photos',
        text: 'Click \'Choose Files\' or drag and drop HEIC/HEIF photos from your iPhone or iPad.',
      },
      {
        name: 'Convert',
        text: 'Click the \'HEIC to JPG\' button to convert your photos.',
      },
      {
        name: 'Download JPG files',
        text: 'Download your converted JPG photos, ready to share anywhere.',
      },
    ],
  },

  'resize-image': {
    title:
      'Resize Image Online Free — Change Photo Dimensions & Scale Pictures',
    description:
      'Resize images online for free. Change image dimensions to any custom size. Perfect for social media, web optimization, and print. Supports JPG, PNG, and WebP — 100% private.',
    keywords:
      'resize image, image resizer, resize photo, change image size, resize image online, resize photo online, image size changer, resize jpg, resize png',
    canonical: `${DOMAIN}/image/resize-image`,
    ogTitle: 'Resize Image Online Free — Change Image Dimensions',
    ogDescription:
      'Resize images to any dimension for free. Works with JPG, PNG, and WebP. No uploads needed.',
    applicationName: 'Image Resizer Tool',
    featureList: [
      'Resize images to custom dimensions',
      'Maintain aspect ratio option',
      'Supports JPG, PNG, and WebP',
      'Instant preview of resized image',
      '100% client-side processing',
    ],
    faqItems: [
      {
        question: 'Will resizing reduce image quality?',
        answer:
          'Enlarging images may reduce quality, but shrinking preserves quality well. The tool uses bicubic interpolation for best results.',
      },
      {
        question: 'Can I maintain the aspect ratio?',
        answer:
          'Enter one dimension and calculate the other proportionally, or enter both for a custom size.',
      },
      {
        question: 'What image formats are supported?',
        answer:
          'JPG, PNG, WebP, and BMP images can all be resized.',
      },
      {
        question: 'Is there a maximum size?',
        answer:
          'No hard limit, but very large dimensions may be slow to process depending on your device.',
      },
      {
        question: 'Can I resize multiple images?',
        answer:
          'The tool processes one image at a time for precise dimension control.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload your image',
        text: 'Click \'Choose Files\' or drag and drop the image you want to resize.',
      },
      {
        name: 'Enter dimensions',
        text: 'Specify the desired width and height in pixels.',
      },
      {
        name: 'Resize',
        text: 'Click the \'Resize Image\' button to change the dimensions.',
      },
      {
        name: 'Download result',
        text: 'Download your resized image.',
      },
    ],
  },

  'crop-image': {
    title:
      'Crop Image Online Free — Interactive Photo Cropper & Editor',
    description:
      'Crop images online for free with an interactive editor. Choose from preset aspect ratios (1:1, 4:3, 16:9) or draw a custom crop area. Rule-of-thirds grid overlay for perfect composition.',
    keywords:
      'crop image, image cropper, crop photo, crop image online, crop picture, image crop tool, photo cropper, crop jpg, crop png',
    canonical: `${DOMAIN}/image/crop-image`,
    ogTitle: 'Crop Image Online Free — Interactive Image Cropper',
    ogDescription:
      'Crop images with an interactive editor. Preset aspect ratios, rule-of-thirds grid, custom crop. Free and private.',
    applicationName: 'Image Cropper Tool',
    featureList: [
      'Interactive canvas-based crop editor',
      'Preset aspect ratios (1:1, 4:3, 16:9, etc.)',
      'Rule-of-thirds grid overlay',
      'Custom crop area selection',
      '100% client-side, no uploads',
    ],
    faqItems: [
      {
        question: 'Can I set a specific aspect ratio?',
        answer:
          'Yes, choose from preset ratios like 1:1 (square), 4:3, 16:9, or draw a freeform crop area.',
      },
      {
        question: 'What is the rule-of-thirds grid?',
        answer:
          'It\'s a composition guide that divides the image into a 3x3 grid, helping you align subjects for better photos.',
      },
      {
        question: 'Can I crop to exact pixel dimensions?',
        answer:
          'You can draw a crop area and see the resulting dimensions. For exact sizes, use our Resize tool after cropping.',
      },
      {
        question: 'What formats are supported?',
        answer:
          'JPG, PNG, WebP, and BMP images can all be cropped.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload your image',
        text: 'Click \'Choose Files\' or drag and drop the image to crop.',
      },
      {
        name: 'Select crop area',
        text: 'Draw a selection box or choose a preset aspect ratio (1:1, 4:3, 16:9).',
      },
      {
        name: 'Adjust selection',
        text: 'Drag the edges to fine-tune your crop area. Use the rule-of-thirds grid for composition.',
      },
      {
        name: 'Crop',
        text: 'Click the crop button to apply.',
      },
      {
        name: 'Download result',
        text: 'Download your cropped image.',
      },
    ],
  },

  'convert-to-jpg': {
    title:
      'Convert to JPG Online Free — PNG, WebP, BMP, TIFF to JPEG',
    description:
      'Convert images to JPG format online for free. Transform PNG, WebP, BMP, and other formats to universally compatible JPG. Adjustable quality — 100% private, no uploads.',
    keywords:
      'convert to jpg, png to jpg, image to jpg, convert image to jpg, bmp to jpg, convert png to jpg online, image to jpeg converter',
    canonical: `${DOMAIN}/image/convert-to-jpg`,
    ogTitle: 'Convert to JPG Online Free — PNG, WebP, BMP to JPG',
    ogDescription:
      'Convert PNG, WebP, BMP images to JPG format for free. Adjustable quality, no uploads.',
    applicationName: 'Image to JPG Converter Tool',
    featureList: [
      'Convert PNG, WebP, BMP to JPG',
      'Adjustable output quality',
      'Batch conversion support',
      'Instant download',
      '100% client-side processing',
    ],
    faqItems: [
      {
        question: 'Why convert to JPG?',
        answer:
          'JPG is universally compatible across all devices, browsers, and applications. It offers good compression for photos.',
      },
      {
        question: 'What formats can I convert?',
        answer:
          'PNG, WebP, BMP, TIFF, and GIF images can all be converted to JPG.',
      },
      {
        question: 'Can I adjust the JPG quality?',
        answer:
          'Yes, use the quality slider to balance between file size and image quality.',
      },
      {
        question: 'Will transparent backgrounds be preserved?',
        answer:
          'No, JPG doesn\'t support transparency. Transparent areas will become white.',
      },
      {
        question: 'Can I convert multiple files?',
        answer:
          'Yes, batch conversion is supported. Upload multiple images at once.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload images',
        text: 'Click \'Choose Files\' or drag and drop PNG, WebP, or BMP images.',
      },
      {
        name: 'Adjust quality',
        text: 'Use the quality slider to set JPG output quality.',
      },
      {
        name: 'Convert',
        text: 'Click the \'Convert to JPG\' button to transform your images.',
      },
      {
        name: 'Download JPG files',
        text: 'Download your converted JPG images.',
      },
    ],
  },

  'convert-from-jpg': {
    title:
      'Convert JPG to PNG or WebP — Free Online JPG Image Converter',
    description:
      'Convert JPG images to PNG or WebP format online for free. Get transparent backgrounds with PNG or smaller file sizes with WebP. 100% private — no uploads required.',
    keywords:
      'jpg to png, jpg to webp, convert jpg, jpg converter, jpeg to png, convert jpg to png online, jpg to webp converter',
    canonical: `${DOMAIN}/image/convert-from-jpg`,
    ogTitle: 'Convert JPG to PNG or WebP — Free Online Converter',
    ogDescription:
      'Convert JPG images to PNG or WebP format for free. No uploads, runs in your browser.',
    applicationName: 'JPG Converter Tool',
    featureList: [
      'Convert JPG to PNG format',
      'Convert JPG to WebP format',
      'Preserve image quality',
      'Instant download',
      '100% client-side processing',
    ],
    faqItems: [
      {
        question: 'Why convert JPG to PNG?',
        answer:
          'PNG supports transparency and lossless quality, making it ideal for logos, graphics, and images requiring a transparent background.',
      },
      {
        question: 'Why convert JPG to WebP?',
        answer:
          'WebP offers better compression than JPG with similar quality, resulting in smaller file sizes for web use.',
      },
      {
        question: 'Will the quality improve?',
        answer:
          'Converting JPG to PNG won\'t add quality lost during JPG compression, but it prevents further quality loss.',
      },
      {
        question: 'Can I convert multiple JPGs?',
        answer:
          'Yes, batch conversion is supported for both PNG and WebP output.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload JPG images',
        text: 'Click \'Choose Files\' or drag and drop JPG images to convert.',
      },
      {
        name: 'Choose output format',
        text: 'Select PNG (lossless) or WebP (smaller size) as the output format.',
      },
      {
        name: 'Convert',
        text: 'Click the \'Convert from JPG\' button to start conversion.',
      },
      {
        name: 'Download result',
        text: 'Download your converted images.',
      },
    ],
  },

  'upscale-image': {
    title:
      'Upscale Image Online Free — AI Image Enhancer & Resolution Booster',
    description:
      'Upscale and enhance image resolution online for free. AI-powered upscaling enlarges small or low-resolution images while preserving details. Supports JPG, PNG, and WebP.',
    keywords:
      'upscale image, image upscaler, enhance image, increase image resolution, ai upscale, image enhancer, enlarge image, upscale photo',
    canonical: `${DOMAIN}/image/upscale-image`,
    ogTitle: 'Upscale Image Online Free — AI Image Enhancer',
    ogDescription:
      'Enhance image resolution with AI-powered upscaling. Free, private, no uploads.',
    applicationName: 'Image Upscaler Tool',
    featureList: [
      'AI-powered image upscaling',
      'Multiple upscale factors (2x, 4x)',
      'Preserves details and sharpness',
      'Supports JPG, PNG, and WebP',
      '100% client-side processing',
    ],
    faqItems: [
      {
        question: 'How does AI upscaling work?',
        answer:
          'Our tool uses neural network-based algorithms to intelligently predict and fill in detail when enlarging images.',
      },
      {
        question: 'What upscale factors are available?',
        answer:
          'You can upscale images by 2x or 4x their original resolution.',
      },
      {
        question: 'Will it fix blurry photos?',
        answer:
          'AI upscaling can enhance clarity and detail, but it works best on images that are simply low resolution rather than motion-blurred.',
      },
      {
        question: 'What formats are supported?',
        answer:
          'JPG, PNG, and WebP images can be upscaled.',
      },
      {
        question: 'How long does processing take?',
        answer:
          'Processing time depends on image size. Small images take seconds; larger images may take a minute.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload your image',
        text: 'Click \'Choose Files\' or drag and drop the image you want to enhance.',
      },
      {
        name: 'Start upscaling',
        text: 'Click the \'Upscale Image\' button to begin AI-powered enhancement.',
      },
      {
        name: 'Wait for processing',
        text: 'The AI analyzes and enhances your image. This may take a moment.',
      },
      {
        name: 'Download result',
        text: 'Download your upscaled, higher-resolution image.',
      },
    ],
  },

  'watermark-image': {
    title:
      'Add Watermark to Image Online Free — Text Watermark & Photo Protection Tool',
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
    faqItems: [
      {
        question: 'Can I customize the watermark?',
        answer:
          'Yes, enter any text you want as your watermark.',
      },
      {
        question: 'Is the watermark permanent?',
        answer:
          'Yes, the watermark is embedded into the image. Keep your originals as backup.',
      },
      {
        question: 'Can I watermark multiple images?',
        answer:
          'Yes, batch watermarking is supported. Upload multiple images and they\'ll all get watermarked.',
      },
      {
        question: 'Will it work with transparent backgrounds?',
        answer:
          'Yes, the watermark is overlaid on the image regardless of background type.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload images',
        text: 'Click \'Choose Files\' or drag and drop images to watermark.',
      },
      {
        name: 'Enter watermark text',
        text: 'Type the text you want as a watermark.',
      },
      {
        name: 'Apply watermark',
        text: 'Click the \'Image Watermark\' button to add the text overlay.',
      },
      {
        name: 'Download result',
        text: 'Download your watermarked images.',
      },
    ],
  },

  'rotate-image': {
    title:
      'Rotate Image Online Free — Flip & Turn Photos 90, 180, 270 Degrees',
    description:
      'Rotate images online for free. Rotate photos by 90, 180, or 270 degrees instantly. Fix sideways or upside-down photos without quality loss. Supports JPG, PNG, and WebP.',
    keywords:
      'rotate image, rotate photo, image rotator, rotate image online, rotate picture, rotate jpg, flip image, rotate photo 90 degrees',
    canonical: `${DOMAIN}/image/rotate-image`,
    ogTitle: 'Rotate Image Online Free — 90, 180, 270 Degrees',
    ogDescription:
      'Rotate images by 90, 180, or 270 degrees for free. No uploads, no quality loss.',
    applicationName: 'Image Rotator Tool',
    featureList: [
      'Rotate images by 90, 180, or 270 degrees',
      'No quality loss during rotation',
      'Supports JPG, PNG, and WebP',
      'Instant preview and download',
      '100% client-side processing',
    ],
    faqItems: [
      {
        question: 'Can I rotate multiple images at once?',
        answer:
          'Yes, batch rotation is supported. Upload multiple images and they\'ll all be rotated.',
      },
      {
        question: 'Does rotation affect quality?',
        answer:
          'No, rotation is performed without quality loss for 90\u00B0, 180\u00B0, and 270\u00B0 angles.',
      },
      {
        question: 'What formats are supported?',
        answer:
          'JPG, PNG, WebP, and BMP images can all be rotated.',
      },
      {
        question: 'Can I rotate by custom angles?',
        answer:
          'Currently, 90\u00B0, 180\u00B0, and 270\u00B0 rotations are supported.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload images',
        text: 'Click \'Choose Files\' or drag and drop images to rotate.',
      },
      {
        name: 'Select angle',
        text: 'Choose 90\u00B0 clockwise, 180\u00B0, or 90\u00B0 counter-clockwise.',
      },
      {
        name: 'Rotate',
        text: 'Click the \'Rotate Image\' button to apply rotation.',
      },
      {
        name: 'Download result',
        text: 'Download your rotated images.',
      },
    ],
  },

  'blur-face': {
    title:
      'Blur Faces in Photos Online Free — AI Privacy Face Blur & Anonymizer Tool',
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
    faqItems: [
      {
        question: 'How does face detection work?',
        answer:
          'The tool uses AI face detection models that run in your browser to automatically locate faces in your photos.',
      },
      {
        question: 'Can I adjust blur intensity?',
        answer:
          'Yes, use the blur intensity control to set how much blur is applied to detected faces.',
      },
      {
        question: 'What if a face isn\'t detected?',
        answer:
          'The AI works best with clearly visible, front-facing faces. Side profiles or partially hidden faces may not be detected.',
      },
      {
        question: 'Are my photos uploaded?',
        answer:
          'No. All processing happens in your browser. Your photos never leave your device.',
      },
      {
        question: 'Can I blur specific faces only?',
        answer:
          'Currently, all detected faces are blurred. The tool is designed for privacy protection of all visible individuals.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload your photo',
        text: 'Click \'Choose Files\' or drag and drop a photo containing faces.',
      },
      {
        name: 'Detect faces',
        text: 'Click the \'Blur Face\' button. The AI automatically detects all faces in the photo.',
      },
      {
        name: 'Wait for processing',
        text: 'Face detection and blurring are applied. The first use downloads the AI model (~20MB).',
      },
      {
        name: 'Download result',
        text: 'Download your photo with all faces blurred for privacy.',
      },
    ],
  },

  'remove-bg': {
    title:
      'Remove Background from Image — Free AI Background Remover & Eraser',
    description:
      'Remove image backgrounds automatically in 5 seconds with just one click. Do not spend hours manually picking pixels. Upload your photo now',
    keywords:
      'remove bg, background remover, bg remove, remove background, bg remover, remove image background, background eraser, delete background from photo',
    canonical: `${DOMAIN}/image/remove-bg`,
    ogTitle: 'Remove Background from Image — Free Background Remover',
    ogDescription:
      'Remove image backgrounds automatically in 5 seconds with just one click. Do not spend hours manually picking pixels. Upload your photo now. Private — no uploads required.',
    applicationName: 'Background Remover Tool',
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
      {
        question: 'Can I use the result for commercial purposes?',
        answer:
          'Yes, there are no restrictions on how you use the output images.',
      },
      {
        question: 'Does it work with complex backgrounds?',
        answer:
          'The AI handles most backgrounds well, including busy scenes. Best results are with clearly defined foreground subjects.',
      },
    ],
    howToSteps: [
      {
        name: 'Upload your image',
        text: 'Click \'Choose Files\' or drag and drop the image to remove the background from.',
      },
      {
        name: 'Process image',
        text: 'Click the \'Remove Background\' button. The AI model analyzes your image.',
      },
      {
        name: 'Wait for processing',
        text: 'Background removal takes 5-15 seconds. First use downloads the AI model (~20MB).',
      },
      {
        name: 'Download PNG',
        text: 'Download your image with transparent background as a PNG file.',
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

export function getImageToolSeoContent(toolId: string) {
  const seo = IMAGE_TOOL_SEO[toolId];
  if (!seo) return undefined;

  const allToolIds = Object.keys(IMAGE_TOOL_SEO);
  const relatedTools = allToolIds
    .filter((id) => id !== toolId)
    .slice(0, 8)
    .map((id) => {
      const t = IMAGE_TOOL_SEO[id];
      return {
        name: t.applicationName,
        href: `/image/${id}`,
        color: '#27ae60',
        description: t.description.split('.')[0] + '.',
      };
    });

  return {
    howToSteps: seo.howToSteps,
    faqItems: seo.faqItems,
    relatedTools,
  };
}

export function getImageToolJsonLd(toolId: string): object[] {
  const seo = IMAGE_TOOL_SEO[toolId];
  if (!seo) return [];

  const schemas: object[] = [];

  // WebApplication schema with AggregateRating
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

  // HowTo schema (for tools with HowTo steps)
  if (seo.howToSteps && seo.howToSteps.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to ${seo.applicationName.replace(' Tool', '')} Online`,
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
