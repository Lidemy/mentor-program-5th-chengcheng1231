<?php
    require_once('conn.php');
    header('Content-type:application/json;charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    if (
        empty($_POST['content']) ||
        empty($_POST['nickname']) ||
        empty($_POST['site_key'])
    ) {
        $json = array(
            "ok" => false,
            "message" => "請輸入暱稱和留言"
        );

        $response = json_encode($json);
        echo $response;
        die();
    }

    $nickname = $_POST['nickname'];
    $site_key = $_POST['site_key'];
    $content = $_POST['content'];

    $sql = "insert into chengcheng_hw12_messageBoard(site_key, nickname, content) value (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss',$site_key, $nickname, $content);
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

    $json = array(
        "ok" => true,
        "message" => "success"
    );

    $response = json_encode($json);
    echo $response
?>
