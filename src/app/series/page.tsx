import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticleSeries } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Article series',
  description: 'Ordered series of technical articles on software engineering.',
}

export default async function SeriesIndex() {
  let series = await getAllArticleSeries()

  return (
    <SimpleLayout
      title="Article series"
      intro="Follow ordered collections of articles that build on one another."
    >
      {series.length > 0 ? (
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {series.map((item) => (
              <Card as="article" key={item.slug}>
                <Card.Eyebrow>
                  {item.articleSlugs.length} article
                  {item.articleSlugs.length === 1 ? '' : 's'}
                </Card.Eyebrow>
                <Card.Title href={`/series/${item.slug}`}>
                  {item.title}
                </Card.Title>
                <Card.Description>{item.description}</Card.Description>
                <Card.Cta>View series</Card.Cta>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          No article series yet.
        </p>
      )}
    </SimpleLayout>
  )
}
