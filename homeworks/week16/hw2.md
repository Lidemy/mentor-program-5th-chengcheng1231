Input:
```
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

Output:
```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```

Cosplay JS 執行步驟：
1. 首先會進入 call stack 的是全域（Global Scope）環境的程式（main()）
2. 進入迴圈，初始化 global 建立 EC，包含 VO、Scope Chain 後，開始逐行執行賦值 i = 0
    ```
    global EC:{
        VO:{
            i:0
        }
        ScopeChain:[globalEC.VO]
    }

    ```

3. 將 `console.log('i:' + i)` 放到 call stack 執行並從 call stack pop out，因為這時 VO 的 i = 0，Terminal 印出 i: 0
4. `setTimeout(() => {console.log(i)}, 0 * 1000))` 被放到 call stack 並將此要求轉向給 Web APIs 去設置倒數計時器，設定 0 ms
5. 倒數完成時則將傳的 cb function `() => {console.log(i)}` 放入 Task Queue，因為 call stack 還會有東西，所以不會啟用 Event Loop 機制
6. 這個迴圈完成，i++ 後 VO:{i:1}，進入下個迴圈
7. 將 `console.log('i:' + i)` 放到 call stack 執行並從 call stack pop out，因為這時 VO 的 i = 1，Terminal 印出 i: 1
8. `setTimeout(() => {console.log(i)}, 1 * 1000))` 被放到 call stack 並將此要求轉向給 Web APIs 去設置倒數計時器，設定 1000 ms
9. 這個迴圈完成，i++ 後 VO:{i:2}，進入下個迴圈
10. 將 `console.log('i:' + i)` 放到 call stack 執行並從 call stack pop out，因為這時 VO 的 i = 2，Terminal 印出 i: 2
11. `setTimeout(() => {console.log(i)}, 2 * 1000))` 被放到 call stack 並將此要求轉向給 Web APIs 去設置倒數計時器，設定 2000 ms
12. 這個迴圈完成，i++ 後 VO:{i:3}，進入下個迴圈
13. 將 `console.log('i:' + i)` 放到 call stack 執行並從 call stack pop out，因為這時 VO 的 i = 3，Terminal 印出 i: 3
14. `setTimeout(() => {console.log(i)}, 3 * 1000))` 被放到 call stack 並將此要求轉向給 Web APIs 去設置倒數計時器，設定 3000 ms
15. 這個迴圈完成，i++ 後 VO:{i:4}，進入下個迴圈
16. 將 `console.log('i:' + i)` 放到 call stack 執行並從 call stack pop out，因為這時 VO 的 i = 4，Terminal 印出 i: 4
17. `setTimeout(() => {console.log(i)}, 4 * 1000))` 被放到 call stack 並將此要求轉向給 Web APIs 去設置倒數計時器，設定 4000 ms
18. 這個迴圈完成，i++ 後 VO:{i:5}，因設置條件 i <5 因此不會進入下個迴圈
19. 全域沒有程式碼要執行 main() pop out
20. 這時 call stack 空了，所以 Event Loop 上班囉，因此把放在 Task Queue 的 `() => {console.log(i)}` 丟到 call stack 執行並從 call stack pop out，因為這時 i = 5， Terminal 印出 i: 5

---以上在執行的那剎那就把這些步驟完成---

21. 此時過了一秒，Web APIs 裡所有的計時器都少一秒，有計時器結束計時把 cb function `() => {console.log(i)}` 放入 Task Queue，因為 call stack 沒有東西，所以啟用 Event Loop 機制把 cb 丟到 call stack 執行並從 call stack pop out，因為這時 i = 5， Terminal 印出 i: 5
22. 此時又過了一秒，Web APIs 裡所有的計時器都少一秒，有計時器結束計時把 cb function `() => {console.log(i)}` 放入 Task Queue，因為 call stack 沒有東西，所以啟用 Event Loop 機制把 cb 丟到 call stack 執行並從 call stack pop out，因為這時 i = 5， Terminal 印出 i: 5
23. 此時又過了一秒，Web APIs 裡所有的計時器都少一秒，有計時器結束計時把 cb function `() => {console.log(i)}` 放入 Task Queue，因為 call stack 沒有東西，所以啟用 Event Loop 機制把 cb 丟到 call stack 執行並從 call stack pop out，因為這時 i = 5， Terminal 印出 i: 5
24. 此時又過了一秒，Web APIs 裡的計時器少一秒，把 cb function `() => {console.log(i)}` 放入 Task Queue，因為 call stack 沒有東西，所以啟用 Event Loop 機制把 cb 丟到 call stack 執行並從 call stack pop out，因為這時 i = 5， Terminal 印出 i: 5

