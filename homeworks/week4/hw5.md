## 請以自己的話解釋 API 是什麼
API 中文是「應用程式介面」，英文全名是 Application Programming Interface ，簡言之就是種媒介，串接兩端的資訊，通常是一端提供 API 讓另一端有權利去做 CRUD ，那為什麼要 API，很簡單的答案就是有一種規範讓開發端和使用者更快、更方便的進行溝通和資訊的交換，生活化的例子可以是 google map ，它提供了圖形化的網頁讓使用者可以進行操作，這個網頁其實就是一種 API，但提供什麼樣的服務則會由 google map 端來決定，例如可以看店家的評價、規劃路線以及導航功能，使用者則先需要了解自已想要什麼樣的服務，然後再以不同的方式進行操作進而得到自己想要的資訊。

進一步說和網路相關的 API 會稱作 Web API，此架構通常會在 HTTP 通訊協定下進行，那作為開發端，若想要提供 API 給使用端串接，會需要撰寫文件，規範 request format 以及 response format，明定如何可以讓使用端進行 CRUD ，作為使用端，需要讀懂文件，透過網址以及其他要求的要求的步驟來拿到資料。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹
1. HTTP 狀態碼 503：代表 server 現在無法使用，可能是伺服器超載或是維護中，經過一段時間會得到緩解。
2. HTTP 狀態碼 408：代表用戶端的請求逾時。
3. HTTP 狀態碼 401：代表用戶端尚未驗證。

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

貓貓餐廳平台 API
---

- Base URL：https://www.catcat-restaurants.com/api 

| 說明     | Method | path       | 參數                   | 範例             |
|--------|--------|------------|----------------------|----------------|
| 獲取所有餐廳資料 | GET    | /restaurants     | _limit:限制回傳資料數量           | /restaurants?_limit=5 |
| 獲取單一餐廳資料 | GET    | /restaurants/:id | 無                    | /restaurants/10      |
| 刪除餐廳資料   | DELETE   | /restaurants/:id     | 無 | 無              |
| 新增餐廳資料   | POST   | /restaurants     | name: 餐廳名 | 無              |
| 更改餐廳資料資訊   | PATCH   | /restaurants/:id     | name: 餐廳名 | 無              |

<br/>
串接 API 方式有兩種：

1. 利用 curl 在終端機發 request，但要先安裝 curl：<br/>
`curl https://www.catcat-restaurants.com/api/restaurants`

2. 在 Node.js 環境使用 npm 套件發 HTTP request ，範例如下
- Request（Method：GET）
```
const request = require('request');
request.get(
  'https://www.catcat-restaurants.com/api/restaurants?_limit=5', (error, response, body) => {
    console.log(JSON.parse(body));
  },
);
```

- Response（Method：GET）
```
[
  {
    "id": "1",
    "餐廳名": "貓嚇趣餐廳",
    "電話": "0966666666",
    "今天剩餘訂位": "8",
    "地址": "超北市貓街 5 號",
    "低消": "$300"
  },
  {
     "id": "2",
    "餐廳名": "嗚嗚嗚咖哩",
    "電話": "0977777777",
    "今天剩餘訂位": "200",
    "地址": "超北市太麻里街 77 號",
    "低消": "$200"
  },
  {
     "id": "3",
    "餐廳名": "狗不理包子",
    "電話": "0988888888",
    "今天剩餘訂位": "50",
    "地址": "超北市帝寶路 100 號",
    "低消": "$2000"
  },
]
```
