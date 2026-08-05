import { profileData } from './profile-data'

export const seoMetadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portfolio.hoc081098.dev',
  ),
  title: {
    template: '%s - hoc081098',
    default: `${profileData.displayName} — ${profileData.role}`,
  },
  description: profileData.seoDescription,
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}
