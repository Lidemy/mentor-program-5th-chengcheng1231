<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    $session_username = NULL;
    if (!empty($_SESSION['username'])) {
        $session_username = $_SESSION['username'];
    };
    $sql = 
        "SELECT 
            C.id as id, C.article_title as title,
            C.article_category as category, C.created_time as created_time,
            U.about as about, U.username as username
        FROM chengcheng_blog_article as C
        LEFT JOIN chengcheng_blog_users as U on C.username = U.username
        WHERE C.is_deleted is NULL
        ORDER BY C.created_time DESC";
    $stmt = $conn->prepare($sql);
    $result = $stmt -> execute();
    $result = $stmt -> get_result();

    // In order to get who owns this blog before use loop to get articles
    $rowAll = [];
    while($row = $result->fetch_assoc()) {
        array_push($rowAll, $row);
    }
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title><?php echo escape($rowAll[0]['username']) . "'s blog"?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
  <script type="text/javascript" src="js/script.js"></script> <!-- in order to escape automatic CSS explode when open this web -->
</head>
<body>
    <nav class="navbar">
        <div class="wrapper navbar__wrapper">
            <div class="navbar__site-name">
                <a href='index.php'><?php echo escape($rowAll[0]['username']) . "'s blog"?></a> 
            </div>
            <ul class="navbar__list">
                <div>
                    <li><a href="index.php">Home Page</a></li>
                </div>
                <div>
                    <?php if (!$session_username) {?>
                    <li><a href="login.php">Sign in</a></li>
                    <?php }?>
                    <?php if ($session_username) {?>
                    <li><a href="write_article.php">Write</a></li>
                    <li><a href="handle_logout.php">Log out</a></li>
                    <?php }?>
                </div>
            </ul>
        </div>
    </nav>

    <div class="container-wrapper">
        <div class="layout">
            <div class="layout__space"></div>
            <div class="posts">
            <?php for($i=0; $i<count($rowAll); $i++) { ?>
                <article class="post">
                    <div class="post__header">
                    <a class="post__title" href="article.php?list=<?php echo escape($rowAll[$i]['id'])?>"><?php echo escape($rowAll[$i]['title'])?></a>             
                    </div>
                    <div class="post__info">
                        <div class="post__authorName">
                            <?php echo escape($rowAll[$i]['username'])?>
                        </div>
                        <div class="post__time">
                            <?php echo escape($rowAll[$i]['created_time'])?>
                        </div>
                        <div class="post__category">
                            <?php echo escape($rowAll[$i]['category'])?>
                        </div>
                        <?php if ($rowAll[$i]['username'] == $session_username) {?>
                        <div class="post__actions">
                            <a class="post__action-btn" href="edit_article.php?blog=<?php echo escape($rowAll[$i]['username'])?>&list=<?php echo escape($rowAll[$i]['id']) ?>">Edit</a>
                            <a class="post__action-btn" href="handle_delete_article.php?blog=<?php echo escape($rowAll[$i]['username'])?>&list=<?php echo escape($rowAll[$i]['id']) ?>">Delete</a>
                        </div>
                        <?php } ?>
                    </div>
                    <div class="category__hr"></div>
                </article>
            <?php }?>
            </div>
            <div class="layout__space"></div>
        </div>
    </div>
    <footer>Copyright © 2020 <?php echo escape($rowAll[0]['username']) . "'s"?> Blog All Rights Reserved.</footer>  <!--php-->
</body>
</html>