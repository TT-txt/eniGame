<?php
/*
nothing to explain here
*/
echo("You are being redirected...");
session_start();
session_destroy();
$connected = false;
header("location:home.php");
?>
