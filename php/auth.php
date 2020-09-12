<?php

    require "db.php";

    $id = htmlentities($_POST["id"]);
    $username = htmlentities($_POST["username"]);
    $displayName = htmlentities($_POST["displayname"]);
    $image = htmlentities($_POST["image"]);

    $userSelectQuery = "SELECT * FROM `twitch_users` WHERE `id` = " . $id;

    $userResult = mysqli_query($mysqli, $userSelectQuery);

    if($userResult)
    {
        if(mysqli_num_rows($userResult) > 0)
        {
            echo "OK";
        }
        else
        {

            $currDate =  date('Y-m-d');

            $addUserQuery = "INSERT INTO `twitch_users` (`id`, `username`, `displayname`, `image`, `license`) VALUES ($id, '$username', '$displayName', '$image', '$currDate');";

            $addResult = mysqli_query($mysqli, $addUserQuery);

            if($addResult)
            {
                for($i = 0; $i < 4; $i++)
                {
                    $addCharQuery = "INSERT INTO `twitch_data` (`userid`, `slot`) VALUES ($id, $i)";
                    mysqli_query($mysqli, $addCharQuery);
                }

                echo "OK";
            }
            else
            {
                echo dbError($mysqli, $userSelectQuery);
            }
        }
    }
    else
    {
        echo dbError($mysqli, $userSelectQuery);
    }
?>
