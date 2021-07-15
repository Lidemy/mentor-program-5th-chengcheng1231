<?php
    session_start(); // 使用 session 要做此宣告
    require_once("conn.php");
    require_once("utils.php");

    if(empty($_POST['username']) || empty($_POST['password'])) {
        header('Location:login.php?errCode=1');
        die('資料不齊全');
    }

    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = sprintf("select * from chengcheng_hw9_users where username='%s' and password='%s'" ,
        $username,
        $password
    );

    $result =$conn ->query($sql);
    if(!$result) {
        die($conn->error);
    }

    if ($result->num_rows) { //登入成功 //num_rows 回傳影響幾筆資料
        $_SESSION['username'] = $username; 
        /* 
        1.產生 session id (token) 
        2. 把 username 寫入檔案 
        3. set-cookie: session-id 
        */
        header("Location:index.php");
    } else {
        header("Location:login.php?errCode=3");
    }
?>      

