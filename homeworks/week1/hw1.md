## 交作業流程
1. clone 專屬自己的遠端 github repository 網址，並到已經做 git init 的資料夾下執行 git clone + 網址，就會將檔案下載下來

2. 用指令 `cd` 進入到本地 mentor-program-5th 的資料夾，再用 `git branch -v` 確認所在的 branch，若是在 master 則利用 `$ git checkout -b week1` 指令新開一個 branch 同時切換過去。

3. 開檔案寫作業

4. 寫到一定的進度後利用 `git commit -am " commit-name"`  將檔案加入 staged 區並 commit 新版本

5. 當該週的作業寫完時利用 `git push origin week1` 將本地的 branch 推到遠端 github repository

6. 在遠端 github repository 就會發現有 week1 的 branch，這時候可以利用 pull request 將 week1 的進度 merge 到 master ，進入到另一個版面後可以確認一些細項，包含這個 request 是哪個 branch 合併到哪個 branch 、敘述以及改動的部分為何，都確認完後按下 create pull request，這時候就可以複製網址，然後到學習系統交作業。
 
## 交作業完要做什麼

1. 在 local 端先 checkout 到 master ，然後輸入 `git pull origin master` ，把遠端的拉下來，之後就可以把原本的作業 branch 刪除 `git branch -d branch-name`
2. 可以開下一周的 branch，寫新的作業 
