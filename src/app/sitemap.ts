import type { MetadataRoute } from 'next';
import { tools } from '@/lib/tools';
import { imageTools } from '@/lib/imageTools';

const DOMAIN = 'https://www.ilovepdfpink.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const pdfPages = tools.map((tool) => ({
    url: `${DOMAIN}/tools/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const imgPages = imageTools.map((tool) => ({
    url: `${DOMAIN}${tool.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: DOMAIN,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${DOMAIN}/image`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...pdfPages,
    ...imgPages,
    {
      url: `${DOMAIN}/image/remove-bg`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
