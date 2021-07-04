## 什麼是 Ajax？
全名為 Asynchronous JavaScript and XML，可以是任何**非同步**和伺服器交換資料的統稱，但因近年 JSON 等格式的流行，使用 Ajax 處理的資料不侷限於 XML。

在 Ajax 還未被開發前網頁主要是以網頁表單的形式發送 request 與伺服器做溝通，但當發送 request 如發送留言時就需要等待伺服器回傳新的頁面才能繼續瀏覽，因此這段時間畫面會卡住不動，直到收到 response 後做渲染，在使用者體驗上不理想，因此 Ajax 的好處就是瀏覽器可以在不用刷新頁面的情況下動態接收伺服器回傳的資料，對使用者而言不會有「中斷」與「等候」的時間，可以繼續瀏覽做其他事情，另外對整體效率來說有些 request /response 只是為了改變局部的畫面，例如：發送留言/顯示留言，相較於渲染整個版面算是一個小動作，若這時還要等待整個頁面刷新則會對整體伺服器、瀏覽器的讀取效率造成較大的負擔。

更多例子像 FB 在瀏覽動態時，會有需要載入更多動態的時候，這時頁面不會是整個卡住等待資料回傳，而是可以瀏覽其他動態並同時的等待回傳資料並渲染。

## 用 Ajax 與我們用表單送出資料的差別在哪？

透過表單傳資料這個方法，server 在回傳 reponse 時，瀏覽器會直接渲染出結果，缺點是每次要新的資料時，就都要換頁，屬同步的形式。

Ajax的這個方法，server 在回傳 reponse 給瀏覽器後，瀏覽器會再回傳給 JS ，JS 再渲染出結果，屬非同步的形式。

## JSONP 是什麼？

JSONP 是一種可以讓網頁從其他的網域 (cross-domain) ，也就是跨網域請求資料的一種方法，因為透過瀏覽器拿資料會受限 Same origin policy （同源政策）的影響，回傳的 header 會沒戴上 `access-control-allow-origin :*` 這段，瀏覽器會將 response 擋掉，無法順利取得 responseText，因此 JSONP 的方式則可以不受同源政策的影響。

1. 本端建立一個 callback function，然後用 JavaScript 動態建立一個 `<script>` 標籤元素，並指定好 src 指向一個跨網域的網址，將參數或使用的 callback function 名稱帶入網址，其他像是 img, link, script, iframe 內嵌式的標籤元素也可以做到。

2. 遠端伺服器則接收到請求讀到此網址會回傳 JS 檔案，該 JS 則會帶 function，function 裡面會包含請求的資料。

3. 本端會執行此 callback function 並拿到資料並做其需要的處理。 


## 要如何存取跨網域的 API？

解法就是要做 cross-origin-resourse sharing，CORS 跨來源資源共用。

1. client 端變成同源

2. server 端在 reponse 加一個 header `access-control-allow-origin:*`，去設定哪些來源的人可以存取這個 API 的 response

另外，瀏覽器在發送請求之前會先發送 preflight request (預檢請求)，確認伺服器端設定正確的 `Access-Control-Allow-Methods`、`Access-Control-Allow-Headers` 及 `Access-Control-Allow-Origin` 等 header，才會實際發送請求，但若是「簡單呼叫」的類型，則不會發送預檢請求。


## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

因為第四週發送 API 是透過 node.js 的環境發送 request，但本周因為透過瀏覽器發送就會受到同源政策 (Same Origin Policy)的影響。
