<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    if (empty($_GET['list'])) {
        header('Location:index.php');
    }
    $id = $_GET['list'];

    $session_username = NULL;
    if (!empty($_SESSION['username'])) {
        $session_username = $_SESSION['username'];
    };

    $sql = 
        "SELECT 
            C.article_content as content, C.article_category as category,
            C.article_title as title, C.created_time as created_time, 
            C.username as username
        FROM chengcheng_blog_article as C
        WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt ->bind_param('i', $id);
    $result = $stmt -> execute();
    $result = $stmt -> get_result();
    $row = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title><?php echo escape($row['username']) . "'s blog"?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
  <script type="text/javascript" src="js/script.js"></script>
</head>

<body>
    <nav class="navbar">
        <div class="wrapper navbar__wrapper">
            <div class="navbar__site-name">
                <a href='./index.php'><?php echo escape($row['username']) . "'s blog"?></a>
            </div>
            <ul class="navbar__list">
                <div>
                    <li><a href="./category.php">Article a category</a></li>
                </div>
                <div>                
                    <?php if (!$session_username) {?>
                    <li><a href="./login.php">Sign in</a></li>
                    <?php }?>
                    <?php if ($session_username) {?>
                    <li><a href="./write_article.php">Write</a></li>
                    <li><a href="./handle_logout.php">Log out</a></li>
                    <?php }?>
                </div>
            </ul>
        </div>
    </nav>

    <div class="container-wrapper">
        <div class="layout">
            <div class="layout__space"></div>
            <div class="posts">
                <article class="post">
                    <div class="post__header">
                        <div class="post__title"><?php echo escape($row['title']) ?></div>
                    </div>
                    <div class="post__info">
                        <div class="post__authorAvatar">
                            <img src="trump.jpg"/>
                        </div>
                        <div class="post__authorName">
                            <?php echo escape($row['username']) ?>
                        </div>
                        <div class="post__category">
                            <?php echo escape($row['category'])?>
                        </div>
                        <div class="post__time">
                            <?php echo escape($row['created_time']) ?>
                        </div>
                    </div>
                    <?php if ($row['username'] == $session_username) {?>
                    <div class="post__actions">
                        <a class="post__action-btn" href="edit_article.php?blog=<?php echo escape($row['username']) ?>&list=<?php echo $id ?>">Edit</a>
                        <a class="post__action-btn" href="handle_delete_article.php?blog=<?php echo escape($row['username'])?>&list=<?php echo $id ?>">Delete</a>
                    </div>
                    <?php }?>
                    <div class="post__allContent"><?php echo escape($row['content'])?>
                    </div>
                </article>
            </div>
            <div class="layout__space"></div>
        </div>
    </div>
    <footer>Copyright © 2020 <?php echo escape($row['username']) . "'s"?> Blog All Rights Reserved.</footer>
</body>
</html>
