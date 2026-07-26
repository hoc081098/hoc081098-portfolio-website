import { type ArticleSeries } from '@/data/article-series'
import { getArticleSeriesThemeStyle } from '@/lib/seriesTheme'

export function SeriesFlag({ series }: { series: ArticleSeries }) {
  return (
    <span
      aria-hidden="true"
      style={getArticleSeriesThemeStyle(series)}
      className="h-3.5 w-5 shrink-0 bg-linear-[135deg] from-[var(--series-from)] via-[var(--series-via)] to-[var(--series-to)] opacity-80 shadow-sm [clip-path:polygon(0_0,100%_0,75%_50%,100%_100%,0_100%)]"
    />
  )
}
