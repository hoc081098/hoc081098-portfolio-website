import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  CloudArrowDownIcon,
  ArrowRightIcon,
} from '@phosphor-icons/react/ssr'
import { getAllArticles, type ArticleWithSlug } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { resumeUrl, socialData, workData, type WorkRole } from '@/data'
import { socialIconsMap } from '@/components/icons'

import landscape1 from '@/images/landscapes/IMG_20230115_060320.jpg'
import landscape2 from '@/images/landscapes/IMG_20260214_172437.jpg'
import landscape3 from '@/images/landscapes/20250430_224510-COLLAGE.jpg'
import landscape4 from '@/images/landscapes/PXL_20250426_173919684.jpg'

const landscapePhotos = [landscape1, landscape2, landscape3, landscape4]

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.createdAt} decorate>
        {formatDate(article.createdAt)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string; weight?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" target="_blank" {...props}>
      <Icon
        className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
        weight="duotone"
      />
    </Link>
  )
}

function Role({ role }: { role: WorkRole }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        {role.logo ? (
          <Image
            src={role.logo}
            alt=""
            className="h-full w-full object-cover"
            width={40}
            height={40}
          />
        ) : (
          <BuildingOfficeIcon
            className="h-5 w-5 text-zinc-500 dark:text-zinc-400"
            weight="duotone"
          />
        )}
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

function Resume() {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" weight="duotone" />
        <span className="ml-3">Work Experience</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {workData.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button
        href={resumeUrl}
        target="_blank"
        variant="secondary"
        className="group mt-6 w-full"
      >
        Download CV
        <CloudArrowDownIcon
          className="h-5 w-5 text-zinc-400 transition group-active:text-zinc-600 dark:group-hover:text-zinc-50 dark:group-active:text-zinc-50"
          weight="duotone"
        />
      </Button>
    </div>
  )
}

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="mb-4 text-center text-sm text-zinc-500 italic dark:text-zinc-400">
        A few snapshots from Hải Lăng, Quảng Trị — my hometown.
      </div>
      <div className="-my-4 flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden scroll-smooth py-4 pr-[max(0px,50%-11rem)] pl-[max(0px,50%-11rem)] [scrollbar-width:none] sm:snap-none sm:justify-center sm:gap-8 sm:overflow-hidden sm:pr-0 sm:pl-0 [&::-webkit-scrollbar]:hidden">
        {landscapePhotos.map((src, imageIndex) => (
          <div
            key={imageIndex}
            className={clsx(
              'relative aspect-9/10 w-44 flex-none snap-center overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:snap-align-none sm:rounded-2xl dark:bg-zinc-800',
              rotations[imageIndex % rotations.length],
            )}
          >
            <Image
              src={src}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function Home() {
  let articles = (await getAllArticles()).slice(0, 4)

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Software Engineer building mobile apps, backend services, and
            open-source tools.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I'm Petrus Nguyễn Thái Học (hoc081098), a software engineer based in
            Da Nang, Vietnam. I build mobile apps, backend services, and
            open-source tools with a focus on clean architecture and reactive
            systems — and I share what I learn through open-source contributions
            and technical writing on Medium.
          </p>
          <div className="mt-6 flex gap-6">
            {socialData.map((e) => (
              <SocialLink
                key={e.key}
                href={e.link}
                aria-label={e.value}
                icon={socialIconsMap[e.key]}
              />
            ))}
          </div>
          <div className="mt-8">
            <Button
              href="/about"
              variant="primary"
              className="group gap-2 px-5 py-2.5 text-sm"
            >
              More about me
              <ArrowRightIcon
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                weight="bold"
              />
            </Button>
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.length > 0 ? (
              articles.map((article) => (
                <Article key={article.slug} article={article} />
              ))
            ) : (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                No articles yet.
              </p>
            )}
            <div>
              <Button
                href="/articles"
                variant="secondary"
                className="group gap-2"
              >
                Read more articles
                <ArrowRightIcon
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  weight="bold"
                />
              </Button>
            </div>
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}
