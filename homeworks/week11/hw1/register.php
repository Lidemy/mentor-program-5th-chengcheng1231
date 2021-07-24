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
            <a class="functionSection__btn" href="./index.php">Front</a>
            <a class="functionSection__btn" href="./login.php">Sign in</a>
        </div>
        <div class="title">Sign up</div>
        <p>Please enter data</p>
        <form class="form" method="POST" action="./handle_register.php">
            Please enter nickname：<input type="text" name='nickname'></input><br>
            Please enter username：<input type="text" name='username'></input><br>
            Please enter password：<input type="password" name='password'></input><br>
            <input class="board__submit-btn" type="submit" value="Submit"></input>
        </form>
        <?php 
            if(!empty($_GET['errCode'])) {
                $code =$_GET['errCode'];
                $msg ='※資料不齊全';
                if ($code === '1062') {
                    $msg = '※帳號已被註冊';
                };
                echo '<h2 class="inputError">' . $msg .'</h2>';
            };
        ?>
    </div>
</body>
</html>