import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container, ContainerOuter } from '@/components/Container'
import { HomeFeaturedWork } from '@/components/HomeFeaturedWork'
import { HomeProofStrip } from '@/components/HomeProofStrip'
import { socialIconsMap } from '@/components/icons'
import { resumeUrl } from '@/data/common'
import { profileData } from '@/data/profile-data'
import { socialData, socialDataMap } from '@/data/social-data'
import { workData, type WorkDate, type WorkExperience } from '@/data/work-data'
import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  CloudArrowDownIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  FileTextIcon,
  GithubLogoIcon,
} from '@phosphor-icons/react/ssr'
import { getAllArticles, type ArticleWithSlug } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

import landscape1 from '@/images/landscapes/IMG_20230115_060320.jpg'
import landscape2 from '@/images/landscapes/IMG_20260214_172437.jpg'
import landscape3 from '@/images/landscapes/20250430_224510-COLLAGE.jpg'
import landscape4 from '@/images/landscapes/PXL_20250426_173919684.jpg'

const landscapePhotos = [landscape1, landscape2, landscape3, landscape4]
const heroSecondaryButtonStyles =
  'px-5 py-2.5 ring-1 ring-zinc-200 shadow-sm shadow-zinc-950/5 hover:ring-zinc-300 dark:ring-0 dark:shadow-none dark:hover:ring-0'

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
    <Link className="group -m-1 p-1" {...props}>
      <Icon
        className="h-6 w-6 fill-zinc-500 transition group-hover:fill-violet-500 dark:fill-zinc-400 dark:group-hover:fill-violet-400"
        weight="duotone"
      />
    </Link>
  )
}

function DateLabel({ date }: { date: WorkDate }) {
  if (date.dateTime) {
    return <time dateTime={date.dateTime}>{date.label}</time>
  }

  return <span>{date.label}</span>
}

function DateRange({ start, end }: { start: WorkDate; end: WorkDate }) {
  return (
    <span>
      <DateLabel date={start} /> <span className="sr-only">until</span>{' '}
      <span aria-hidden="true">—</span> <DateLabel date={end} />
    </span>
  )
}

function Employer({ experience }: { experience: WorkExperience }) {
  let { company, employmentType, location, logo, positions, start, end } =
    experience

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        {logo ? (
          <Image
            src={logo}
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
      <div className="min-w-0 flex-auto">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {company}
          </h3>
          <p className="text-xs text-zinc-400 sm:ml-auto dark:text-zinc-500">
            <DateRange start={start} end={end} />
          </p>
        </div>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          {employmentType}
          {location ? ` · ${location}` : null}
        </p>

        <ol className="mt-4 space-y-5 border-l border-zinc-200 dark:border-zinc-700/70">
          {positions.map((position) => (
            <li key={position.title} className="relative pl-4">
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-1 h-2 w-2 rounded-full bg-violet-500 ring-4 ring-white dark:bg-violet-400 dark:ring-zinc-900"
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {position.title}
                </h4>
                {positions.length > 1 ? (
                  <p className="text-xs text-zinc-400 sm:ml-auto dark:text-zinc-500">
                    <DateRange start={position.start} end={position.end} />
                  </p>
                ) : null}
              </div>
              <p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
                {position.focus}
              </p>
              <ul
                aria-label={`Technical focus for ${position.title}`}
                className="mt-2.5 flex flex-wrap gap-1.5"
              >
                {position.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md bg-zinc-100 px-2 py-1 text-[0.68rem] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </li>
  )
}

function ExperienceTimeline() {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <BriefcaseIcon className="h-6 w-6 flex-none" weight="duotone" />
          <span className="ml-3">Work Experience</span>
        </h2>
        <Link
          href={socialDataMap.linkedin.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 transition hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
        >
          LinkedIn
          <span className="sr-only">(opens in a new tab)</span>
          <ArrowUpRightIcon
            aria-hidden="true"
            className="h-3.5 w-3.5"
            weight="bold"
          />
        </Link>
      </div>
      <p className="mt-3 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
        Employment is listed separately from open-source maintenance and
        independent engineering work.
      </p>
      <ol className="mt-7 space-y-8">
        {workData.map((experience) => (
          <Employer key={experience.company} experience={experience} />
        ))}
      </ol>
      <Button
        href={resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        className={clsx('group mt-6 w-full', heroSecondaryButtonStyles)}
      >
        Download CV
        <CloudArrowDownIcon
          className="h-5 w-5 text-zinc-400 transition group-active:text-zinc-600 dark:group-hover:text-zinc-50 dark:group-active:text-zinc-50"
          weight="duotone"
        />
      </Button>
      <Link
        href="/projects#open-source-libraries"
        className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-zinc-500 transition hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400"
      >
        View open-source maintenance
        <ArrowRightIcon className="h-3.5 w-3.5" weight="bold" />
      </Link>
    </div>
  )
}

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', '-rotate-2']

  return (
    <ContainerOuter className="mt-16 sm:mt-20">
      <div className="mb-4 text-center text-sm text-zinc-500 italic dark:text-zinc-400">
        A few snapshots from Hải Lăng, Quảng Trị — my hometown.
      </div>
      <div className="-my-4 flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth py-4 pr-[max(0px,50%-5.5rem)] pl-[max(0px,50%-5.5rem)] [scrollbar-width:none] sm:grid sm:snap-none sm:grid-cols-4 sm:justify-items-center sm:gap-[clamp(1rem,2.5vw,2rem)] sm:overflow-visible sm:px-4 lg:px-6 [&::-webkit-scrollbar]:hidden">
        {landscapePhotos.map((src, imageIndex) => (
          <div
            key={imageIndex}
            className={clsx(
              'relative aspect-9/10 w-44 flex-none snap-center overflow-hidden rounded-xl bg-zinc-100 sm:w-full sm:max-w-72 sm:snap-align-none sm:rounded-2xl dark:bg-zinc-800',
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
    </ContainerOuter>
  )
}

export default async function Home() {
  let articles = (await getAllArticles()).slice(0, 4)
  let secondarySocials = socialData.filter(({ key }) => key !== 'github')

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {profileData.brandHeadline}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {profileData.heroDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href="#featured-work"
              variant="accent"
              className="group px-5 py-2.5"
            >
              View featured work
              <ArrowDownIcon
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
                weight="bold"
              />
            </Button>
            <Button
              href={socialDataMap.github.link}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className={heroSecondaryButtonStyles}
            >
              <GithubLogoIcon className="h-4 w-4" weight="bold" />
              GitHub
            </Button>
            <Button
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className={heroSecondaryButtonStyles}
            >
              <FileTextIcon className="h-4 w-4" weight="bold" />
              View résumé
            </Button>
          </div>
          <div className="mt-6 flex gap-6">
            {secondarySocials.map((social) => (
              <SocialLink
                key={social.key}
                href={social.link}
                target={social.key === 'email' ? undefined : '_blank'}
                rel={social.key === 'email' ? undefined : 'noopener noreferrer'}
                aria-label={`${social.name}: ${social.value}`}
                icon={socialIconsMap[social.key]}
              />
            ))}
          </div>
        </div>
      </Container>
      <HomeProofStrip />
      <HomeFeaturedWork />
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
            <ExperienceTimeline />
          </div>
        </div>
      </Container>
    </>
  )
}
