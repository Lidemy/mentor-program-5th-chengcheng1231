## 請解釋後端與前端的差異。
---
凡舉在電腦或是手機上看到的網頁、視窗或是檔案都是所謂的前端，那以網頁來說主要會是由 JavaScript (JS)、HTML 以及 CSS 這「前端三本柱」所建構的。JS 主要是處理互動功能，HTML 處理內容，CSS 處理樣式。

後端則是使用者發送 request 後發生的事情，包含系統架構、雲端資料處理、Database 的處理。

<br />

## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。
---

這時候搜尋 "JavaScript" 的 request 即會透過 Operating System、Hardware、網路卡發送到 DNS server 來詢問 Google server 的 IP 位置，並將 request 發送至 Google server，這時 Google server 會和他們的 Database 來進行互動，待抓取到 "JavaScript" 的資料後則開始隨原路徑 response 到前端使用者的顯示畫面。

<br />

## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用
---

notepad：開啟記事本

calc：開啟計算器

nslookup：IP位址偵測器