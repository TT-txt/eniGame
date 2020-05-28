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
			height: 900px; 
		}
</style>

</head>

<body>
    <?php include("include/nav.php"); ?>
    <main>
        <div class="container">

        <?php 
        include("include/connect.php");
        ?>

        <table class="table table-hover mt-5">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" colspan="2">Your last 10 personal scores :</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <!--Nothing also to explain, we get the type-->
                    <th scope="col">Date</th>
                    <th scope="col">Score/Level</th>
                </tr>
                
                    <?php 
                    
                    $id = $_SESSION["id"];
                    echo '</br>';
                    $sql = "SELECT who, score, date FROM scores WHERE who=$id  ORDER by date DESC LIMIT 10";
                    $result = mysqli_query($link, $sql);

                    if (mysqli_num_rows($result) > 0) {
                    // output data of each row
                    while($row = mysqli_fetch_assoc($result)) {
                        echo "<tr> <th scope='col'> " . $row["date"]. " </th> <th> " . $row["score"]. " </th> </tr> ";
                        }
                    } 
                    else {
                        echo "<tr> <th scope='col'></th>  <th></th> </tr> ";
                        }
                    ?>
                    
                </tr>
            </tbody>
        </table>
        </div>  
    </main>
    <?php include("include/footer.php"); ?>
</body>

</html>

