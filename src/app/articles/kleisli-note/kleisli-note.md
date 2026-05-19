
# Kleisli: Function Composition for Effectful Functions

## 1. 💠 Kleisli có thể được hiểu như một Arrow (Function) trả về một Effect

Thay vì một function thuần: `A -> C`, Kleisli biểu diễn một function có context/effect: `A -> M<C>`

Ví dụ với Continuation: `Kleisli<Cont<R, *>, A, C>` ≅ `A -> Cont<R, C>` trong đó `Cont<R, A>` ≅ `(A -> R) -> R`

Nói tổng quát hơn: `Kleisli<M, A, B>` ≅ `A -> M<B>`.
Trong đó M là một effect/context nào đó, chẳng hạn như `Option`, `Either`, `IO`, `Cont`, etc.

## 2. 💠 Nếu M là một Monad, thì operation quan trọng nhất của Kleisli là `andThen`

`andThen` giúp compose các effectful arrows với nhau.

### Signature

```haskell
andThen: Kleisli<M, A, B> -> (Kleisli<M, B, C>) -> Kleisli<M, A, C>
```

có thể hiểu là:

```haskell
andThen: (A -> M<B>) -> (B -> M<C>) -> (A -> M<C>)
```

### Ví dụ bằng Kotlin-like pseudocode)

> Ở các ngôn ngữ FP như Scala có supports HKT (Higher-Kinded Types) thì code sẽ là `Kleisli[F[_], A, B]`
> Bởi vì Kotlin không có HKT, nên ta sẽ dùng `Kleisli<M, A, B>` với M là một type parameter đại diện cho effect.

```kotlin
Kleisli<M, A, B>.andThen(
    f: Kleisli<M, B, C>
): Kleisli<M, A, C>
```

Có thể được triển khai như sau:

```kotlin
fun Kleisli<M, A, B>.andThen(
    f: Kleisli<M, B, C>
): Kleisli<M, A, C> = 
    Kleisli { a -> this(a).flatMap { b -> f(b) } }
```

Điểm mấu chốt nằm ở `flatMap`. Vì `this(a)` trả về một `M<B>`, nên ta không có ngay B để truyền tiếp vào `f`.
Chính `flatMap` cho phép ta “đi tiếp” bên trong context `M`, lấy giá trị B theo cách hợp lệ,
rồi tiếp tục trả về một effect mới `M<C>`.

## 3. 💠 Trong Haskell, đây chính là Kleisli composition

```haskell
(>=>) :: Monad m => (a -> m b) -> (b -> m c) -> a -> m c
f >=> g = \a -> f a >>= g
```

- `>>=` là `bind` operator của Monad, hay còn gọi là `flatMap` trong các ngôn ngữ khác.
- `\a -> f a >>= g` là lambda syntax có tham số là `a`, value trả về là `f a >>= g`,
  tương đương với `f(a).flatMap(g)` trong các ngôn ngữ khác.

Vì `>=>` có hình dạng khá giống một con cá, nên các Developers hay gọi vui `>=>` là Right Fish operator 🐟. 

## 4. Kết lại:

- Function composition thông thường là:
  `(.) :: (b -> c) -> (a -> b) -> (a -> c)` (chú ý thứ tự invoke functions từ phải sang trái).
- Kleisli composition là phiên bản dành cho effectful functions:
  `(>=>) :: (a -> m b) -> (b -> m c) -> (a -> m c)` (chú ý thứ tự invoke functions từ trái sang phải, giống như cách chúng ta đọc).