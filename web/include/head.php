<?php session_start();
//To use when checking a password
function verificationPassword($s)
{
	$nbnb = 0;
	$nbmaj = 0;
	$nbmin = 0;
	if (strlen($s) >= 8) {
		for ($i = 0; $i < strlen($s); $i++) {
			if (is_numeric($s[$i])) $nbnb++;
			elseif (ctype_lower($s[$i])) $nbmin++;
			elseif (ctype_upper($s[$i])) $nbmaj++;
		}
		if ($nbnb > 0 && $nbmaj > 0 && $nbmin > 0 && test_input($s) == $s) return true;
	}
	return false;
}

function test_input($data)
{
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!--link rel="icon" href="img/icon.ico" /-->
	<!-- Favicon -->
	<link rel="apple-touch-icon" sizes="180x180" href="img/favicon/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="img/favicon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="img/favicon/favicon-16x16.png">
	<link rel="manifest" href="img/favicon//site.webmanifest">
	<link rel="mask-icon" href="img/favicon/safari-pinned-tab.svg" color="#5bbad5">
	<meta name="msapplication-TileColor" content="#da532c">
	<meta name="theme-color" content="#ffffff">

	<!-- css -->
	<link rel="stylesheet" href="include/bootstrap/css/bootstrap.min.css" />
	<link href="include/fontawesome/css/all.css" rel="stylesheet" />
	<style>
		main {
			height: 900px;
		}
	</style>
	<!-- Bootstrap Js -->
	<script src="include/bootstrap/required/jquery-3.4.1.slim.min.js"></script>
	<script src="include/bootstrap/required/popper.min.js"></script>
	<script src="include/bootstrap/js/bootstrap.min.js"></script>