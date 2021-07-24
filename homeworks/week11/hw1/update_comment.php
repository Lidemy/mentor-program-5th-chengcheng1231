<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    if (empty($_GET['id'])) {
        header('Location:index.php');
    }
    $username = NULL; 
    $user = NULL;
    if (!empty($_SESSION['username'])) { // 利用有無 session 確認是否為登入狀態
        $username = $_SESSION['username'];
        $user = getUserFromUsername($username);
    }
    /* 
    1. 從 cookie 裡面讀取 PHPSESSID (token)
    2. 從檔案裏面讀取 session id 的內容
    3. 放到 $_SESSION
    */

    $stmt = $conn->prepare(
        'SELECT * FROM chengcheng_hw9_comments where id=?'
    );

    $stmt->bind_param('i', $_GET['id']);
    $result =$stmt->execute();
    if (!$result) {
        die('Error:' . $conn->error);
    }
    $result = $stmt->get_result();
    $row =$result->fetch_assoc();
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
                <a class="functionSection__btn" href="./index.php">Front</a>
        </div> 
        <div class="title">Update Comments</div>
        <form class="form" method="POST" action="./handle_update_comment.php">
            <?php if($username) { ?>
                <p>Hello！<?php echo htmlspecialchars($user['nickname']);?>，please update comment</p>
                <textarea class="form__textarea" type='text' name='content' rows="3" ><?php echo $row['content'];?></textarea>
                <input type="hidden" name="id" value="<?php echo $row['id']?>" /> <!--將 id 以某個隱藏形式帶到下個頁面-->
                <input type="hidden" name="username" value="<?php echo $row['username']?>" /> <!--將 username 以某個隱藏形式帶到下個頁面-->
                    <input class="board__submit-btn" type="submit" value="SUBMIT"></input>
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

    </div>
</body>
</html>