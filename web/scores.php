<?php
include("include/head.php");
if (!isset($_SESSION["auth"])) {
    header("location:home.php");
} else if ($_SESSION["auth"] != 1) {
    header("location:home.php");
}
?>
<title>eniGame ~ Profile</title>

<style>
		main {
			height: 600px; 
		}
</style>

</head>

<body>
    <?php include("include/nav.php"); ?>
    <main>
        <br />
        <div class="container">
        <table class="table table-hover mt-5">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" colspan="2">Your personal score :</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <!--Nothing also to explain, we get the type-->
                    <th scope="col">Date</th>
                    <th scope="col">Score/Level</th>
                </tr>
                <tr>
                    
                </tr>
                <tr>
                    
                </tr>
            </tbody>
        </table>
        </div>  
    </main>
    <?php include("include/footer.php"); ?>
</body>

</html>

