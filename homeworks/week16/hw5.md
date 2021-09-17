## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。
這週其實釐清了很多 JS 基礎的觀念，也了解到 JS 其他進階的觀念，然後在課程上會滿敏顯得感覺到 Huli 教學上的巧思，學習的先後順序是什麼，先是作用域、Hoisting、Closure，再帶到物件導向基礎與 prototype，最後加上 `this` 的觀念，雖然之前寫 JS 的時候多多少少都有使用過這些觀念，但到這週才知道他們的專有名詞，底層怎麼運作等等，可能未來程式出 bug 時也能想到是否自己的觀念有漏洞，可以再來回想起這些。

1. setTimeout()： 所設定的時間是「至少」會需要花費多少時間，並非是設置的時間，因為無論時間是否到了，都還是要等 Call Stack 裡面沒有任務要執行時才會啟用 Event Loop 機制去放行 queue task 的東西。

2. 作用域（static scope）：JS 原來是靜態作用域（static scope），可以肉眼看程式碼的結構就知道各 EC 變數是什麼，而且是不會變的，跟這個 function 在哪裡被「呼叫」一點關係都沒有。相較於動態作用域（dynamic scope）就是 function 被「執行」的時候才會決定值是什麼，但 JS 有個難解的問題是 `this`，原理和動態作用域類似，就是 `this` 的值在程式被執行的當下才會被決定

3. 提升 （Hoisting）：在賦值的時候其優先順序從大到小是 1. function 2. arguments 3. var

3. 閉包（Closure）：在一個 function 內去 return 一個 function，可以把值記住就是閉包的基本應用。有一個優點是能把變數隱藏在裡面讓外部存取不到，否則變數暴露在外部，任何人都能直接改變這個變數的值，所以可以達到隱藏資訊的目的。

4. Hoisting 和 Closure 的概念都可以用 ECMAScript 中的作用域來一步步進行解釋，也就是各階段的 Execution Contexts (EC)、 variable object (VO)/ activation object (AO) 是什麼，主要 Closure 就是因為有函式因為被回傳，然後被記著 Scope，所以就算 funcion 執行結束了，但還是被存在記憶體裡面。

5. 關於 JS 原型鏈自己也參考其他文章然後自己寫一篇自己消化理解的文章，[【JS 筆記】從這裡入門，你會更了解 Javascript 原型鏈
](https://yuchenghsu1231.medium.com/js-%E7%AD%86%E8%A8%98-%E5%BE%9E%E9%80%99%E8%A3%A1%E5%85%A5%E9%96%80-%E4%BD%A0%E6%9C%83%E6%9B%B4%E4%BA%86%E8%A7%A3-javascript-%E5%8E%9F%E5%9E%8B%E9%8F%88-58e5d6ac9ca5)。

6. Stack 是資料結構，和 array 也是資料結構的相同概念，特點是採 Last in, first out (LIFO)

7. JS 這個語言雖然叫做單執行緒的語言，但還是會先編譯 => 再執行(一行一行跑)。
