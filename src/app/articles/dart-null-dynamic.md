💠 Dart: Null, dynamic, noSuchMethod, Null safety và những thứ thú vị (có thể bạn chưa biết 😬)

Có nhiều bạn không biết rằng, "null" trong Dart là 1 value có type riêng, chính là class "Null".

Khác với Java/C#, nơi "null" thường được hiểu là value đại diện cho absent reference value và có thể gán vô các
reference variable phù hợp (ví dụ C# khi không bật nullable reference types).

Ví dụ Java: String a = null;

Khi gọi method trên 1 null ref thì sẽ throw exception ngay, "NullPointerException" thần thánh 🤣.

---

💠 Dart "Null" thì nó khác hơn, trước Dart 2.12 (null safety) thì "Null" được xem như bottom type/subtype của mọi type,
nên nó có thể gán vô bất kỳ type nào.

Đoạn này thì nhìn syntax vẫn giống Java/C#. Nhưng cơ chế method invocation lại khác. Ví dụ Dart < 2.12:

```dart
String a = null;

a.toString(); // vẫn OK, trả về "null".
a.hashCode; // vẫn OK.
a.length; // throws NoSuchMethodError
```

Ảo không. Dart không đơn giản check null rồi throw như Java/C#. Khi gọi member trên "null", runtime vẫn thực hiện member
lookup trên receiver thực tế.

Class "Null" có "toString", "hashCode", "==" nên gọi các member này trên null value vẫn OK.

Vậy còn ".length" thì sao? Tại runtime nó thấy "a" là "Null", mà "Null" lại không có ".length" property.

Về mặt compile time, do giới hạn của type system ở Dart cũ, "Null" là bottom type/subtype của "String", nên gán vô được
"String", trong khi "length" chỉ có trên "String".

Khi runtime lookup không tìm thấy "length" trên "Null", lời gọi sẽ rơi vào cơ chế "noSuchMethod", và implementation mặc
định sẽ ném "NoSuchMethodError".

---

💠 noSuchMethod — một feature khá "dynamic" của Dart

Dart Object class có một method đặc biệt: noSuchMethod(Invocation invocation)

Khi runtime thực hiện một member invocation nhưng không tìm thấy member tương ứng trên object, cơ chế noSuchMethod có
thể được kích hoạt. Ví dụ conceptually:

```dart
dynamic object = whatever;
object.someMethod();
```

Nếu runtime không tìm thấy someMethod, lời gọi có thể rơi xuống: object.noSuchMethod(...). Implementation mặc định của
Object.noSuchMethod sẽ ném NoSuchMethodError.

Class cũng có thể override noSuchMethod để xử lý những lời gọi không tồn tại theo cách riêng. Bản thân thư viện Mockito
và Mocktail đều dùng thằng này để stub/verify cho các mock objects.

Thường thì cái method này hay đi kèm với dynamic keyword, nơi mà ta có thể espace khỏi static type checking của Dart.
Code có thể access các member mà không bị compiler bắt lỗi. Nhưng nếu runtime lookup member mà không tìm thấy,
invocation sẽ đi qua noSuchMethod, implementation mặc định sẽ ném NoSuchMethodError.

dynamic keyword này có thể hữu ích khi làm việc với các dữ liệu có dynamic shape như JSON hoặc một số dynamic/legacy
interop API, dù trong application code hiện đại vẫn nên đưa dữ liệu về static type càng sớm càng tốt.

Đây là một trong những feature cho thấy Dart từng có một DNA khá dynamic, dù bản thân Dart vẫn có static type system.

---

💠 Còn Dart >= 2.12 thì sao? Từ version này Dart bắt đầu hỗ trợ Null Safety, nên sẽ khác một chút về mặt syntax khi dùng
static type checking.

Ví dụ với code đã bật Null Safety:

```dart
String? a = null;

a.length; // Compile error ngay
a.hashCode; // vẫn ngon ăn, giải thích sau
a.toString(); // vẫn ngon ăn, giải thích sau
```

Bây giờ compiler catch được việc ta invoke 1 member trên 1 nullable value. Ta hoặc là check nó khác "null" trước rồi
invoke, hoặc dùng "?." safe call, hoặc dùng "!" để null assert:

```dart
if (a != null) a.length; // OK
a?.length; // OK
a!.length; // maybe throw
```

Vậy còn vụ "hashCode", "toString()" thì sao? Theo Dart docs, "String?" có thể coi essentially như là union type của
"String" và "Null":

```text
String? ≈ String | Null
```

Dart không có general-purpose union type theo syntax như trên, nhưng về mặt nullability thì có thể hình dung như vậy.

Mà hai type "String" và "Null" có một số member chung, chính là "hashCode", "==" và "toString()".

Nên dù static type là "String?", ta vẫn gọi được những member chung đó mà không cần phải qua null check hay null assert:

```dart
String? a = null;

a.hashCode; // OK
a.toString(); // OK
a == null; // OK
```

Còn những member chỉ tồn tại trên "String", ví dụ "length", thì compiler không cho gọi trực tiếp:

```dart
a.length; // Compile error
```

vì tại thời điểm đó "a" hoàn toàn có thể là một "Null".

Và có thêm 1 lưu ý nữa, từ Dart 2.12 thì Bottom type không còn là"Null" mà là Never type (giống Kotlin Nothing, Swift
Never, ...). Điều này là hợp lý vì bây giờ không thể gán null vô những type không null.

---

💠 "Null" class và null value của Dart có concept khá giống với "nil" ở Ruby hoặc "None" ở Python. Ở 2 ngôn ngữ này,
"nil" có type thực sự là "NilClass" và "None" có type thực sự là "NoneType".

Chúng có cùng 1 triết lý: biểu diễn sự absence of value bằng 1 value thực sự có type riêng. Ruby và Python là
dynamically typed, nên việc bảo đảm ta đã handle nil/None chủ yếu diễn ra ở runtime thay vì được static type checker
enforce như null-safe Dart.

Các ngôn ngữ FP như Scala 2 thường dùng Option monad, Scala 3 ngoài Option còn có union type, và khi bật Explicit Nulls
có thể biểu diễn nullable type rõ ràng dưới dạng String | Null.

Fix, F#, Ocalm, ... thì cũng dùng Option monad Haskell thì dùng Maybe monad (cùng concept với Option chỉ khác tên gọi
thôi).

Điểm mạnh của Option monad là bắt ta model hóa sự thiếu value rõ ràng bằng ADT, và caller phải handle tường minh, ví dụ
.fold hoặc pattern matching chẳng hạn.

---

💠 Nhìn lại thì câu chuyện về "Null" khá thú vị, vì chỉ từ một value tưởng như rất đơn giản là "null" lại thấy được khá
rõ quá trình Dart thay đổi qua thời gian.

Dart cũ khá "thoáng": "Null" là bottom type, "null" có thể chui vào gần như mọi type, và một số lỗi chỉ lộ ra khi
runtime thực sự lookup member. Cộng thêm "dynamic" và "noSuchMethod", có thể thấy Dart mang trong mình khá nhiều DNA của
một dynamic language.

Từ Dart 2.12, Null Safety siết lại type system: nullable và non-nullable được phân biệt ngay từ compile time, "Null"
không còn đóng vai trò bottom type nữa và "Never" nhận lấy vị trí đó.

Nhưng những thứ như "dynamic", "noSuchMethod", "Invocation" hay chính class "Null" vẫn còn đó. Hiểu chúng không chỉ để
biết vài trivia vui vui của Dart, mà còn giúp ta hiểu vì sao type system hiện tại của Dart lại được thiết kế như vậy.

Nhiều khi nhìn một dòng rất bình thường:

```dart
String? a = null;
```

nhưng phía sau nó là cả một đoạn lịch sử tiến hóa của language design 😄.
