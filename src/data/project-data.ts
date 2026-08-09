export type ProjectGroupKind = 'libraries' | 'applications' | 'backend'

export type ProjectStatusTone =
  | 'active'
  | 'published'
  | 'sample'
  | 'archived'
  | 'earlier'
  | 'practice'

export type ProjectLink = {
  label: string
  href: string
  external?: boolean
}

export type Project = {
  name: string
  category: string
  role: string
  status: string
  statusTone: ProjectStatusTone
  summary: string
  evidence: string
  tags: readonly string[]
  links: readonly ProjectLink[]
  signature?: boolean
}

export type ProjectGroup = {
  id: string
  kind: ProjectGroupKind
  eyebrow: string
  title: string
  description: string
  projects: readonly Project[]
  earlierWork?: readonly Project[]
}

export const projectGroups = [
  {
    id: 'open-source-libraries',
    kind: 'libraries',
    eyebrow: 'Libraries & maintenance',
    title: 'Open-source systems and reusable APIs',
    description:
      'Maintained upstream work, published packages, and earlier libraries that show reactive semantics, concurrency, lifecycle, and cross-platform API design.',
    projects: [
      {
        name: 'RxDart',
        category: 'ReactiveX · Dart',
        role: 'Maintainer & CODEOWNER',
        status: 'Active upstream',
        statusTone: 'active',
        summary:
          'Reactive Extensions for Dart, implemented on top of native Streams and used throughout the Dart and Flutter ecosystem.',
        evidence:
          'Repository-wide CODEOWNER; 3.4k+ GitHub stars and 4.8M pub.dev downloads in the audited 30-day window.',
        tags: ['Dart', 'Flutter', 'ReactiveX', 'Streams', 'Open Source'],
        links: [
          {
            label: 'Official source',
            href: 'https://github.com/ReactiveX/rxdart',
          },
          {
            label: 'CODEOWNERS',
            href: 'https://github.com/ReactiveX/rxdart/blob/master/.github/CODEOWNERS',
          },
          {
            label: 'pub.dev',
            href: 'https://pub.dev/packages/rxdart',
          },
        ],
        signature: true,
      },
      {
        name: 'FlowExt',
        category: 'Kotlin Multiplatform',
        role: 'Author & maintainer',
        status: 'Maintained library',
        statusTone: 'active',
        summary:
          'Operators and utilities that fill practical gaps in Kotlin Coroutines Flow while preserving cancellation and structured concurrency.',
        evidence:
          '400+ GitHub stars, Maven Central releases, versioned documentation, cross-platform tests, and CI across Kotlin targets.',
        tags: ['KMP', 'Coroutines', 'Flow', 'Concurrency', 'Testing'],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/hoc081098/FlowExt',
          },
          {
            label: 'Docs',
            href: 'https://hoc081098.github.io/FlowExt/docs/1.x/',
          },
          {
            label: 'Technical article',
            href: '/articles/kotlin-flow-race-amb-operator',
            external: false,
          },
        ],
        signature: true,
      },
      {
        name: 'rxdart_ext',
        category: 'Reactive Dart',
        role: 'Author & maintainer',
        status: 'Stable library',
        statusTone: 'published',
        summary:
          'Focused RxDart extensions including Single, StateStream, batching operators, error recovery, and stream lifecycle utilities.',
        evidence:
          '24k+ pub.dev downloads in the audited 30-day window, with API documentation, CI, coverage, and operator-level tests.',
        tags: ['Dart', 'RxDart', 'Streams', 'State', 'Error Handling'],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/hoc081098/rxdart_ext',
          },
          {
            label: 'pub.dev',
            href: 'https://pub.dev/packages/rxdart_ext',
          },
          {
            label: 'API docs',
            href: 'https://pub.dev/documentation/rxdart_ext/latest/',
          },
        ],
      },
      {
        name: 'dart_either',
        category: 'Functional Dart',
        role: 'Author & maintainer',
        status: 'Active package',
        statusTone: 'active',
        summary:
          'A focused Either implementation for type-safe error handling, railway-oriented programming, and synchronous or asynchronous comprehensions.',
        evidence:
          'A 2026 release and 27k+ pub.dev downloads in the audited 30-day window, backed by API docs, CI, and comprehensive tests.',
        tags: [
          'Dart',
          'Flutter',
          'Either',
          'Functional Programming',
          'Testing',
        ],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/hoc081098/dart_either',
          },
          {
            label: 'pub.dev',
            href: 'https://pub.dev/packages/dart_either',
          },
          {
            label: 'Tests',
            href: 'https://github.com/hoc081098/dart_either/tree/master/test',
          },
        ],
      },
      {
        name: 'rx_shared_preferences',
        category: 'Flutter storage',
        role: 'Author & maintainer',
        status: 'Stable library',
        statusTone: 'published',
        summary:
          'A reactive wrapper around SharedPreferences that exposes key-value changes as RxDart streams across Flutter platforms.',
        evidence:
          '82 pub.dev likes and 8k+ downloads in the audited 30-day window, with a long release history and platform-level tests.',
        tags: ['Flutter', 'RxDart', 'Storage', 'Streams', 'Testing'],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/hoc081098/rx_shared_preferences',
          },
          {
            label: 'pub.dev',
            href: 'https://pub.dev/packages/rx_shared_preferences',
          },
          {
            label: 'Tests',
            href: 'https://github.com/hoc081098/rx_shared_preferences/tree/master/test',
          },
        ],
      },
      {
        name: 'sqlbrite',
        category: 'Flutter database',
        role: 'Author & maintainer',
        status: 'Stable library',
        statusTone: 'published',
        summary:
          'A reactive wrapper over sqflite with observable queries, invalidation after writes, transactions, batches, and explicit cardinality rules.',
        evidence:
          '53 pub.dev likes and 3.9k downloads in the audited 30-day window, backed by documented APIs, tests, and a passing test workflow.',
        tags: ['Flutter', 'SQLite', 'RxDart', 'Transactions', 'Testing'],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/hoc081098/sqlbrite',
          },
          {
            label: 'pub.dev',
            href: 'https://pub.dev/packages/sqlbrite',
          },
          {
            label: 'Tests',
            href: 'https://github.com/hoc081098/sqlbrite/tree/master/test',
          },
        ],
      },
      {
        name: 'listenable_stream',
        category: 'Flutter interoperability',
        role: 'Primary contributor',
        status: 'Stable library',
        statusTone: 'published',
        summary:
          'A focused bridge from Flutter Listenable and ValueListenable APIs to Dart Stream and RxDart ValueStream semantics.',
        evidence:
          '15k+ pub.dev downloads in the audited 30-day window; all substantive human commits, tests, and releases are attributable to hoc081098.',
        tags: ['Flutter', 'Dart', 'RxDart', 'Listenable', 'Interop'],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/Flutter-Dart-Open-Source/listenable_stream',
          },
          {
            label: 'pub.dev',
            href: 'https://pub.dev/packages/listenable_stream',
          },
          {
            label: 'Tests',
            href: 'https://github.com/Flutter-Dart-Open-Source/listenable_stream/blob/master/test/listenable_stream_test.dart',
          },
        ],
      },
      {
        name: 'kotlin-channel-event-bus',
        category: 'KMP concurrency',
        role: 'Author',
        status: 'Stable KMP library',
        statusTone: 'published',
        summary:
          'A thread-safe, multi-key and multi-producer event bus built on Coroutines Channels with explicit single-consumer semantics.',
        evidence:
          'Published on Maven Central with broad KMP targets, common concurrency tests, versioned docs, and an Android Compose sample.',
        tags: ['KMP', 'Channels', 'Flow', 'Thread Safety', 'Concurrency'],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/Kotlin-Multiplatform-Foundation/kotlin-channel-event-bus',
          },
          {
            label: 'Tests',
            href: 'https://github.com/Kotlin-Multiplatform-Foundation/kotlin-channel-event-bus/tree/master/channel-event-bus/src/commonTest',
          },
          {
            label: 'Docs',
            href: 'https://kotlin-multiplatform-foundation.github.io/kotlin-channel-event-bus/docs/0.x/',
          },
        ],
      },
      {
        name: 'ViewBindingDelegate',
        category: 'Android lifecycle',
        role: 'Author',
        status: 'Earlier Android library',
        statusTone: 'earlier',
        summary:
          'Kotlin property delegates that simplify ViewBinding while respecting Fragment view lifecycle and clearing stale references.',
        evidence:
          '115+ GitHub stars, tagged releases, reflective and non-reflective APIs, and Android instrumentation tests.',
        tags: ['Android', 'Kotlin', 'ViewBinding', 'Lifecycle', 'Testing'],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/hoc081098/ViewBindingDelegate',
          },
          {
            label: 'Releases',
            href: 'https://github.com/hoc081098/ViewBindingDelegate/releases',
          },
          {
            label: 'Tests',
            href: 'https://github.com/hoc081098/ViewBindingDelegate/tree/master/library/src/androidTest',
          },
        ],
      },
    ],
    earlierWork: [
      {
        name: 'solivagant',
        category: 'Compose Multiplatform',
        role: 'Author',
        status: 'Archived reference',
        statusTone: 'archived',
        summary:
          'Type-safe navigation modeled as state, with lifecycle, saved state, multiple back stacks, transitions, and platform integration.',
        evidence:
          '127 GitHub stars, published releases, docs, tests, and Android, Desktop, and iOS samples; explicitly archived and no longer maintained.',
        tags: ['Compose Multiplatform', 'Navigation', 'Lifecycle', 'State'],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/hoc081098/solivagant',
          },
          {
            label: 'Archived docs',
            href: 'https://hoc081098.github.io/solivagant/docs/0.x/',
          },
        ],
      },
      {
        name: 'kmp-viewmodel',
        category: 'Kotlin Multiplatform',
        role: 'Author',
        status: 'Archived reference',
        statusTone: 'archived',
        summary:
          'Shared ViewModel, SavedStateHandle, process restoration, Android lifecycle, SwiftUI interop, and Compose Multiplatform integration.',
        evidence:
          '170+ GitHub stars, published releases, common and platform tests, and multiple Android, iOS, and shared-UI samples.',
        tags: ['KMP', 'ViewModel', 'Lifecycle', 'SwiftUI', 'Saved State'],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/hoc081098/kmp-viewmodel',
          },
          {
            label: 'Release',
            href: 'https://github.com/hoc081098/kmp-viewmodel/releases/tag/0.8.0',
          },
        ],
      },
      {
        name: 'PhDownloader',
        category: 'iOS · Swift',
        role: 'Author',
        status: 'Earlier iOS library',
        statusTone: 'earlier',
        summary:
          'A reactive iOS download manager built with RxSwift and RxAlamofire, including throttled progress, cancellation, and bounded concurrency.',
        evidence:
          'Distributed through CocoaPods with an example app, CI, an XCTest target, and observable APIs for task state and results.',
        tags: ['iOS', 'Swift', 'RxSwift', 'Concurrency', 'CocoaPods'],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/hoc081098/PetrusHocDownloader',
          },
          {
            label: 'Tests',
            href: 'https://github.com/hoc081098/PetrusHocDownloader/tree/master/PhDownloaderTests',
          },
        ],
      },
      {
        name: 'Earlier reactive Dart packages',
        category: 'Dart & Flutter',
        role: 'Author & maintainer',
        status: 'Earlier package family',
        statusTone: 'earlier',
        summary:
          'rx_storage, disposebag, flutter_bloc_pattern, rx_redux, and stream_loader capture earlier reusable work around reactive state and lifecycle.',
        evidence:
          'Published packages with source, tests, and real registry usage, grouped here because their stories overlap the stronger RxDart libraries above.',
        tags: ['Dart', 'Flutter', 'RxDart', 'State Management'],
        links: [
          {
            label: 'Package catalogue',
            href: 'https://pub.dev/packages?q=topic%3Ahoc081098',
          },
          {
            label: 'Flutter/Dart org',
            href: 'https://github.com/Flutter-Dart-Open-Source',
          },
        ],
      },
    ],
  },
  {
    id: 'applications-architecture',
    kind: 'applications',
    eyebrow: 'Mobile & cross-platform',
    title: 'Applications and architecture samples',
    description:
      'End-to-end products and focused samples that make state management, platform boundaries, security, and application architecture inspectable.',
    projects: [
      {
        name: 'MVI-Coroutines-Flow',
        category: 'Android architecture',
        role: 'Author & maintainer',
        status: 'Maintained sample',
        statusTone: 'sample',
        summary:
          'A multi-module Android reference for unidirectional state, Coroutines Flow, and testable Clean Architecture.',
        evidence:
          '1.1k+ GitHub stars, tagged releases, extensive ViewModel, domain, and data tests, plus dedicated build and unit-test workflows.',
        tags: ['Android', 'MVI', 'Coroutines', 'Flow', 'Clean Architecture'],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/Kotlin-Android-Open-Source/MVI-Coroutines-Flow',
          },
          {
            label: 'Tests',
            href: 'https://github.com/Kotlin-Android-Open-Source/MVI-Coroutines-Flow/tree/master/feature-main/src/test',
          },
          {
            label: 'Releases',
            href: 'https://github.com/Kotlin-Android-Open-Source/MVI-Coroutines-Flow/releases',
          },
        ],
        signature: true,
      },
      {
        name: 'GitHub Search KMM',
        category: 'Kotlin Multiplatform app',
        role: 'Author',
        status: 'Stable architecture sample',
        statusTone: 'sample',
        summary:
          'An end-to-end GitHub search app sharing data, domain, presentation, and ViewModel layers while retaining Compose and SwiftUI interfaces.',
        evidence:
          '220+ GitHub stars, shared tests, and a documented Clean Architecture and MVI module design across Android and iOS.',
        tags: ['KMP', 'Jetpack Compose', 'SwiftUI', 'MVI', 'iOS'],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/hoc081098/GithubSearchKMM-Compose-SwiftUI',
          },
          {
            label: 'Architecture',
            href: 'https://github.com/hoc081098/GithubSearchKMM-Compose-SwiftUI#overall-architecture',
          },
          {
            label: 'CI',
            href: 'https://github.com/hoc081098/GithubSearchKMM-Compose-SwiftUI/actions',
          },
        ],
      },
      {
        name: 'Refresh Token Sample',
        category: 'Android security',
        role: 'Author',
        status: 'Focused security sample',
        statusTone: 'sample',
        summary:
          'An OkHttp authentication sample that coordinates concurrent 401 responses into one token refresh and protects local tokens with Tink.',
        evidence:
          '129 GitHub stars; the source demonstrates token re-checking inside a Coroutine Mutex, concurrent retries, logout paths, and encrypted Proto DataStore.',
        tags: ['Android', 'OkHttp', 'Coroutines', 'Mutex', 'Security'],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/hoc081098/Refresh-Token-Sample',
          },
          {
            label: 'Auth interceptor',
            href: 'https://github.com/hoc081098/Refresh-Token-Sample/blob/master/app/src/main/java/com/hoc081098/refreshtokensample/data/remote/interceptor/AuthInterceptor.kt',
          },
          {
            label: 'Encrypted storage',
            href: 'https://github.com/hoc081098/Refresh-Token-Sample/blob/master/app/src/main/java/com/hoc081098/refreshtokensample/data/local/Crypto.kt',
          },
        ],
      },
      {
        name: 'Node Auth Flutter + RxDart',
        category: 'Flutter application',
        role: 'Author',
        status: 'Earlier Flutter work',
        statusTone: 'earlier',
        summary:
          'A complete authentication application using pure RxDart BLoC, a Node.js backend, and native Android/iOS encryption bridges.',
        evidence:
          '260+ GitHub stars and 50+ forks across login, registration, password recovery, profile, and avatar flows without a state-management framework.',
        tags: ['Flutter', 'RxDart', 'BLoC', 'Android', 'iOS'],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/hoc081098/node-auth-flutter-BLoC-pattern-RxDart',
          },
          {
            label: 'Architecture & features',
            href: 'https://github.com/hoc081098/node-auth-flutter-BLoC-pattern-RxDart#readme',
          },
        ],
      },
      {
        name: 'Movie Ticket Booking',
        category: 'Flutter full-stack app',
        role: 'Lead author & maintainer',
        status: 'Earlier full-stack work',
        statusTone: 'earlier',
        summary:
          'Customer and staff Flutter apps backed by NestJS, MongoDB, Neo4j, Firebase authentication, Socket.IO, and recommendation queries.',
        evidence:
          '98 GitHub stars, runnable user and admin applications, backend source, architecture assets, and extensive product screenshots.',
        tags: ['Flutter', 'RxDart', 'BLoC', 'NestJS', 'Neo4j'],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/hoc081098/Movie-Ticket-Booking',
          },
          {
            label: 'Architecture & setup',
            href: 'https://github.com/hoc081098/Movie-Ticket-Booking#directory-structure',
          },
          {
            label: 'Screenshots',
            href: 'https://github.com/hoc081098/Movie-Ticket-Booking#screenshots',
          },
        ],
      },
    ],
    earlierWork: [
      {
        name: 'ComicReaderApp',
        category: 'Android application',
        role: 'Author & maintainer',
        status: 'Earlier Android work',
        statusTone: 'earlier',
        summary:
          'A multi-module comic reader combining MVI and MVVM with RxKotlin, Coroutines Flow, Room, WorkManager, Firebase, and Arrow.',
        evidence:
          '290+ GitHub stars and more than 400 authored commits across an end-to-end Android application and its Node.js backend.',
        tags: ['Android', 'MVI', 'RxKotlin', 'Coroutines', 'Room'],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/hoc081098/ComicReaderApp_MVI_Coroutine_RxKotlin_Jetpack',
          },
          {
            label: 'Backend',
            href: 'https://github.com/hoc081098/comic_app_server_nodejs',
          },
        ],
      },
    ],
  },
  {
    id: 'backend-infrastructure',
    kind: 'backend',
    eyebrow: '.NET & data systems',
    title: 'Backend and infrastructure experiments',
    description:
      'Production-minded learning systems for domain boundaries, authentication, reliable side effects, pagination, and PostgreSQL operations.',
    projects: [
      {
        name: 'NetAuth',
        category: 'ASP.NET Core',
        role: 'Author',
        status: 'Educational .NET project',
        statusTone: 'practice',
        summary:
          'An authentication API built to explore DDD, CQRS, Clean Architecture, permission-based authorization, and transactional messaging.',
        evidence:
          'Unit, integration, and architecture test suites backed by CI, PostgreSQL, Redis, OpenTelemetry, and a transactional outbox.',
        tags: ['.NET', 'DDD', 'CQRS', 'PostgreSQL', 'Security'],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/hoc081098/netauth-ddd-cqrs-clean',
          },
          {
            label: 'Tests',
            href: 'https://github.com/hoc081098/netauth-ddd-cqrs-clean/tree/main/tests',
          },
          {
            label: 'CI',
            href: 'https://github.com/hoc081098/netauth-ddd-cqrs-clean/actions',
          },
        ],
      },
      {
        name: 'PostgreSQL HA lab',
        category: 'Data infrastructure',
        role: 'Author',
        status: 'Infrastructure lab',
        statusTone: 'practice',
        summary:
          'A runnable PostgreSQL high-availability topology with Patroni election, HAProxy routing, and split EF Core contexts.',
        evidence:
          'Docker topology, operational scripts, terminal evidence, and documented failover, replica lag, retry, and read-after-write scenarios.',
        tags: [
          'PostgreSQL',
          'Patroni',
          'HAProxy',
          'EF Core',
          'High Availability',
        ],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/hoc081098/PostgresPatroniHaproxyEfcoreDemo',
          },
          {
            label: 'Demo scenarios',
            href: 'https://github.com/hoc081098/PostgresPatroniHaproxyEfcoreDemo#demo-scenarios',
          },
          {
            label: 'Technical notes',
            href: 'https://github.com/hoc081098/PostgresPatroniHaproxyEfcoreDemo/tree/master/docs',
          },
        ],
      },
    ],
    earlierWork: [
      {
        name: 'Cursor Pagination Demo',
        category: 'ASP.NET Core · PostgreSQL',
        role: 'Author',
        status: 'Focused backend demo',
        statusTone: 'practice',
        summary:
          'A .NET minimal API comparing offset and composite-key cursor pagination over PostgreSQL and Entity Framework Core.',
        evidence:
          'Runnable source documents ordering, continuation cursors, query shape, and indexes; it intentionally makes no benchmark or production-readiness claim.',
        tags: ['.NET', 'PostgreSQL', 'EF Core', 'Pagination', 'API Design'],
        links: [
          {
            label: 'Source',
            href: 'https://github.com/hoc081098/DemoCursorPagination',
          },
          {
            label: 'Documentation',
            href: 'https://github.com/hoc081098/DemoCursorPagination#readme',
          },
        ],
      },
    ],
  },
] as const satisfies readonly ProjectGroup[]
