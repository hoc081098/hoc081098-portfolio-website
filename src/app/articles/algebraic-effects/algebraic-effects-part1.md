# Monad Transformer Stack và MTL (cats-mtl) — bước đệm tới Algebraic Effects (Phần 1)
> Estimated reading time: 5 minutes

## 💠 Effect values trong Functional Programming

Hôm qua rảnh rỗi cùng ChatGPT tìm hiểu về *algebraic effects*. Nếu bạn nào đã quen với *Functional Programming* (FP)
thì hẳn cũng biết rằng *computational effects* trong các ngôn ngữ và thư viện FP như Haskell, ZIO hay Cats Effects ở
Scala thường được encode thành các *effect values*.

Ví dụ: `IO` biểu diễn một deferred side-effectful computation, `Either` biểu diễn typed error, `Reader` biểu diễn
computation phụ thuộc vào một environment (thường được dùng cho Dependency Injection), còn `State` biểu diễn computation
vừa đọc state hiện tại vừa produce ra state mới.

Phần lớn các abstraction này có thể được compose theo kiểu *Monad*; trong Haskell thì thường nói rằng type đó có một
`Monad` instance.

---

## 💠 Vấn đề của Monad Transformer Stack

Nhưng trong thực tế, một computation thường cần nhiều effect cùng lúc. Vì vậy chúng ta có thể gặp những return type
kiểu:

```scala
type EnvIO[A] = Kleisli[IO, Env, A]
EitherT[EnvIO, Error, T]
```

Có thể hiểu gần tương đương với:

```
Env -> IO[Either[Error, T]]
```

Tức là computation nhận vào một `Env`, trả về một deferred `IO` computation, và khi computation đó được thực thi thì nó
produce ra một `Either`: hoặc chứa `Error`, hoặc chứa giá trị `T`.
Cách trên là sự kết hợp giữa **Monad Transformers** (ở đây là `EitherT`) và một **Monad Stack**, tức effect này được xây
chồng lên effect khác.

Điểm mạnh của cách tiếp cận này là type rất expressive, meaningful và type-safe: chỉ cần nhìn type signature là có thể
biết computation cần environment gì, có side effect hay không, và có thể fail với kiểu error nào.

Điểm yếu là business logic có thể bị gắn khá chặt với concrete effect representation / transformer stack đó. Một
function trả về `EitherT[Kleisli[IO, Env, *], Error, T]` đang biết khá rõ effects được encode và compose bằng cách nào,
nên việc thay đổi representation hoặc cách compose effects về sau có thể kéo theo thay đổi ở nhiều nơi.

---

## 💠 MTL: mô tả capability thay vì fix cứng stack

Một cách tiếp cận khác khá hay nhưng vẫn dựa trên *HKT* (Higher-Kinded Types) chính là **MTL** (Monad Transformer
Library), như Haskell MTL hay cats-mtl ở Scala. Thay vì fixed cứng một Monad Stack cụ thể vào business logic, chúng ta
dùng HKT + constraints/type classes để mô tả những *capability* mà một function yêu cầu.

Ví dụ với Scala cats-mtl:

```scala
def compute[M[_]: Monad](input: Input)
    (using Raise[M, Error])
    (using Ask[M, Env])
    : M[T]
```

Ta đưa các constraints vào function thông qua context bounds và `using`.

`M[_]: Monad` có nghĩa là cần có một `Monad[M]` instance trong context. Nhờ đó computation có các operation như `pure`,
để lift một `T` thành `M[T]`, và `flatMap`, để tiếp tục computation theo dạng `T => M[R]`. Nói đơn giản, `M` là một type
constructor có khả năng biểu diễn và chain các computation theo semantics của `Monad`.

`using Raise[M, Error]` yêu cầu trong context phải có một instance kiểu `Raise[M, Error]`. Trong Scala 3, việc này được
thực hiện thông qua cơ chế `using`/`given`.

`Raise[M, Error]` biểu thị *capability* cho phép raise một typed error `Error` trong context `M`, thay vì function phải
biết cụ thể error được encode bằng `Either`, `EitherT` hay một representation nào khác. Với `Either[Error, *]`, chẳng
hạn, `raise(error)` về mặt semantics tương ứng với việc produce ra `Left(error)`. Với một transformer stack, cats-mtl có
thể cung cấp các instance tương ứng để capability đó hoạt động xuyên qua stack.

Tương tự, `Ask[M, Env]` biểu thị *capability* cho phép computation đang chạy trong `M` lấy ra một giá trị kiểu `Env`. Có
thể hiểu đây là abstraction tương tự `Reader`: computation phụ thuộc vào một environment, và Dependency Injection là một
use case phổ biến của capability này. Trong cats-mtl, transformer điển hình tương ứng với `Ask` là `ReaderT`.

Đó là phần function declaration. Còn lúc gọi thì sao? Khi instantiate `compute` với một `M` cụ thể, compiler phải tìm
được tất cả các context arguments cần thiết:

```
Monad[M]
Raise[M, Error]
Ask[M, Env]
```

Các instance này được cung cấp thông qua `given`. cats-mtl cung cấp nhiều instance cho các effect types và transformer
stacks phổ biến; compiler sẽ resolve chúng từ contextual scope thay vì chúng ta phải truyền thủ công từng object vào mỗi
lời gọi.

Ví dụ, `M` cuối cùng vẫn có thể là một stack kiểu:

```
EitherT[Kleisli[IO, Env, *], Error, *]
```

nhưng khác với cách trước, `compute` không cần biết stack cụ thể đó mà nó chỉ tuyên bố:

> Tôi cần một `M` có:
> - `Monad` instance
> - khả năng Raise `Error`
> - khả năng Ask `Env`

Đây mới là điểm ăn tiền của MTL: business function mô tả **WHAT** capabilities nó cần, thay vì hard-code **HOW** các
effects được compose.

---

## 💠 Hẹn gặp lại ở phần 2

Tạm ngưng ở đây. Phần sau mình sẽ nói tiếp về các language có *Algebraic Effects*, đặc biệt là cách effects được biểu
diễn thông qua effect annotations trong function signature, và mối liên hệ của cách tiếp cận này với Arrow-Kt `Raise`
cũng như thư viện `YAES` (Yet Another Effect System) của Scala.
