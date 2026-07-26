import clsx from 'clsx'

import { Card } from '@/components/Card'
import { type ArticleSeries } from '@/data/article-series'
import { getArticleSeriesThemeStyle } from '@/lib/seriesTheme'

export function SeriesCard({
  series,
  variant = 'index',
  children,
}: {
  series: ArticleSeries
  variant?: 'index' | 'article'
  children: React.ReactNode
}) {
  let isIndexCard = variant === 'index'

  return (
    <Card
      as="article"
      className="isolate"
      style={getArticleSeriesThemeStyle(series)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -inset-y-6 z-[1] overflow-hidden rounded-xl sm:-inset-x-6 sm:rounded-2xl"
      >
        <span
          className={clsx(
            'absolute inset-0 bg-linear-[135deg] from-[var(--series-from)] via-[var(--series-via)] to-[var(--series-to)] transition-opacity duration-300 ease-out',
            isIndexCard
              ? 'opacity-[0.08] group-hover:opacity-[0.12] dark:opacity-[0.12] dark:group-hover:opacity-[0.16]'
              : 'opacity-[0.06] group-hover:opacity-[0.10] dark:opacity-[0.10] dark:group-hover:opacity-[0.14]',
          )}
        />
        <span
          className={clsx(
            'absolute -top-10 -right-14 h-24 w-48 -rotate-12 bg-linear-to-r from-transparent via-[var(--series-via)] to-[var(--series-to)] blur-2xl transition-opacity duration-300 ease-out',
            isIndexCard
              ? 'opacity-[0.08] group-hover:opacity-[0.12] dark:opacity-[0.10] dark:group-hover:opacity-[0.14]'
              : 'opacity-[0.05] group-hover:opacity-[0.08] dark:opacity-[0.08] dark:group-hover:opacity-[0.11]',
          )}
        />
      </span>
      {children}
    </Card>
  )
}
