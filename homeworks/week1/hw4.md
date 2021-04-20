## 跟你朋友介紹 Git

 

### Git 是什麼
---
 
在了解 git 之前可以先講版本控制是什麼？在學生時期和職場上多少都會需要做報告，當做報告時都會有一版、二版、最終版，但我們希望每把每個版本都保存，方便後續要修改時可以回頭找過去做了什麼事情，這件事情就叫版本控制。

<br />

那 Git 就是幫你做版本控制的程式，作法很簡單，就是在某個想要做版本控制的資料夾做初始化，亦即裝上 Git ，就可以開始對這個檔案做版本控制，那這個檔案稱之為 Repository （倉庫）。所以菜哥可以利用此工具管理你的笑話版本了。

<br />

### 基本的 Git 語法如下
---
- 初始化（git init）和查看狀態（status）

```
# 在該資料夾的路徑下做初始化，初始化後會出現一個 .git 的資料夾工具
$ git init
Initialized empty Git repository in C:/Users/Yourname/test/.git/

# 刪掉.git 的資料夾工具表示不要做此資料夾的版本控制
$ rm -r .git
```

```
#查看狀態
$ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        Hello.txt
        Python.ipynb

nothing added to commit but untracked files present (use "git add" to track)
```

- 決定檔案要不要加入版本控制 （add）(rm -- cached)

在這個被版本控制的資料夾下我們要決定哪些是需要被版本控制的，但如密碼、機密資料、使用者相關和作業系統產生的檔案，不太會加入版本控制。

會有兩個項目來表示是否須被版本控制，Untracked files & staged files

```
# 加入
$ git add Hello.txt
$ git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   Hello.txt
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        Python.ipynb

# 全部檔案都想要加入
$ git add .
$ git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   Hello.txt
        new file:   Python.ipynb

# 移除
$ git rm --cached Hello.txt
rm 'Hello.txt'
```

- 建立一個新版本並看歷史紀錄

```
$ git commit -m "這個commit的敘述"
$ git commit -m "first commit"
#就會有一個 commit 產生，但實體在資料夾上看不到
```

```
$ git log
commit c0856693b08710bfcde94eb3dac1297678750142 (HEAD -> master) #版本編號或 ID
Author: yuchenghsu1231 <yuchenghsu1231@gmail.com>
Date:   Sat Apr 17 18:11:58 2021 +0800

    first commit

$ git log --oneline #顯示比較簡短的
478e1d4 (HEAD -> master) second commit
c085669 first commit
```

- 當改完並存檔 Hello.txt 被版本控制的檔案時，我們看一下狀態發現是被 modified 的，這時還需要再做一次 git add
```
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   Hello.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        Python.ipynb

no changes added to commit (use "git add" and/or "git commit -a")

git add Hello.txt # 將這個被更新的檔案加入版本控制
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   Hello.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        Python.ipynb

```
- 加入後再做 commit，就會有新版本
```

$ git commit -m "first commit"
[master 478e1d4] second commit
 1 file changed, 1 insertion(+)

$ git log
commit 478e1d4e5e477eea0ef669621b4495b9242c3d37 (HEAD -> master)
Author: yuchenghsu1231 <yuchenghsu1231@gmail.com>
Date:   Sat Apr 17 18:33:58 2021 +0800

    second commit

commit c0856693b08710bfcde94eb3dac1297678750142
Author: yuchenghsu1231 <yuchenghsu1231@gmail.com>
Date:   Sat Apr 17 18:11:58 2021 +0800

    first commit

```


### Github 又是什麼
---
當我們在職場上一起協作一個專案時，Github 會是一個很好讓同事可以遠距開發的平台，之前提到 Repository （倉庫）是一個被版本控制的資料夾，那 Github 就是共同放 Git Repository 的地方。所以今天菜哥要和別人遠端合作寫一個笑話集，就可以利用 Github。

那今天要如何把本地 Code 放上 Github，也就是 push，可以先在  Github 開一個新的 Repository，這時候會有指示會需要你複製網址，並到本地操作 CLI，可以以下列步驟來做。


 - 第一步是先用以下方式
```
$ git remote add origin https://github.com/youracount/practice.git
# 再用以下方式就可以本地的 master push 到 github origin 上 # 也有可能需要輸入帳號密碼
$ git push -u origin master # master 為本來的 branch
```


- 也可以將其他 branch push 上 origin

```
$ git push -u origin branch 名稱
$ git push -u origin new-feature
```


- 將 origin 上的 branch pull 進本地

```
$ git pull origin branch 名稱
$ git pull origin new-feature
```