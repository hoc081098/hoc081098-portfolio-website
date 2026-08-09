import Link from 'next/link'
import clsx from 'clsx'
import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  DatabaseIcon,
  DevicesIcon,
  PackageIcon,
} from '@phosphor-icons/react/ssr'

import {
  projectGroups,
  type Project,
  type ProjectGroupKind,
  type ProjectLink,
  type ProjectStatusTone,
} from '@/data/project-data'

const groupIcons = {
  libraries: PackageIcon,
  applications: DevicesIcon,
  backend: DatabaseIcon,
} satisfies Record<ProjectGroupKind, typeof PackageIcon>

const groupIconStyles = {
  libraries:
    'bg-violet-100 text-violet-600 dark:bg-violet-400/10 dark:text-violet-300',
  applications:
    'bg-blue-100 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300',
  backend: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300',
} satisfies Record<ProjectGroupKind, string>

const statusStyles = {
  active:
    'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20',
  published:
    'bg-cyan-50 text-cyan-700 ring-cyan-600/20 dark:bg-cyan-400/10 dark:text-cyan-300 dark:ring-cyan-400/20',
  sample:
    'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-blue-400/20',
  archived:
    'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20',
  earlier:
    'bg-zinc-100 text-zinc-600 ring-zinc-500/20 dark:bg-zinc-700/50 dark:text-zinc-300 dark:ring-zinc-500/30',
  practice:
    'bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-400/10 dark:text-violet-300 dark:ring-violet-400/20',
} satisfies Record<ProjectStatusTone, string>

function ProjectLinks({ links }: { links: readonly ProjectLink[] }) {
  return links.map((link) => {
    let external = link.external ?? !link.href.startsWith('/')

    return (
      <Link
        key={link.href}
        href={link.href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="group/link inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-violet-600 outline-offset-4 transition hover:text-violet-700 focus-visible:outline-2 focus-visible:outline-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
      >
        {link.label}
        {external && <span className="sr-only">(opens in a new tab)</span>}
        {external && (
          <ArrowUpRightIcon
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            weight="bold"
          />
        )}
      </Link>
    )
  })
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={clsx(
        'relative flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl p-6 shadow-sm ring-1 transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-7',
        project.signature
          ? 'bg-linear-to-br from-violet-50 via-white to-blue-50/70 ring-violet-200/90 hover:ring-violet-300 dark:from-violet-500/10 dark:via-zinc-800/45 dark:to-blue-500/5 dark:shadow-zinc-950/20 dark:ring-violet-400/25 dark:hover:ring-violet-400/40'
          : 'bg-white ring-zinc-200/80 hover:ring-zinc-300 dark:bg-zinc-800/35 dark:shadow-zinc-950/20 dark:ring-zinc-700/60 dark:hover:bg-zinc-800/55 dark:hover:ring-zinc-600/70',
      )}
    >
      {project.signature && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-violet-500 via-blue-500 to-cyan-400"
        />
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          {project.signature && (
            <p className="text-[0.68rem] font-bold tracking-[0.18em] text-violet-600 uppercase dark:text-violet-300">
              Signature work
            </p>
          )}
          <p
            className={clsx(
              'text-xs font-semibold tracking-widest text-zinc-500 uppercase dark:text-zinc-400',
              project.signature && 'mt-1.5',
            )}
          >
            {project.category}
          </p>
        </div>
        <span
          className={clsx(
            'shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset',
            statusStyles[project.statusTone],
          )}
        >
          {project.status}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {project.name}
          <span className="mt-1 block text-sm font-medium text-zinc-500 italic sm:mt-0 sm:ml-2 sm:inline-block sm:whitespace-nowrap dark:text-zinc-400">
            <span aria-hidden="true" className="hidden sm:inline">
              ·{' '}
            </span>
            {project.role}
          </span>
        </h3>
        <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          {project.summary}
        </p>
      </div>

      <div className="mt-5 flex gap-3 rounded-xl bg-zinc-50/90 p-4 ring-1 ring-zinc-200/70 dark:bg-zinc-900/35 dark:ring-zinc-700/60">
        <CheckCircleIcon
          aria-hidden="true"
          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
          weight="fill"
        />
        <div>
          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Evidence
          </p>
          <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {project.evidence}
          </p>
        </div>
      </div>

      <ul className="mt-5 mb-5 flex flex-wrap gap-2" aria-label="Technologies">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-3 border-t border-zinc-200/80 pt-5 dark:border-zinc-700/70">
        <ProjectLinks links={project.links} />
      </div>
    </article>
  )
}

function EarlierWorkList({ projects }: { projects: readonly Project[] }) {
  return (
    <div className="mt-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
            Honest history
          </p>
          <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Earlier and supporting work
          </h3>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {projects.length} {projects.length === 1 ? 'entry' : 'entries'}
        </p>
      </div>

      <ul className="mt-4 divide-y divide-zinc-200/80 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200/80 dark:divide-zinc-700/70 dark:bg-zinc-800/25 dark:shadow-zinc-950/20 dark:ring-zinc-700/60">
        {projects.map((project) => (
          <li key={project.name} className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
                  {project.category}
                </p>
                <h4 className="mt-2 text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {project.name}
                  <span className="mt-1 block text-sm font-medium text-zinc-500 italic sm:mt-0 sm:ml-2 sm:inline-block dark:text-zinc-400">
                    <span aria-hidden="true" className="hidden sm:inline">
                      ·{' '}
                    </span>
                    {project.role}
                  </span>
                </h4>
              </div>
              <span
                className={clsx(
                  'shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset',
                  statusStyles[project.statusTone],
                )}
              >
                {project.status}
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              {project.summary}
            </p>
            <p className="mt-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                Evidence:{' '}
              </span>
              {project.evidence}
            </p>

            <div className="mt-4 flex flex-col gap-4 border-t border-zinc-200/80 pt-4 sm:flex-row sm:items-end sm:justify-between dark:border-zinc-700/70">
              <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="flex shrink-0 flex-wrap gap-x-5 gap-y-3">
                <ProjectLinks links={project.links} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ProjectsCatalog() {
  let projectCount = projectGroups.reduce(
    (count, group) => count + group.projects.length,
    0,
  )
  let earlierWorkCount = projectGroups.reduce(
    (count, group) => count + (group.earlierWork?.length ?? 0),
    0,
  )

  return (
    <>
      <div className="rounded-2xl bg-zinc-50 p-5 ring-1 ring-zinc-200/70 sm:p-6 dark:bg-zinc-800/30 dark:ring-zinc-700/50">
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {projectCount} selected projects.
          </span>{' '}
          {earlierWorkCount} earlier or supporting entries remain visible in a
          compact format. Signature work is highlighted and every status is
          stated explicitly.
        </p>

        <nav
          aria-label="Project groups"
          className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {projectGroups.map((group) => {
            let Icon = groupIcons[group.kind]

            return (
              <Link
                key={group.id}
                href={`#${group.id}`}
                className="group flex items-center gap-3 rounded-xl bg-white p-3.5 ring-1 ring-zinc-200/80 transition hover:-translate-y-0.5 hover:shadow-sm hover:ring-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:bg-zinc-900/35 dark:ring-zinc-700/60 dark:hover:ring-zinc-600"
              >
                <span
                  className={clsx(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                    groupIconStyles[group.kind],
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5"
                    weight="duotone"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-zinc-900 group-hover:text-violet-600 dark:text-zinc-100 dark:group-hover:text-violet-400">
                    {group.eyebrow}
                  </span>
                  <span className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-400">
                    {group.projects.length} selected
                    {group.earlierWork &&
                      ` · ${group.earlierWork.length} supporting`}
                  </span>
                </span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-24 space-y-24 sm:mt-28 sm:space-y-28">
        {projectGroups.map((group) => {
          let Icon = groupIcons[group.kind]

          return (
            <section
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-heading`}
              className="scroll-mt-24"
            >
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-12">
                <header className="lg:pt-1">
                  <span
                    className={clsx(
                      'flex h-11 w-11 items-center justify-center rounded-xl',
                      groupIconStyles[group.kind],
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-6 w-6"
                      weight="duotone"
                    />
                  </span>
                  <p className="mt-5 text-sm font-semibold text-violet-600 dark:text-violet-400">
                    {group.eyebrow}
                  </p>
                  <h2
                    id={`${group.id}-heading`}
                    className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                  >
                    {group.title}
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {group.description}
                  </p>
                </header>

                <div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {group.projects.map((project) => (
                      <ProjectCard key={project.name} project={project} />
                    ))}
                  </div>
                  {group.earlierWork && (
                    <EarlierWorkList projects={group.earlierWork} />
                  )}
                </div>
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}
