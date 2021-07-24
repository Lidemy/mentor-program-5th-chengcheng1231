<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    $username = NULL; 
    $user = NULL;
    if (!empty($_SESSION['username'])) { // 利用有無 session 確認是否為登入狀態
        $username = $_SESSION['username'];
        $user = getUserFromUsername($username);
        if ($user['role']!=1) {
            header('Location:index.php');
        }
    } else {
        header('Location:index.php');
    }
    /* 
    1. 從 cookie 裡面讀取 PHPSESSID (token)
    2. 從檔案裏面讀取 session id 的內容
    3. 放到 $_SESSION
    */

    $stmt = $conn->prepare(
        'SELECT  
            U.id as id, U.nickname as nickname,
            U.username as username,
            U.role as role, U.created_time as created_time
        FROM chengcheng_hw9_users as U
        ORDER BY U.id DESC'
    );
    $result =$stmt->execute();
    if (!$result) {
        die('Error:' . $conn->error);
    }
    $result = $stmt->get_result();
    
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
        <div class="functionSection">
            <?php  if($username && $user['role']==1) { ?>
                <a class="functionSection__btn" href="./handle_logout.php">Log out</a>
                <a class="functionSection__btn" href="./index.php">Front</a>
            <?php } ?>
        </div>  
                    
        <div class="title">Manage Users</div>
        
        <table class='users'> 
            <tr class='users__header'> 
                <th>Id</th> 
                <th>Nickname</th>
                <th>Username</th>
                <th class='users__headerRole'>Role</th>
                <th>Register time</th>
            </tr> 
            <?php
                while($row =$result->fetch_assoc()) {
            ?>
            <tr> 
                <td><?php echo escape($row['id']); ?></td> 
                <td><?php echo escape($row['nickname']); ?></td>
                <td><?php echo escape($row['username']); ?></td>
                <td>
                    <div class="UserStatus">
                        <?php 
                            switch ($row['role']):
                                case 1:
                                    echo "Admin";
                                    break;
                                case 2:
                                    echo "Common";
                                    break;
                                case 3:
                                    echo "Mute";
                                    break;
                            endswitch;
                        ?>
                        <?php if ($username != $row['username']) {?>
                        <div class="UserStatus__btn">
                            <img src='edit.png'>
                        </div>
                        <?php } else {?>
                            (You)
                        <?php }?>
                    </div>
                    <form class='edit__userStatus hide' action="edit__userStatus.php?id=<?php echo escape($row['id']); ?>" method="post">
                        <select name="identity">
                            <option value="none" selected disabled hidden>
                            --Select--
                            </option>
                            <option value="administrator">Admin</option>
                            <option value="commonUsers">Common</option>
                            <option value="muteUsers">Mute</option>
                        </select>                      
                        <input class='edit__users-btn' type="submit"  value="Update" />                  
                    </form>
                </td>
                <td><?php echo $row['created_time']; ?></td>
            </tr>
            <?php }?>
        </table>


    </div>

    <script>
		document.addEventListener('click', function(e) {
				if (e.target.parentNode.className === "UserStatus__btn") {
					const element = e.target.parentNode.parentNode.parentNode.querySelector('.edit__userStatus')
					element.classList.toggle('hide')
				}				
			})
	</script>

 
</body>
</html>