import { type Metadata } from 'next'
import Link from 'next/link'
import { ArrowRightIcon, BooksIcon } from '@phosphor-icons/react/ssr'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllArticles, getAllArticleSeries } from '@/lib/articles'
import { slugifyTag } from '@/lib/tags'

const MAX_VISIBLE_ARTICLE_TAGS = 4

function ArticleTags({ tags }: { tags?: string[] }) {
  let uniqueTags = [...new Set(tags ?? [])]

  if (uniqueTags.length === 0) {
    return null
  }

  let visibleTags = uniqueTags.slice(0, MAX_VISIBLE_ARTICLE_TAGS)
  let remainingTagCount = uniqueTags.length - visibleTags.length

  return (
    <div className="pointer-events-none relative z-30 mt-4 flex flex-wrap items-center gap-2">
      {visibleTags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${slugifyTag(tag)}`}
          translate="no"
          className="notranslate pointer-events-auto rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-600 ring-1 ring-violet-100 transition ring-inset hover:bg-violet-100 hover:text-violet-700 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:outline-none dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-400/20 dark:hover:bg-violet-500/20 dark:hover:text-violet-200 dark:focus:ring-offset-zinc-900"
        >
          {tag}
        </Link>
      ))}
      {remainingTagCount > 0 && (
        <span
          aria-label={`${remainingTagCount} more tags`}
          className="text-xs font-medium text-zinc-400 dark:text-zinc-500"
        >
          +{remainingTagCount} more
        </span>
      )}
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Technical articles on mobile development, backend services, reactive programming, clean architecture, Kotlin, Flutter, iOS, and ASP.NET Core.',
}

export default async function ArticlesIndex() {
  let [articles, series] = await Promise.all([
    getAllArticles(),
    getAllArticleSeries(),
  ])

  return (
    <SimpleLayout
      title="Writing on mobile development, backend services, reactive programming, and clean architecture."
      intro="Notes, tutorials, and essays on Android, Flutter, iOS, Kotlin, Dart, ASP.NET Core, and the things I learn along the way."
    >
      {/* Series button */}
      {series.length > 0 && (
        <div className="mb-12">
          <Button
            href="/series"
            variant="accent"
            className="group rounded-full px-5 py-2.5"
          >
            <BooksIcon
              aria-hidden="true"
              className="h-5 w-5"
              weight="duotone"
            />
            Browse article series
            <ArrowRightIcon
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              weight="bold"
            />
          </Button>
        </div>
      )}

      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.length > 0 ? (
            articles.map((article) => (
              <Card as="article" key={article.slug}>
                <Card.Eyebrow as="time" dateTime={article.createdAt} decorate>
                  {formatDate(article.createdAt)}
                </Card.Eyebrow>
                <Card.Title href={`/articles/${article.slug}`}>
                  {article.title}
                </Card.Title>
                <Card.Description>{article.description}</Card.Description>
                <ArticleTags tags={article.tags} />
                <Card.Cta>Read article</Card.Cta>
              </Card>
            ))
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No articles yet.
            </p>
          )}
        </div>
      </div>
    </SimpleLayout>
  )
}
