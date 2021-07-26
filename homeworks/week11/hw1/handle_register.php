<?php
    require_once("conn.php");

    if(empty($_POST['nickname']) || empty($_POST['username']) || empty($_POST['password'])) {
        header('Location:register.php?errCode=1');
        die('資料不齊全');
    }

    $nickname = $_POST['nickname'];
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $role = 2; /*2 代表預設註冊的權限為一般使用者（可以新增留言，且編輯與刪除自己的留言）*/

    $sql ="insert into chengcheng_hw9_users(nickname, username, password, role) values(?,?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sssi', $nickname, $username, $password, $role);
    $result = $stmt->execute();

    
    if(!$result) {
        $code = $conn->errno;
        if ($code === 1062) {
            header("Location:register.php?errCode=1062");
        }
        die($conn->error);
    }
    header("Location:login.php");      
?>

