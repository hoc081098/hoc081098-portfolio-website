import Link from 'next/link'
import clsx from 'clsx'
import {
  ArrowUpRightIcon,
  DatabaseIcon,
  DevicesIcon,
  GitPullRequestIcon,
  ShieldCheckIcon,
  TreeStructureIcon,
  WaveSineIcon,
} from '@phosphor-icons/react/ssr'

import { Container } from '@/components/Container'
import {
  featuredWorkData,
  type FeaturedWork,
  type FeaturedWorkKind,
  type FeaturedWorkStatusTone,
} from '@/data/homepage-data'

const featuredWorkIcons = {
  reactive: WaveSineIcon,
  android: TreeStructureIcon,
  application: DevicesIcon,
  upstream: GitPullRequestIcon,
  backend: ShieldCheckIcon,
  infrastructure: DatabaseIcon,
} satisfies Record<FeaturedWorkKind, typeof WaveSineIcon>

const iconStyles = {
  reactive:
    'bg-violet-100 text-violet-600 dark:bg-violet-400/10 dark:text-violet-300',
  android:
    'bg-green-100 text-green-700 dark:bg-green-400/10 dark:text-green-300',
  application:
    'bg-blue-100 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300',
  upstream:
    'bg-emerald-100 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300',
  backend: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300',
  infrastructure:
    'bg-indigo-100 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300',
} satisfies Record<FeaturedWorkKind, string>

const statusStyles = {
  active:
    'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20',
  archived:
    'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20',
  sample:
    'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-blue-400/20',
  merged:
    'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20',
  practice:
    'bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-400/10 dark:text-violet-300 dark:ring-violet-400/20',
} satisfies Record<FeaturedWorkStatusTone, string>

function FeaturedWorkCard({ work }: { work: FeaturedWork }) {
  let Icon = featuredWorkIcons[work.kind]

  return (
    <article
      id={work.id}
      className="flex h-full scroll-mt-24 flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/80 transition duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-zinc-300 sm:p-7 dark:bg-zinc-800/35 dark:shadow-zinc-950/20 dark:ring-zinc-700/60 dark:hover:bg-zinc-800/55 dark:hover:ring-zinc-600/70"
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={clsx(
            'flex h-11 w-11 items-center justify-center rounded-xl',
            iconStyles[work.kind],
          )}
        >
          <Icon aria-hidden="true" className="h-6 w-6" weight="duotone" />
        </span>
        <span
          className={clsx(
            'rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset',
            statusStyles[work.statusTone],
          )}
        >
          {work.status}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold tracking-widest text-violet-600 uppercase dark:text-violet-400">
          {work.category}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {work.name}
          <span className="mt-1 block text-sm font-medium text-zinc-500 italic sm:mt-0 sm:ml-2 sm:inline-block sm:whitespace-nowrap dark:text-zinc-400">
            <span aria-hidden="true" className="hidden sm:inline">
              ·{' '}
            </span>
            {work.role}
          </span>
        </h3>
        <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          {work.summary}
        </p>
      </div>

      <dl className="mt-6 space-y-4 border-t border-zinc-200/80 pt-5 dark:border-zinc-700/70">
        <div>
          <dt className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Problem
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {work.problem}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Architecture & trade-off
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {work.decision}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Result / evidence
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {work.evidence}
          </dd>
        </div>
      </dl>

      <ul className="mt-5 mb-5 flex flex-wrap gap-2" aria-label="Technologies">
        {work.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-3 border-t border-zinc-200/80 pt-5 dark:border-zinc-700/70">
        {work.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="group/link inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-violet-600 outline-offset-4 transition hover:text-violet-700 focus-visible:outline-2 focus-visible:outline-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
          >
            {link.label}
            {link.external && (
              <span className="sr-only">(opens in a new tab)</span>
            )}
            {link.external && (
              <ArrowUpRightIcon
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                weight="bold"
              />
            )}
          </Link>
        ))}
      </div>
    </article>
  )
}

export function HomeFeaturedWork() {
  return (
    <Container className="mt-20 sm:mt-24">
      <section
        id="featured-work"
        aria-labelledby="featured-work-heading"
        className="scroll-mt-24"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-violet-600 dark:text-violet-400">
            Selected work
          </p>
          <h2
            id="featured-work-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100"
          >
            Engineering work, with the proof attached.
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Libraries, cross-platform applications, upstream fixes, and backend
            systems — each framed by the problem, engineering decisions, and
            verifiable evidence.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {featuredWorkData.map((work) => (
            <FeaturedWorkCard key={work.name} work={work} />
          ))}
        </div>
      </section>
    </Container>
  )
}
