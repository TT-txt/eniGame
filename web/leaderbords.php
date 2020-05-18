<?php
include("include/head.php");
if (!isset($_SESSION["auth"])) {
    header("location:home.php");
} else if ($_SESSION["auth"] != 1) {
    header("location:home.php");
}
?>

<title>eniGame ~ Scores</title>
<head>
<style>
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
</head>

<body>
    <?php include("include/nav.php"); ?>
    <main>
        Scores
    </main>
    <?php include("include/footer.php"); ?>
</body>

</html>