<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    $username = NULL; 
    if (!empty($_SESSION['username'])) { // 利用有無 session 確認是否為登入狀態
        $username = $_SESSION['username'];
    }
    /* 
    1. 從 cookie 裡面讀取 PHPSESSID (token)
    2. 從檔案裏面讀取 session id 的內容
    3. 放到 $_SESSION
    */

    $result =$conn->query("select * from chengcheng_hw9_comments ORDER BY id DESC");
    if (!$result) {
        die('Error:' . $conn->error);
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Message room</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="warning">
        注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿請用任何真實的帳號密碼。
    </header>
    <div class="board">
        <div class="functionSection">
            <?php if(!$username) {?>
                <a class="functionSection__btn" href="./register.php">註冊</a>
                <a class="functionSection__btn" href="./login.php">登入</a>
            <?php } else { ?>
                <a class="functionSection__btn" href="./handle_logout.php">登出</a>
            <?php } ?>
        </div>             
        <div class="title">Comments</div>
        <p>有什麼想說的嗎？</p>
               
        <form class="form" method="POST" action="./handle_add.php">
            <?php if($username) { ?>
                <h3>你好！<?php echo htmlspecialchars($username);?></h3>
                <textarea class="form__textarea" type='text' name='content' rows="3" placeholder="請輸入你的留言" ></textarea>         
                    <input class="board__submit-btn" type="submit"></input>
            <?php } else { ?>
                <h3>請登入發布留言</h3>
            <?php } ?>
        </form>
        
        <?php 
            if(!empty($_GET['errCode'])) {
                $code =$_GET['errCode'];
                $msg ='Error';
                if ($code === '1') {
                    $msg = '資料不齊全';
                };
                echo '<h2 class="inputError">' . $msg .'</h2>';
            };
        ?>
        <div class="board__hr"></div>
        <section class="messageSection">

            <?php
                while($row =$result->fetch_assoc()) {
            ?>
            <div class="messageWindow">
                <div class="messageWindow__avatar"></div>
                <div class="messageWindow__information">
                    <div class="messageWindow__name">
                    <?php echo htmlspecialchars($row['nickname']);?>
                        <span class="messageWindow__time">
                            <?php echo $row['created_time'];?>
                        </sapn>
                    </div>
                    <div class="messageWindow__text"><?php echo htmlspecialchars($row['content']);?></div>
                </div>
            </div>
            <?php } ?>
        </section>
    </div>
</body>
</html>