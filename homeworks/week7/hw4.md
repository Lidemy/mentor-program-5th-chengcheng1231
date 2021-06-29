## 什麼是 DOM？
---
全名 document object model，中文翻譯為文件物件模型，主要的目的為讓程式語言如 JS 和 html 之間有個溝通的橋樑，是由 W3C 聯合各瀏覽器廠商而制訂的規範，在此模型的基礎下瀏覽器會將 html 文件以樹狀的結構來表示，因此各節點形成的樹狀圖我們會稱之為 DOM tree，再來利用 DOM 提供的 API 來進行節點的事件處理，進而改變架構、風格和內容。

參考資料：
</br>1. [重新認識 JavaScript： Day 12 透過 DOM API 查找節點](https://ithelp.ithome.com.tw/articles/10191765)
</br>2. [W3C DOM 簡介](https://openhome.cc/Gossip/JavaScript/W3CDOM.html)


## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
---
事件階段 (eventPhase) 的順序是捕獲階段 (Capture Phase) -> 目標階段 (Target Phase) -> 冒泡階段 (Bubbling Phase)

- 捕獲階段 (Capture Phase)：當一個事件產生，DOM 會從祖先層 (window) 開始往下找到 目標階段 (Target Phase)，若要監聽事件觸發在捕獲階段須將原預設的參數改成 true

```
document.querySelector(className)
					.addEventListener('click', function() {
					console.log(className, 'Capture phase')
					}, true)
```
- 冒泡階段 (Bubbling Phase)：從目標階段 (Target Phase) 回到祖先層 (window) 的過程，監聽事件的觸發原本就預設成冒泡階段，因此參數已經是 false


## 什麼是 event delegation，為什麼我們需要它？
---
當多個目標子元素都想觸發的事件都差不多時，可以利用 event delegation （事件代理） 來做處理，而事件代理這個方法是基於事件傳遞機制而來。

原先當多個目標子元素都新增一個 eventListener 來做時，第一個缺點是會占用大量儲存空間降低效能，第二個是當有新增的目標子元素也想做同件事情時就不會進行觸發，所以事件代理則是會委託給父層元素做事件監聽，當尋找目標子元素時，一定會經過父層元素，進而觸發，藉此不用寫多個 eventListener，也能在新增目標子元素時也能觸發相同事件。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
---
`event.preventDefault()` 防止瀏覽器為事件做預設的動作 (Stop Event Flow)。

以超連結為例，通常來說當頁面上的超連結被點擊時，背後的事件監聽就會觸發，然後會做導向連結的動作，但今天在事件監聽上加上 `event.preventDefault()` 時此導向連結的動作就不會做了。

`event.stopPropagation()` 當想要在事件傳遞時終止事件傳遞，或是不想做上級回報時就會在目標子元素加上此程式碼。

例如根據事件傳遞的原則來說，當子元素被觸發，父層元素也會被觸發，但今天只想觸發子元素時，可以加上 `event.stopPropagation()` 來阻止事件傳遞。