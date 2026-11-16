import { type Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Card } from '@/components/Card'
import { SeriesCard } from '@/components/SeriesCard'
import { SeriesHeaderAccent } from '@/components/SeriesHeaderAccent'
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
    alternates: {
      canonical: `/series/${series.slug}`,
    },
    ...(series.cover && {
      openGraph: {
        type: 'website',
        title: series.title,
        description: series.description,
        url: `/series/${series.slug}`,
        images: [
          {
            url: series.cover.image.src,
            width: series.cover.image.width,
            height: series.cover.image.height,
            alt: series.cover.alt,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: series.title,
        description: series.description,
        images: [
          {
            url: series.cover.image.src,
            alt: series.cover.alt,
          },
        ],
      },
    }),
  }
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  let series = getArticleSeriesBySlug(params.series)

  if (!series) {
    notFound()
  }

  let articles = await getArticlesBySeries(series.slug)

  return (
    <SimpleLayout
      title={series.title}
      intro={series.description}
      eyebrow={
        <SeriesHeaderAccent series={series} articleCount={articles.length} />
      }
    >
      {series.cover && (
        <div className="mb-16 max-w-4xl overflow-hidden rounded-2xl bg-zinc-950 ring-1 ring-zinc-900/10 dark:ring-white/10">
          <Image
            src={series.cover.image}
            alt={series.cover.alt}
            priority
            sizes="(min-width: 1024px) 56rem, (min-width: 640px) calc(100vw - 6rem), calc(100vw - 4rem)"
            className="h-auto w-full"
          />
        </div>
      )}
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article, articleIndex) => (
            <SeriesCard series={series} variant="article" key={article.slug}>
              <Card.Eyebrow as="time" dateTime={article.createdAt} decorate>
                Part {articleIndex + 1} of {articles.length} ·{' '}
                {formatDate(article.createdAt)}
              </Card.Eyebrow>
              <Card.Title href={`/articles/${article.slug}`}>
                {article.title}
              </Card.Title>
              <Card.Description>{article.description}</Card.Description>
              <Card.Cta>Read article</Card.Cta>
            </SeriesCard>
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
