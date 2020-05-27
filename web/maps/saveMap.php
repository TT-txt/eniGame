<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
if (isset($_POST["textToWrite"])) {
    $toWrite = $_POST["textToWrite"];
    echo ($toWrite);
    include("../include/connect.php");


    $addLevel = "INSERT INTO MAPS (content, whoposted, finished) VALUES ('$toWrite', '" . $_SESSION['id'] . "', '1');";

    mysqli_query($link, $addLevel);

    $getMapId = "SELECT ID FROM MAPS WHERE whoposted='" . $_SESSION['id'] . "' ORDER BY ID LIMIT 0,1;";
    $result = mysqli_query($link, $getMapId);

    $array = mysqli_fetch_assoc($result);

    $file = $array["ID"].".json";

    mysqli_close($link);

    // str is the content that is going to be written into the file
    if (file_put_contents($file, $toWrite)) {
        echo ("Map successfully created!");
    } else {
        echo ("Map creation failed ...");
    }
} else {
    echo ("You are not allowed to access this webpage...");
}
