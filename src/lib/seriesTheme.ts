import { type CSSProperties } from 'react'

import { type ArticleSeries } from '@/data/article-series'

export type ArticleSeriesThemeStyle = CSSProperties & {
  '--series-from': string
  '--series-via': string
  '--series-to': string
}

export function getArticleSeriesThemeStyle(
  series: ArticleSeries,
): ArticleSeriesThemeStyle {
  return {
    '--series-from': series.theme.from,
    '--series-via': series.theme.via,
    '--series-to': series.theme.to,
  }
}
