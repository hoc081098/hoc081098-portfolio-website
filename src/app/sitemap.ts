import { type MetadataRoute } from 'next'
import {
  getAllArticles,
  getAllArticleSeries,
  getArticlesBySeries,
  type Instant,
} from '@/lib/articles'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portfolio.hoc081098.dev'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, series] = await Promise.all([
    getAllArticles(),
    getAllArticleSeries(),
  ])

  const epoch: Instant = '1970-01-01T00:00:00Z'
  const latestArticleUpdate: Instant = articles.reduce(
    (latest, article) =>
      article.lastUpdatedAt > latest ? article.lastUpdatedAt : latest,
    epoch,
  )

  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.lastUpdatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const seriesUrls: MetadataRoute.Sitemap = await Promise.all(
    series.map(async (s) => {
      // Find the last updated article in the series to determine the lastModified.
      let seriesArticles = await getArticlesBySeries(s.slug)
      let lastUpdatedAt: Instant = seriesArticles.reduce(
        (latest, article) =>
          article.lastUpdatedAt > latest ? article.lastUpdatedAt : latest,
        epoch,
      )

      return {
        url: `${BASE_URL}/series/${s.slug}`,
        lastModified: new Date(lastUpdatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }
    }),
  )

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
      lastModified: new Date(latestArticleUpdate),
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
    // Series urls: root series page + individual series pages
    ...(series.length > 0
      ? [
          {
            url: `${BASE_URL}/series`,
            lastModified: new Date(latestArticleUpdate),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
          },
        ]
      : []),
    ...seriesUrls,
    // Article urls
    ...articleUrls,
  ]
}
