# Portfolio Projects research

Audit date: **2026-08-10**.

Star, like, release, workflow, and 30-day download figures are point-in-time signals. They should be rounded in the UI and refreshed periodically rather than treated as permanent copy.

## Scope and attribution

This audit covers the canonical repositories and package registry entries behind:

- [hoc081098 repositories](https://github.com/hoc081098?tab=repositories&sort=stargazers)
- [Kotlin Android Open Source repositories](https://github.com/orgs/Kotlin-Android-Open-Source/repositories?type=all)
- [Flutter Dart Open Source repositories](https://github.com/orgs/Flutter-Dart-Open-Source/repositories?type=all)
- [pub.dev packages tagged `hoc081098`](https://pub.dev/packages?q=topic%3Ahoc081098)
- [RxDart](https://github.com/ReactiveX/rxdart), where the work lives upstream rather than under the personal account

The organizations can be attributed to Petrus, but repository-level role evidence is still preferred:

- The Kotlin organization profile identifies itself as hoc081098 and links his accounts ([profile source](https://github.com/Kotlin-Android-Open-Source/.github/blob/main/profile/README.md)); hoc081098 is its [only public member](https://api.github.com/orgs/Kotlin-Android-Open-Source/members).
- The Flutter/Dart organization profile identifies itself as hoc081098 and enumerates his packages ([profile source](https://github.com/Flutter-Dart-Open-Source/.github/blob/main/profile/README.md)); hoc081098 is its [only public member](https://api.github.com/orgs/Flutter-Dart-Open-Source/members).
- When a project was transferred, the canonical repository is used. For example, use [Kotlin-Multiplatform-Foundation/kotlin-channel-event-bus](https://github.com/Kotlin-Multiplatform-Foundation/kotlin-channel-event-bus), not an old organization fork.

## Executive decision

The Projects page should expose **three curated groups**, not every repository:

1. **Open-source libraries** — lead with RxDart maintenance, FlowExt, the strongest Dart packages, and KMP libraries.
2. **Applications & architecture samples** — lead with MVI-Coroutines-Flow and GitHub Search KMM, then selected Android/Flutter applications that add a distinct proof.
3. **Backend & infrastructure** — lead with NetAuth and PostgreSQL HA; keep smaller demonstrations secondary.

Recommended shape:

- **16 full cards**: 9 libraries, 5 applications/samples, and 2 backend/infrastructure projects.
- **Earlier work** as compact rows: archived KMP foundations, an older iOS library, and older application snapshots.
- Each card must display `role`, `status`, technical focus, and evidence links. Archived, earlier, educational, and in-progress work must never look actively maintained or production-deployed.

This is intentionally broader than homepage Featured Work. The homepage should remain at six cards; Projects is the catalogue where mobile breadth and the Dart/Flutter history become visible.

## Status vocabulary for the UI

- **Maintained** — current human maintenance or feature work, with a defensible repository/release signal.
- **Active library** — maintained and currently shipping substantive releases/features.
- **Stable library** — published and useful, but feature/release activity is slower; do not imply rapid development.
- **Maintained sample** — dependencies/builds are maintained, but it is a reference application rather than a product.
- **Earlier work** — still valuable evidence, but the stack or implementation is an older snapshot.
- **Archived reference** — GitHub is archived or the README explicitly says it is no longer maintained.
- **Educational project / infrastructure lab** — learning or reproducible engineering evidence, not production experience.
- **In progress** — incomplete by the repository's own declaration.

Do not infer “maintained” from `pushed_at` alone: bot dependency updates can make an old project appear active.

## Recommended catalogue

### A. Open-source libraries

#### 1. RxDart — full card, first in the group

- **Role:** Maintainer and repository-wide CODEOWNER, not author. The repository assigns `* @hoc081098` in [CODEOWNERS](https://github.com/ReactiveX/rxdart/blob/master/.github/CODEOWNERS); GitHub attributes [226 commits](https://api.github.com/repos/ReactiveX/rxdart/contributors) to hoc081098, and releases from 2020–2025 were published under his account ([release history](https://github.com/ReactiveX/rxdart/releases)).
- **Status:** Maintained upstream library. Authored PRs continued in 2026, including tests/docs around open-ended streams and `switchMap` ([PR #805](https://github.com/ReactiveX/rxdart/pull/805)); the default-branch Dart CI also passed at audit time ([run](https://github.com/ReactiveX/rxdart/actions/runs/31229336006)).
- **Technical focus:** ReactiveX operators and subjects built on native Dart Streams; stream lifecycle, cancellation, composition, and Flutter integration ([repository README](https://github.com/ReactiveX/rxdart)).
- **Adoption:** About **3.4k GitHub stars** ([repository metadata](https://api.github.com/repos/ReactiveX/rxdart)) and, at audit time, **2,877 pub.dev likes** plus **4.8M 30-day downloads** ([pub.dev score API](https://pub.dev/api/packages/rxdart/score)).
- **Portfolio angle:** This is the strongest externally governed proof on the page. Link CODEOWNERS, one semantic PR such as the `switchMap` pause/cancel fix ([PR #737](https://github.com/ReactiveX/rxdart/pull/737)), and the `rxdart_flutter` package contribution ([PR #759](https://github.com/ReactiveX/rxdart/pull/759)).
- **Caveat:** Never say “author of RxDart” or present it as a personal repository. Use **RxDart maintainer**.

#### 2. FlowExt — full card

- **Role:** Author & maintainer; the README names [Petrus Nguyễn Thái Học as author](https://github.com/hoc081098/FlowExt#author-petrus-nguyn-thi-hc), and GitHub attributes the dominant share of commits to him ([contributors](https://api.github.com/repos/hoc081098/FlowExt/contributors)).
- **Status:** Maintained KMP library. Human maintenance continued through 2025–2026 and workflows remain present, while the latest stable release is [1.0.0 from 2024](https://github.com/hoc081098/FlowExt/releases/tag/1.0.0).
- **Technical focus:** Multiplatform Kotlin Coroutines Flow operators missing from the compact core API, with cancellation/concurrency semantics, broad Kotlin targets, versioned docs, tests, and CI ([README and supported targets](https://github.com/hoc081098/FlowExt#supported-targets), [tests](https://github.com/hoc081098/FlowExt/tree/master/src/commonTest)).
- **Adoption:** About **420 GitHub stars** and 27 forks at audit time ([metadata](https://api.github.com/repos/hoc081098/FlowExt)); published through Maven Central and documented for stable and snapshot versions ([installation/docs](https://github.com/hoc081098/FlowExt#documentation)).
- **Caveat:** Call it maintained, but do not advertise a fast stable-release cadence while 1.0.0 remains the latest tagged stable release.

#### 3. dart_either — full card

- **Role:** Author & maintainer, stated in the [README](https://github.com/hoc081098/dart_either#dart_either) and supported by the [contributor history](https://api.github.com/repos/hoc081098/dart_either/contributors).
- **Status:** **Active library**. Version [2.1.0](https://github.com/hoc081098/dart_either/releases/tag/2.1.0) shipped in March 2026 with bounded-concurrency `parTraverseN`/`parSequenceN`, documentation, and tests; the audited default-branch Dart CI passed ([run](https://github.com/hoc081098/dart_either/actions/runs/31147313102)).
- **Technical focus:** Focused `Either<L, R>` error handling, railway-oriented composition, sync/async monad comprehensions, and bounded parallel traversal ([README](https://github.com/hoc081098/dart_either), [semaphore tests](https://github.com/hoc081098/dart_either/blob/master/test/semaphore_test.dart)).
- **Adoption:** GitHub stars are modest, but pub.dev is the meaningful signal: **22 likes** and roughly **27k 30-day downloads** at audit time ([pub.dev score API](https://pub.dev/api/packages/dart_either/score)).
- **Caveat:** Do not rank Dart libraries only by GitHub stars. The package-registry usage signal is materially stronger here.

#### 4. rxdart_ext — full card

- **Role:** Author & maintainer, stated in the [README](https://github.com/hoc081098/rxdart_ext#author-petrus-nguyn-thi-hc); hoc081098 owns nearly all human commits ([contributors](https://api.github.com/repos/hoc081098/rxdart_ext/contributors)).
- **Status:** Stable library. The latest package release is [0.3.0 from 2024](https://github.com/hoc081098/rxdart_ext/releases/tag/0.3.0); later activity is primarily compatibility/automation, and the latest default-branch CI run at audit time was failing ([run](https://github.com/hoc081098/rxdart_ext/actions/runs/31147348392)).
- **Technical focus:** `Single`, `StateStream`, `NotReplayValueStream`, error recovery, switch/exhaust/flat-map variants, resource usage, and focused Stream operators on top of RxDart ([API overview](https://github.com/hoc081098/rxdart_ext#api---documentation), [source](https://github.com/hoc081098/rxdart_ext/tree/master/lib/src)).
- **Adoption:** About **26 GitHub stars**, but approximately **24.5k 30-day pub.dev downloads** and 14 likes at audit time ([GitHub metadata](https://api.github.com/repos/hoc081098/rxdart_ext), [pub.dev score API](https://pub.dev/api/packages/rxdart_ext/score)).
- **Caveat:** Show **Stable**, not **Active**, until CI is repaired and a new release is shipped.

#### 5. rx_shared_preferences — full card

- **Role:** Author & maintainer, stated in the [README](https://github.com/hoc081098/rx_shared_preferences#author-petrus-nguyn-thi-hc) and reflected in the [contributors API](https://api.github.com/repos/hoc081098/rx_shared_preferences/contributors).
- **Status:** Stable library with later compatibility maintenance. Version [4.0.0](https://github.com/hoc081098/rx_shared_preferences/releases/tag/4.0.0) shipped in 2024, followed by support for `SharedPreferencesAsync` and `SharedPreferencesWithCache` in 2025 ([commit/PR](https://github.com/hoc081098/rx_shared_preferences/pull/76)). The latest audited default-branch CI was failing ([run](https://github.com/hoc081098/rx_shared_preferences/actions/runs/31293144462)).
- **Technical focus:** Reactive observation over Flutter SharedPreferences, typed failure semantics, singleton/adapter design, and integration with the more general `rx_storage` abstraction ([README](https://github.com/hoc081098/rx_shared_preferences), [tests](https://github.com/hoc081098/rx_shared_preferences/tree/master/test)).
- **Adoption:** **82 pub.dev likes**, about **8.4k 30-day downloads**, and 45 GitHub stars at audit time ([pub.dev score API](https://pub.dev/api/packages/rx_shared_preferences/score), [GitHub metadata](https://api.github.com/repos/hoc081098/rx_shared_preferences)).
- **Caveat:** Do not display a green-CI claim until the current failure is resolved. Link `rx_storage` as the underlying related library rather than giving both equal visual weight.

#### 6. kotlin-channel-event-bus — full card

- **Role:** Author; the canonical foundation repository explicitly names [Petrus as author](https://github.com/Kotlin-Multiplatform-Foundation/kotlin-channel-event-bus#author-petrus-nguyn-thi-hc), and GitHub attributes most human commits to him ([contributors](https://api.github.com/repos/Kotlin-Multiplatform-Foundation/kotlin-channel-event-bus/contributors)).
- **Status:** Stable KMP library with low recent human activity. It has a Maven Central release, [0.1.0](https://github.com/Kotlin-Multiplatform-Foundation/kotlin-channel-event-bus/releases/tag/0.1.0), and build/sample/release workflows, but most activity after 2024 is automated dependency maintenance.
- **Technical focus:** Multi-key, multi-producer/single-consumer event buses backed by Kotlin Channels, explicit single-collector semantics, synchronized keyed storage, cancellation, and broad KMP targets ([README](https://github.com/Kotlin-Multiplatform-Foundation/kotlin-channel-event-bus), [implementation](https://github.com/Kotlin-Multiplatform-Foundation/kotlin-channel-event-bus/blob/master/channel-event-bus/src/commonMain/kotlin/com/hoc081098/channeleventbus/ChannelEventBus.kt), [concurrency tests](https://github.com/Kotlin-Multiplatform-Foundation/kotlin-channel-event-bus/blob/master/channel-event-bus/src/commonTest/kotlin/com/hoc081098/channeleventbus/ChannelEventBusTest.kt)).
- **Adoption:** About **57 stars** in the canonical repository ([metadata](https://api.github.com/repos/Kotlin-Multiplatform-Foundation/kotlin-channel-event-bus)).
- **Caveat:** The README itself leaves “More tests” on the roadmap. Present it as stable concurrency/API-design evidence, not a flagship with broad adoption.

#### 7. sqlbrite — full card

- **Role:** Author & maintainer, stated in the [README](https://github.com/hoc081098/sqlbrite#author-petrus-nguyn-thi-hc).
- **Status:** Stable Flutter library; latest release [2.8.0](https://github.com/hoc081098/sqlbrite/releases/tag/2.8.0) is from 2024. The current audited test workflow passed ([run](https://github.com/hoc081098/sqlbrite/actions/runs/31292798767)).
- **Technical focus:** A reactive wrapper over `sqflite`, including observable queries, invalidation after writes, transactions/batches, cardinality rules, and RxDart composition ([README](https://github.com/hoc081098/sqlbrite), [tests](https://github.com/hoc081098/sqlbrite/tree/master/test)).
- **Adoption:** **53 pub.dev likes**, about **3.9k 30-day downloads**, and 31 GitHub stars at audit time ([pub.dev score API](https://pub.dev/api/packages/sqlbrite/score), [GitHub metadata](https://api.github.com/repos/hoc081098/sqlbrite)).
- **Caveat:** Stable/earlier Flutter infrastructure, not an actively evolving flagship.

#### 8. listenable_stream — full card

- **Role:** Use **Author / primary contributor** only if the author is comfortable with that label. The README does not explicitly name an author, but hoc081098 accounts for all 63 non-bot commits in the [contributors API](https://api.github.com/repos/Flutter-Dart-Open-Source/listenable_stream/contributors), and the organization identifies itself as his ([organization profile](https://github.com/Flutter-Dart-Open-Source/.github/blob/main/profile/README.md)).
- **Status:** Stable Flutter library; latest release [2.0.1](https://github.com/Flutter-Dart-Open-Source/listenable_stream/releases/tag/2.0.1) is from 2024. The latest audited test workflow passed ([run](https://github.com/Flutter-Dart-Open-Source/listenable_stream/actions/runs/31147186691)).
- **Technical focus:** Bridges Flutter `Listenable`/`ValueListenable` to Dart `Stream`/RxDart `ValueStream`, including replay and single-subscription semantics ([README](https://github.com/Flutter-Dart-Open-Source/listenable_stream), [tests](https://github.com/Flutter-Dart-Open-Source/listenable_stream/blob/master/test/listenable_stream_test.dart)).
- **Adoption:** Approximately **15.5k 30-day pub.dev downloads** and 14 likes at audit time ([pub.dev score API](https://pub.dev/api/packages/listenable_stream/score)).
- **Caveat:** The package is narrow and stable. Its value is a clean interop boundary, not broad application architecture.

#### 9. ViewBindingDelegate — full card, lower in the group

- **Role:** Author; the README names [Petrus as author](https://github.com/hoc081098/ViewBindingDelegate#author).
- **Status:** Earlier stable Android library. It is not archived, but the latest release, [1.4.0](https://github.com/hoc081098/ViewBindingDelegate/releases/tag/1.4.0), is from 2022.
- **Technical focus:** Fragment view-lifecycle correctness, property delegates, clearing binding references at `onDestroyView`, and reflective/non-reflective APIs ([README](https://github.com/hoc081098/ViewBindingDelegate), [Android tests](https://github.com/hoc081098/ViewBindingDelegate/tree/master/library/src/androidTest)).
- **Adoption:** About **115 GitHub stars** and 14 forks ([metadata](https://api.github.com/repos/hoc081098/ViewBindingDelegate)).
- **Caveat:** Label it **Earlier Android library**. XML/ViewBinding is less central to the current Compose/KMP brand.

### Earlier open-source work — compact rows, not equal-sized primary cards

#### solivagant

- **Role/status:** Author; **Archived reference / not maintained**. Both GitHub metadata and the README are explicit ([metadata](https://api.github.com/repos/hoc081098/solivagant), [README notice](https://github.com/hoc081098/solivagant#solivagant)).
- **Focus/evidence:** Compose Multiplatform type-safe navigation, multi-backstacks, lifecycle, saved state, and process restoration; about 127 stars, published releases, docs, tests, and samples ([README](https://github.com/hoc081098/solivagant), [release 0.5.0](https://github.com/hoc081098/solivagant/releases/tag/0.5.0)).
- **Caveat:** Keep the red archived badge visible and point new projects to Navigation 3, as the README does.

#### kmp-viewmodel

- **Role/status:** Author; **Archived reference** ([README author](https://github.com/hoc081098/kmp-viewmodel#author-petrus-nguyn-thi-hc), [metadata](https://api.github.com/repos/hoc081098/kmp-viewmodel)).
- **Focus/evidence:** Shared KMP ViewModel, SavedStateHandle/process restoration, Android lifecycle, Swift/Objective-C interop, SwiftUI, and Compose Multiplatform; about 173 stars, release 0.8.0, substantial common/platform tests and samples ([README](https://github.com/hoc081098/kmp-viewmodel), [release](https://github.com/hoc081098/kmp-viewmodel/releases/tag/0.8.0)).
- **Caveat:** Do not show it as maintained just because bot activity updated `pushed_at`.

#### PhDownloader / PetrusHocDownloader

- **Role/status:** Author; **Earlier iOS library**. The README names Petrus and documents CocoaPods installation ([README](https://github.com/hoc081098/PetrusHocDownloader)); latest release [0.7.0](https://github.com/hoc081098/PetrusHocDownloader/releases/tag/0.7.0) is from 2022.
- **Focus/evidence:** Reactive/functional iOS downloads using Swift, RxSwift, RxAlamofire, controlled concurrency, observable progress/result/state, cancellation, CI, and an XCTest target ([source/tests](https://github.com/hoc081098/PetrusHocDownloader/tree/master/PhDownloaderTests)).
- **Adoption/caveat:** Nine GitHub stars at audit time ([metadata](https://api.github.com/repos/hoc081098/PetrusHocDownloader)); useful for iOS breadth, but too old and small for a primary card.

#### rx_storage and smaller Dart helpers

- `rx_storage` is the general reactive storage abstraction behind `rx_shared_preferences`; it is authored by Petrus, tested, and had roughly **9k 30-day downloads**, but the 2024 release and overlapping story make it better as a related link ([README](https://github.com/Flutter-Dart-Open-Source/rx_storage), [tests](https://github.com/Flutter-Dart-Open-Source/rx_storage/tree/master/test), [pub.dev score API](https://pub.dev/api/packages/rx_storage/score)).
- `disposebag` had roughly **10.5k 30-day downloads**, but its latest release is from 2022 and its cancellation/disposal scope is narrow; keep it in a compact “More Dart packages” list ([pub.dev package](https://pub.dev/packages/disposebag), [score API](https://pub.dev/api/packages/disposebag/score)).
- `flutter_bloc_pattern`, `rx_redux`, `stream_loader`, and `flutter_disposebag` are valid historical reactive tooling, but separate cards would duplicate the stronger RxDart/rxdart_ext/application narrative. Link them from an “Earlier reactive packages” row using the [organization's package list](https://github.com/Flutter-Dart-Open-Source/.github/blob/main/profile/README.md#dartflutter-httpspubdevpackagesqemail3ahoc08109840gmailcom).

### B. Applications & architecture samples

#### 1. MVI-Coroutines-Flow — full card, first in the group

- **Role:** Author & maintainer. The README credits Petrus for code, maintenance, ideas, design, and bug reports ([contributor declaration](https://github.com/Kotlin-Android-Open-Source/MVI-Coroutines-Flow#contributors-)); GitHub attributes more than 400 commits to him ([contributors](https://api.github.com/repos/Kotlin-Android-Open-Source/MVI-Coroutines-Flow/contributors)).
- **Status:** Maintained Android architecture sample, not a production app. It has tagged release [2.2.0](https://github.com/Kotlin-Android-Open-Source/MVI-Coroutines-Flow/releases/tag/2.2.0), dedicated build/unit-test workflows, and ongoing dependency maintenance.
- **Technical focus:** Multi-module Clean Architecture, MVI, immutable state/one-shot events, Coroutines Flow, Arrow, Koin, and sequence-based ViewModel/domain/data tests ([README](https://github.com/Kotlin-Android-Open-Source/MVI-Coroutines-Flow), [module registry](https://github.com/Kotlin-Android-Open-Source/MVI-Coroutines-Flow/blob/master/settings.gradle.kts), [example ViewModel tests](https://github.com/Kotlin-Android-Open-Source/MVI-Coroutines-Flow/blob/master/feature-main/src/test/java/com/hoc/flowmvi/ui/main/MainVMTest.kt)).
- **Adoption:** About **1.1k stars** and 114 forks ([metadata](https://api.github.com/repos/Kotlin-Android-Open-Source/MVI-Coroutines-Flow)).
- **Caveat:** The Compose companion README still says “In progress”; show it only as a related link ([companion README](https://github.com/Kotlin-Android-Open-Source/Jetpack-Compose-MVI-Coroutines-Flow)). Do not imply every dependency PR is green.

#### 2. GitHub Search KMM — full card

- **Role:** Author; hoc081098 owns essentially all human commits ([contributors](https://api.github.com/repos/hoc081098/GithubSearchKMM-Compose-SwiftUI/contributors)).
- **Status:** Stable architecture sample / earlier KMP application. The last authored feature/maintenance work is from 2024, release [0.1.0](https://github.com/hoc081098/GithubSearchKMM-Compose-SwiftUI/releases/tag/0.1.0) is from 2023, and the latest audited Gradle-version workflow was failing ([run](https://github.com/hoc081098/GithubSearchKMM-Compose-SwiftUI/actions/runs/31235962585)).
- **Technical focus:** Shared domain, data, presentation, ViewModels, and state across Android/iOS while retaining Jetpack Compose and SwiftUI; Ktor, FlowRedux, Coroutines Flow, SavedStateHandle, DI, Clean Architecture, and multiplatform testing ([README and architecture](https://github.com/hoc081098/GithubSearchKMM-Compose-SwiftUI#overall-architecture)).
- **Adoption:** About **221 stars** and 21 forks ([metadata](https://api.github.com/repos/hoc081098/GithubSearchKMM-Compose-SwiftUI)).
- **Caveat:** Do not label it actively maintained or claim current CI health. Its value is the end-to-end KMP architecture and native SwiftUI boundary.

#### 3. Refresh-Token-Sample — full card

- **Role:** Author; hoc081098 is the principal human contributor ([contributors](https://api.github.com/repos/hoc081098/Refresh-Token-Sample/contributors)).
- **Status:** Earlier maintained Android sample; latest tagged release [1.2.0](https://github.com/hoc081098/Refresh-Token-Sample/releases/tag/1.2.0) is from 2021, with later dependency/compatibility activity.
- **Technical focus:** Single-flight token refresh under concurrent 401 responses using a Coroutine `Mutex`, retrying queued requests, logout failure paths, Proto DataStore, and Tink AEAD encryption ([README](https://github.com/hoc081098/Refresh-Token-Sample), [interceptor](https://github.com/hoc081098/Refresh-Token-Sample/blob/master/app/src/main/java/com/hoc081098/refreshtokensample/data/remote/interceptor/AuthInterceptor.kt), [crypto implementation](https://github.com/hoc081098/Refresh-Token-Sample/blob/master/app/src/main/java/com/hoc081098/refreshtokensample/data/local/Crypto.kt)).
- **Adoption:** About **129 stars** and 16 forks ([metadata](https://api.github.com/repos/hoc081098/Refresh-Token-Sample)).
- **Caveat:** It lacks meaningful tests for concurrent 401s, refresh failure, token replacement, and retries. Present it as a concrete concurrency/security sample, not verified production authentication infrastructure.

#### 4. Node Auth Flutter + RxDart — full card, marked Earlier work

- **Role:** Author; hoc081098 is the only substantive human contributor ([contributors](https://api.github.com/repos/hoc081098/node-auth-flutter-BLoC-pattern-RxDart/contributors)).
- **Status:** Earlier Flutter application. Although the repository description says “active,” recent human work is compatibility-oriented and the only checked-in test is a basic widget test.
- **Technical focus:** Pure RxDart BLoC without a state-management library, full auth flows, Flutter method channels, Tink on Android, CryptoSwift on iOS, and a Node.js backend ([README](https://github.com/hoc081098/node-auth-flutter-BLoC-pattern-RxDart)).
- **Adoption:** About **267 stars** and 53 forks ([metadata](https://api.github.com/repos/hoc081098/node-auth-flutter-BLoC-pattern-RxDart)).
- **Caveat:** Use **Earlier Flutter/RxDart application**; do not imply current architecture recommendations or comprehensive test coverage.

#### 5. Movie Ticket Booking — full card, marked Earlier work

- **Role:** Lead author & maintainer. The README credits Petrus for code, documentation, and maintenance, while acknowledging another contributor ([contributors section](https://github.com/hoc081098/Movie-Ticket-Booking#contributors-)); GitHub attributes 557 commits to hoc081098 versus 37 to the next contributor ([contributors API](https://api.github.com/repos/hoc081098/Movie-Ticket-Booking/contributors)).
- **Status:** Earlier full-stack Flutter application; no tagged releases or GitHub Actions workflows were found, and the README records a Flutter 2.0-era environment.
- **Technical focus:** Flutter user/admin applications, RxDart/rx_redux/stream_loader state management, NestJS, MongoDB, Neo4j graph recommendations, collaborative filtering, Firebase auth, and Socket.IO ([README](https://github.com/hoc081098/Movie-Ticket-Booking)).
- **Adoption:** About **98 stars** and 36 forks ([metadata](https://api.github.com/repos/hoc081098/Movie-Ticket-Booking)).
- **Caveat:** Strong breadth and historical evidence, but label it **Earlier work** and avoid claims about current deployment or modern Flutter practices.

### Earlier application work — compact rows

- **ComicReaderApp:** Author/maintainer, about 292 stars and 47 forks, multi-module Android app spanning RxKotlin, Coroutines Flow, MVI/MVVM, Room, WorkManager, Firebase, and Clean Architecture ([README](https://github.com/hoc081098/ComicReaderApp_MVI_Coroutine_RxKotlin_Jetpack), [metadata](https://api.github.com/repos/hoc081098/ComicReaderApp_MVI_Coroutine_RxKotlin_Jetpack)). The latest release is from 2021 and checked-in tests are not substantive; use it as **Earlier Android architecture work**, not a current flagship.
- **Jetpack Compose Localization:** A modern focused Compose demo for runtime locale switching, ICU skeletons, formatter caching, and `Accept-Language` ([README](https://github.com/hoc081098/Jetpack-Compose-Localization)). It has only about 15 stars and its current unit/instrumentation tests are generated examples ([test tree](https://github.com/hoc081098/Jetpack-Compose-Localization/tree/main/app/src/test)); do not repeat its “production-ready” claim in the portfolio yet.
- Do not create standalone cards for `WeatherApp_MVI_sample`, pagination/StateFlow/DataStore/ConcatAdapter samples, search-book demos, or KMP templates. They are either older learning work, narrow demonstrations, redundant with stronger projects, or missing meaningful independent tests/adoption.

### C. Backend & infrastructure

#### 1. NetAuth — full card

- **Role:** Author.
- **Status:** **Educational .NET project**, actively developed as architecture practice; explicitly described as educational by its own README ([README](https://github.com/hoc081098/netauth-ddd-cqrs-clean)).
- **Technical focus:** ASP.NET Core/.NET 10, DDD aggregates/value objects, CQRS, Clean Architecture, JWT/refresh tokens, RBAC, transactional outbox, PostgreSQL, Redis, rate limiting, health checks, and OpenTelemetry ([architecture and stack](https://github.com/hoc081098/netauth-ddd-cqrs-clean#i--architecture)).
- **Evidence:** The repository documents 459 unit, 24 integration, and 6 architecture tests, using Testcontainers and NetArchTest ([testing section](https://github.com/hoc081098/netauth-ddd-cqrs-clean#ix--testing)); its audited build/test workflow passed ([run](https://github.com/hoc081098/netauth-ddd-cqrs-clean/actions/runs/21815451580)).
- **Caveat:** Say **Educational authentication service** or **backend practice**, not production auth service or professional backend deployment.

#### 2. PostgreSQL HA lab — full card

- **Role:** Author.
- **Status:** **Infrastructure lab / production-minded demo**, not a production cluster.
- **Technical focus:** Three-node Patroni/PostgreSQL HA, three-node etcd leader election, HAProxy primary/replica routing, EF Core read/write contexts, failover/rejoin, replica lag, read-after-write consistency, and operational diagnosis ([README architecture](https://github.com/hoc081098/PostgresPatroniHaproxyEfcoreDemo#architecture-overview)).
- **Evidence:** Runnable Docker topology, switchover/failover scripts, recorded terminal output and screenshots, read distribution evidence, and documented recovery trade-offs ([demo scenarios](https://github.com/hoc081098/PostgresPatroniHaproxyEfcoreDemo#demo-scenarios)); its audited .NET workflow passed ([run](https://github.com/hoc081098/PostgresPatroniHaproxyEfcoreDemo/actions/runs/22672742412)).
- **Caveat:** There is no automated failure-injection/integration test suite in the repository. Phrase evidence as reproducible scenarios and operational artifacts, not production SLOs.

### Supporting backend row

- **DemoCursorPagination:** Author; a .NET 10/PostgreSQL comparison of offset and composite-key cursor pagination, Base64 cursor encoding, EF Core, indexes, and Docker setup ([README](https://github.com/hoc081098/DemoCursorPagination)). It has a build workflow but no automated tests or benchmarks. Keep it as a supporting link under NetAuth/PostgreSQL rather than a full card, and do not repeat the README's “production-ready” wording without benchmark and correctness evidence.
- `Dotnet-Playground` and isolated event/outbox experiments are useful source material for articles, but they are too diffuse or small for standalone Projects cards today.

## Projects intentionally not promoted to full cards

- [Jetpack-Compose-MVI-Coroutines-Flow](https://github.com/Kotlin-Android-Open-Source/Jetpack-Compose-MVI-Coroutines-Flow): more than 300 stars, but explicitly **In progress**; keep it as the MVI companion link.
- `StateFlow-MVVM-MVI-demo`, `Pagination-MVI-Flow`, `Jetpack-Compose-Pagination`, `DataStore-sample`, `Firestore-Coroutines-Flow`, and `ConcatAdapter-sample`: useful focused references, but redundant with MVI-Coroutines-Flow or too narrow.
- Personal/organization forks of FlowExt, MVI-Coroutines-Flow, kmp-viewmodel, solivagant, GitHub Search KMM, and other canonical projects: always link the canonical repository so stars, issues, releases, and ownership evidence are not split.
- `find_room_flutter_BLoC_pattern_RxDart` explicitly says “learning” and “In progress”; older search/validation/load-more Flutter samples repeat the reactive story without the technical breadth of Node Auth or Movie Ticket Booking.
- `flutter_google_places_hoc081098` has meaningful downloads/likes, but it is a fork/continuation of another package. It requires a separate upstream-delta audit before the portfolio can claim a distinct engineering contribution.
- Very small helper packages should be grouped under “More Dart packages,” not rendered as equal peers beside RxDart, FlowExt, or dart_either.

## Recommended ordering and card treatment

### Full-card order

**Open-source libraries**

1. RxDart — `Maintainer · Maintained upstream`
2. FlowExt — `Author & maintainer · Maintained library`
3. dart_either — `Author & maintainer · Active library`
4. rxdart_ext — `Author & maintainer · Stable library`
5. rx_shared_preferences — `Author & maintainer · Stable library`
6. kotlin-channel-event-bus — `Author · Stable KMP library`
7. sqlbrite — `Author · Stable Flutter library`
8. listenable_stream — `Author / primary contributor · Stable Flutter library`
9. ViewBindingDelegate — `Author · Earlier Android library`

**Applications & architecture samples**

1. MVI-Coroutines-Flow — `Author & maintainer · Maintained sample`
2. GitHub Search KMM — `Author · Stable architecture sample`
3. Refresh Token Sample — `Author · Earlier Android sample`
4. Node Auth Flutter + RxDart — `Author · Earlier Flutter application`
5. Movie Ticket Booking — `Lead author & maintainer · Earlier full-stack application`

**Backend & infrastructure**

1. NetAuth — `Author · Educational .NET project`
2. PostgreSQL HA lab — `Author · Infrastructure lab`

### Compact Earlier-work rows

- solivagant — archived KMP navigation
- kmp-viewmodel — archived KMP lifecycle/state foundation
- PhDownloader — earlier iOS/RxSwift library
- ComicReaderApp — earlier Android architecture application
- rx_storage, disposebag, flutter_bloc_pattern, rx_redux, stream_loader, and smaller Dart packages
- DemoCursorPagination — supporting .NET/PostgreSQL example

## Copy and evidence rules for implementation

1. **Separate role from ownership.** `RxDart maintainer` is strong and exact; `RxDart author` is false. `listenable_stream` should use conservative attribution because the README omits an author declaration.
2. **Use package adoption for Dart.** Display rounded 30-day downloads and likes from pub.dev where they materially exceed GitHub-star signal. Include “as of” or fetch dynamically if feasible.
3. **Do not call bot activity active development.** Use releases, authored commits/PRs, issue work, and test health to classify status.
4. **Make caveats visible.** Archived, earlier, educational, infrastructure lab, and in-progress badges are trust-building, not weaknesses.
5. **Prefer evidence links over generic CTAs.** Source, tests, package registry, docs/releases, architecture, and one representative deep PR should be available when relevant.
6. **Avoid CI claims when the current signal is red.** `rxdart_ext`, `rx_shared_preferences`, and GitHub Search KMM had failing default-branch workflow runs at audit time. Their tests/source remain valid evidence, but the UI should not claim green CI.
7. **Keep homepage and Projects roles distinct.** Homepage remains the six-project narrative. Projects provides breadth across RxDart, KMP, Android, Flutter/Dart, iOS, backend, and infrastructure without pretending every item is equally current.

## Final selection rationale

The strongest story is not “many repositories.” It is a technical progression with independently verifiable artifacts:

> RxDart maintenance → owned reactive libraries in Dart and Kotlin → Android MVI and KMP application architecture → cross-platform Flutter/iOS work → .NET domain modelling and PostgreSQL reliability.

This selection makes that progression visible while filtering out forks, unfinished companions, overlapping tutorials, and repositories whose only positive signal is an old star count.
