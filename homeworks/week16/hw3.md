Input:
```
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

Output:
```
undefined
5
6
20
1
10
100
```

1. 初始化 global 建立 EC，包含 VO、Scope Chain，因為 global 有 function，所以也會建立一個隱藏的屬性 [[Scope]]
    ```
    global EC:{
        VO:{
            fn: func,
            a: undefined
        }
        ScopeChain:[globalEC.VO]
    }

    fn.[[Scope]] = globalEC.scopeChain

    ```
2. 初始化完成，開始逐行執行賦值 a = 1 
3. 執行到 fn()，進入 fnEC 的初始化，因為是 function 所以建立 AO，function test 內有 function，所以也建立 [[Scope]]
    ```
    fn EC:{
        AO:{
            fn2: func,
            a: undefined
        }
        ScopeChain:[fnEC.AO, fn.[[Scope]]]
    }

    fn2.[[Scope]] = fnEC.scopeChain

    global EC:{
        VO:{
            fn: func,
            a: 1
        }
        ScopeChain:[globalEC.VO]
    }

    fn.[[Scope]] = globalEC.scopeChain

    ```

4. fn EC 初始化完成，執行 `console.log(a)`，找到 fn EC AO: {a: undefined}，因此 Terminal 印出 undefined
5. 進行賦值 fn EC AO: {a: 5}
6. 執行 `console.log(a)`，找到 fn EC AO: {a: 5}，因此 Terminal 印出 5
7. a++ 使變成 fn EC AO: {a: 6}
8. var a 又宣告一次，但因為 a 已經被宣告，因此不理會
9. 執行 fn2() 初始化 fn2 EC，沒有任何宣告 VO 是空的
    ```
    fn2 EC:{
        AO:{
        }
        ScopeChain:[fn2EC.AO, fn2.[[Scope]]]
    }

    fn EC:{
        AO:{
            fn2: func,
            a: 6
        }
        ScopeChain:[fnEC.AO, fn.[[Scope]]]
    }

    fn2.[[Scope]] = fnEC.scopeChain

    global EC:{
        VO:{
            fn: func,
            a: 1
        }
        ScopeChain:[globalEC.VO]
    }

    fn.[[Scope]] = globalEC.scopeChain

    ```
10. 執行 `console.log(a)`，在 fn2 EC AO: {} 找不到 a，因此依據 scopeChain 往上一層找 fn EC AO: {a:6}，Terminal 印出 6
11. a = 20 要賦上新值，但在 fn2 EC AO: {} 找不到 a，因此依據 scopeChain 往上一層找 fn EC AO: {a:20}
12. b = 100 要賦上新值，依據 scopeChain 找在 fn2 EC AO 、 fn EC AO、global EC VO 都找不到 b，因此在 global EC VO 宣告 b 並賦值 100
13. fn2 執行完畢， 拿掉 fn2 EC
14. 執行 `console.log(a)`，找到 fn EC AO: {a: 20}，因此 Terminal 印出 20
15. fn 執行完畢， 拿掉 fn EC
16. 執行 `console.log(a)`，找到 global EC VO: {a: 1}，因此 Terminal 印出 1
17. a 賦上新值使變成 global EC VO: {a: 10}
18. 執行 `console.log(a)`，找到 global EC VO: {a: 10}，因此 Terminal 印出 10
19. 執行 `console.log(b)`，找到 global EC VO: {b: 100}，因此 Terminal 印出 100
20. global 執行完畢， 拿掉 global EC