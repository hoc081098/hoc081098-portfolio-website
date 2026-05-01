import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllArticles } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Technical articles on Android, Flutter, iOS, reactive programming, clean architecture, and mobile development.',
}

export default async function ArticlesIndex() {
  let articles = await getAllArticles()

  return (
    <SimpleLayout
      title="Writing on mobile development, reactive programming, and clean architecture."
      intro="Notes, tutorials, and essays on Android, Flutter, iOS, Kotlin, Dart, and the things I learn along the way. Also published on Medium."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.length > 0 ? (
            articles.map((article) => (
              <Card as="article" key={article.slug}>
                <Card.Eyebrow as="time" dateTime={article.date} decorate>
                  {formatDate(article.date)}
                </Card.Eyebrow>
                <Card.Title href={`/articles/${article.slug}`}>{article.title}</Card.Title>
                <Card.Description>{article.description}</Card.Description>
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
