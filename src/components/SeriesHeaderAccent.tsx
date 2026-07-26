import { type ArticleSeries } from '@/data/article-series'
import { getArticleSeriesThemeStyle } from '@/lib/seriesTheme'

export function SeriesHeaderAccent({
  series,
  articleCount,
}: {
  series: ArticleSeries
  articleCount: number
}) {
  return (
    <div style={getArticleSeriesThemeStyle(series)}>
      <span
        aria-hidden="true"
        className="block h-[3px] w-16 rounded-full bg-linear-to-r from-[var(--series-from)] via-[var(--series-via)] to-[var(--series-to)] opacity-80"
      />
      <p className="mt-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
        Series · {articleCount} article{articleCount === 1 ? '' : 's'}
      </p>
    </div>
  )
}
