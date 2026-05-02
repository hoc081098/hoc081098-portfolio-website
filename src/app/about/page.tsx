import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import portraitImage from '@/images/portrait.jpg'
import { socialData } from '@/data'
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
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-violet-500" weight="duotone" />
        <span className="ml-4 break-all">{children}</span>
      </Link>
    </li>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    "I'm Petrus Nguyễn Thái Học (hoc081098), a senior Android, Flutter, and iOS developer based in Da Nang, Vietnam. 7+ years building mobile apps with Kotlin, Swift, and Dart.",
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20 lg:-mt-5">
          <div className="max-w-[13rem] px-2.5 lg:max-w-[15rem]">
            <div className="group relative rounded-2xl overflow-hidden [transform:rotate(1.5deg)]
              shadow-[0_4px_36px_0_rgba(0,0,0,0.07)]
              dark:shadow-[0_4px_36px_0_rgba(0,0,0,0.38)]
              ring-1 ring-zinc-900/[0.05] dark:ring-white/[0.05]
              transition-all duration-500 ease-out
              hover:-translate-y-[2px]
              hover:shadow-[0_10px_48px_0_rgba(0,0,0,0.10)]
              dark:hover:shadow-[0_10px_48px_0_rgba(0,0,0,0.50)]">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 15rem, 13rem"
                className="aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I'm Petrus Nguyễn Thái Học — hoc081098
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I'm a senior Android, Flutter, and iOS developer with 7+ years of
              experience (since 2018). I graduated with a degree in Information
              Technology from Đà Nẵng University of Science and Technology, and
              I'm based in Da Nang, Vietnam.
            </p>
            <p>
              I have a strong focus on Clean Architecture, MVVM, MVI, and
              Reactive Programming. I work across Kotlin/Android, Dart/Flutter,
              and iOS/Swift. I care deeply about technical quality, clean code,
              good architecture, and performance — whether building solo or as
              part of a team.
            </p>
            <p>
              In my spare time, I write technical articles on Medium and
              actively contribute to the open-source community on GitHub. I
              co-founded RxMobileTeam, a team focused on reactive mobile
              development. My goal is to keep growing, share knowledge, and
              build things that matter.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
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
