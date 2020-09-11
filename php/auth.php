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
            $addUserQuery = "INSERT INTO `twitch_users` (`id`, `username`, `displayname`, `image`) VALUES ($id, '$username', '$displayName', '$image');";

            $addResult = mysqli_query($mysqli, $addUserQuery);

            if($addResult)
            {
                echo "OK";
            }
            else
            {
                dbError($mysqli, $userSelectQuery);
            }
        }
    }
    else
    {
        dbError($mysqli, $userSelectQuery);
    }
?>


CREATE TABLE `twitch_users` (
	`id` BIGINT(20) NOT NULL DEFAULT '0',
	`username` VARCHAR(30) NOT NULL DEFAULT '',
	`displayname` VARCHAR(30) NOT NULL DEFAULT '',
	`image` VARCHAR(255) NOT NULL DEFAULT '',
	PRIMARY KEY (`id`)
)
COLLATE='latin1_swedish_ci'
ENGINE=MyISAM
;



CREATE TABLE `twitch_data` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`userId` BIGINT(20) NULL DEFAULT '0',
	`slot` ENUM('0','1','2','3') NOT NULL DEFAULT '0',
	`name` VARCHAR(30) NOT NULL DEFAULT '0',
	`image` VARCHAR(255) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
)
COLLATE='latin1_swedish_ci'
ENGINE=MyISAM
;
