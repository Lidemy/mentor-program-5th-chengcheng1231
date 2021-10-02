## 什麼是 MVC？


## 請寫下這週部署的心得


## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？
- MVC 是由 Model, View, Controller 三個詞所組成，他是開發時的撰寫風格、設計模式，Model 負責與資料庫之間的存取，Controller 負責指定動作的邏輯，例如拿到資料塞給 View、渲染哪個 View 版面等等，View 提供 html 的版面，所以只要你把 code 切開成這三個就可稱作 MVC。
- 雖然在開發前期會很花時間，但相對把 SQL 指令、html、邏輯寫在同一支 code 裡面，把這些功能切分開來的 MVC 對於後續的維護性會比較佳。

## 請寫下這週部署的心得
雖然這次部署到 heroku 相較於部署到 Amazon EC2 要來的簡單，少了自己安裝作業系統、資料庫的步驟，但還是要很小心的確認本地端 git repository 內檔案的設定有沒有設定好，包含如果你的專案有用 npm 安裝東西並引入東西就要在 package.json 寫入，在 dependencies 這個屬性下去帶有各 library 的資訊，像 express 是什麼版本，engines 這個屬性會要用 node.js 的什麼版本，否則 Heroku 會不知道你用哪些套件，web 會跑不起來，這時候可能要用 `$ heroku logs --tail` 確認到底去哪個環節出了問題，再來是如果有用到 Sequelize CLI，那也要做設定，總歸來說 Heroku 只知道要跑 npm start 這個指定，其他的它就看到什麼設定就用它的什麼資源來協助這個專案，另外，雖然我在本地用 `$ heroku local web` 跑有成功，但實際 git push 上去後去看網頁發現它頁面顯示 Internal Server Error，http status 顯示 500，我本來在想是 heroku 搞砸了我的專案？攻擊我的村莊？導致我連不上去？，我就想說放一段時間再來刷新頁面看看可能就好了，但事與願違，後來我覺得還是我的專案有些問題，用`$ heroku logs --tail`確認後發現它抓不到某個變數的值，我才想到因為我的資料庫雖然有建起來，但是裡面沒有資料給它抓呀，所以用 MySQL Workbench 連線進去新增資料後，重新刷新頁面就成功了，可喜可賀。


## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？
雖然知道 MVC 會對後續的維護性會比較佳，但前期開發真的花很多時間，除了自己剛學這樣的架構以外，index.js 入口、 Controller 以及 Model、 View 的連結性很強，開發的視窗常常會跳來跳去然後就眼花了。
1. 其中發現在寫 view 的時候也滿像 php 把資料塞進 html 裡面，如果要改 view 也還是要先印出 Controller 給的資料，或是要印出底層的變數，如 req.session.username、errorMessage 有沒有東西。
2. 每用一個 middleware 就要注意是否有用 npm 安裝好以及了解它的前置作業、用法，否則完全沒作用，就會傻在那邊。
3. 這周真的吃盡了苦頭，中間受不了跑去論壇發問問題，好在後來有熱心的同學回答我，例如在設定 model association 的時候會有一些規則導致它會自己去抓 model 名稱 + id 去新增到資料庫 schema 欄位名稱，詳細就到[論壇](https://github.com/Lidemy/forum/discussions/211)看，還有我覺得這周幾乎都是不熟悉的東西，勉強 JS 寫法和 html 是熟悉的， 但 MVC 架構的寫法真的要回去多看幾次影片才會了解，到現在寫完 hw1 &2 的作業我也沒把握不看這些檔案自己寫一個出來，另外， Controller 還有帶到一點 promise 的東西，雖然剛學不久，但也快要忘了，總之還算是熟悉了這些專有名詞在做什麼，每行 code 大概的目的是為了什麼，應該也算有點長進了吧（?。
