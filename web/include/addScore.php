<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
if (isset($_POST["toAdd"]) && isset($_SESSION["id"])) {
    $newScore = $_POST["toAdd"];
    include("connect.php");

    $scoreQuery = "INSERT INTO SCORES (who, score, date) VALUES ('" . $_SESSION["id"] . "', '5', '" . date("Y-m-d") . "');";

    $test = mysqli_query($link, $scoreQuery);
    if ($test) {
        echo ("Score successfully added!");
    } else {
        echo ("Query failed...");
    }
    mysqli_close($link);
} else {
    echo ("You aren't connected... Please connect to your account!");
}
