'use client';

import ImageToolPage from '@/components/ImageToolPage';
import { getImageToolById } from '@/lib/imageTools';
import { convertFromJpg } from '@/lib/image/convertFromJpg';

export default function ConvertFromJpgClient() {
  const tool = getImageToolById('convert-from-jpg')!;
  return (
    <ImageToolPage
      tool={tool}
      process={(files, fields, onProgress) =>
        convertFromJpg(files[0], fields.format || 'png', onProgress)
      }
    />
  );
}
