<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
if (isset($_POST["textToWrite"])) {
    $toWrite = $_POST["textToWrite"];
    echo ($toWrite);
    include("../include/connect.php");

    $file = "test.json";

    $addLevel = "INSERT INTO MAPS (ID, content, whoposted, finished) VALUES ('', '$toWrite', '" . $_SESSION['id'] . "', '1');"; 

    mysqli_query($link, $addLevel);
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
