# `Null` trong Dart: từ dynamic invocation đến null safety

Trong Dart, `null` không chỉ là ký hiệu cho _absence of value_. Bản thân nó là một value có type `Null`. Chi tiết tưởng
chừng nhỏ này lại mở ra một câu chuyện thú vị về type system của Dart, cơ chế dynamic invocation và sự thay đổi của ngôn
ngữ kể từ khi null safety xuất hiện.

Trong Java, `null` có thể được assign cho một variable có reference type. C# cũng cho phép điều tương tự khi _nullable
reference types_ chưa được enable hoặc compiler chỉ phát warning:

```java
String value = null;
value.length(); // Throws NullPointerException.
```

Khi invoke một instance member thông qua null reference, Java sẽ throw `NullPointerException`, còn C# sẽ throw
`NullReferenceException`. Dart trước null safety có cùng rủi ro ở runtime, nhưng type hierarchy và cách xử lý member
invocation có một số điểm đáng chú ý hơn.

## 💠 1. Trước null safety: `Null` là bottom type

Trước Dart 2.12, `Null` được xem là _bottom type_, tức subtype của mọi type khác. Vì vậy, `null` có thể được assign cho
một variable thuộc bất kỳ type nào:

```dart
String value = null;

value.toString(); // Returns "null".
value.hashCode;   // Valid.
value.length;     // Throws NoSuchMethodError.
```

Đoạn code vẫn pass compile-time checking vì static type của `value` là `String`, mà `String` có getter `length`. Tuy
nhiên, runtime value của nó lại là `null`.

Class `Null` khai báo `toString()` và `hashCode`, nên các member access tương ứng vẫn valid ở runtime. Ngược lại,
`Null` không có getter `length`. Khi member lookup không tìm thấy member này trên runtime receiver, invocation kết thúc
bằng `NoSuchMethodError`.

**Điểm mấu chốt:** type system cũ cho phép `null` flow vào một expression có static type không phản ánh khả năng null.
Vì thế, code đã pass compile-time checking vẫn có thể fail khi runtime thực hiện member lookup.

### 1.1. Nếu `Null` không implement `Object`, `==` đến từ đâu?

Trong type hierarchy của Dart, [`Null`][null-class] là class duy nhất không implement `Object`. Declaration hiện tại
của `Null` trong `dart:core` chỉ trực tiếp khai báo `hashCode` và `toString()`, không khai báo `operator ==`.

Equality expression là một special case trong language semantics, không phải một method invocation luôn được dispatch
đến `Null.operator ==`:

```dart
null == null;   // true
null == '123';  // false
'123' == null;  // false
```

Theo [Dart Language Specification][dart-equality], nếu một trong hai operand là `null`, expression trả về `true` chỉ
khi cả hai đều là `null`. Chỉ khi cả hai operand đều non-null thì Dart mới invoke `operator ==` trên operand bên trái.
Vì vậy, `null == '123'` trả về `false` mà không cần lookup `operator ==` trên `Null`.

## 💠 2. `noSuchMethod` và dynamic invocation

Class `Object` khai báo method [`noSuchMethod(Invocation)`][object-no-such-method]. Khi một dynamic invocation không
resolve được member tương ứng, runtime tạo một `Invocation` tương ứng rồi dispatch đến `noSuchMethod`:

```dart
dynamic object = 42;
object.someMethod(); // Throws NoSuchMethodError.
```

Default implementation của `Object.noSuchMethod` sẽ throw `NoSuchMethodError`. Một class có thể override method này để
handle invocation theo cách riêng. Các mocking library như Mockito và Mocktail tận dụng cơ chế này để stub và verify
invocation trên mock object.

`noSuchMethod` thường được nhắc cùng `dynamic` vì member access trên receiver có static type `dynamic` không được check
tại compile time. Ví dụ trên pass analyzer, nhưng chỉ đến runtime chương trình mới phát hiện `int` không có
`someMethod()`.

**`dynamic` không disable toàn bộ type system.** Nó chỉ defer một phần static checking của các expression liên quan sang
runtime. Cơ chế này hữu ích khi làm việc với JSON có dynamic shape, legacy API hoặc một số interop API. Tuy vậy,
application code hiện đại nên đưa data về một static type cụ thể càng sớm càng tốt.

Đây là một dấu vết cho thấy Dart từng mang nhiều đặc trưng của một dynamic language, dù bản thân nó vẫn có static type
system.

## 💠 3. Từ Dart 2.12: nullable type và non-nullable type được tách biệt

Dart 2.12 giới thiệu sound null safety. Trong library đã opt in null safety, `String` không còn accept `null`. Một
`String` variable có thể chứa `null` phải dùng type `String?`:

```dart
String? maybeString = null;

maybeString.length;     // Compile-time error.
maybeString.hashCode;   // Valid.
maybeString.toString(); // Valid.
```

`length` bị compiler reject vì `maybeString` có thể là `null`. Tùy intent, ta có thể narrow bằng promotion, dùng
null-aware access hoặc áp dụng null assertion:

```dart
if (maybeString != null) {
  maybeString.length; // Promoted to String.
}

maybeString?.length;  // Returns int?.
maybeString!.length;  // Throws if maybeString is null.
```

Null assertion `!` không làm code “an toàn hơn”. Nó khẳng định với runtime rằng value chắc chắn khác `null` và sẽ throw
nếu giả định đó sai. Vì vậy, promotion hoặc `?.` thường communicate intent rõ ràng hơn khi phù hợp với bài toán.

### 3.1. Vì sao nullable value vẫn gọi được `toString()`?

Tài liệu [Understanding null safety][understanding-null-safety] mô tả `String?` bằng một mental model gần với union giữa
`String` và `Null`:

```text
String? ≈ String | Null
```

Đây chỉ là _mental model_, không phải syntax cho general-purpose union type trong Dart. Với một expression có type
`String?`, compiler cho phép access trực tiếp `toString()` và `hashCode`, vì chúng vẫn valid khi value là `null`.
Equality được xử lý riêng theo language semantics đã giải thích ở trên, nên comparison với `null` cũng valid.

```dart
String? maybeString = null;

maybeString.hashCode;   // Valid.
maybeString.toString(); // Valid; returns "null".
maybeString == null;    // Valid; evaluates to true.
```

Trong khi đó, `length` chỉ tồn tại trên `String`, nên expression sau bị reject ngay tại compile time:

```dart
maybeString.length; // Compile-time error.
```

Đây chính là mục tiêu của null safety: unsafe member access trên `null` được catch tại compile time, thay vì chờ đến
runtime.

### 3.2. `Never` thay thế `Null` làm bottom type

Sau khi null safety được giới thiệu, `Null` không còn là subtype của mọi type. Nó vẫn là subtype của các nullable type
như `String?`, nhưng không phải subtype của non-nullable type như `String`.

Vai trò _bottom type_ được chuyển cho `Never`. Một expression có type `Never` không thể complete normally hoặc return
một value. Ví dụ điển hình là một function luôn throw exception:

```dart
Never fail(String message) {
  throw StateError(message);
}
```

Nhờ đó, type hierarchy vẫn có một bottom type phục vụ type inference và flow analysis. Các non-nullable type không vì
thế mà phải chấp nhận `null`.

## 💠 4. So sánh với một số ngôn ngữ khác

`null` trong Dart có nét tương đồng với `nil` của Ruby và `None` của Python: `nil` là instance duy nhất của `NilClass`,
còn `None` là instance duy nhất của `NoneType`. Tuy nhiên, Ruby và Python là dynamically typed, nên việc handle `nil` và
`None` chủ yếu diễn ra tại runtime. Null-safe Dart đưa phần lớn checking này vào static type system.

Các functional languages thường model absence of value bằng một _algebraic data type_ (ADT) riêng:

- Scala có `Option`. Scala 3 còn hỗ trợ union type và có thể biểu diễn nullable type bằng `String | Null` khi bật
  Explicit Nulls.
- F# và OCaml có `option`.
- Haskell có `Maybe`.

`Option` và `Maybe` encode absence of value ngay trong type, thường được xử lý bằng pattern matching, `fold` hoặc
combinator phù hợp. Nullable type cũng theo đuổi mục tiêu đó, dù model và API cụ thể khác nhau.

## 💠 5. Kết luận

Lịch sử của `Null` phản ánh khá rõ quá trình Dart siết chặt type system:

- Trước Dart 2.12, `Null` là bottom type. `null` có thể flow vào hầu hết mọi type và một số lỗi chỉ xuất hiện khi
  runtime thực hiện member lookup.
- Dart 2.12 giới thiệu sound null safety, phân biệt nullable và non-nullable type tại compile time. `Never` trở thành
  bottom type.
- `dynamic`, `noSuchMethod`, `Invocation` và class `Null` vẫn tồn tại, nhưng chúng nằm trong một type system chặt chẽ
  hơn.

Declaration sau trông rất ngắn:

```dart
String? maybeString = null;
```

Nhưng phía sau nó là cả một design choice quan trọng về nullability:

> Absence of value phải được encode trong type và được handle explicitly, thay vì trở thành một runtime error bất ngờ.

[object-no-such-method]: https://api.dart.dev/dart-core/Object/noSuchMethod.html
[null-class]: https://api.dart.dev/dart-core/Null-class.html
[dart-equality]: https://spec.dart.dev/DartLangSpecDraft.pdf
[understanding-null-safety]: https://dart.dev/null-safety/understanding-null-safety
