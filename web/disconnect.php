<?php
/*
Disconnect the user then redirect to home.php
*/
echo("You are being redirected...");
session_start();
session_destroy();
$connected = false;
header("location:home.php");
?>
