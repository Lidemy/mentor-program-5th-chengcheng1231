<?php
    require_once('conn.php');
    function getCategory() { //拿取文章有哪些分類
        global $conn;
        $sql = 
            "SELECT 
                C.article_content as content, C.article_category as category,
                C.article_title as title,
                U.username as username 
            FROM chengcheng_blog_article as C
            LEFT JOIN chengcheng_blog_users as U on C.username = U.username ";
            
        $stmt = $conn -> prepare($sql);
        $result = $stmt -> execute();
        $result = $stmt -> get_result();
        
        $article_category = [];
        $username = NULL;
        while($row = $result->fetch_assoc()) {
            array_push($article_category, $row['category']);
        }
        $array = array_values(array_unique($article_category));
        return $array;
    }

    function escape($str) { 
        return htmlspecialchars($str, ENT_QUOTES);
    }

    function StubUTF8String($str, $length=40){ // 在擷取中文字呈現內容時，視中文以一個為單位，而非三個位元
        $str = stripslashes( $str );
        $str = strip_tags( $str);    //拿掉HTML的Tag
        $str = preg_replace('/[\n\r\t]/', ' ', $str);
        $str = preg_replace('/\s(?=\s)/', '', $str);
        $str = mb_substr( $str, 0, $length+1, "UTF-8");
        $str = preg_replace('/[a-zA-Z]+$/', '', $str);
        $str = trim($str);
        if(mb_strlen($str)>$length)$str= mb_substr( $str, 0, -1, "UTF-8");
        return $str;
      }
?>