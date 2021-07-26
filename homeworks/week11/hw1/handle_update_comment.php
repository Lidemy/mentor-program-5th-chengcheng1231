<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    if(empty($_POST['content'])) {
        header('Location:update_comment.php?errCode=1&id='.$_POST['id']);
        die('請輸入留言');
    }

    $username =$_SESSION['username'];
    $user = getUserFromUsername($username); /* if you are administrator, update the $username*/
        if ($user['role']==1) {
            $username = $_POST['username'];
        }
    
    $id =$_POST['id'];
    $content =$_POST['content'];

    $sql = "update chengcheng_hw9_comments set content=? where id=? and username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sis', $content, $id, $username);
    $result = $stmt->execute();

    
    if(!$result) {
        die($conn->error);
    }

    header("Location:index.php")
?>      

