# Type constructor, Higher-Kinded Types (HKT), Type classes

Chém gió nhiều về Functional Programming nhưng những khái niệm sau mình đôi lúc vẫn bị nhầm lẫn, note luôn cho nóng: **Type constructor, Higher-Kinded Types (HKT), Type classes**.

---

💠 **Type** là thứ quá quen thuộc trong các ngôn ngữ lập trình như Kotlin, Dart, Java, etc.

Ta thường xuyên gặp: `Int`, `Long`, `Float`, `Double`, `Bool`, `String`, `List/Array`, `Set/Map`, `Lambda/Function`, ...
Simple, right? Các type hoàn chỉnh như: `Int`, `Long`, `Float`, `Double`, `Bool`, `String`, `List<Int>`, `Map<String, Int>`, `Either<String, Int>` có thể được dùng trực tiếp làm type của một value. Ví dụ với Kotlin:

```kotlin
val number: Int = 42
val integers: List<Int> = [1, 2, 3]
```

`Int` là một type hoàn chỉnh. `List<Int>` cũng là một type hoàn chỉnh. `Either<String, Int>` cũng vậy.

---

💠 **Tiếp đến là Type Constructor.**

Nghe chữ *constructor* thì rất dễ liên tưởng tới class constructor.
Class constructor được dùng để tạo ra một **instance/value** của class: `val user = User(...)`.
Tức là class constructor hoạt động ở **value-level**.

Còn **Type Constructor** hoạt động ở một level khác.
Ta có thể hình dung nó giống như một “function ở type-level”: nhận vào một hoặc nhiều type và tạo ra một type mới.
Ví dụ: `List`, `Option`, `Either` là các type constructor.
Ta có thể biểu diễn trực quan các type argument còn thiếu dưới dạng `List<_>`, `Option<_>`, `Either<L, _>`, ...
Các biểu thức trên chưa phải là type hoàn chỉnh vì vẫn còn thiếu type argument, trong đó `_` là placeholder đại diện cho type còn thiếu. Khi ta cung cấp type vào đó để điền vào chỗ trống, ta mới thu được một type hoàn chỉnh.

Ví dụ: `List<_>` có thể hình dung tương đương với một hàm nhận một type `A` và trả về type `List<A>`, 
Viết dưới dạng function chính là `[A] => List<A>`.
Tương tự với `Either`, `Either` có 2 type argument, khi ta cố định 1 type argument `L`, thì ta thu được một type constructor `Either<L, _>` nhận 1 type argument `R` và trả về `Either<L, R>`.
Viết dưới dạng function chính là `[R] => Either<L, R>`.

Ta có thể hiểu trực giác rằng **Type Constructor giống một function nhận type và tạo ra type**.
Lưu ý: đây là cách hình dung để dễ hiểu. Type Constructor không phải runtime function theo nghĩa thông thường, mà là một cấu trúc ở **type-level**.

---

💠 **Kind**

Đến đây xuất hiện thêm một khái niệm nữa: **Kind**.

Nếu type mô tả một value `42 :: Int`, có nghĩa value `42` có type `Int`.
Vậy ta có câu hỏi tương tự ở type-level: type `Int` thuộc kind nào? Hay nói dân dã: type của type `Int` là gì?
Với Haskell, `Int` là một type hoàn chỉnh, có kind là `Type`: `Int :: Type`.
Haskell cũ thường viết `Int :: *`, với `*` là notation cũ của kind `Type`.

Có thể nhớ mối quan hệ rất đơn giản:

```text
value : type
type  : kind
```

Ví dụ:

```text
42  : Int
Int : Type
```

---

💠 **Tiếp tục với Type Constructor**

Một type constructor như `List` chưa phải type hoàn chỉnh vì nó vẫn cần thêm một type argument.
Conceptually: `List :: Type -> Type`, nghĩa là `List` nhận một `Type` và trả về một `Type`.
Khi ta truyền vào một type argument, ví dụ `Int`, ta thu được một type hoàn chỉnh là `List<Int>`.
Và khi đó `List<Int> :: Type`.

Tương tự với `Either`: `Either :: Type -> Type -> Type`
Nó cần hai type argument.
Sau khi truyền argument đầu tiên, ví dụ `String`, ta được: `Either<String, _> :: Type -> Type`.
Sau khi truyền tiếp argument thứ hai, ví dụ `Int`, ta thu được một type hoàn chỉnh: `Either<String, Int> :: Type`.

Nếu viết theo kiểu Haskell:

```haskell
Either            :: Type -> Type -> Type
Either String     :: Type -> Type
Either String Int :: Type
```

Đây là điểm Haskell thể hiện những khái niệm này rất rõ.
Haskell có thể phân biệt: `Int :: Type` là một type hoàn chỉnh
trong khi một type constructor có một tham số có dạng `Type -> Type`,
và type constructor hai tham số có dạng `Type -> Type -> Type`.

---

💠 Có thể tóm gọn bằng mấy dòng này:

```text
// value : type
42          : Int

// type : kind
Int         : Type
List<Int>   : Type
Either<L,R> : Type

// type constructor
List        : Type -> Type
List<Int>   : Type

// type constructor
Either      : Type -> Type -> Type
Either<L,_> : Type -> Type
Either<L,R> : Type
```

Đến đây ta mới bắt đầu có nền tảng để nói tiếp về **Higher-Kinded Types**:
nếu generic thông thường ở Java, Kotlin, Dart, C# cho phép ta abstract trên các concrete/proper type có kind `Type`,
thì HKT (ở các ngôn ngữ functional như Haskell, Scala, Flix, ...) cho phép ta abstract trên những type constructor có kind “cao hơn” như `Type -> Type`. Nhưng cái đó để phần sau 😄.
