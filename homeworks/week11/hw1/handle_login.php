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

    $sql = "select * from chengcheng_hw9_users where username=?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute(); 

    if(!$result) {
        die($conn->error);
    }

    $result = $stmt->get_result(); //把結果拿回來

    if ($result->num_rows === 0) { //查無使用者
        header("Location:login.php?errCode=3");
        exit();
    }

    $row = $result->fetch_assoc();


    if (password_verify($password, $row['password'])) { //登入成功 
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

