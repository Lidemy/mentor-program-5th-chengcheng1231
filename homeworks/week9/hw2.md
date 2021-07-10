## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

如果知道大概那個欄位會需要多少字元時適合用 VARCHAR，可設定長度，但當不曉得存放字元會是多少時適合用text，不設定長度。

按照查詢速度： varchar 快於 text。

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

Cookie 是一個儲存在瀏覽器上的一個資訊檔案，它在發 request 給 server 時會被帶上，讓 server 知道這個 request 是有狀態的，也說是做 session 的其中一種方式，其它像是利用網址也能達到有狀態的效果。

Server 可以利用 Set-Cookie 這個 response header 來設定瀏覽器要存什麼樣的資訊，當發 request 給 server 時會在 Header 帶上 cookie 給 server。


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

沒有太多的想法只能用臆測的。可能就是若 Session ID 若不小心被駭客取得了，是否也就能在發 request 的時候帶上，就能不用輸入帳號密碼去做登入，利用別人的身分去做其他事情。 

