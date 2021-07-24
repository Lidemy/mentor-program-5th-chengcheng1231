<?php
    session_start();
    require_once("conn.php");

    if(empty($_POST['form__title']) || empty($_POST['form__category']) || empty($_POST['content'])) {
        header('Location:write_article.php?errCode=1');
        die('請輸入留言');
    }

    echo "sucess"; 
    
    $username = "Trump"; /*session*/
    $article_title = $_POST['form__title'];
    $article_content = $_POST['content'];
    $article_category = $_POST['form__category'];
    echo $article_categry ;

    $sql = "insert into chengcheng_blog_article(username, article_title, article_content, article_category) values(?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssss', $username, $article_title, $article_content, $article_category);
    $result = $stmt->execute();

    
    if(!$result) {
        die($conn->error);
    }

    header("Location:index.php")
    
?>      