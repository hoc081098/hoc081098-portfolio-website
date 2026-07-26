import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticleSeries, getArticlesBySeries } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { getArticleSeriesBySlug } from '@/lib/series'

type SeriesPageProps = {
  params: {
    series: string
  }
}

export async function generateStaticParams() {
  let series = await getAllArticleSeries()

  return series.map((item) => ({
    series: item.slug,
  }))
}

export function generateMetadata({ params }: SeriesPageProps): Metadata {
  let series = getArticleSeriesBySlug(params.series)

  if (!series) {
    return {
      title: 'Series not found',
    }
  }

  return {
    title: series.title,
    description: series.description,
  }
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  let series = getArticleSeriesBySlug(params.series)

  if (!series) {
    notFound()
  }

  let articles = await getArticlesBySeries(series.slug)

  return (
    <SimpleLayout title={series.title} intro={series.description}>
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article, articleIndex) => (
            <Card as="article" key={article.slug}>
              <Card.Eyebrow as="time" dateTime={article.createdAt} decorate>
                Part {articleIndex + 1} of {articles.length} ·{' '}
                {formatDate(article.createdAt)}
              </Card.Eyebrow>
              <Card.Title href={`/articles/${article.slug}`}>
                {article.title}
              </Card.Title>
              <Card.Description>{article.description}</Card.Description>
              <Card.Cta>Read article</Card.Cta>
            </Card>
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
