import type { ImageProps } from 'next/image'

import logoGotecq from '@/images/companies/logo-gotecq.jpeg'
import { profileData } from './profile-data'

export type WorkRole = {
  /**
   * Used to sort the roles in descending order. Higher values will be displayed first.
   */
  sortOrder: number
  company: string
  title: string
  logo?: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

export const workData: WorkRole[] = [
  {
    sortOrder: 1,
    company: 'Full-time developer & Freelance / Open Source',
    title: profileData.role,
    start: '2018',
    end: {
      label: 'Present',
      dateTime: new Date().getFullYear().toString(),
    },
  },
  {
    sortOrder: 0,
    company: 'GoTECQ Vietnam, Ltd.',
    title: 'Flutter Developer',
    logo: logoGotecq,
    start: '2020',
    end: '2021',
  },
].toSorted((a, b) => b.sortOrder - a.sortOrder)
