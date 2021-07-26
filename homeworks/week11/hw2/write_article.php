<?php
    require_once('conn.php');
    require_once('utils.php');
    session_start();

    $session_username = NULL;
    if (!empty($_SESSION['username'])) {
        $session_username = $_SESSION['username'];
    } else {
        header("Location:index.php");
    }
    $array = getCategory(); //拿取文章有哪些分類
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title><?php echo $session_username?>'s Blog</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
    <nav class="navbar">
        <div class="wrapper navbar__wrapper">
            <div class="navbar__site-name">
                <a href='index.php'><?php echo $session_username?>'s Blog</a>
            </div>
            <ul class="navbar__list">
                <div>
                    <li><a href="category.php">Article category</a></li>
                </div>
                <div>
                    <li><a href="handle_logout.php">Log out</a></li>
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
                        <div class="post__title">Write a story</div>
                    </div>
                    <div class="post__info">
                        <div class="post__authorAvatar">
                            <img src="trump.jpg"/>
                        </div>
                        <div class="post__authorName">
                            <?php echo $session_username?>
                        </div>
                    </div>
                   
                    <form class="form" method="POST" action="./handle_add_article.php">
                        <input class="form__title" type="text" name="form__title" placeholder="Title"/><br>
                        <select class="form__category" name="form__category">
                            <option value="none" selected disabled hidden>
                            --Select categry--
                            </option>
                            <?php for($i=0; $i<count($array); $i++) { ?>
                            <option value="<?php echo $array[$i]; ?>"><?php echo $array[$i]; ?></option>
                            <?php }?>
                        </select><br>
                        <br>
                        <textarea class="form__textarea" type='text' name='content' rows="10" placeholder="Tell your story..." ></textarea><br>
                        <input class="form__submit-btn" type="submit" value="Publish"/>
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
    <footer>Copyright © 2020 <?php echo $session_username?>'s Blog All Rights Reserved.</footer>
    <script></script>
</body>
</html>