<?php
$link= mysqli_connect("localhost","root","","eniGame");
if ($link== false) {
    echo "Connexion Error : " .  mysqli_connect_errno();
    die();
}