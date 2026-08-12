import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import portraitImage from '@/images/portrait.jpg'
import { profileData, socialData } from '@/data'
import { socialIconsMap } from '@/components/icons'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string; weight?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex min-w-0 text-sm font-medium text-zinc-800 transition hover:text-violet-500 dark:text-zinc-200 dark:hover:text-violet-500"
      >
        <Icon
          className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-violet-500"
          weight="duotone"
        />
        <span className="ml-4 break-all">{children}</span>
      </Link>
    </li>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description: profileData.aboutMetadataDescription,
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:-mt-5 lg:pl-20">
          <div className="max-w-[13rem] px-2.5 lg:max-w-[15rem]">
            <div className="group relative [transform:rotate(1.5deg)] overflow-hidden rounded-2xl shadow-[0_4px_36px_0_rgba(0,0,0,0.07)] ring-1 ring-zinc-900/[0.05] transition-all duration-500 ease-out hover:-translate-y-[2px] hover:shadow-[0_10px_48px_0_rgba(0,0,0,0.10)] dark:shadow-[0_4px_36px_0_rgba(0,0,0,0.38)] dark:ring-white/[0.05] dark:hover:shadow-[0_10px_48px_0_rgba(0,0,0,0.50)]">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 15rem, 13rem"
                className="aspect-square object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I'm Petrus Nguyễn Thái Học — hoc081098
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I'm {profileData.displayName} ({profileData.handle}), a{' '}
              {profileData.role} based in Da Nang, Vietnam, with 7+ years of
              experience building applications and open-source libraries across
              Android, Kotlin Multiplatform, Compose Multiplatform, and Flutter.
              I graduated with a degree in Information Technology from Đà Nẵng
              University of Science and Technology. Beyond formal education,
              much of my engineering growth has been self-taught through
              hands-on product work, open-source maintenance, and a long-term
              focus on software fundamentals.
            </p>
            <p>
              I focus on software architecture, reactive programming,
              concurrency and thread safety, performance optimization, and
              clean, maintainable, testable code. I use data structures and
              algorithms when they materially improve correctness, latency,
              memory use, or API design.
            </p>
            <p>
              I'm an RxDart maintainer, open-source contributor, technical
              writer, and co-founder of RxMobileTeam. My backend work focuses on
              .NET, Domain-Driven Design, Clean Architecture, PostgreSQL, and
              distributed data systems while mobile and Kotlin engineering
              remain at the center of my work.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2"
          >
            {socialData.map((e) => (
              <SocialLink
                key={e.key}
                href={e.link}
                icon={socialIconsMap[e.key]}
              >
                {e.value}
              </SocialLink>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  )
}
