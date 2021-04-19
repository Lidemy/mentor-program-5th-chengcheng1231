## 教你朋友 CLI

### 懶人也能學會用 command line 操作電腦
---

> 什麼是 Command line ？
<br />

全名 Command line interface （CLI），簡單來說就是利用純文字的方式來操作電腦，常常在電影裡會看到駭客在很暗的房間，盯著電腦螢幕在黑黑的視窗上用打字來操作電腦（如下圖），一些常見的指令包含現在在哪條路徑、列出檔案清單以及開新檔案等等，相較於 Graphical User Interface （GUI），則是用檔案總管來操作電腦，也就是我們常常會用滑鼠在資料夾按上一頁或下一頁切換位置，或者是點擊右鍵來新增檔案，但其實這些動作對電腦來說背後都是在告訴電腦一些指令以及純文字的內容，所以用 CLI 也能達到一樣的效果。

但為什麼要用 CLI 而不是 GUI ，主要原因是可以較節約電腦系統的資源以及有時可以更高效與精準地達到目的，主要參考 [這篇](https://yuhantaiwan.coderbridge.io/2020/06/14/%E7%AD%86%E8%A8%98-CommandLine%E8%B6%85%E6%96%B0%E6%89%8B%E5%85%A5%E9%96%80/)。。

![駭客](https://doqvf81n9htmm.cloudfront.net/data/crop_article/101889/shutterstock_1083511010.jpg_1140x855.jpg)



> Command line 如何使用？

要使用 Command line 前需要先下載 git bash 這個操作環境，下載 [連結點此](https://gitforwindows.org/)，下載完成後就可以打開 git bash 進行 CLI 操作，以下為一般的指令。


- 現在身在哪條路徑

    ```
    $ pwd
    /c/Users/Yourname
    ```

- 列出檔案清單

    ```
    $ ls
    Hello.txt  Python.ipynb

    $ ls -al #更詳細的檔案資料
    total 40
    drwxr-xr-x 1 Yourname 197121     0 Apr 14 21:51 ./
    drwxr-xr-x 1 Yourname 197121     0 Apr 17 13:46 ../
    drwxr-xr-x 1 Yourname 197121     0 Apr 14 21:51 .git/
    -rw-r--r-- 1 Yourname 197121     0 Apr 13 22:32 Hello.txt
    -rw-r--r-- 1 Yourname 197121 15780 Apr 14 21:51 Python.ipynb
    ```

- 改變現在的路徑

    ```
    $ cd +檔名 
    $ cd Desktop #到桌面
    $ pwd #然後印出位置
    /c/Users/Yourname/Desktop
    ```

- 指令使用手冊

    ```
    $ help
    GNU bash, version 4.4.23(1)-release (x86_64-pc-msys)
    These shell commands are defined internally.  Type `help' to see this list.
    Type `help name' to find out more about the function `name'.
    Use `info bash' to find out more about the shell in general.
    Use `man -k' or `info' to find out more about commands not in this list.
    ```

- 如何複製貼上（Windows）

    ```
    在介面上滑鼠點右鍵後點選 options，會跳出以下視窗，勾選 Ctrl +Shift +letter shorcuts 後按 Save
    回到介面就可以使用 Ctrl +Shift +C/V 複製指令結果等等
    ```

更多指令可以至我的 [學習筆記](https://www.notion.so/2021-4-21-18-Week-1-fa604d710b7547eb84c717c87f975ed8)



> 解決 h0w 哥的問題

h0w 哥的問題是：用 command line 建立一個叫做 wifi 的資料夾，並且在裡面建立一個叫 afu.js 的檔案

如何解決：<br />
1.  先用 `pwd` 確認位置，並用 `cd` 找到需要建立資料夾的地方，再用指令 `mkdir + 資料夾名稱`來建立，然後用 `ls` 指令看一下是否有建立。
```
$ mkdir wifi
$ ls
wifi/ # 代表建立成功
```

2. 用 `cd + 資料夾名稱` 進入到 wifi 的資料夾，再用指令 `touch + 取一個檔案名稱` 來建立檔案，然後用 `ls` 指令看一下是否有建立。

```
$ cd wifi/
$ touch afu.js
$ ls
afu.js # 代表建立成功
```

