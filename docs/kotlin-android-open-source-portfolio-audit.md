# Kotlin Android Open Source — portfolio audit

Audit date: **2026-08-08**. Star and fork counts are a point-in-time signal, not the ranking criterion.

## Executive decision

The organization contains one material homepage omission: **[MVI-Coroutines-Flow](https://github.com/Kotlin-Android-Open-Source/MVI-Coroutines-Flow)**.

It should:

- replace the current `Architecture × performance` proof-strip cell with a direct adoption/ownership proof;
- replace the archived `solivagant` featured card, keeping the homepage at six cards;
- link its Compose companion as related work, rather than giving the companion a separate card.

Do not add every popular repository. Several have meaningful history, but they either duplicate the flagship, are explicitly incomplete, have weak test/CI evidence, or are older references whose current maintenance signal is weaker than the six homepage slots deserve.

## Why the organization can be attributed to hoc081098

The attribution is stronger than merely finding his commits:

- hoc081098 is the organization's [only public member](https://api.github.com/orgs/Kotlin-Android-Open-Source/members).
- The organization's own profile says “I'm Kotlin Android Open Source — [@hoc081098]” and links his CV and accounts ([organization profile source](https://github.com/Kotlin-Android-Open-Source/.github/blob/main/profile/README.md)).
- Individual repository authorship is still verified below. Organization membership alone is not used to claim authorship.

## Homepage candidate: MVI-Coroutines-Flow

### What it proves

`MVI-Coroutines-Flow` is a substantial Android architecture sample rather than a small API demo:

- Its settings declare separate app, feature, domain, data, core, UI, MVI-base, MVI-testing, and test-utility modules ([module registry](https://github.com/Kotlin-Android-Open-Source/MVI-Coroutines-Flow/blob/master/settings.gradle.kts)).
- The MVI base owns intent buffering, one-shot event delivery, dispatcher constraints, subscription lifecycle, and Flow sharing behavior ([`AbstractMviViewModel`](https://github.com/Kotlin-Android-Open-Source/MVI-Coroutines-Flow/blob/master/mvi/mvi-base/src/main/java/com/hoc/flowmvi/mvi_base/AbstractMviViewModel.kt)).
- ViewModel tests assert complete state/event sequences for success, failure, refresh, retry, and ignored-intent paths ([`MainVMTest`](https://github.com/Kotlin-Android-Open-Source/MVI-Coroutines-Flow/blob/master/feature-main/src/test/java/com/hoc/flowmvi/ui/main/MainVMTest.kt)).
- The repository has dedicated build and unit-test workflows. The latest runs on the default branch at audit time both passed ([build run](https://github.com/Kotlin-Android-Open-Source/MVI-Coroutines-Flow/actions/runs/23182597461), [unit-test run](https://github.com/Kotlin-Android-Open-Source/MVI-Coroutines-Flow/actions/runs/23182597468)).
- It has tagged releases, most recently [2.2.0](https://github.com/Kotlin-Android-Open-Source/MVI-Coroutines-Flow/releases/tag/2.2.0), and more than 1,000 stars at audit time ([repository/API metadata](https://api.github.com/repos/Kotlin-Android-Open-Source/MVI-Coroutines-Flow)).

### Publicly defensible role

Use **Author & maintainer**.

- The README names Petrus Nguyễn Thái Học for code, maintenance, ideas, design, and bug reports ([contributor declaration](https://github.com/Kotlin-Android-Open-Source/MVI-Coroutines-Flow#contributors-)).
- GitHub's contributor data attributes more than 400 commits to hoc081098 ([contributors API](https://api.github.com/repos/Kotlin-Android-Open-Source/MVI-Coroutines-Flow/contributors)).

Do not call it a production application. Call it an **actively maintained architecture sample**. Recent authored activity on the default branch is predominantly dependency integration, so “actively maintained” is defensible; “actively developed product” is not. Several newer Renovate/Copilot pull-request runs are failing; the evidence above deliberately says the **default branch** is green rather than implying that every open update passes.

### Portfolio value

This fills the largest hole in the current six featured cards: the page claims **Senior Mobile & Kotlin Engineer**, but none of the cards is a focused, high-adoption Android architecture proof. It also connects the existing claims around MVI, Flow, reactive state, Clean Architecture, modularization, and testing in one artifact.

### Recommended proof-strip copy

Replace the current `Architecture × performance` cell; do not create a sixth cell.

```ts
{
  value: '1K+ GitHub stars',
  detail: 'MVI-Coroutines-Flow · author & maintainer',
  href: 'https://github.com/Kotlin-Android-Open-Source/MVI-Coroutines-Flow',
  external: true,
}
```

The architecture/performance article remains valuable, but its evidence is already visible in the article list. The proof strip benefits more from a missing external adoption signal.

### Recommended featured-card copy

Replace the archived `solivagant` card, preserving the current six-card/two-column layout.

```text
Name: MVI-Coroutines-Flow
Category: Android architecture
Role: Author & maintainer
Status: Maintained sample

Summary:
A multi-module Android reference for unidirectional state, Kotlin Coroutines Flow, and testable Clean Architecture.

Problem:
Reactive Android features need deterministic state and event handling without coupling UI, domain, and data concerns.

Architecture & trade-off:
Separate feature, domain, data, and MVI infrastructure modules; model intents, immutable state, and one-shot events with Flow. Explicit boundaries improve testability while adding contracts and module plumbing.

Result / evidence:
1K+ GitHub stars, tagged releases, extensive ViewModel/domain/data tests, and green build and unit-test workflows on the default branch.

Tags:
Android · MVI · Coroutines · Flow · Clean Architecture · Testing

Links:
Source → https://github.com/Kotlin-Android-Open-Source/MVI-Coroutines-Flow
Tests → https://github.com/Kotlin-Android-Open-Source/MVI-Coroutines-Flow/tree/master/feature-main/src/test
Compose companion → https://github.com/Kotlin-Android-Open-Source/Jetpack-Compose-MVI-Coroutines-Flow
```

The Compose companion has more than 300 stars, but its README explicitly says **“In progress...”** ([README](https://github.com/Kotlin-Android-Open-Source/Jetpack-Compose-MVI-Coroutines-Flow)). Keep it as a clearly labelled related link, not an independent featured claim.

## Other serious candidates

### kotlin-channel-event-bus — strong supporting proof, not another homepage card

- The current upstream repository names [Petrus Nguyễn Thái Học as author](https://github.com/Kotlin-Multiplatform-Foundation/kotlin-channel-event-bus#author-petrus-nguyn-thi-hc), publishes through Maven Central, documents many KMP targets, and has tagged releases ([0.1.0](https://github.com/Kotlin-Multiplatform-Foundation/kotlin-channel-event-bus/releases/tag/0.1.0)).
- Its implementation owns synchronized per-key channels, multi-producer/single-consumer semantics, close validation, and explicit failure modes ([source](https://github.com/Kotlin-Multiplatform-Foundation/kotlin-channel-event-bus/blob/master/channel-event-bus/src/commonMain/kotlin/com/hoc081098/channeleventbus/ChannelEventBus.kt)).
- Common tests cover concurrent producers, single-collector enforcement, cancellation, and recollection ([tests](https://github.com/Kotlin-Multiplatform-Foundation/kotlin-channel-event-bus/blob/master/channel-event-bus/src/commonTest/kotlin/com/hoc081098/channeleventbus/ChannelEventBusTest.kt)).
- GitHub attributes the large majority of commits to hoc081098 ([contributors](https://api.github.com/repos/Kotlin-Multiplatform-Foundation/kotlin-channel-event-bus/contributors)).

Portfolio value: excellent evidence for KMP concurrency and API semantics. Caveat: authored feature work was last visible in 2024 and current dependency PR workflows are failing, so do not label it “actively maintained.” Add it later to the Projects page or as a secondary link from a concurrency case study.

### Refresh-Token-Sample — good concurrency/security case study, weak verification

- The README states the single-flight requirement: one refresh operation when multiple requests receive 401, followed by concurrent retries ([README](https://github.com/hoc081098/Refresh-Token-Sample)).
- The interceptor uses a coroutine `Mutex`, re-reads the token inside the lock, detects refresh by another request, and handles logout paths ([`AuthInterceptor`](https://github.com/hoc081098/Refresh-Token-Sample/blob/master/app/src/main/java/com/hoc081098/refreshtokensample/data/remote/interceptor/AuthInterceptor.kt)).
- Local token data is encrypted through Tink AEAD ([`Crypto`](https://github.com/hoc081098/Refresh-Token-Sample/blob/master/app/src/main/java/com/hoc081098/refreshtokensample/data/local/Crypto.kt)).
- hoc081098 is the principal contributor, and the source repository had more than 100 stars at audit time ([contributors](https://api.github.com/repos/hoc081098/Refresh-Token-Sample/contributors), [metadata](https://api.github.com/repos/hoc081098/Refresh-Token-Sample)).

Portfolio value: concrete concurrency and authentication edge cases. Caveat: the repository has no meaningful concurrency tests, and recent dependency PR builds are failing. Keep it for a future Projects case study only after adding tests for concurrent 401s, refresh failure, token replacement, and retry behavior.

### ViewBindingDelegate — credible library history, no longer central to the brand

- The README explicitly names Petrus as author, documents Fragment view-lifecycle failure modes, and exposes both reflective and non-reflective APIs ([README](https://github.com/hoc081098/ViewBindingDelegate)).
- It has Android tests, tagged releases, more than 100 stars, and hoc081098 is the principal contributor ([tests](https://github.com/hoc081098/ViewBindingDelegate/tree/master/library/src/androidTest), [releases](https://github.com/hoc081098/ViewBindingDelegate/releases), [contributors](https://api.github.com/repos/hoc081098/ViewBindingDelegate/contributors)).

Portfolio value: API design and lifecycle correctness. Caveat: the latest release is from 2022 and the problem is tied to XML/ViewBinding rather than the current Kotlin Multiplatform/Compose positioning. List it under Open-source libraries, not Featured work.

### ComicReaderApp — substantial application history, but an older snapshot

- The repository documents a multi-module Kotlin app combining MVI/MVVM, RxKotlin, Coroutines/Flow, Room, WorkManager, Firebase, and Clean Architecture ([README](https://github.com/hoc081098/ComicReaderApp_MVI_Coroutine_RxKotlin_Jetpack)).
- The README identifies Petrus for code, maintenance, ideas, and design; GitHub attributes more than 400 commits to him ([contributor declaration](https://github.com/hoc081098/ComicReaderApp_MVI_Coroutine_RxKotlin_Jetpack#contributors-), [contributors API](https://api.github.com/repos/hoc081098/ComicReaderApp_MVI_Coroutine_RxKotlin_Jetpack/contributors)).
- It had nearly 300 stars at audit time ([metadata](https://api.github.com/repos/hoc081098/ComicReaderApp_MVI_Coroutine_RxKotlin_Jetpack)).

Portfolio value: proves end-to-end Android application scope. Caveat: README tooling and releases reflect the 2021-era stack, checked-in tests are only generated examples, recent changes are mostly automated dependency attempts, and current dependency PR builds fail. Use it as “Earlier Android architecture work,” not current featured work.

### KMP-App-Template-solivagant — integration evidence only

- The app shares UI/business/data across Android, iOS, and Desktop using Compose Multiplatform, Ktor, serialization, Kamel, Koin, and solivagant ([README](https://github.com/Kotlin-Android-Open-Source/KMP-App-Template-solivagant)).
- Its Android/Desktop workflow is green on the default branch ([latest audited run](https://github.com/Kotlin-Android-Open-Source/KMP-App-Template-solivagant/actions/runs/30778856238)).

Portfolio value: shows solivagant inside an actual KMP app. Caveat: no tests, low independent adoption, and recent activity is dependency automation. If `solivagant` remains on another page, link this as a sample; do not feature it independently.

## Repositories intentionally not promoted

- [`Jetpack-Compose-MVI-Coroutines-Flow`](https://github.com/Kotlin-Android-Open-Source/Jetpack-Compose-MVI-Coroutines-Flow): popular related sample, but explicitly marked “In progress.”
- [`StateFlow-MVVM-MVI-demo`](https://github.com/Kotlin-Android-Open-Source/StateFlow-MVVM-MVI-demo), [`Pagination-MVI-Flow`](https://github.com/Kotlin-Android-Open-Source/Pagination-MVI-Flow), and [`Jetpack-Compose-Pagination`](https://github.com/Kotlin-Android-Open-Source/Jetpack-Compose-Pagination): useful focused samples, but weaker and substantially overlapped by `MVI-Coroutines-Flow`.
- [`DataStore-sample`](https://github.com/Kotlin-Android-Open-Source/DataStore-sample), [`Firestore-Coroutines-Flow`](https://github.com/Kotlin-Android-Open-Source/Firestore-Coroutines-Flow), [`ConcatAdapter-sample`](https://github.com/Kotlin-Android-Open-Source/ConcatAdapter-sample), and [`sample_pagination_MVI`](https://github.com/Kotlin-Android-Open-Source/sample_pagination_MVI): narrow demonstrations with insufficient differentiation for homepage space.
- [`kmp-viewmodel`](https://github.com/hoc081098/kmp-viewmodel): technically relevant and well documented, but archived; `solivagant` already represents the same lifecycle/state-restoration lineage.
- Compose Multiplatform Todo/Unsplash mirrors and organization forks of `FlowExt`, `solivagant`, and `GithubSearchKMM`: the canonical hoc081098 repositories are already represented or are better links for ownership/adoption metrics.
- [`Jetpack-Compose-Localization`](https://github.com/hoc081098/Jetpack-Compose-Localization): modern and well documented, but too narrow and too new to displace a stronger flagship today.

## Improvement-plan updates to make

Update `portfolio-github-profile-improvement-plan.md` in the implementation change:

1. In **Proof strip**, add `MVI-Coroutines-Flow — 1K+ stars, author/maintainer, tests and CI` as direct Android/MVI evidence.
2. In **Featured engineering work**, replace the generic “one KMP application/template” list with an explicit balanced six-card set:
   - FlowExt
   - MVI-Coroutines-Flow
   - GitHub Search KMM
   - selected upstream contributions
   - PostgreSQL HA lab
   - NetAuth
3. Move `solivagant` to the future Open-source libraries catalogue with an explicit archived badge; link the KMP app template as integration evidence.
4. Add an audit note that both the personal account and `Kotlin-Android-Open-Source` organization must be reviewed before future portfolio refreshes.

This selection keeps the homepage concise while making the previously missing Android/Kotlin architecture proof impossible to overlook.
