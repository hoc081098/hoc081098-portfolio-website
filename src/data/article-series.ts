import { type StaticImageData } from 'next/image'

import domainToProductionCover from '@/images/series/from-domain-to-production/cover.png'

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
  cover?: {
    image: StaticImageData
    alt: string
  }
  /**
   * The array order defines Part 1, Part 2, and so on.
   * An article slug may appear in only one series.
   */
  articleSlugs: readonly string[]
}

export const articleSeries: readonly ArticleSeries[] = [
  {
    slug: 'from-domain-to-production',
    title: 'From Domain to Production',
    description:
      'Practical .NET Backend Architecture — DDD · Clean Architecture · CQRS · Event-Driven · PostgreSQL',
    theme: {
      from: '#8B5CF6',
      via: '#60A5FA',
      to: '#34D399',
    },
    cover: {
      image: domainToProductionCover,
      alt: 'From Domain to Production — Practical .NET Backend Architecture, with DDD, Clean Architecture, CQRS, event-driven design, and PostgreSQL',
    },
    articleSlugs: [
      'ddd-entity-value-object-aggregate-root',
      'ddd-rich-domain-model-invariant-behavior',
      'ddd-aggregate-transactional-consistency-boundary',
    ],
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
