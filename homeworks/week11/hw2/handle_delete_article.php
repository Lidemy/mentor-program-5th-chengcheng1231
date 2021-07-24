<?php
    session_start();
    require_once("conn.php");

    if(empty($_GET['list'])) {
        header('Location:index.php');
        die('請輸入留言');
    }

    if ($_SESSION['username'] == $_GET['blog']) {
        $session_username = $_SESSION['username'];
    } else {
        header("Location:index.php");
    }

    $id = $_GET['list'];
    
    $sql = "update chengcheng_blog_article set is_deleted=1 where id=? ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
    $result = $stmt->execute();

    if(!$result) {
        die($conn->error);
    }
    
    header("Location:category.php");
?>      