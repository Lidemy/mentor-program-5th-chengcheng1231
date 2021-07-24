<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    if(empty($_GET['id'])) {
        header('Location:index.php?errCode=1');
        die('請輸入留言');
    }

    $id =$_GET['id'];
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username); /* if you are administrator, update the $username*/
        if ($user['role']==1) {
            $username = getUsernameFromCommentId($id);
        }
    

    $sql = "update chengcheng_hw9_comments set is_deleted=1 where id=? and username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $id, $username);
    $result = $stmt->execute();

    
    if(!$result) {
        die($conn->error);
    }

    header("Location:index.php")
    
?>      

