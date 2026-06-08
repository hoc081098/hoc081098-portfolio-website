export const seoMetadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portfolio.hoc081098.dev',
  ),
  title: {
    template: '%s - hoc081098',
    default: 'hoc081098 – Petrus Nguyễn Thái Học',
  },
  description:
    "I'm Petrus Nguyễn Thái Học (hoc081098), a software engineer building mobile apps, backend services, and open-source tools based in Da Nang, Vietnam.",
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}
