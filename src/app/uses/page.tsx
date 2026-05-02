import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Uses',
  description: 'Software I use, gadgets I love, and other things I recommend.',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="Software I use, gadgets I love, and other things I recommend."
      intro="Here's an overview of the tools and software I use day-to-day as a mobile developer. This is a living list — I update it as my setup evolves."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="MacBook Pro, Apple Silicon" href="https://www.apple.com/macbook-pro/">
            My primary development machine. The performance improvements with
            Apple Silicon make running Android emulators, iOS simulators, and
            build tools significantly faster compared to older Intel machines.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="Android Studio" href="https://developer.android.com/studio">
            My primary IDE for Android and Flutter development. The built-in
            emulator, profiler, and excellent Kotlin/Dart support make it
            indispensable for mobile work.
          </Tool>
          <Tool title="Xcode" href="https://developer.apple.com/xcode/">
            Used for iOS/Swift development and running the iOS simulator. Also
            required for building and deploying Flutter apps to the App Store.
          </Tool>
          <Tool title="Visual Studio Code" href="https://code.visualstudio.com/">
            Great lightweight editor for scripting, web work, and quick edits.
            The Flutter and Dart extensions are solid for smaller Flutter tasks.
          </Tool>
          <Tool title="TablePlus" href="https://tableplus.com/">
            Great software for working with databases. Has saved me from
            building about a thousand admin interfaces for my various projects
            over the years.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Design">
          <Tool title="Figma" href="https://www.figma.com/">
            My go-to for reviewing UI designs and collaborating with designers.
            It's also useful for quickly mocking up layouts before implementing
            them in code.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Productivity">
          <Tool title="Notion" href="https://www.notion.so/">
            I use Notion for personal notes, project planning, and keeping
            track of ideas for open-source work and blog posts.
          </Tool>
          <Tool title="Medium" href="https://hoc081098.medium.com/">
            Where I publish technical articles on Android, Flutter, iOS,
            reactive programming, and clean architecture. Writing helps me
            consolidate knowledge and share it with the community.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
