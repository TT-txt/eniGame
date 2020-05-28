<?php
/*
Disconnect the user then redirect to home.php
*/
if (!session_id()) {
    session_start();
    session_destroy();
    $connected = false;
    header("location:home.php");
    echo("You are being redirected...");
}
?>
