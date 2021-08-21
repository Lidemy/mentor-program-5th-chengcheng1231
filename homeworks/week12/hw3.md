## 請簡單解釋什麼是 Single Page Application
---
中文是單頁式應用，與之對應的概念是 MPA，Multiple Page Application，MPA 是當使用者發送 request 給 server 時，瀏覽器會需要等待 server 回傳包含 html css JSON 資料等等，所以畫面會有一段等待載入的空白頁面，使用者體驗就會較差，但是在 SPA 在第一次發送 request 給 server 時會回傳整個資料包含 html、css、JavaScript 和 JSON 資料等等，當使用者觸發某個功能並發送 request 時，整個畫面並不需要重新載入，而是等待 server 回傳單純的資料（例如 JSON 格式的資料），畫面和邏輯就交給 client-side 去做處理，進而改變畫面的局部的區塊，如用 ajax 的技術來發送 request 就能達到 SPA 的概念，像是 Gmail 有新的信件進來時並不會整個頁面做跳轉，而是信件的區塊會做更新。

## SPA 的優缺點為何
---
**優點：** </br>
1. 更新頁面時不需要跳轉，UI 交給 client-side 做處理，使用者體驗較佳
2. 因為 client 與 server 端所傳輸的資料變小，減輕 client 和 server 端的負擔

**缺點：** </br>
1. 在初次載入時會很耗時，因為需要將整個資料做渲染以呈現 SPA 功能和顯示的效果
2. 在做 SEO 上會有問題，因為網頁的原始碼裡面某些 html tag 是不會在一開始出現，需要執行 JavaScript 動態產生才會出現，但這個問題可以透過 SSR 來解決，也就是第一個頁面由 Server side render，之後的操作還是由 Client side render。

## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？
之前透過 PHP 直接輸出內容，由於是將資料綁在 UI 上在回傳整份 html 給瀏覽器，瀏覽器拿到這份 html 後做呈現，這樣會產生每次 request 拿到 response 後整個頁面都需要重新渲染，對於 server 造成運算上的負擔，此可以稱做 server-side render。

這周由於是透過 Ajax 拿資料，動態的產生內容，達到局部內容的更新，將渲染的工作交給 client 端，此可以稱做 client-side render，如此一來 server 端只要負責輸出資料，達到前後端分離。