<?php
$link= mysqli_connect("localhost","root","","TP5");
if ($link== false) {
    echo "Connexion Error : " .  mysqli_connect_errno();
    die();
}