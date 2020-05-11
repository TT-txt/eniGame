<?php
include("include/head.php");
if (!isset($_SESSION["auth"])) {
    header("location:home.php");
} else if ($_SESSION["auth"] != 1) {
    header("location:home.php");
}
if (!isset($_GET["modify"])) header("location:profile.php");
?>
<title>eniGame ~ Update</title>
</head>

<body>
    <?php include("include/nav.php"); ?>
    <main>
        <br />
        <?php $modify = $_GET["modify"];
        $toCheck = array("login", "password", "name");
        $valid = false;
        foreach ($toCheck as $val) {
            if ($val == $modify) {
                $valid = true;
            }
        }

        if (!$valid) header("location:profile.php");
        ?>
        <div style="margin:20px;">
            <h1>Change <?php echo $modify; ?></h1>
            <form method="POST" action="modifyAction.php">
                <div class="form-group">
                    <?php
                    if ($modify == "password") { //nothing to explain here
                        echo '<label for="oldpassword">Enter old password:</label>';
                        echo '<input type="password" class="form-control" name="oldpassword" placeholder="Old Password" required />';
                        echo '<lable for="newpassword">Enter new ' . $modify . ' :';
                        echo '<input type="password" class="form-control" name="newpassword" placeholder="New Password" required />';
                    } else {
                        echo '<label for="' . $modify . '">Enter new ' . $modify . '</label>';
                        echo '<input type="text" class="form-control" name="' . $modify . '"placeholder="Enter new ' . $modify . '" required />';
                    }
                    ?>
                </div>
                <button type="submit" class="btn btn-primary">Update</button>
            </form>
        </div>
    </main>
    <?php include("include/footer.php"); ?>
</body>

</html>