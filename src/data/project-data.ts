import type { ImageProps } from 'next/image'

import logoAPIOverrides from '@/images/projects/logo-api-overrides.png'

export type Project = {
  name: string
  description: string
  links: { href: string; label: string }[]
  logo?: ImageProps['src']
}

export const projectData: Project[] = [
  {
    name: 'GitHub Open Source',
    description:
      'A collection of open-source mobile and backend libraries — including reactive extensions, BLoC patterns, and utility packages used by the community.',
    links: [
      {
        href: 'https://github.com/hoc081098',
        label: 'github.com/hoc081098',
      },
    ],
  },
  {
    name: 'RxMobileTeam',
    description:
      'Co-founded RxMobileTeam — a development team focused on reactive programming, clean architecture, and open-source contributions for Android, Flutter, iOS, and backend systems.',
    links: [
      {
        href: 'https://github.com/RxMobileTeam',
        label: 'github.com/RxMobileTeam',
      },
    ],
  },
  {
    name: 'Technical Blog on Medium',
    description:
      'Articles on mobile development, backend services, reactive programming, clean architecture, Kotlin, Flutter, iOS, and ASP.NET Core — sharing knowledge and best practices with the developer community.',
    links: [
      {
        href: 'https://hoc081098.medium.com/',
        label: 'hoc081098.medium.com',
      },
    ],
  },
]
