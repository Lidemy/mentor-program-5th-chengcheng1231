<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    $username = NULL; 
    $user = NULL;
    $role = NULL;
    if (!empty($_SESSION['username'])) { // 利用有無 session 確認是否為登入狀態
        $username = $_SESSION['username'];
        $user = getUserFromUsername($username);
        $role = $user['role'];
    }

    $page =1;
    if (!empty($_GET['page'])) {
        $page = intval($_GET['page']);
    }
    $items_per_page = 5 ;
    $offset = ($page -1) * $items_per_page ;

    $stmt = $conn->prepare(
        'SELECT 
            C.id as id, C.content as content, 
            C.created_time as created_time, 
            U.nickname as nickname, U.username as username
        FROM chengcheng_hw9_comments as C 
        LEFT JOIN chengcheng_hw9_users as U on C.username = U.username
        WHERE C.is_deleted is NULL
        ORDER BY C.id DESC
        LIMIT ? OFFSET ?'
    );
    $stmt -> bind_param('ii',$items_per_page, $offset);
    $result = $stmt -> execute();
    if (!$result) {
        die('Error:' . $conn->error);
    }
    $result = $stmt -> get_result();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Message room</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="warning">
        注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿請用任何真實的帳號密碼。
    </header>
    <div class="board">
        <!-- handle pages section-->
        <div class="functionSection">
            <?php if(!$username) {?>
                <a class="functionSection__btn" href="./register.php">Sign up</a>
                <a class="functionSection__btn" href="./login.php">Log in</a>
            <?php } if($username && $role!=1) { ?>
                <a class="functionSection__btn" href="./handle_logout.php">Log out</a>
            <?php } if($username && $role==1) { ?>
                <a class="functionSection__btn" href="./handle_logout.php">Log out</a>
                <a class="functionSection__btn" href="./manage_users.php">Manage</a>
            <?php } ?>
        </div>  
                    
        <div class="title">Comments Board</div>

        <!-- edit username section-->
        <?php if($username && $role!=3) { ?>
        <p class="updateNickname__btn">Edit nickname▼</p>
        <form class="form EditNickname hide" method="POST" action="./update_user.php">
            Please enter a new one：<input type="text" name="nickname"/>
            <input class="updateUser__btn" type="submit" value="UPDATE">
        </form>
        <?php } ?>
            
        <!-- leave comment section-->
        <form class="form" method="POST" action="./handle_add.php">
            <?php if ($username && $role!=3) { ?> <!-- common user -->
                <p>Hello！<?php echo htmlspecialchars($user['nickname']);?>，Any comment？</p>
                <textarea class="form__textarea" type='text' name='content' rows="3" ></textarea>         
                    <input class="board__submit-btn" type="submit" value="SUBMIT"></input>
            <?php } else if ($username && $role==3) { ?> <!-- user without comment access-->
                <h3>You are not allowed to comment</h3>
            <?php } else { ?> 
                <h3>Please log in and leave comment</h3>
            <?php } ?>
        </form>
        
        <?php 
            if(!empty($_GET['errCode'])) {
                $code =$_GET['errCode'];
                $msg ='Error';
                if ($code === '1') {
                    $msg = '資料不齊全';
                };
                echo '<h2 class="inputError">' . $msg .'</h2>';
            };
        ?>
        <div class="board__hr"></div>
        <section class="messageSection">

            <?php
                while($row =$result->fetch_assoc()) {
            ?>
            <div class="messageWindow">
                <div class="messageWindow__avatar"></div>
                <div class="messageWindow__information">
                    <div class="messageWindow__name">
                    <?php echo escape($row['nickname']);?>
                    (@<?php echo escape($row['username']);?>)
                        <span class="messageWindow__time">
                            <?php echo escape($row['created_time']);?>
                        </sapn>
                        <?php if ($username == $row['username'] || $role==1) {?>
                            <a href="update_comment.php?id=<?php echo escape($row['id']);?>">Edit</a>
                            <a href="handle_delete_comment.php?id=<?php echo escape($row['id']);?>">Delete</a>
                        <?php }?>                      
                    </div>
                    <div class="messageWindow__text"><?php echo escape($row['content']);?></div>
                </div>
            </div>
            <?php } ?>
        </section>
        <div class="board__hr"></div>

        <?php
            $stmt = $conn->prepare(
                'SELECT count(id) as count FROM chengcheng_hw9_comments WHERE is_deleted IS NULL'     
            );
            $result =$stmt->execute();
            $result =$stmt->get_result();
            $row =$result->fetch_assoc();
            $count = $row['count'];
            $total_page = ceil($count/$items_per_page);
        ?>
        <div class="pageInformation">
            <span>Total number of comments is <?php echo $count ?>，Page：</span>
            <span><?php echo $page?>/ <?php echo $total_page?></span>
        </div>
        <div class='paginator'>
            <?php if ($page != 1) {?>
                <a href="index.php?page=1">FIRST</a>
                <a href="index.php?page=<?php echo $page-1?>">◀ PREV</a>
            <?php }?>
            <?php if ($page != $total_page) {?>
                <a href="index.php?page=<?php echo $page+1?>">▶ NEXT</a>
                <a href="index.php?page=<?php echo $total_page?>">LAST</a>
            <?php }?>         
        </div>
    </div>

    <script>
		document.addEventListener('click', function(e) {				
				if (e.target.className === "updateNickname__btn") {
					const element = document.querySelector('.EditNickname')
					element.classList.toggle('hide')
				}				
			})
	</script>
</body>
</html>