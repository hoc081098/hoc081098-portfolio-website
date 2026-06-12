import Image, { type ImageProps } from 'next/image'
import { type MDXComponents } from 'mdx/types'

function notranslateClassName(className?: string) {
  return ['notranslate', className].filter(Boolean).join(' ')
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    code: (props: React.ComponentPropsWithoutRef<'code'>) => (
      <code
        {...props}
        className={notranslateClassName(props.className)}
        translate="no"
      />
    ),
    pre: (props: React.ComponentPropsWithoutRef<'pre'>) => (
      <pre
        {...props}
        className={notranslateClassName(props.className)}
        translate="no"
      />
    ),
    Image: (props: ImageProps) => <Image {...props} />,
  }
}
