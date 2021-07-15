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
            <a class="functionSection__btn" href="./index.php">回留言板</a>
            <a class="functionSection__btn" href="./register.php">註冊</a>
        </div>
        <div class="title">登入</div>
        <p>請填寫帳號密碼</p>
        <form class="form" method="POST" action="./handle_login.php">

            帳號：<input type="text" name='username'></input><br>
            密碼：<input type="password" name='password'></input><br>
            <input class="board__submit-btn" type="submit"></input>
        </form>
        <?php 
            if(!empty($_GET['errCode'])) {
                $code =$_GET['errCode'];
                $msg ='※資料不齊全';
                if ($code === '3') {
                    $msg = '※帳號或密碼輸入錯誤';
                };
                echo '<h2 class="inputError">' . $msg .'</h2>';
            };
        ?>
    </div>
</body>
</html>