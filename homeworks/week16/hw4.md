Input:
```
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```
Output:
```
2
2
undefined => （嚴格模式）
```
主要的概念是如果沒有透過 class 創造物件，而是直接創造一個物件時 this 的值跟作用域跟程式碼的位置在哪裡完全無關，只跟「你如何呼叫」有關，也可以把所有的 function call，都轉成利用 call 的形式來看，像是你在呼叫 function 以前是什麼東西，你就把它放到後面去
1. `obj.inner.hello()` 會被轉成 `obj.inner.hello.call(obj.inner)`，那 `console.log(this.value)` 就會是 `console.log(obj.inner.value)` ， 所以 obj.inner 的 value 是 2
2. `obj2.hello()`會被轉成 `obj2.hello.call(obj2)` ，也就是 `obj2.hello.call(obj.inner)`，那 `console.log(this.value)` 也會是 `console.log(obj.inner.value)` ， 所以 obj.inner 的 value 是 2
3. `hello()` 會被轉成 `hello.call()` <br>
在非嚴格模式，this 在瀏覽器底下是 window，在 node.js 下 this 就是 globle，那因為沒有 value 的值，所 以是 undefined
在嚴格模式，所以 this 不管在 node.js 還是在瀏覽器執行 this 都是 undefined。