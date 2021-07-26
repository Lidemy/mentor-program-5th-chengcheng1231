<?php
    session_start();
    require_once("conn.php");

    if(empty($_POST['id']) || empty($_POST['form__title']) || empty($_POST['form__category']) || empty($_POST['content'])) {
        header('Location:edit_article.php?errCode=1&list=' . $_POST['id']);
        die('請輸入留言');
    }

    if (!empty($_SESSION['username']) || $_SESSION['username'] == $_GET['blog']) {
        $session_username = $_SESSION['username'];
    } else {
        header("Location:index.php");
    }

    $id = $_POST['id'];
    $article_title = $_POST['form__title'];
    $article_content = $_POST['content'];
    $article_category = $_POST['form__category'];

    $sql = "update chengcheng_blog_article set username =? , article_title =? , article_content=? , article_category=? where id=? ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssssi', $session_username, $article_title, $article_content, $article_category, $id);
    $result = $stmt->execute();

    if(!$result) {
        die($conn->error);
    }

    header("Location:article.php?list=" . $id);
?>      