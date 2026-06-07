import glob from 'fast-glob'

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

export async function getAllArticles() {
  let articleFilenames = await glob('*/page.mdx', {
    cwd: './src/app/articles',
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}

export async function getAllArticleTags() {
  let tagMap = new Map<string, { name: string; slug: string; count: number }>()
  let articles = await getAllArticles()

  for (let article of articles) {
    let articleTagSlugs = new Set<string>()

    for (let tag of new Set(article.tags ?? [])) {
      let slug = slugifyTag(tag)

      if (!slug || articleTagSlugs.has(slug)) {
        continue
      }

      articleTagSlugs.add(slug)

      let existingTag = tagMap.get(slug)

      if (existingTag) {
        existingTag.count += 1
      } else {
        tagMap.set(slug, { name: tag, slug, count: 1 })
      }
    }
  }

  return Array.from(tagMap.values()).sort((a, z) =>
    a.name.localeCompare(z.name),
  )
}

export async function getArticlesByTag(tagSlug: string) {
  let articles = await getAllArticles()

  return articles.filter((article) =>
    article.tags?.some((tag) => slugifyTag(tag) === tagSlug),
  )
}
