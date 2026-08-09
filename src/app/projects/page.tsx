import { type Metadata } from 'next'

import { ProjectsCatalog } from '@/components/ProjectsCatalog'
import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected open-source libraries, mobile and cross-platform applications, Android and Flutter architecture samples, and .NET backend systems by hoc081098.',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Engineering projects, with the evidence attached."
      intro="A curated catalogue of open-source maintenance, reusable libraries, mobile and cross-platform applications, and backend systems. Each entry states my role, its current status, and the evidence worth inspecting."
    >
      <ProjectsCatalog />
    </SimpleLayout>
  )
}
