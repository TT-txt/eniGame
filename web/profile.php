<?php
include("include/head.php");
if (!isset($_SESSION["auth"])) {
    header("location:home.php");
} else if ($_SESSION["auth"] != 1) {
    header("location:home.php");
}
?>
<title>eniGame ~ Profile</title>
</head>

<body>
    <?php include("include/nav.php"); ?>
    <main>
        <br />
        <table class="table table-hover">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" colspan="3">Your personal information :</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <!--Nothing also to explain, we get the type-->
                    <th scope="row">Login</th>
                    <td><?php echo($_SESSION["login"]); ?></td>
                    <td><a href="modify.php?modify=login">Modify</a></td>
                </tr>
                <tr>
                    <th scope="row">Password</th>
                    <td>●●●●●●●●●●</td>
                    <td><a href="modify.php?modify=password">Modify</a></td>
                </tr>
                <tr>
                    <th scope="row">Username</th>
                    <td><?php echo ($_SESSION["name"]); ?></td>
                    <td><a href="modify.php?modify=name">Modify</a></td>
                </tr>
            </tbody>
        </table>
    </main>
    <?php include("include/footer.php"); ?>
</body>

</html>