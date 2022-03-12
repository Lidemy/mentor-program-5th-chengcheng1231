## 十六到二十週心得

### 17 週
---



#### Express
何謂 Express？相較於前端 JavaScirpt 來說，常見的框架有 React.js、Vue.js、Angular.js 等，而 Express 則是後端基於 Node.js 開發的框架之一，因此可以讓我們利用 JS 就能實作出一個簡易的 http server，Express 的底層也就是用 http.createServer 的方式來做。


其他：
1. Node.js ：
- 就是一個能執行 JavaScript 的環境「runtime」
- 以 V8 為核心，加上一系列 C/C++ 的套件，成功的讓 Server 端也可以執行 JavaScript
但是為了麼後端語言這麼多了，還要移植 JS 到後端？
因為 JS 是一個事件驅動的語言，透過事件迴圈，能讓執行緒幾乎不會被卡住；而這樣的特性，非常適合用來接收高併發（High Concurrency）的請求。

2. 高併發（High Concurrency）：是一種系統執行過程中遇到的一種「短時間內遇到大量操作請求」的情況，主要發生在 web 系統集中大量訪問收到大量請求，例如：搶票情況；天貓雙十一活動。

參考：
[什麼是 Node.js？Node.js 完整介紹懶人包！](https://blog.hiskio.com/what-is-node-js/)
[「筆記」- 如何使用 Express.js 建立一個簡易網頁](https://medium.com/pierceshih/%E7%AD%86%E8%A8%98-%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8-express-js-%E5%BB%BA%E7%AB%8B%E4%B8%80%E5%80%8B%E7%B0%A1%E6%98%93%E7%B6%B2%E9%A0%81-fab278ddb9c9)


#### ORM 
ORM 是一種技術，中文是物件關係對映，主要的功能是讓工程師能用物件導向的語言（OOP）就可以生成 SQL 語法，並且去操作關聯式資料庫（MySQL），以圖來說它扮演介於 MVC 架構的 M （model）和關聯式資料庫的角色。

ORM 在不同物件導向的語言（OOP）都其工具或是套件，如 Ruby on Rails 內建 Active Record、Django 內建 Django ORM、 Spring Boot 則通常與 Hibernate 一起使用，C# 則有一套 .Net Entity Framework，JavaScript 則有以 Node.js 環境開發的 sequelize。
優點：
1. ORM 可以防止 SQL 的注入攻擊
2. 工程師可以用幾行 ORM 語法就可以產生出一長串的 SQL 語法

這代表工程師用了 ORM 就不用了解 SQL 了嗎？ 答案很抱歉只能 say no，其中有幾個原因：
1. 因為物件導向和關聯式資料庫先天上有不少不契合的地方，在電腦科學上有個專有名詞叫做 Object-relational impedance mismatch，像是物件導向的物件導向的接口 （interface）、繼承（inheritance）在資料庫並沒有被對應的概念。
2. 因為使用 ORM 多了一層轉換，在效能上有時候就會比直接寫 SQL 要來的差，甚至 ORM 為了達到轉換的目的會占用許多儲存空間
3. 在處理 JOIN、WHRER 條件時，ORM 語法會變得複雜
4. 有些語句 ORM 是不能生成，如 SQL WITH 語句

所以 ORM 還是有其侷限性，因此雖然 ORM 好用，但是一些小狀況還是需要學一下 SQL 來應付 ORM 無法應付的狀況

參考：
- [SQL三部曲:你不需要ORM](https://tecky.io/en/blog/SQL%E4%B8%89%E9%83%A8%E6%9B%B2:%E4%BD%A0%E4%B8%8D%E9%9C%80%E8%A6%81ORM/)
- [ORM到底是用還是不用？](http://blog.twbryce.com/orm-use/)
- [ORM v.s. SQL](https://medium.com/tds-note/orm-v-s-sql-91e003089a61)
#### sequelize