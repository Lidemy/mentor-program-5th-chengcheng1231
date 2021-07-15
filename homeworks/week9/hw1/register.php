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
            <a class="functionSection__btn" href="./login.php">登入</a>
        </div>
        <div class="title">註冊</div>
        <p>請填寫資料</p>
        <form class="form" method="POST" action="./handle_register.php">
            請輸入暱稱：<input type="text" name='nickname'></input><br>
            請輸入帳號：<input type="text" name='username'></input><br>
            請輸入密碼：<input type="password" name='password'></input><br>
            <input class="board__submit-btn" type="submit"></input>
        </form>
        <?php 
            if(!empty($_GET['errCode'])) {
                $code =$_GET['errCode'];
                $msg ='資料不齊全';
                if ($code === '1062') {
                    $msg = '※帳號已被註冊';
                };
                echo '<h2 class="inputError">' . $msg .'</h2>';
            };
        ?>
    </div>
</body>
</html>