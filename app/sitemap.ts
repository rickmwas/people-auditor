import { MetadataRoute } from 'next'
import { allCounties } from '@/lib/data/counties'
import { sampleExposes } from '@/lib/data/placeholder'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://peoplesauditor.ke'

  const routes = [
    '',
    '/national',
    '/counties',
    '/exposes',
    '/submit',
    '/learn',
    '/wall-of-shame',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const countyRoutes = allCounties.map((county) => ({
    url: `${baseUrl}/counties/${county.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const exposeRoutes = sampleExposes.map((expose) => ({
    url: `${baseUrl}/exposes/${expose.slug}`,
    lastModified: expose.created_at,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...routes, ...countyRoutes, ...exposeRoutes]
}

