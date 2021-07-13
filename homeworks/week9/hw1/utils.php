<?php
    //將可以共用的 function 獨立出來
    require_once("conn.php");
    function getUserFromUsername($username) {
        global $conn;
        $sql = sprintf("SELECT * FROM chengcheng_hw9_users WHERE username='%s'", 
        $username
        );

        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        return $row;
    }  
?>