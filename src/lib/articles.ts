import glob from 'fast-glob'
import { cache } from 'react'

import { articleSeries, type ArticleSeries } from '@/data/article-series'
import { slugifyTag } from '@/lib/tags'

export type DateOnly = `${number}-${number}-${number}`
export type Instant = `${number}-${number}-${number}T${string}Z`

export interface Article {
  title: string
  description: string
  author: string
  createdAt: DateOnly
  lastUpdatedAt: Instant
  language?: string
  tags?: string[]
  estimatedReadingTime?: number // in minutes
}

export interface ArticleWithSlug extends Article {
  slug: string
}

const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/
const INSTANT_PATTERN = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const HEX_COLOR_PATTERN = /^#[\da-f]{6}$/i

function isValidDateOnly(value: string): value is DateOnly {
  let match = DATE_ONLY_PATTERN.exec(value)

  if (!match) {
    return false
  }

  let [, year, month, day] = match
  const utc = Date.UTC(Number(year), Number(month) - 1, Number(day))
  let parsedDate = new Date(utc)

  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.getUTCFullYear() === Number(year) &&
    parsedDate.getUTCMonth() === Number(month) - 1 &&
    parsedDate.getUTCDate() === Number(day)
  )
}

function isValidInstant(value: string): value is Instant {
  let match = INSTANT_PATTERN.exec(value)

  if (!match) {
    return false
  }

  let [, year, month, day, hour, minute, second] = match
  let parsedDate = new Date(value)

  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.getUTCFullYear() === Number(year) &&
    parsedDate.getUTCMonth() === Number(month) - 1 &&
    parsedDate.getUTCDate() === Number(day) &&
    parsedDate.getUTCHours() === Number(hour) &&
    parsedDate.getUTCMinutes() === Number(minute) &&
    parsedDate.getUTCSeconds() === Number(second)
  )
}

function validateArticleMetadata(
  value: unknown,
  articleFilename: string,
): Article {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(
      `Invalid article metadata in ${articleFilename}: expected an object`,
    )
  }

  let metadata = value as Record<string, unknown>
  let errors: string[] = []

  for (let field of ['title', 'description', 'author'] as const) {
    if (typeof metadata[field] !== 'string' || !metadata[field].trim()) {
      errors.push(`${field} must be a non-empty string`)
    }
  }

  if (
    typeof metadata.createdAt !== 'string' ||
    !isValidDateOnly(metadata.createdAt)
  ) {
    errors.push('createdAt must be a valid YYYY-MM-DD date')
  }

  if (
    typeof metadata.lastUpdatedAt !== 'string' ||
    !isValidInstant(metadata.lastUpdatedAt)
  ) {
    errors.push(
      'lastUpdatedAt must be a valid RFC 3339 instant normalized to YYYY-MM-DDTHH:mm:ssZ',
    )
  }

  if ('date' in metadata) {
    errors.push('date is no longer supported; use createdAt')
  }

  if (
    metadata.language !== undefined &&
    (typeof metadata.language !== 'string' || !metadata.language.trim())
  ) {
    errors.push('language must be a non-empty string when provided')
  }

  if (
    metadata.tags !== undefined &&
    (!Array.isArray(metadata.tags) ||
      metadata.tags.some((tag) => typeof tag !== 'string' || !tag.trim()))
  ) {
    errors.push('tags must contain only non-empty strings when provided')
  }

  if (
    metadata.estimatedReadingTime !== undefined &&
    (!Number.isInteger(metadata.estimatedReadingTime) ||
      Number(metadata.estimatedReadingTime) <= 0)
  ) {
    errors.push('estimatedReadingTime must be a positive integer when provided')
  }

  if (errors.length > 0) {
    throw new Error(
      `Invalid article metadata in ${articleFilename}:\n- ${errors.join('\n- ')}`,
    )
  }

  return metadata as unknown as Article
}

function validateArticleSeries(articles: ArticleWithSlug[]) {
  let knownArticleSlugs = new Set(articles.map((article) => article.slug))

  let knownSeriesSlugs = new Set<string>()

  // Article slug to series slug.
  let assignedArticles = new Map<string, string>()

  for (let series of articleSeries) {
    if (!SLUG_PATTERN.test(series.slug)) {
      throw new Error(
        `Invalid article series slug "${series.slug}": use kebab-case`,
      )
    }

    if (knownSeriesSlugs.has(series.slug)) {
      throw new Error(`Duplicate article series slug "${series.slug}"`)
    }

    if (!series.title.trim() || !series.description.trim()) {
      throw new Error(
        `Invalid article series "${series.slug}": title and description must be non-empty`,
      )
    }

    let theme = (
      series as {
        theme?: Partial<ArticleSeries['theme']>
      }
    ).theme

    for (let field of ['from', 'via', 'to'] as const) {
      let color = theme?.[field]

      if (typeof color !== 'string' || !HEX_COLOR_PATTERN.test(color)) {
        throw new Error(
          `Invalid article series "${series.slug}": theme.${field} must be a #RRGGBB color`,
        )
      }
    }

    if (series.articleSlugs.length === 0) {
      throw new Error(
        `Invalid article series "${series.slug}": articleSlugs must not be empty`,
      )
    }

    knownSeriesSlugs.add(series.slug)

    let seriesArticleSlugs = new Set<string>()
    for (let articleSlug of series.articleSlugs) {
      if (seriesArticleSlugs.has(articleSlug)) {
        throw new Error(
          `Invalid article series "${series.slug}": duplicate article "${articleSlug}"`,
        )
      }

      if (!knownArticleSlugs.has(articleSlug)) {
        throw new Error(
          `Invalid article series "${series.slug}": article "${articleSlug}" does not exist`,
        )
      }

      let assignedSeries = assignedArticles.get(articleSlug)
      if (assignedSeries) {
        throw new Error(
          `Article "${articleSlug}" is assigned to both "${assignedSeries}" and "${series.slug}"`,
        )
      }

      seriesArticleSlugs.add(articleSlug)
      assignedArticles.set(articleSlug, series.slug)
    }
  }
}

async function importArticle(
  articleFilename: string,
): Promise<ArticleWithSlug> {
  let articleModule = (await import(`../app/articles/${articleFilename}`)) as {
    article?: unknown
  }
  let article = validateArticleMetadata(articleModule.article, articleFilename)

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
    ...article,
  }
}

export const getAllArticles = cache(async () => {
  let articleFilenames: string[] = await glob('*/page.mdx', {
    cwd: './src/app/articles',
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))
  validateArticleSeries(articles)

  return articles.sort((a, z) => z.createdAt.localeCompare(a.createdAt))
})

export const getAllArticleSeries = cache(
  async function getAllArticleSeries(): Promise<readonly ArticleSeries[]> {
    await getAllArticles() // Ensure that article series are validated against existing articles

    return articleSeries
  },
)

export const getArticlesBySeries = cache(async (seriesSlug: string) => {
  let [articles, series] = await Promise.all([
    getAllArticles(),
    getAllArticleSeries(),
  ])
  let selectedSeries = series.find((candidate) => candidate.slug === seriesSlug)

  if (!selectedSeries) {
    return []
  }

  let articlesBySlugMap = new Map(
    articles.map((article) => [article.slug, article]),
  )
  return selectedSeries.articleSlugs.map(
    (articleSlug) => articlesBySlugMap.get(articleSlug)!,
  )
})

export const getAllArticleTags = cache(async () => {
  let tagMap = new Map<string, { name: string; slug: string }>()
  let articles = await getAllArticles()

  for (let article of articles) {
    for (let tag of new Set(article.tags ?? [])) {
      let slug = slugifyTag(tag)

      if (!slug || tagMap.has(slug)) {
        continue
      }

      tagMap.set(slug, { name: tag, slug })
    }
  }

  return Array.from(tagMap.values()).sort((a, z) =>
    a.name.localeCompare(z.name),
  )
})

export const getArticlesByTag = cache(async (tagSlug: string) => {
  let articles = await getAllArticles()

  return articles.filter((article) =>
    article.tags?.some((tag) => slugifyTag(tag) === tagSlug),
  )
})
