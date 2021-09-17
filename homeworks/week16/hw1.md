Input:
```
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

Output:
```
1
3
5
2
4
```

Cosplay JS 執行步驟：
1. 首先會進入 call stack 的是全域（Global Scope）環境的程式（main()）
2. `console.log(1)` 被放到 call stack 執行並從 call stack pop out，這時 Terminal 印出 1
3. `setTimeout(()=>{console.log(2)}, 0)` 被放到 call stack 並將此要求轉向給 Web APIs 去設置倒數計時器，設定 0 ms
4. 倒數完成則將傳的 cb function `()=>{console.log(2)}` 放入 Task Queue，因為 call stack 還會有東西，所以不會啟用 Event Loop 機制
6. `console.log(3)` 被放到 call stack 執行並從 call stack pop out，這時 Terminal 印出 3
7. `setTimeout(()=>{console.log(4)}, 0)` 被放到 call stack 並將此要求轉向給 Web APIs 去設置倒數計時器，設定 0 ms
8. 倒數完成則將傳的 cb function `()=>{console.log(4)}` 放入 Task Queue，因為 call stack 還會有東西，所以不會啟用 Event Loop 機制
9. `console.log(5)` 被放到 call stack 執行並從 call stack pop out，這時 Terminal 印出 5
10. 全域沒有程式碼要執行 main() pop out
11. 這時 call stack 空了，所以 Event Loop 上班囉，因為此機制是採用先進先出，因此把放在 Task Queue 的 `()=>{console.log(2)}` 丟到 call stack 執行並從 call stack pop out
12. 這時 call stack 又空了，所以 Event Loop 繼續做事，把放在 Task Queue 的 `()=>{console.log(4)}` 丟到 call stack 執行並從 call stack pop out