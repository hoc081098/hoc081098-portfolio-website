import { articleSeries, type ArticleSeries } from '@/data/article-series'

export interface ArticleSeriesContext {
  series: ArticleSeries
  position: number
  total: number
  previousSlug?: string
  nextSlug?: string
}

export function getArticleSeriesBySlug(
  seriesSlug: string,
): ArticleSeries | undefined {
  return articleSeries.find((series) => series.slug === seriesSlug)
}

export function getArticleSeriesContext(
  articleSlug: string,
): ArticleSeriesContext | undefined {
  for (let series of articleSeries) {
    let articleIndex = series.articleSlugs.indexOf(articleSlug)

    if (articleIndex === -1) {
      continue
    }

    return {
      series,
      position: articleIndex + 1,
      total: series.articleSlugs.length,
      previousSlug: series.articleSlugs[articleIndex - 1],
      nextSlug: series.articleSlugs[articleIndex + 1],
    }
  }
}
