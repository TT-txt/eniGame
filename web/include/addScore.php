<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
if (isset($_POST["toAdd"]) && isset($_SESSION["id"])) {
    $newScore = $_POST["toAdd"];
    include("connect.php");

    $scoreQuery = "INSERT INTO SCORES (who, score, date) VALUES ('" . $_SESSION["id"] . "', '$newScore', '" . date("Y-m-d") . "');";

    $test = mysqli_query($link, $scoreQuery);
    if ($test) {
        echo ("+5 style points added!");
    } else {
        echo ("The query failed... You may have been cursed...");
    }

    mysqli_close($link);
} else {
    echo ("You aren't connected... Please connect to your account to earn points!");
}
