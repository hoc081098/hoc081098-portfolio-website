import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import {
  getAllArticleTags,
  getArticlesByTag,
  type ArticleWithSlug,
} from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

type TagPageProps = {
  params: {
    tag: string
  }
}

function ArticleCard({ article }: { article: ArticleWithSlug }) {
  return (
    <Card as="article">
      <Card.Eyebrow as="time" dateTime={article.createdAt} decorate>
        {formatDate(article.createdAt)}
      </Card.Eyebrow>
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

export async function generateStaticParams() {
  let tags = await getAllArticleTags()

  return tags.map((tag) => ({
    tag: tag.slug,
  }))
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  let tags = await getAllArticleTags()
  let tag = tags.find((tag) => tag.slug === params.tag)

  if (!tag) {
    return {
      title: 'Tag not found',
    }
  }

  return {
    title: `Articles tagged ${tag.name}`,
    description: `Technical articles tagged ${tag.name}.`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  let tags = await getAllArticleTags()
  let tag = tags.find((tag) => tag.slug === params.tag)

  if (!tag) {
    notFound()
  }

  let articles = await getArticlesByTag(tag.slug)

  return (
    <SimpleLayout
      title={
        <>
          Articles tagged{' '}
          <span className="notranslate" translate="no">
            {tag.name}
          </span>
        </>
      }
      intro={
        <>
          {articles.length} article{articles.length === 1 ? '' : 's'} about{' '}
          <span className="notranslate" translate="no">
            {tag.name}
          </span>
          .
        </>
      }
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
