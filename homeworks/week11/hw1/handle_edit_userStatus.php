<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    if(empty($_GET['id']) || empty($_POST['identity'])) {
        header('Location:manage_users.php');
        die('請輸入留言');
    }

    $selected_identity = $_POST['identity'];
    $id =$_GET['id'];

    switch ($selected_identity):
        case "administrator":
            $role = 1;
            break;
        case "commonUsers":
            $role = 2;
            break;
        case "muteUsers":
            $role = 3;
            break;
    endswitch;
    
    $sql = "update chengcheng_hw9_users set role=? where id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $role, $id);
    $result = $stmt->execute();

    
    if(!$result) {
        header("Location:manage_users.php?errCode=1");
        die($conn->error);
    }

    header("Location:manage_users.php");
    
?>      

