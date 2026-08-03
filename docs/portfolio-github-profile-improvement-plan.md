# Bản chốt: biến website và GitHub thành bằng chứng năng lực

Mục tiêu không phải làm nó “đẹp hơn”. Nó đã đủ đẹp rồi. Mục tiêu là để một tech lead, recruiter hoặc khách hàng nhìn trong 30 giây và kết luận:

> Đây là một Senior Mobile/Kotlin Engineer có chiều sâu về reactive systems, concurrency, software architecture, performance và open source; hiện đang mở rộng nghiêm túc sang backend/.NET/PostgreSQL.

Hiện website chưa truyền tải được điều đó. Trang Projects chỉ có GitHub profile, RxMobileTeam và Medium; còn GitHub README thì quá dài, nhiều badge và liệt kê package, khiến điểm mạnh bị chìm.

---

## 1. Định vị thương hiệu kỹ thuật

Không định vị kiểu:

> Software Engineer building mobile apps, backend services, and open-source tools.

Câu này đúng nhưng nhạt, ai cũng viết được. Nên chốt một trục chính và một trục phát triển:

> Senior Mobile & Kotlin Engineer specializing in reactive systems, concurrency, software architecture, and performance — building Kotlin Multiplatform libraries and expanding into .NET backend and distributed data systems.

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

> Senior Mobile & Kotlin Engineer with 7+ years of experience building reliable, high-performance applications and libraries across Android, Kotlin Multiplatform, Compose Multiplatform, and Flutter. I focus on software architecture, reactive programming, concurrency, performance optimization, and clean, maintainable code, applying algorithmic thinking where it materially improves correctness or efficiency. I’m currently expanding this foundation into .NET backend and distributed data systems.

Metadata/SEO nên dùng phiên bản ngắn hơn:

> Senior Mobile & Kotlin Engineer focused on reactive systems, concurrency, software architecture, and performance, now expanding into .NET backend.

Không cần nhét tất cả keyword vào headline. Headline chốt identity; description dài thể hiện chiều sâu; project, article, test và benchmark cung cấp bằng chứng cho từng claim.

Thông điệp xuyên suốt phải là:

Mobile/Kotlin là thực lực đã được chứng minh. Backend/.NET là hướng mở rộng nghiêm túc. Architecture và reactive programming là sợi chỉ đỏ kết nối cả hai.

Không nên tự gọi mình là Senior Backend Developer ở thời điểm này. Trang chủ hiện đang dùng “Senior Mobile & Backend Developer”, trong khi bằng chứng backend công khai chưa tương xứng với chữ senior.

---

## 2. Website portfolio

### Trang chủ nên có cấu trúc mới

#### Phần 1: Hero

Hero cần trả lời ngay ba câu:

- Mày là ai?
- Mày giỏi nhất cái gì?
- Có bằng chứng nào?

Ví dụ:

> Senior Mobile & Kotlin Engineer
>
> Building reliable, high-performance mobile systems and Kotlin Multiplatform libraries, with a focus on reactive programming, concurrency, and software architecture. Open-source contributor and maintainer, now expanding into .NET backend and PostgreSQL.

Bên dưới có ba nút:

- View featured work
- GitHub
- Download résumé

Đừng để nút chính là “More about me”. Người xem chưa cần biết tuổi thơ mày; họ cần biết mày đã xây được gì.

#### Phần 2: Proof strip

Ngay dưới hero cần một hàng bằng chứng ngắn:

- 7+ years in mobile engineering
- RxDart maintainer/contributor — chỉ ghi đúng vai trò có thể kiểm chứng
- Author of FlowExt, solivagant và các thư viện KMP
- Upstream contributions to FlutterFire, RxDart, Khonshu hoặc dự án lớn khác
- Technical depth về software architecture, concurrency, performance optimization, data structures và algorithms — mỗi claim cần link tới project, article, test hoặc benchmark cụ thể
- Số release, star, download hoặc platform support nếu có số liệu đáng tin

Không dùng con số trang trí kiểu profile views, streak hay tổng số commit. Những số đó dễ làm màu và gần như không nói gì về năng lực.

#### Phần 3: Featured engineering work

Đây phải là phần trọng tâm, đứng trước ảnh quê và trước blog.

Chọn khoảng 4–6 dự án:

1. FlowExt — flagship về Kotlin Flow, concurrency và reactive semantics.
2. solivagant — Compose Multiplatform navigation, type safety, lifecycle.
3. Một KMP application/template — chứng minh khả năng tích hợp library vào sản phẩm.
4. Một contribution upstream — RxDart, FlutterFire hoặc Khonshu.
5. PostgreSQL HA demo — Patroni, HAProxy, etcd, EF Core.
6. Một .NET DDD/CQRS project — ghi rõ đây là backend engineering practice, không giả làm production SaaS.

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

### Trang Projects phải làm lại gần như toàn bộ

Hiện trang “Projects I’ve built” chỉ có ba link tổng hợp. Đây là điểm yếu nghiêm trọng nhất của website.

Nên chia thành ba nhóm:

#### Open-source libraries

FlowExt, solivagant, ViewBindingDelegate, các package Dart có giá trị thật.

#### Applications and architecture samples

KMP application, Android architecture sample, Compose Multiplatform app.

#### Backend and infrastructure experiments

.NET DDD/CQRS, PostgreSQL HA, cursor pagination, event-driven experiments.

Mỗi dự án nên có một trang case study riêng:

- `/projects/flowext`
- `/projects/solivagant`
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

### Work Experience phải viết lại

Không dùng một “company” tên:

> Full-time developer & Freelance / Open Source

Cách đó mơ hồ và tạo cảm giác đang che thông tin.

Nên tách rõ:

- Employment
- Contract/Freelance
- Open-source maintenance

Mỗi công việc cần 2–4 kết quả cụ thể:

- Thiết kế hoặc migrate kiến trúc gì
- Chịu trách nhiệm module nào
- Làm việc với team bao nhiêu người
- Cải thiện build time, crash rate, maintainability hoặc release process thế nào
- Mentoring, review hay technical decision ra sao

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
- Hiện mở rộng sang backend, DDD và PostgreSQL
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
Senior Mobile & Kotlin Engineer\
Reactive systems · Kotlin Multiplatform · Mobile architecture\
Currently expanding into .NET backend and PostgreSQL

#### 2. Evidence

Chỉ 4–6 dòng:

- Maintainer/contributor role có thể xác minh
- Author of FlowExt và solivagant
- Upstream contributions
- Technical writing
- Portfolio và contact

#### 3. Featured work

Dùng bảng khoảng 5 dự án:

| Project            | What it proves                                    |
| ------------------ | ------------------------------------------------- |
| FlowExt            | Flow semantics, concurrency, cancellation, KMP    |
| solivagant         | Compose Multiplatform navigation and lifecycle    |
| KMP sample         | End-to-end multiplatform application architecture |
| PostgreSQL HA demo | Failover, routing and consistency trade-offs      |
| .NET DDD project   | Domain modelling, CQRS and backend learning       |

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
2. solivagant — KMP/Compose architecture.
3. KMP-App-Template-solivagant hoặc app KMP hoàn thiện nhất.
4. PostgresPatroniHaproxyEfcoreDemo — hướng backend/infrastructure.
5. netauth-ddd-cqrs-clean hoặc backend project hoàn thiện nhất.
6. Một project mature từ Flutter/RxDart có users, release và lịch sử lâu dài.

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

1. Làm lại trang Projects.
2. Đưa Featured Work lên homepage.
3. Viết lại headline và positioning.
4. Rút gọn GitHub README.
5. Chọn lại sáu pinned repositories.
6. Sửa Work Experience.

Chỉ sáu việc này đã thay đổi portfolio rất mạnh.

### Ưu tiên 2

1. Viết case study cho FlowExt.
2. Viết case study cho solivagant.
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

> Một engineer có nền tảng Mobile/Kotlin rất sâu, hiểu reactive systems và architecture, có open-source contribution thật, đồng thời đang mở rộng có phương pháp sang backend và distributed data.

Website phải ưu tiên case study và bằng chứng. GitHub phải ưu tiên project chọn lọc và contribution đã được review. Bỏ bớt badge, stats và danh sách dài. Khi kiếm đã sắc, không cần treo thêm đèn LED quanh chuôi.
