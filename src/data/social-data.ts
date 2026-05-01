type SocialItem = {
  key: string
  name: string
  link: string
  value: string
}

export const socialData: SocialItem[] = [
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
]

export const socialDataMap = socialData.reduce(
  (acc, cur) => {
    acc[cur.key] = cur
    return acc
  },
  {} as Record<string, SocialItem>,
)
