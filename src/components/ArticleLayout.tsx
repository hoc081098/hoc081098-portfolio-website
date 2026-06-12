'use client'

import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeftIcon, TranslateIcon } from '@phosphor-icons/react'

import { AppContext } from '@/app/providers'
import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { type ArticleWithSlug } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { slugifyTag } from '@/lib/tags'

export function ArticleLayout({
  article,
  children,
}: {
  article: ArticleWithSlug
  children: React.ReactNode
}) {
  let router = useRouter()
  let { previousPathname } = useContext(AppContext)
  let pathname = usePathname()
  let slug = pathname.split('/').filter(Boolean).pop() ?? ''

  let language = article.language ?? 'en'
  // useState + useEffect ensures window is only accessed after hydration on the client.
  // During SSR prerender, window does not exist — this pattern avoids ReferenceError.
  const [translateToEnglishUrl, setTranslateToEnglishUrl] = useState<string | null>(null)
  useEffect(() => {
    if (language === 'en') return
    const articleUrl = `${window.location.origin}/articles/${slug}`
    setTranslateToEnglishUrl(
      `https://translate.google.com/translate?sl=${encodeURIComponent(language)}&tl=en&u=${encodeURIComponent(articleUrl)}`,
    )
  }, [language, slug])

  const hitsUrl = `https://hits.sh/portfolio.hoc081098.dev/articles/${slug}.svg`
  const hitsLink = `https://hits.sh/portfolio.hoc081098.dev/articles/${slug}/`

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to articles"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            >
              <ArrowLeftIcon
                className="h-4 w-4 text-zinc-500 transition group-hover:text-zinc-700 dark:text-zinc-500 dark:group-hover:text-zinc-400"
                weight="duotone"
              />
            </button>
          )}
          <article lang={language}>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                {article.title}
              </h1>
              <time
                dateTime={article.date}
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">{formatDate(article.date)}</span>
              </time>
              {/* Author + reading time + hits badge */}
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <a
                  href="https://github.com/hoc081098"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-zinc-600 transition hover:text-violet-500 dark:text-zinc-300 dark:hover:text-violet-400"
                >
                  Author: hoc081098
                </a>
                {article.estimatedReadingTime && (
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Estimated {article.estimatedReadingTime} min read
                  </span>
                )}
                <a href={hitsLink} target="_blank" rel="noopener noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={hitsUrl} alt="Hits" className="h-5" />
                </a>
                {language !== 'en' && translateToEnglishUrl && (
                  <a
                    href={translateToEnglishUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Translate this article to English (opens in new tab)"
                    className="inline-flex items-center gap-1.5 rounded-full bg-violet-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-violet-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-500/40 active:translate-y-0 active:shadow-sm dark:bg-violet-500 dark:text-white dark:shadow-violet-500/20 dark:hover:bg-violet-400 dark:hover:shadow-violet-400/30"
                  >
                    <TranslateIcon aria-hidden="true" className="h-3.5 w-3.5" weight="duotone" />
                    Translate to English
                  </a>
                )}
              </div>
              {article.tags && article.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {[...new Set(article.tags)].map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${slugifyTag(tag)}`}
                      translate="no"
                      className="notranslate inline-block rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-600 transition hover:bg-violet-100 hover:text-violet-700 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:outline-none dark:bg-violet-500/10 dark:text-violet-400 dark:hover:bg-violet-500/20 dark:hover:text-violet-300 dark:focus:ring-offset-zinc-950"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </header>
            <Prose className="mt-12" lang={language} data-mdx-content>
              {children}
            </Prose>
          </article>
        </div>
      </div>
    </Container>
  )
}
