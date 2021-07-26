<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    $session_username = NULL;
    if (!empty($_SESSION['username'])) {
        $session_username = $_SESSION['username'];
    };

    $page = 1;
    if (!empty($_GET['page'])) {
        $page = intval($_GET['page']);
    };
    $items_per_page = 5;
    $offset = ($page -1) * $items_per_page;
    $sql =
        "SELECT
            C.id as id, C.article_content as content,
            C.article_title as title, C.created_time as created_time,
            U.about as about, U.username as username
        FROM chengcheng_blog_article as C
        LEFT JOIN chengcheng_blog_users as U on C.username = U.username
        WHERE C.is_deleted is NULL
        ORDER BY C.created_time DESC
        LIMIT ? OFFSET ?";
    $stmt = $conn -> prepare($sql);
    $stmt -> bind_param('ii',$items_per_page, $offset);
    $result = $stmt -> execute();
    $result = $stmt -> get_result();

    // In order to get who owns this blog before use loop to get articles
    $rowAll = [];
    while($row = $result->fetch_assoc()) {
        array_push($rowAll, $row);
    };
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title><?php echo escape($rowAll[0]['username']) . "'s blog"?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css"/>
  <link rel="stylesheet" href="style.css"/>
</head>
<body>
    <nav class="navbar">
        <div class="wrapper navbar__wrapper">
            <div class="navbar__site-name">
                <a href='index.php'><?php echo escape($rowAll[0]['username']) . "'s blog"?></a>
            </div>
            <ul class="navbar__list">
                <div>
                    <li><a href="category.php">Article category</a></li>
                </div>
                <div>
                    <?php if (!$session_username) {?>
                    <li><a href="login.php">Sign in</a></li>
                    <?php }?>
                    <?php if ($session_username) {?>
                    <li><a href="write_article.php">Write</a></li>
                    <li><a href="handle_logout.php">Log out</a></li>
                    <?php }?>
                    <div class="navbar__avatar">
                        <img src="trump.jpg"/>
                    </div>
                </div>
            </ul>
        </div>
    </nav>

    <div class="container-wrapper">
        <div class="layout">
            <div class="author">
                <div class="author__avatar">
                    <img src="trump.jpg"/>
                </div>
                <div class="author__name"><?php echo escape($rowAll[0]['username'])?></div>
                <div class="author__about"><?php echo escape($rowAll[0]['about'])?></div>
                <div class="author__hr"></div>
            </div>
            <div class="posts">
            <?php for($i=0; $i<count($rowAll); $i++){ ?>
                <article class="post">
                    <div class="post__time">
                        <?php echo $rowAll[$i]['created_time']?>
                    </div>
                    <div class="post__header">
                        <a class="post__title" href="article.php?list=<?php echo escape($rowAll[$i]['id'])?>"><?php echo $rowAll[$i]['title']?></a>
                    </div>
                    <div class="post__content"> <?php echo StubUTF8String(escape($rowAll[$i]['content']), 150) . '...';?>
                    </div>
                    <a class="btn-read-more" href="article.php?list=<?php echo escape($rowAll[$i]['id'])?>">Read More...</a>
                    <div class="post__hr"></div>
                </article>
            <?php }?>
            <?php
                $stmt = $conn->prepare(
                    'SELECT count(id) as count FROM chengcheng_blog_article WHERE is_deleted IS NULL'     
                );
                $result = $stmt->execute();
                $result = $stmt->get_result();
                $row =$result->fetch_assoc();
                $count = $row['count'];
                $total_page = ceil($count/$items_per_page);
            ?>
            <div class="pageInformation">
                <span>Total number of articles is <?php echo $count ?>，Page：</span>
                <span><?php echo $page?>/ <?php echo $total_page?></span>
            </div>
            <div class='paginator'>
                <?php if ($page != 1) {?>
                    <a href="index.php?page=1">FIRST</a>
                    <a href="index.php?page=<?php echo $page-1?>">◀ PREV</a>
                <?php }?>
                <?php if ($page != $total_page) {?>
                    <a href="index.php?page=<?php echo $page+1?>">NEXT ▶</a>
                    <a href="index.php?page=<?php echo $total_page?>">LAST</a>
                <?php }?> 
            </div>
            </div>
            <div class="layout__space"></div>
        </div>
    </div>
    <footer>Copyright © 2020 <?php echo escape($rowAll[0]['username']) ."'s"?> Blog All Rights Reserved.</footer>
</body>
</html>