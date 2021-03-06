<?php
    require_once('conn.php');
    require_once('utils.php');
    session_start();

    $session_username = NULL;
    if (!empty($_SESSION['username']) && $_SESSION['username'] == $_GET['blog'] ) {
        $session_username = $_SESSION['username'];
    } else {
        header("Location:index.php");
    }
    $array = getCategory(); //拿取文章分類
    $id = $_GET['list'];

    $sql = 
        "SELECT 
            C.id as id, C.article_content as content, C.article_category as category,
            C.article_title as title,
            U.username as username 
        FROM chengcheng_blog_article as C
        LEFT JOIN chengcheng_blog_users as U on C.username = U.username 
        WHERE C.id = ?";
        
    $stmt = $conn -> prepare($sql);
    $stmt -> bind_param('i', $id);
    $result = $stmt -> execute();
    $result = $stmt -> get_result();
    
    $article_category = [];
    $username = NULL;
    $row = $result->fetch_assoc();

?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title><?php echo escape($row['username']) ?>'s Blog</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css"/>
  <link rel="stylesheet" href="style.css"/>
</head>

<body>
    <nav class="navbar">
        <div class="wrapper navbar__wrapper">
            <div class="navbar__site-name">
                <a href='./index.php'><?php echo escape($row['username']) ?>'s Blog</a>
            </div>
            <ul class="navbar__list">
                <div>
                    <li><a href="./index.php">Article list</a></li>
                    <li><a href="./category.php">Article category</a></li>
                </div>
                <div>
                    <li><a href="./logout.php">Log out</a></li>
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
                        <div class="post__title">Edit the story</div>
                    </div>
                    <div class="post__info">
                        <div class="post__authorAvatar">
                            <img src="trump.jpg"/>
                        </div>
                        <div class="post__authorName">
                            <?php echo escape($row['username'])?>
                        </div>
                    </div>
                    <form class="form" method="POST" action="./handle_edit_article.php">
                        <input class="form__title" type="text" name="form__title" value="<?php echo escape($row['title']) ?>"/><br>
                        <select class="form__category" name="form__category">
                            <option value="<?php echo escape($row['category']) ?>" selected hidden>
                                <?php echo escape($row['category']) ?>
                            </option>
                            <?php for($i=0; $i<count($array); $i++) { ?>
                            <option value="<?php echo $array[$i] ?>"><?php echo $array[$i]; ?></option>
                            <?php }?>
                        </select><br>
                        <br>
                        <textarea class="form__textarea" type='text' name='content' rows="10"><?php echo escape($row['content']) ?></textarea><br>
                        <input type="hidden" name="id" value="<?php echo escape($row['id'])?>"/>
                        <input class="form__submit-btn" type="submit" value="Update"/>
                    </form>
                    <?php
                        if(!empty($_GET['errCode'])) {
                            $code =$_GET['errCode'];
                            $msg ='Error';
                            if ($code === '1') {
                                $msg = '資料不齊全';
                            };
                            echo '<div class="inputError">' . $msg .'</div>';
                        };
                    ?>
                    <div class="post__hr"></div>
                </article>
            </div>
            <div class="layout__space"></div>
        </div>
    </div>
    <footer>Copyright © 2020 <?php echo escape($row['username']) ?>'s Blog All Rights Reserved.</footer>
    <script>
    </script>
</body>
</html>