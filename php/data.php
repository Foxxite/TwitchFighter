<?php

    require "db.php";

    header('Content-Type: application/json');

    $response = [];
    $response["code"] = null;
    $response["message"] = null;
    $response["userInfo"] = null;
    $response["userData"] = null;

    $id = htmlentities($_GET["id"]);

    $userInfoQuery = "SELECT * FROM `twitch_users` WHERE `id` = " . $id;
    $userInfoResult = mysqli_query($mysqli, $userInfoQuery);

    if($userInfoResult)
    {
        $response["code"] = 200;
        $response["message"] = "OK";

        $response["userInfo"] = mysqli_fetch_assoc($userInfoResult);

        $userDataQuery = "SELECT * FROM `twitch_data` WHERE `userid` = " . $id . " ORDER BY `slot` ASC";
        $userDataResult = mysqli_query($mysqli, $userDataQuery);

        if($userDataResult)
        {
            while($row = mysqli_fetch_assoc($userDataResult)) {
                $response["userData"][] = $row;
            }
        }
        else
        {
            $response["code"] = 400;
            $response["message"] = dbError($mysqli, $userInfoQuery);
            $response["userInfo"] = null;
        }
    }
    else
    {
        $response["code"] = 400;
        $response["message"] = dbError($mysqli, $userInfoQuery);
    }

    echo json_encode($response);

?>