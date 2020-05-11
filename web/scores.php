<?php
include("include/head.php");
if (!isset($_SESSION["auth"])) {
    header("location:home.php");
} else if ($_SESSION["auth"] != 1) {
    header("location:home.php");
}
?>
<title>eniGame ~ Scores</title>
</head>

<body>
    <?php include("include/nav.php"); ?>
    <main>
        scores
    </main>
    <?php include("include/footer.php"); ?>
</body>

</html>