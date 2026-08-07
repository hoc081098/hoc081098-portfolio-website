type SocialItem = {
  key: string
  name: string
  link: string
  value: string
}

export const socialData = [
  {
    key: 'github',
    name: 'GitHub',
    link: 'https://github.com/hoc081098',
    value: 'hoc081098',
  },
  {
    key: 'linkedin',
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/hoc081098/',
    value: 'hoc081098',
  },
  {
    key: 'medium',
    name: 'Medium',
    link: 'https://hoc081098.medium.com/',
    value: 'hoc081098',
  },
  {
    key: 'email',
    name: 'Email',
    link: 'mailto:hoc081098@gmail.com',
    value: 'hoc081098@gmail.com',
  },
] as const satisfies readonly SocialItem[]

type SocialDataItem = (typeof socialData)[number]
type SocialDataMap = {
  [Item in SocialDataItem as Item['key']]: Item
}

export const socialDataMap = Object.fromEntries(
  socialData.map((item) => [item.key, item] as const),
) as SocialDataMap
