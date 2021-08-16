<?php
    //將可以共用的 function 獨立出來
    require_once("conn.php");
    function getUserFromUsername($username) {
        global $conn;
        $sql = "SELECT * FROM chengcheng_hw9_users WHERE username=?";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $username);
        $result = $stmt->execute();
        $result = $stmt -> get_result();
        $row = $result->fetch_assoc();
        return $row;
    } 

    function escape($str) {
        return htmlspecialchars($str, ENT_QUOTES);
    }

    function getUsernameFromCommentId($id) {
        global $conn;
        $sql = sprintf("SELECT * FROM chengcheng_hw9_comments WHERE id='%s'", 
        $id
        );
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        return $row['username'];
    } 
?>