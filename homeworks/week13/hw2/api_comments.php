<?php
    require_once('conn.php');
    header('Content-type:application/json;charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    if (
        empty($_GET['site_key'])
    ) {
        $json = array(
            "ok" => false,
            "message" => "Please send site_key in url"
        );

        $response = json_encode($json);
        echo $response;
        die();
    }

    $site_key = $_GET['site_key'];
    $id = $_GET['id'];
    $limit_item = $_GET['limit_item'];
    $limit_item_add_one = $limit_item + 1; // 為了檢查 limit_item + 1 有無資料

    if ($_GET['id']==='start') {
        $sql = "select id, nickname, content, created_at from chengcheng_hw12_messageBoard where site_key=? order by id DESC limit ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('si',$site_key, $limit_item_add_one);
    } else {
        $sql = "select id, nickname, content, created_at from chengcheng_hw12_messageBoard where site_key=? and id < ? order by id DESC limit ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('sii',$site_key, $id, $limit_item_add_one);
    }
    $result = $stmt->execute();

    if (!$result) {
        $json = array(
            "ok" => false,
            "message" => $conn->error
        );

        $response = json_encode($json);
        echo $response;
        die();
    }
    $result = $stmt->get_result();

    $lastSelect = FALSE;
    $discussions = array();
    for ($i=0; $i< $limit_item_add_one ; $i++) {
        if (!($row = $result->fetch_assoc())) { // 檢查 limit_item + 1 筆資料有無結果
            $lastSelect = TRUE; // 如果沒結果代表已經 select 完資料，$lastSelect 變成 True
            break;
        }

        if ($i === $limit_item_add_one - 1) { // 如果是 limit_item + 1 筆資料的話跳出迴圈
            break;
        }

        array_push($discussions, array(
            "id" => $row["id"],
            "nickname" => $row["nickname"],
            "content" => $row["content"],
            "created_at" => $row["created_at"]
        ));
        
    };

    $json = array(
        "ok" => true,
        "discussions" => $discussions, //放入回傳資料
        "lastSelect" => $lastSelect //是否為最後的 select  
    );

    $response = json_encode($json);
    echo $response
?>