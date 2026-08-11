# Bản chốt: biến website và GitHub thành bằng chứng năng lực

Mục tiêu không phải làm nó “đẹp hơn”. Nó đã đủ đẹp rồi. Mục tiêu là để một tech lead, recruiter hoặc khách hàng nhìn trong 30 giây và kết luận:

> Đây là một Senior Mobile/Kotlin Engineer có chiều sâu về reactive systems, concurrency, software architecture, performance và open source; đồng thời xây dựng .NET backend/PostgreSQL như một trục kỹ thuật thứ hai.

Hiện website chưa truyền tải được điều đó. Trang Projects chỉ có GitHub profile, RxMobileTeam và Medium; còn GitHub README thì quá dài, nhiều badge và liệt kê package, khiến điểm mạnh bị chìm.

**Legend trạng thái**

- ✅ **Hoàn tất** — đã chốt và áp dụng.
- 🟡 **Đang thực hiện** — đã triển khai một phần, vẫn còn hạng mục cần hoàn thiện.
- ⬜ **Chưa bắt đầu** — chưa triển khai.

---

## 1. Định vị thương hiệu kỹ thuật

> **Trạng thái:** ✅ Hoàn tất
>
> Đã áp dụng cho homepage, About, metadata và Open Graph.

Không định vị kiểu:

> Software Engineer building mobile apps, backend services, and open-source tools.

Câu này đúng nhưng nhạt, ai cũng viết được. Brand headline được chốt là:

> Senior Mobile & Kotlin Engineer — .NET Backend

Dấu `—` tách vai trò senior đã được chứng minh ở Mobile/Kotlin khỏi trục .NET Backend, tránh ngụ ý mình đang tự nhận là Senior Backend Engineer.

### Description cũ

```text
description: 'A senior full-stack engineer,  mobile developer and backend developer.\n'
        'I have 7+ years of experience (since 2018), have a strong knowledge of Clean Architecture,'
        ' MVVM, MVI, Reactive Programming, Kotlin/Android, Dart/Flutter, iOS/Swift.\n'
        'Focus on technical, clean code, good architecture and performance.',
```

Phần nên giữ là 7+ years of experience, nền tảng mobile đa hệ, architecture, reactive programming, code quality và performance. Không nên giữ cách định vị “senior full-stack engineer, mobile developer and backend developer” vì nó dàn đều ba vai trò và làm mờ năng lực mạnh nhất.

### Những technical aspect cần thể hiện

- Software architecture: Clean Architecture, MVVM, MVI, modularization và design trade-offs
- Reactive programming: stream semantics, state management, cancellation và backpressure
- Concurrency and multithreading: synchronization, structured concurrency, thread safety và lifecycle
- Performance optimization: profiling, allocation, latency, rendering và benchmark trước/sau
- Data structures and algorithms: complexity, implementation details và lựa chọn cấu trúc dữ liệu phù hợp
- Clean, maintainable, testable code: correctness, API design, testing và maintainability

Mô tả dài dùng cho About và profile bio:

> Senior Mobile & Kotlin Engineer with 7+ years of experience building reliable, high-performance applications and libraries across Android, Kotlin Multiplatform, Compose Multiplatform, and Flutter. I focus on software architecture, reactive programming, concurrency, performance optimization, and clean, maintainable code, applying algorithmic thinking where it materially improves correctness or efficiency. I also build .NET backend and distributed data systems on top of that foundation.

Metadata/SEO nên dùng phiên bản ngắn hơn:

> Senior Mobile & Kotlin Engineer building reliable mobile and .NET backend systems, focused on reactive systems, concurrency, architecture, and performance.

Không cần nhét tất cả keyword vào headline. Headline chốt identity; description dài thể hiện chiều sâu; project, article, test và benchmark cung cấp bằng chứng cho từng claim.

Thông điệp xuyên suốt phải là:

Mobile/Kotlin là thực lực senior đã được chứng minh. Backend/.NET là trục kỹ thuật thứ hai đang được xây dựng bằng project và bài viết thật. Architecture và reactive programming là sợi chỉ đỏ kết nối cả hai.

Không dùng “Senior Mobile & Backend Developer” vì dễ bị hiểu là senior đồng đều ở cả backend. Headline “Senior Mobile & Kotlin Engineer — .NET Backend” đưa Backend vào thương hiệu nhưng vẫn giữ ranh giới seniority rõ ràng.

---

## 2. Website portfolio

> **Trạng thái:** 🟡 Đang thực hiện
>
> Hero, Proof strip, Featured engineering work và catalogue Projects đã hoàn tất. Các case study riêng, Work Experience và những phần nội dung phụ vẫn cần triển khai.

### Trang chủ nên có cấu trúc mới

#### Phần 1: Hero

> **Trạng thái:** ✅ Hoàn tất

Hero cần trả lời ngay ba câu:

- Mày là ai?
- Mày giỏi nhất cái gì?
- Có bằng chứng nào?

Ví dụ:

> Senior Mobile & Kotlin Engineer — .NET Backend
>
> Building reliable, high-performance mobile and backend systems across Kotlin Multiplatform and .NET, with a focus on reactive programming, concurrency, software architecture, and performance. RxDart maintainer and open-source contributor.

Bên dưới có ba nút:

- View featured work
- GitHub
- Download résumé

Đừng để nút chính là “More about me”. Người xem chưa cần biết tuổi thơ mày; họ cần biết mày đã xây được gì.

#### Phần 2: Proof strip

> **Trạng thái:** ✅ Hoàn tất
>
> Đã audit cả account `hoc081098` và organization `Kotlin-Android-Open-Source`; không còn giới hạn nguồn bằng chứng ở personal repositories.

Ngay dưới hero cần một hàng bằng chứng ngắn:

- Since 2018 in mobile engineering
- RxDart maintainer — kèm link trực tiếp chứng minh vai trò
- Author of FlowExt — KMP library có adoption và release thật
- Author & maintainer của MVI-Coroutines-Flow — Android MVI/Clean Architecture sample có 1k+ stars, tests, releases và CI
- Upstream contributions to FlutterFire, RxDart, Khonshu hoặc dự án lớn khác
- Technical depth về software architecture, concurrency, performance optimization, data structures và algorithms — mỗi claim cần link tới project, article, test hoặc benchmark cụ thể
- Số release, star, download hoặc platform support nếu có số liệu đáng tin

Proof strip hiện dùng đúng năm direct proof: `Since 2018`, RxDart CODEOWNER, FlowExt, merged upstream contributions và MVI-Coroutines-Flow. Technical depth không đứng thành claim chữ chung chung; nó được chứng minh qua source/tests của MVI-Coroutines-Flow, các upstream PR và bài architecture-performance cụ thể.

Không dùng con số trang trí kiểu profile views, streak hay tổng số commit. Những số đó dễ làm màu và gần như không nói gì về năng lực.

#### Phần 3: Featured engineering work

> **Trạng thái:** ✅ Hoàn tất
>
> Sau khi audit organization `Kotlin-Android-Open-Source`, homepage chốt sáu card cân bằng. Không thêm card chỉ vì nhiều stars nếu nó trùng chủ đề, incomplete hoặc maintenance yếu.

Đây phải là phần trọng tâm, đứng trước ảnh quê và trước blog.

Chốt sáu dự án:

1. FlowExt — flagship về Kotlin Flow, concurrency và reactive semantics.
2. MVI-Coroutines-Flow — Android MVI, multi-module Clean Architecture, Coroutines Flow và testing; 1k+ stars, role author/maintainer có thể kiểm chứng.
3. GitHub Search KMM — end-to-end KMP application với Compose, SwiftUI và shared presentation/domain/data.
4. Selected upstream contributions — FlutterFire, Koin, Khonshu và Google Ground.
5. PostgreSQL HA lab — Patroni, HAProxy, etcd, EF Core; ghi rõ đây là infrastructure demo.
6. NetAuth — .NET DDD/CQRS/Clean Architecture practice; không giả làm production SaaS.

`solivagant` vẫn có giá trị về Compose Multiplatform navigation, lifecycle và state restoration nhưng đã archived. Chuyển nó sang catalogue Projects/Earlier open-source work với badge rõ ràng, thay vì dùng một trong sáu slot homepage. `Jetpack-Compose-MVI-Coroutines-Flow` chỉ là companion link vì README hiện ghi “In progress”.

Mỗi card không chỉ có tên và link. Nó cần:

- Bài toán
- Vai trò của mày
- Điểm khó kỹ thuật
- Quyết định kiến trúc
- Trade-off
- Kết quả hoặc mức độ sử dụng
- Source, documentation, article và tests

Ví dụ với FlowExt:

> Kotlin Multiplatform extensions for Coroutine Flow, focusing on operator semantics, cancellation and concurrency. Supports multiple Kotlin targets, includes tests for edge cases and is published through Maven Central.

Thêm tag cụ thể: Kotlin Multiplatform, Coroutines, Flow, Concurrency, Testing.

### Trang Projects

> **Trạng thái:** ✅ Hoàn tất
>
> Đã audit account `hoc081098`, hai organization `Kotlin-Android-Open-Source` và `Flutter-Dart-Open-Source`, các package mang topic `hoc081098` trên pub.dev, cùng canonical upstream repositories như RxDart và kotlin-channel-event-bus.

Trang Projects hiện là một catalogue curated, chia thành ba nhóm. Mỗi full card đều có role, trạng thái, technical focus, evidence, tags và direct links; không còn ba link tổng hợp chung chung.

#### Open-source libraries

Chín full cards:

1. RxDart — Maintainer & repository-wide CODEOWNER; đây là external-governance proof mạnh nhất.
2. FlowExt — maintained KMP Flow library.
3. dart_either — active Dart library, release 2026 và adoption mạnh trên pub.dev.
4. rxdart_ext — stable reactive Dart library.
5. rx_shared_preferences — stable Flutter storage library.
6. kotlin-channel-event-bus — stable KMP concurrency library ở canonical Foundation repository.
7. sqlbrite — reactive SQLite/Flutter library.
8. listenable_stream — Listenable/Stream interoperability.
9. ViewBindingDelegate — earlier stable Android lifecycle library.

`solivagant`, `kmp-viewmodel`, PhDownloader và nhóm Dart packages cũ vẫn xuất hiện dưới dạng compact Earlier/Supporting work. Archived status luôn hiển thị rõ, không dùng bot activity để suy ra active development.

#### Applications and architecture samples

Năm full cards:

1. MVI-Coroutines-Flow — maintained Android architecture sample và signature work.
2. GitHub Search KMM — stable KMP architecture sample với Compose/SwiftUI boundary.
3. Refresh Token Sample — focused concurrency/security sample; không claim test coverage chưa có.
4. Node Auth Flutter + RxDart — earlier Flutter/RxDart application.
5. Movie Ticket Booking — earlier full-stack Flutter application.

ComicReaderApp nằm ở compact Earlier work. Compose-MVI vẫn chỉ là companion vì README ghi “In progress”; StateFlow, Pagination, DataStore và KMP templates không được nâng thành equal full cards vì trùng chủ đề, thiếu tests hoặc adoption độc lập yếu.

#### Backend and infrastructure experiments

Hai full cards:

1. NetAuth — ghi rõ Educational .NET project, với DDD/CQRS/Clean Architecture, outbox và test suites.
2. PostgreSQL HA lab — ghi rõ Infrastructure lab, với runnable failover scenarios và operational evidence.

Cursor Pagination chỉ là compact supporting demo vì chưa có automated tests hoặc benchmarks.

RxDart, FlowExt và MVI-Coroutines-Flow được đánh dấu `Signature work`. Tổng thể có 16 full cards và 6 compact entries, đủ breadth qua KMP, Android, Flutter/Dart, iOS, .NET và data infrastructure mà không giả vờ mọi project đều hiện tại hoặc quan trọng ngang nhau.

Các số star, like và 30-day downloads là snapshot tại thời điểm audit; UI làm tròn và cần được refresh định kỳ.

Catalogue đã hoàn tất; bước sau là viết case study riêng cho các project quan trọng:

- `/projects/flowext`
- `/projects/mvi-coroutines-flow`
- `/projects/postgres-ha`

Một case study tốt gồm:

1. Context
2. Problem
3. Constraints
4. Architecture
5. Key decisions
6. Failure modes và edge cases
7. Testing
8. Results
9. What I would change today

Đây mới là thứ phân biệt senior thật với người học tutorial.

### Work Experience

> **Trạng thái:** 🟡 Timeline và technical scope đã hoàn tất; measurable outcomes còn thiếu
>
> Đã đối chiếu LinkedIn ngày 2026-08-10 và thay “Full-time developer & Freelance / Open Source” bằng employment history cụ thể. Homepage tách employment khỏi open-source maintenance và independent work, đồng thời link trực tiếp tới LinkedIn và Projects.

Employment timeline hiện tại:

1. **SUPREMETECH CO., LTD — Full-time**
   - Senior Android Software Engineer — Jul 2023–Present
   - Android Engineer — Dec 2021–Jul 2023
2. **GoTECQ Vietnam, Ltd. — Full-time**
   - Flutter Developer — Oct 2020–Aug 2021
3. **FOXCODE — Part-time**
   - Mobile Developer — Mar 2019–Jul 2020

Technical scope trên homepage chỉ dùng role và skills có thể đối chiếu từ LinkedIn: Android, Kotlin, Jetpack, reactive programming, RxJava/RxKotlin, Flutter/Dart, Swift và iOS. Không bịa metrics hoặc business outcomes.

Đã loại bỏ “company” mơ hồ trước đây:

> Full-time developer & Freelance / Open Source

Employment, open-source maintenance và independent engineering work giờ được trình bày riêng. Contract/Freelance chỉ nên thêm khi có client/domain và scope đủ cụ thể để công khai.

Phần còn thiếu để đánh dấu hoàn tất hoàn toàn là 2–4 kết quả cụ thể cho từng employment period:

- Kiến trúc hoặc migration đã trực tiếp thiết kế
- Module/product domain đã chịu trách nhiệm
- Quy mô team và phạm vi collaboration
- Thay đổi đo được về build time, crash rate, performance, maintainability hoặc release process
- Mentoring, code review và technical decisions

Không công khai được công ty thì ghi:

> Senior Android Engineer — Confidential product company

Sau đó mô tả domain và responsibility mà không tiết lộ bí mật.

### Bài viết

Phần article đang là một lợi thế thật. Bài race/amb có code, semantics, cancellation và link tới FlowExt — đây là đúng hướng.

Cần biến mỗi bài thành một chuỗi bằng chứng:

> Article → repository → tests → issue/PR → release

Nên phân series rõ:

- Kotlin Coroutines & Flow Internals
- Mobile Architecture in Practice
- Kotlin to .NET Backend
- PostgreSQL and Distributed Data
- Architecture Trade-offs

Đừng đăng quá nhiều bài generic do AI tổng hợp. Một bài sâu mỗi tháng có giá trị hơn mười bài “best practices”.

### Ảnh quê và yếu tố cá nhân

Giữ. Nó tạo bản sắc và khiến portfolio bớt giống CV robot.

Nhưng chuyển xuống sau:

1. Hero
2. Evidence
3. Featured work
4. Articles
5. Experience
6. Personal photos

Hiện ảnh quê xuất hiện quá sớm và đẩy bằng chứng kỹ thuật xuống dưới.

### About

Bỏ bớt các câu chung chung như:

- care deeply about clean code
- build things that matter
- share knowledge
- keep growing

Không sai, nhưng ai cũng nói thế.

Thay bằng một career narrative cụ thể:

- Bắt đầu từ Android
- Đi sâu vào reactive programming
- Đóng góp sang Flutter/RxDart
- Chuyển sang KMP và Compose Multiplatform
- Xây dựng .NET backend với DDD và PostgreSQL
- Mục tiêu dài hạn: mobile + backend + architecture leadership

### Trang Uses

Có thể giữ, nhưng ưu tiên rất thấp. Nội dung hiện tại khá giống filler của template: MacBook, Android Studio, VS Code, Figma, TablePlus.

Nên đổi thành thứ có giá trị kỹ thuật hơn:

- Development workflow
- Local environment
- Testing tools
- Profiling
- Database tools
- CI/CD
- AI usage policy

Có thể ghi thẳng cách dùng AI:

> I use AI for exploration, boilerplate and review assistance. Architecture decisions, correctness, testing and final ownership remain mine.

Câu này vừa minh bạch vừa không tự hạ thấp mình.

---

## 3. GitHub profile homepage

### Rút README xuống còn khoảng 30–40% độ dài hiện tại

README hiện có:

- Nhiều badge mạng xã hội
- Dòng “self-taught senior”
- Danh sách tech stack
- Hàng loạt package Dart/Flutter
- GitHub streak
- WakaTime
- Profile views
- Nhiều section collapse

Thông tin nhiều nhưng signal-to-noise thấp.

Senior không cần chứng minh mình senior bằng một biển logo. Code và contribution phải nói thay.

### Cấu trúc GitHub README nên là

#### 1. Identity

Petrus Nguyễn Thái Học\
Senior Mobile & Kotlin Engineer — .NET Backend\
Reactive systems · Kotlin Multiplatform · Mobile architecture\
Building .NET backend and PostgreSQL systems

#### 2. Evidence

Chỉ 4–6 dòng:

- Maintainer/contributor role có thể xác minh
- Author of FlowExt và MVI-Coroutines-Flow; `solivagant` ghi rõ archived nếu nhắc tới
- Upstream contributions
- Technical writing
- Portfolio và contact

#### 3. Featured work

Dùng bảng khoảng 5 dự án:

| Project                | What it proves                                    |
| ---------------------- | ------------------------------------------------- |
| FlowExt                | Flow semantics, concurrency, cancellation, KMP    |
| MVI-Coroutines-Flow    | Android MVI, modular Clean Architecture, testing  |
| GitHub Search KMM      | End-to-end multiplatform application architecture |
| Upstream contributions | Externally reviewed fixes and optimization        |
| PostgreSQL HA lab      | Failover, routing and consistency trade-offs      |
| NetAuth                | Domain modelling, CQRS and backend learning       |

Không liệt kê 17 package ngang hàng. Dự án cũ có thể đặt trong một section “Earlier open-source work”.

#### 4. Selected upstream contributions

Đưa 3–5 PR đáng giá nhất:

- FlutterFire transaction bug
- RxDart operators
- Khonshu hoặc project lớn khác
- Một contribution liên quan Android/KMP

Nêu ngắn:

> Fixed X by changing Y; merged after maintainer review.

Đây là bằng chứng cực mạnh vì code đã qua review của người ngoài.

#### 5. Current focus

Currently working on:

- .NET and ASP.NET Core
- Domain-Driven Design and modular monoliths
- PostgreSQL reliability and high availability

Dùng từ learning, building hoặc exploring đúng chỗ. Đừng biến project học thành kinh nghiệm production.

#### 6. Contact

Portfolio, LinkedIn, email. Hết.

### Những thứ nên bỏ hoặc thu nhỏ

- GitHub streak
- Profile views
- WakaTime chart khổng lồ
- Badge cho từng ngôn ngữ
- Facebook khỏi phần đầu
- “Self-taught” không cần đặt trong headline
- “NestJs, …” kiểu liệt kê vô tận
- Buy Me a Coffee ở vị trí nổi bật
- Danh sách package cũ dài hàng cây số

Không phải các thứ đó xấu. Nhưng chúng chiếm diện tích đáng lẽ dành cho bằng chứng seniority.

### Claim “Official RxDart maintainer”

README hiện đang ghi claim này nhiều lần.

Chỉ giữ nếu có bằng chứng rõ:

- Có quyền maintainer hiện tại
- Có tên trong organization/team
- Có commit/release/review gần đây
- Có link trực tiếp chứng minh vai trò

Nếu vai trò đã thay đổi, dùng:

> Former RxDart maintainer
>
> hoặc
>
> Long-term RxDart contributor

Độ tin cậy quý hơn một danh xưng kêu.

---

## 4. Sáu repository nên pin

Thứ tự đề xuất:

1. FlowExt — project mạnh nhất về chiều sâu kỹ thuật.
2. MVI-Coroutines-Flow — Android/MVI/Clean Architecture có adoption, tests, releases và maintenance history rõ.
3. GitHub Search KMM — application KMP hoàn thiện hơn template đơn thuần.
4. PostgresPatroniHaproxyEfcoreDemo — hướng backend/infrastructure.
5. netauth-ddd-cqrs-clean — .NET DDD/CQRS/Clean Architecture practice.
6. Một project mature từ Flutter/RxDart hoặc open-source library còn maintenance, có users, release và lịch sử lâu dài. Chỉ dùng `solivagant` nếu chấp nhận pin một archived reference và ghi trạng thái minh bạch.

Không chọn pin chỉ từ repositories trên account `hoc081098`. Mỗi lần refresh portfolio phải audit cả organization `Kotlin-Android-Open-Source`, repository canonical sau khi transfer/fork, và upstream organization đang giữ project. Trong audit 2026-08-08, Compose-MVI được giữ làm companion vì còn “In progress”; StateFlow/Pagination/DataStore samples có giá trị lịch sử nhưng trùng hoặc quá hẹp cho sáu slot chính.

Không pin sáu repo cùng một loại. Sáu repo phải kể được hành trình:

> Reactive → Mobile architecture → KMP → Application integration → Backend → Infrastructure.

Mỗi repository được pin phải có:

- Description rõ
- Topics
- README tốt
- Diagram
- Quick start
- Tests
- CI badge
- Releases
- License
- “Why this project exists”
- “Design decisions”
- “Limitations”

---

## 5. Thứ tự triển khai

### Ưu tiên 1 — tác động lớn nhất

1. ✅ Làm lại trang Projects — hoàn tất.
2. ✅ Đưa Featured Work lên homepage — hoàn tất.
3. ✅ Viết lại headline và positioning — hoàn tất.
4. Rút gọn GitHub README.
5. Chọn lại sáu pinned repositories.
6. 🟡 Sửa Work Experience — timeline và technical scope đã cập nhật; measurable outcomes còn thiếu.

Chỉ sáu việc này đã thay đổi portfolio rất mạnh.

### Ưu tiên 2

1. Viết case study cho FlowExt.
2. Viết case study cho MVI-Coroutines-Flow.
3. Viết case study PostgreSQL HA.
4. Thêm upstream contribution section.
5. Thêm architecture diagram cho project quan trọng.

### Ưu tiên 3

1. Sửa sitemap lastModified đang hard-code ngày cũ.
2. Xử lý lang="vi" cho bài tiếng Việt thay vì toàn site luôn là en.
3. Thêm canonical URL và JSON-LD.
4. Host CV trực tiếp trên domain.
5. Tối ưu trang Uses.
6. Thêm testimonial hoặc recommendation có nguồn xác thực.

---

## Kết luận

Đừng cố làm portfolio trông “full-stack hơn”. Hãy làm nó đáng tin hơn.

Thương hiệu tốt nhất của hoc081098 không phải:

> Biết rất nhiều công nghệ.

Mà là:

> Một engineer có nền tảng Mobile/Kotlin rất sâu, hiểu reactive systems và architecture, có open-source contribution thật, đồng thời xây dựng .NET backend và distributed data như trục kỹ thuật thứ hai.

Website phải ưu tiên case study và bằng chứng. GitHub phải ưu tiên project chọn lọc và contribution đã được review. Bỏ bớt badge, stats và danh sách dài. Khi kiếm đã sắc, không cần treo thêm đèn LED quanh chuôi.
