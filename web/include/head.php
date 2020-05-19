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
		
		body {
			height: 100%;
			width: 100%;
			padding: 0;
			margin: 0;
			background-color: #e0e0e0;
		}

		.btn {
			margin: 10px;
		}

		.btn-success {
			background-color: #6351ce !important;
			border-color: #6351ce !important;
		}

		.btn-success:hover,
		.btn-success:active,
		.btn-success:visited {
			border-color: #A9A9A9 !important;
		}

		.btn-success.focus, .btn-success:focus {
			box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
		}

		.btn-success:not(:disabled):not(.disabled).active:focus, .btn-success:not(:disabled):not(.disabled):active:focus, .show>.btn-success.dropdown-toggle:focus {
			box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
		}

		a.text-light:focus, a.text-light:hover {
			color: #cbd3da!important;
		}

		.btn-success:hover, .btn-success:active, .btn-success:visited {
			border-color: #A9A9A9 !important;
		}

		.text-autre {
			color: #6351ce !important;
		}

		.row {
			margin-right: 0px !important;
		}

		@font-face {
			font-family: '8bit_wondernominal';
			src: url('fonts/8-bit_wonder-webfont.woff2') format('woff2'),
				url('fonts/8-bit_wonder-webfont.woff') format('woff');
			font-weight: normal;
			font-style: normal;
		}
	</style>
	<!-- Bootstrap Js -->
	<script src="include/bootstrap/required/jquery-3.4.1.slim.min.js"></script>
	<script src="include/bootstrap/required/popper.min.js"></script>
	<script src="include/bootstrap/js/bootstrap.min.js"></script>
