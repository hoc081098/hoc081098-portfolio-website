import type { ImageProps } from 'next/image'

import logoGotecq from '@/images/companies/logo-gotecq.jpeg'

export type WorkDate = {
  readonly label: string
  readonly dateTime?: string
}

export type WorkPosition = {
  readonly title: string
  readonly start: WorkDate
  readonly end: WorkDate
  readonly focus: string
  readonly skills: readonly string[]
}

export type WorkExperience = {
  readonly company: string
  readonly employmentType: 'Full-time' | 'Part-time'
  readonly location?: string
  readonly logo?: ImageProps['src']
  readonly start: WorkDate
  readonly end: WorkDate
  readonly positions: readonly WorkPosition[]
}

export const workData = [
  {
    company: 'SUPREMETECH CO., LTD',
    employmentType: 'Full-time',
    location: 'Da Nang City, Vietnam · On-site',
    start: { label: 'Dec 2021', dateTime: '2021-12' },
    end: { label: 'Present' },
    positions: [
      {
        title: 'Senior Android Software Engineer',
        start: { label: 'Jul 2023', dateTime: '2023-07' },
        end: { label: 'Present' },
        focus:
          'Android engineering across Kotlin, Jetpack, reactive programming, RxJava/RxKotlin, Retrofit, Dagger, MVVM, and MVP, with Dart and Flutter in the wider mobile stack.',
        skills: [
          'Android',
          'Kotlin',
          'Reactive Programming',
          'RxJava / RxKotlin',
          'Android Jetpack',
          'Dagger',
        ],
      },
      {
        title: 'Android Engineer',
        start: { label: 'Dec 2021', dateTime: '2021-12' },
        end: { label: 'Jul 2023', dateTime: '2023-07' },
        focus:
          'Android product development centered on Kotlin and reactive programming.',
        skills: ['Android', 'Kotlin', 'Reactive Programming'],
      },
    ],
  },
  {
    company: 'GoTECQ Vietnam, Ltd.',
    employmentType: 'Full-time',
    location: 'Da Nang City, Vietnam',
    logo: logoGotecq,
    start: { label: 'Oct 2020', dateTime: '2020-10' },
    end: { label: 'Aug 2021', dateTime: '2021-08' },
    positions: [
      {
        title: 'Flutter Developer',
        start: { label: 'Oct 2020', dateTime: '2020-10' },
        end: { label: 'Aug 2021', dateTime: '2021-08' },
        focus:
          'Cross-platform mobile development in Flutter, alongside Android/Kotlin and iOS/Swift integration with reactive programming.',
        skills: [
          'Flutter',
          'Android',
          'Kotlin',
          'Swift',
          'iOS',
          'Reactive Programming',
        ],
      },
    ],
  },
  {
    company: 'FOXCODE',
    employmentType: 'Part-time',
    start: { label: 'Mar 2019', dateTime: '2019-03' },
    end: { label: 'Jul 2020', dateTime: '2020-07' },
    positions: [
      {
        title: 'Mobile Developer',
        start: { label: 'Mar 2019', dateTime: '2019-03' },
        end: { label: 'Jul 2020', dateTime: '2020-07' },
        focus:
          'Part-time mobile development across Android/Kotlin and iOS/Swift, using reactive programming across both platforms.',
        skills: ['Android', 'Kotlin', 'Swift', 'iOS', 'Reactive Programming'],
      },
    ],
  },
] as const satisfies readonly WorkExperience[]
