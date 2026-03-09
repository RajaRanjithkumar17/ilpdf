import type { MetadataRoute } from 'next';
import { tools } from '@/lib/tools';
import { imageTools } from '@/lib/imageTools';

const DOMAIN = 'https://www.ilovepdfpink.com';

// Update this date when site content actually changes
const LAST_UPDATED = new Date('2026-03-09');

export default function sitemap(): MetadataRoute.Sitemap {
  const pdfPages = tools.map((tool) => ({
    url: `${DOMAIN}/tools/${tool.id}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const imgPages = imageTools.map((tool) => ({
    url: `${DOMAIN}${tool.href}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: DOMAIN,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${DOMAIN}/image`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...pdfPages,
    ...imgPages,
    {
      url: `${DOMAIN}/image/remove-bg`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
