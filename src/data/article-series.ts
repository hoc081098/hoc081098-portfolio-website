export interface ArticleSeriesTheme {
  from: `#${string}`
  via: `#${string}`
  to: `#${string}`
}

export interface ArticleSeries {
  slug: string
  title: string
  description: string
  theme: ArticleSeriesTheme
  /**
   * The array order defines Part 1, Part 2, and so on.
   * An article slug may appear in only one series.
   */
  articleSlugs: readonly string[]
}

export const articleSeries: readonly ArticleSeries[] = [
  {
    slug: 'from-kotlin-to-dotnet-backend',
    title: 'From Kotlin to .NET Backend',
    description:
      'Practice-driven lessons on DDD, Clean Architecture, CQRS, event-driven design, and PostgreSQL for experienced Kotlin engineers growing toward backend and Tech Lead depth.',
    theme: {
      from: '#8B5CF6',
      via: '#60A5FA',
      to: '#34D399',
    },
    articleSlugs: ['from-kotlin-to-dotnet-backend-01-entities'],
  },
  {
    slug: 'type-constructor-hkt-typeclasses',
    title: 'Type Constructor, Higher-Kinded Types và Type Classes',
    description:
      'Chuỗi bài viết đi từ Type Constructor và Kind đến Higher-Kinded Types và Type Classes, tập trung vào trực giác, kind signatures và cách áp dụng trong code.',
    theme: {
      from: '#06B6D4',
      via: '#8B5CF6',
      to: '#EC4899',
    },
    articleSlugs: ['type-constructor-and-kind'],
  },
]
