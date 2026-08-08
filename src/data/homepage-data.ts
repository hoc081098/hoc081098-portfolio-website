export type HomeProofPoint = {
  value: string
  detail: string
  href: string
  external?: boolean
}

export const homeProofData = [
  {
    value: 'Since 2018',
    detail: 'Shipping mobile software',
    href: '/about',
    external: false,
  },
  {
    value: 'RxDart maintainer',
    detail: 'Repository-wide CODEOWNER',
    href: 'https://github.com/ReactiveX/rxdart/blob/master/.github/CODEOWNERS',
    external: true,
  },
  {
    value: 'FlowExt author',
    detail: 'KMP library · 400+ GitHub stars',
    href: 'https://github.com/hoc081098/FlowExt',
    external: true,
  },
  {
    value: 'Merged upstream',
    detail: 'FlutterFire · Koin · Khonshu · Google Ground',
    href: '#upstream-contributions',
    external: false,
  },
  {
    value: 'Architecture × performance',
    detail: 'Concrete complexity and runtime trade-offs',
    href: '/articles/clean-architecture-performance-complexity-tradeoffs',
    external: false,
  },
] as const satisfies readonly HomeProofPoint[]

export type FeaturedWorkKind =
  | 'reactive'
  | 'navigation'
  | 'application'
  | 'upstream'
  | 'backend'
  | 'infrastructure'

export type FeaturedWorkStatusTone =
  | 'active'
  | 'archived'
  | 'sample'
  | 'merged'
  | 'practice'

export type FeaturedWorkLink = {
  label: string
  href: string
  external?: boolean
}

export type FeaturedWork = {
  id?: string
  name: string
  kind: FeaturedWorkKind
  category: string
  role: string
  status: string
  statusTone: FeaturedWorkStatusTone
  summary: string
  problem: string
  decision: string
  evidence: string
  tags: readonly string[]
  links: readonly FeaturedWorkLink[]
}

export const featuredWorkData = [
  {
    name: 'FlowExt',
    kind: 'reactive',
    category: 'Reactive systems',
    role: 'Author & maintainer',
    status: 'Active library',
    statusTone: 'active',
    summary:
      'Kotlin Multiplatform operators and extensions that fill practical gaps in kotlinx.coroutines Flow.',
    problem:
      "Flow's compact core leaves production apps without several familiar reactive operators, but extensions must preserve structured concurrency.",
    decision:
      'Build focused Flow extensions instead of a parallel abstraction; adoption stays lightweight at the cost of cross-platform semantic tests and careful cancellation handling.',
    evidence:
      'Published on Maven Central with versioned docs, common tests, CI, and 400+ GitHub stars.',
    tags: ['KMP', 'Coroutines', 'Flow', 'Concurrency', 'Testing'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/hoc081098/FlowExt',
        external: true,
      },
      {
        label: 'Docs',
        href: 'https://hoc081098.github.io/FlowExt/docs/1.x/',
        external: true,
      },
      {
        label: 'Technical article',
        href: '/articles/kotlin-flow-race-amb-operator',
      },
    ],
  },
  {
    name: 'solivagant',
    kind: 'navigation',
    category: 'Navigation architecture',
    role: 'Author',
    status: 'Archived reference',
    statusTone: 'archived',
    summary:
      'A type-safe Compose Multiplatform navigation library designed around state and lifecycle.',
    problem:
      'Compose Multiplatform needed typed navigation that could survive lifecycle and state restoration across different targets.',
    decision:
      'Model routes and back stacks as state instead of wrapping platform routers; this improves control and portability while owning more restoration and lifecycle complexity.',
    evidence:
      'Published releases and Android, Desktop, and iOS samples; now explicitly archived and no longer maintained.',
    tags: ['Compose Multiplatform', 'Navigation', 'Lifecycle', 'State'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/hoc081098/solivagant',
        external: true,
      },
      {
        label: 'Archived docs',
        href: 'https://hoc081098.github.io/solivagant/docs/0.x/',
        external: true,
      },
      {
        label: 'Samples',
        href: 'https://github.com/hoc081098/solivagant/tree/master/samples',
        external: true,
      },
    ],
  },
  {
    name: 'GitHub Search KMM',
    kind: 'application',
    category: 'KMP application',
    role: 'Author',
    status: 'Architecture sample',
    statusTone: 'sample',
    summary:
      'An end-to-end GitHub search app with Jetpack Compose on Android and SwiftUI on iOS.',
    problem:
      'Share behavior and state across Android and iOS without forcing both products into a shared UI layer.',
    decision:
      'Share domain, data, presentation, and ViewModel layers while keeping Compose and SwiftUI native; accept duplicated UI and platform integration.',
    evidence:
      'Android and iOS CI, shared tests, documented architecture, and 200+ GitHub stars.',
    tags: ['KMP', 'Jetpack Compose', 'SwiftUI', 'MVI', 'Clean Architecture'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/hoc081098/GithubSearchKMM-Compose-SwiftUI',
        external: true,
      },
      {
        label: 'Architecture',
        href: 'https://github.com/hoc081098/GithubSearchKMM-Compose-SwiftUI#overall-architecture',
        external: true,
      },
      {
        label: 'CI',
        href: 'https://github.com/hoc081098/GithubSearchKMM-Compose-SwiftUI/actions',
        external: true,
      },
    ],
  },
  {
    id: 'upstream-contributions',
    name: 'Selected upstream contributions',
    kind: 'upstream',
    category: 'Open source',
    role: 'Contributor',
    status: 'Merged upstream',
    statusTone: 'merged',
    summary:
      'Production fixes and performance work accepted into established mobile and Kotlin projects.',
    problem:
      'Fix defects inside external codebases without widening APIs or disrupting existing runtime behavior.',
    decision:
      "Use narrowly scoped patches — iterative traversal, keyed state restoration, explicit error paths, and corrected locking — to match each project's constraints.",
    evidence:
      'Changes reviewed and merged by maintainers of FlutterFire, Koin, Khonshu, and Google Ground.',
    tags: ['Open Source', 'Android', 'Flutter', 'Kotlin', 'Concurrency'],
    links: [
      {
        label: 'FlutterFire PR',
        href: 'https://github.com/firebase/flutterfire/pull/87',
        external: true,
      },
      {
        label: 'Koin PR',
        href: 'https://github.com/InsertKoinIO/koin/pull/1801',
        external: true,
      },
      {
        label: 'Khonshu PR',
        href: 'https://github.com/freeletics/khonshu/pull/716',
        external: true,
      },
      {
        label: 'Google Ground PR',
        href: 'https://github.com/google/ground-android/pull/2078',
        external: true,
      },
    ],
  },
  {
    name: 'NetAuth',
    kind: 'backend',
    category: '.NET backend',
    role: 'Author',
    status: 'Backend practice',
    statusTone: 'practice',
    summary:
      'An educational ASP.NET Core authentication service for exploring production-minded backend design.',
    problem:
      'Authentication correctness spans domain invariants, token lifecycle, persistence, and reliable side effects.',
    decision:
      'Use DDD, CQRS, Clean Architecture, and a transactional outbox; explicit boundaries improve testability while adding application-layer plumbing.',
    evidence:
      'Unit, integration, and architecture test suites backed by CI, PostgreSQL, Redis, and OpenTelemetry.',
    tags: ['.NET', 'DDD', 'CQRS', 'PostgreSQL', 'Security'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/hoc081098/netauth-ddd-cqrs-clean',
        external: true,
      },
      {
        label: 'Tests',
        href: 'https://github.com/hoc081098/netauth-ddd-cqrs-clean/tree/main/tests',
        external: true,
      },
      {
        label: 'CI',
        href: 'https://github.com/hoc081098/netauth-ddd-cqrs-clean/actions',
        external: true,
      },
    ],
  },
  {
    name: 'PostgreSQL HA lab',
    kind: 'infrastructure',
    category: 'Data infrastructure',
    role: 'Author',
    status: 'Infrastructure demo',
    statusTone: 'practice',
    summary:
      'A production-minded lab for PostgreSQL high availability with Patroni, HAProxy, and EF Core.',
    problem:
      'A primary failure or replica lag breaks naive connection routing and read-after-write assumptions.',
    decision:
      'Combine Patroni election, HAProxy routing, and split EF Core contexts; higher availability and read scale come with retry and eventual-consistency complexity.',
    evidence:
      'Runnable Docker topology, operational scripts, terminal evidence, and documented failure scenarios.',
    tags: ['PostgreSQL', 'Patroni', 'HAProxy', 'EF Core', 'High Availability'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/hoc081098/PostgresPatroniHaproxyEfcoreDemo',
        external: true,
      },
      {
        label: 'Demo scenarios',
        href: 'https://github.com/hoc081098/PostgresPatroniHaproxyEfcoreDemo#demo-scenarios',
        external: true,
      },
      {
        label: 'Technical notes',
        href: 'https://github.com/hoc081098/PostgresPatroniHaproxyEfcoreDemo/tree/master/docs',
        external: true,
      },
    ],
  },
] as const satisfies readonly FeaturedWork[]
