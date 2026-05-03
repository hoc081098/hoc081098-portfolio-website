import { type MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portfolio.hoc081098.dev'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles()

  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date('2025-05-03'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date('2025-05-03'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/articles`,
      lastModified: new Date('2025-05-03'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date('2025-05-03'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/uses`,
      lastModified: new Date('2025-05-03'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...articleUrls,
  ]
}

