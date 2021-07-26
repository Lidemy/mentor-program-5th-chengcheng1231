<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Blog</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
  <script type="text/javascript" src="js/script.js"></script>
</head>

<body>
    <div class="singInBoard">
        <div class="singInBoard__navbar">
            <h1 class="singInBoard__title">Sign in</h1>
            <div class="functionSection">
                <a class="functionSection__btn" href="index.php">Home Page</a>
            </div>
        </div>
        <form class="singInBoard__form" method="POST" action="handle_login.php">
            USERNAME：<br>
            <input type="text" name='username'></input>
            <br>
            <br>
            PASSWORD：<br>
            <input type="password" name='password'></input>
            <br>
            <br>
            <input class="singInBoard__submit-btn" type="submit" value="Submit"></input>
        </form>
        <?php 
            if(!empty($_GET['errCode'])) {
                $code = $_GET['errCode'];
                $msg ='※資料不齊全';
                if ($code === '3') {
                    $msg = '※帳號或密碼輸入錯誤';
                };
                echo '<h2 class="inputError">' . $msg . '</h2>';
            };
        ?>
    </div>
</body>
</html>