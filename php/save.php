<?php

    require "db.php";

    $id = htmlentities($_POST["user_id"]);

    $chars = [];

    $chars[0]["name"] = htmlentities($_POST["char1_name"]);
    $chars[0]["image"] = htmlentities($_POST["char1_img"]);

    $chars[1]["name"] = htmlentities($_POST["char2_name"]);
    $chars[1]["image"] = htmlentities($_POST["char2_img"]);

    $chars[2]["name"] = htmlentities($_POST["char3_name"]);
    $chars[2]["image"] = htmlentities($_POST["char3_img"]);

    $chars[3]["name"] = htmlentities($_POST["char4_name"]);
    $chars[3]["image"] = htmlentities($_POST["char4_img"]);


    $volume = htmlentities($_POST["volume"]);


    $colors = [];
    $colors[0] = htmlentities($_POST["p_slot1_color"]);
    $colors[1] = htmlentities($_POST["p_slot2_color"]);
    $colors[2] = htmlentities($_POST["p_slot3_color"]);
    $colors[3] = htmlentities($_POST["p_slot4_color"]);

    $lang = [];
    $lang["title"] = htmlentities($_POST["p_title"]);
    $lang["subtitle"] = htmlentities($_POST["p_subtitle"]);
    $lang["choice"] = htmlentities($_POST["p_choice"]);
    $lang["instruction"] = htmlentities($_POST["p_instruction"]);
    $lang["winner"] = htmlentities($_POST["p_winner"]);


    $updateVolumeQuery = "UPDATE `twitch_users` SET `volume`=$volume, `colors` = '".json_encode($colors)."', `lang` = '".json_encode($lang)."' WHERE `id` = $id";
    mysqli_query($mysqli, $updateVolumeQuery);


    for($i = 0; $i < 4; $i++)
    {
        $updateCharQuery = "UPDATE `twitch_data` SET `name`='".$chars[$i]["name"]."', `image`='".$chars[$i]["image"]."' WHERE `slot`=$i AND `userid` = $id";

        mysqli_query($mysqli, $updateCharQuery);
    }

    header("Location: ../settings?id=" .$id );


?>