# Implementing a race/amb operator for Kotlin Coroutines Flow.

> - Estimated reading time: 2 minutes
> - Original article: https://proandroiddev.com/implement-race-amb-operator-with-kotlin-coroutines-flow-a59f17997b67
> - Originally published: March 24, 2022

---

Hello Kotlin Developers, let's implement `race`/`amb` operator for Flow.
This operator is similar to `race` of `rxjs` or `amb` of `RxJava`.
You can check the documents below for more details.

`race` is used when we have multiple `Flow`s, we `collect` all of them,
as soon as one of `Flow` emits a `value`/`error`/`complete`, it becomes the “winner”,
others are canceled and the result `Flow` will forward all events
(including `error` and `complete` events) from the “winner”.

![rx-race](./rx-race.png)

_race (source: [https://rxjs.dev/api/index/function/race](https://rxjs.dev/api/index/function/race))_

> [https://rxjs.dev/api/index/function/race](https://rxjs.dev/api/index/function/race)
>
> Returns an observable that mirrors the first source observable to emit an item.
>
> [https://reactivex.io/documentation/operators/amb.html](https://reactivex.io/documentation/operators/amb.html)
>
> When you pass a number of source Observables to Amb, it will pass through the emissions
> and notifications of exactly one of these Observables: the first one that sends
> a notification to Amb, either by emitting an item or sending an onError
> or `onCompleted` notification. Amb will ignore and discard the emissions
> and notifications of all of the other source Observables.

## Use and example

This operator is useful when you have multiple resources that provide values,
for example, API resources but due to network conditions,
the latency is unpredictable and varies significantly.
In this case, we want to get the “fastest” value and ignore the “slower” values.

Here is an example:

```kotlin
@ExperimentalCoroutinesApi
public fun <T> race(flows: Iterable<Flow<T>>): Flow<T> = TODO("Will implement")

fun firstSource(): Flow<String> = flow {
    delay(400)
    repeat(10) {
        emit("[1] - $it")
        delay(100)
    }
}

fun secondSource(): Flow<String> = flow {
    delay(100)
    repeat(10) {
        emit("[2] - $it")
        delay(100)
    }
}

fun thirdSource(): Flow<String> = flow {
    delay(500)
    repeat(10) {
        emit("[3] - $it")
        delay(100)
    }
}


suspend fun main() {
    race(
        listOf(
            firstSource(),
            secondSource(),
            thirdSource()
        )
    ).collect { println(it) }
    // CONSOLE
    // [2] - 0
    // [2] - 1
    // [2] - 2
    // [2] - 3
    // [2] - 4
    // [2] - 5
    // [2] - 6
    // [2] - 7
    // [2] - 8
    // [2] - 9
}
```

Only values from the second `Flow` are emitted since it starts emitting first.

## Implementation

`race` works in the following way:

1. Collect to all source `Flow`s
2. When a new event arrives from a source `Flow`, pass it down to a collector.
3. Cancel all other `Flow`s.
4. Forward all events from the winner `Flow`.

Here is the implementation of `race`

```kotlin
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.channels.ChannelResult
import kotlinx.coroutines.channels.onFailure
import kotlinx.coroutines.channels.onSuccess
import kotlinx.coroutines.channels.produce
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.emitAll
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.selects.select
import kotlinx.coroutines.yield

@ExperimentalCoroutinesApi
public fun <T> race(flows: Iterable<Flow<T>>): Flow<T> = flow {
    coroutineScope {
        // 1. Collect to all source Flows
        val channels = flows.map { flow ->
            // Produce the values using the default (rendezvous) channel
            produce {
                flow.collect {
                    send(it)
                    yield() // Emulate fairness, giving each flow chance to emit
                }
            }
        }

        // If channels List is empty, just return and complete result Flow.
        if (channels.isEmpty()) {
            return@coroutineScope
        }

        // If channels List has single element, just forward all events from it.
        channels
            .singleOrNull()
            ?.let { return@coroutineScope emitAll(it) }

        // 2. When a new event arrives from a source Flow, pass it down to a collector.
        // Select expression makes it possible to await multiple suspending functions simultaneously
        // and select the first one that becomes available.
        val (winnerIndex, winnerResult) = select<Pair<Int, ChannelResult<T>>> {
            channels.forEachIndexed { index, channel ->
                channel.onReceiveCatching {
                    index to it
                }
            }
        }

        // 3. Cancel all other Flows.
        channels.forEachIndexed { index, channel ->
            if (index != winnerIndex) {
                channel.cancel()
            }
        }

        // 4. Forward all events from the winner Flow .
        winnerResult
            .onSuccess {
                emit(it)
                emitAll(channels[winnerIndex])
            }
            .onFailure {
                it?.let { throw it }
            }
    }
}
```

By using a [select expression](https://kotlinlang.org/docs/select-expression.html),
we can _select_ the first event that becomes available from `Channel`s.
For more details, see
[selecting from channels](https://kotlinlang.org/docs/select-expression.html#selecting-from-channels).

Bonus, we can add a variant function that accepts variable arguments and `raceWith` as an extension function on `Flow`

```kotlin
@ExperimentalCoroutinesApi
public fun <T> race(flow1: Flow<T>, flow2: Flow<T>, vararg flows: Flow<T>): Flow<T> =
  race(
    buildList(capacity = 2 + flows.size) {
      add(flow1)
      add(flow2)
      addAll(flows)
    }
  )

@ExperimentalCoroutinesApi
public fun <T> Flow<T>.raceWith(flow: Flow<T>, vararg flows: Flow<T>): Flow<T> = race(
  buildList(capacity = 2 + flows.size) {
    add(this@raceWith)
    add(flow)
    addAll(flows)
  }
)
```

## Conclusion

We have already implemented `race` operator.
Using `Channel` and “select expression” make the backpressure
and concurrency problem a lot easier.

You can find full implementation and others `Flow` operators here
[https://github.com/hoc081098/FlowExt](https://github.com/hoc081098/FlowExt),
with the entire source code, the documentation,
and setup info to add the library to your project.

FlowExt is a Kotlin Multiplatform library that provides many operators
and extensions for Kotlin Coroutines Flow, including `concat`/`concatWith`, `interval`, `timer`
`race`/`amb`, `raceWith`/`ambWith`, `flatMapFirst`/`exhaustMap`,
`materialize`/`dematerialize`, `takeUntil`, `throttleTime`, `retryWithExponentialBackoff`
and `withLatestFrom`.

Thanks for reading ❤.
If you like my article, please follow me on
[Medium](https://hoc081098.medium.com/), [GitHub](https://github.com/hoc081098)
and [Twitter](https://twitter.com/hoc081098).
