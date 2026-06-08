import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata: Metadata = {
  title: 'Speaking',
  description:
    "I haven't given public talks yet, but I actively share knowledge through technical writing on Medium and open-source contributions on GitHub.",
}

export default function Speaking() {
  return (
    <SimpleLayout
      title="I share what I know through writing and open source."
      intro="I haven't given public talks yet — but I regularly publish technical articles on Medium covering mobile development, backend services, reactive programming, and clean architecture. You can also find my work and libraries on GitHub."
    >
      <div className="space-y-20" />
    </SimpleLayout>
  )
}
