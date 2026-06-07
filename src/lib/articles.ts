import glob from 'fast-glob'
import { cache } from 'react'

import { slugifyTag } from '@/lib/tags'

export interface Article {
  title: string
  description: string
  author: string
  date: string
  tags?: string[]
  estimatedReadingTime?: number // in minutes
}

export interface ArticleWithSlug extends Article {
  slug: string
}

async function importArticle(
  articleFilename: string,
): Promise<ArticleWithSlug> {
  let { article } = (await import(`../app/articles/${articleFilename}`)) as {
    default: React.ComponentType
    article: Article
  }

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
    ...article,
  }
}

export const getAllArticles = cache(async function getAllArticles() {
  let articleFilenames = await glob('*/page.mdx', {
    cwd: './src/app/articles',
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
})

export const getAllArticleTags = cache(async function getAllArticleTags() {
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

export const getArticlesByTag = cache(async function getArticlesByTag(
  tagSlug: string,
) {
  let articles = await getAllArticles()

  return articles.filter((article) =>
    article.tags?.some((tag) => slugifyTag(tag) === tagSlug),
  )
})
