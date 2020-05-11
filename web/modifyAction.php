<?php 
    include("include/head.php")
?>
    <title>eniGame ~ Loading...</title>
    <meta http-equiv="refresh" content="5; URL=profile.php">
</head>

<body>
    <?php
    //check if variables are all set
    if (isset($_POST['login']) xor (isset($_POST['oldpassword']) and isset($_POST['newpassword'])) xor isset($_POST['name']) xor isset($_POST['address']) xor isset($_POST['phone']) xor isset($_POST['city']) xor isset($_POST['country']) xor isset($_POST['zipcode'])) {
        include("include/connect.php");
        //if login is set
        if (isset($_POST['login'])) {
            //check if the email is valid
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                //then update the db
                $query = "UPDATE USERS SET login='" . htmlspecialchars($_POST["login"]) . "' WHERE login=\"" . $_SESSION["login"] . "\" AND name=\"" . $_SESSION["name"] . "\";";
            }
        } else if (isset($_POST["name"])) $query = "UPDATE USERS SET NAME='" . htmlspecialchars($_POST["name"]) . "' WHERE ID=\"" . $_SESSION["id"] . "\" AND LOGIN=\"" . $_SESSION["login"] . "\" AND NAME=\"" . $_SESSION["name"] . "\";";

        //Specific case of the password
        if (isset($_POST['oldpassword']) and isset($_POST['newpassword'])) {
            $checkPassword = "SELECT PASSWORD FROM USERS WHERE ID=\"" . $_SESSION["id"] . "\" AND login=\"" . $_SESSION["login"] . "\" AND name=\"" . $_SESSION["name"] . "\";";
            $result = mysqli_query($link, $checkPassword);
            if ($toCheck = mysqli_fetch_assoc($result)) {
                if (verificationPassword($_POST['newpassword'])) {
                    //ALLOW QUERY TO MODIFY PASSWORD
                    $query = "UPDATE USERS SET password='" . $_POST["newpassword"] . "' WHERE ID=\"" . $_SESSION["id"] . "\" AND login=\"" . $_SESSION["login"] . "\" AND name=\"" . $_SESSION["name"] . "\";";
                }
            } else echo "Error trying updating, please try again...";
        }

        if (isset($query)) {
            $result = mysqli_query($link, $query);
            if (!$result) {
                echo "Error trying updating, please try again...";
                die();
            } else {
                echo ("Change complete! You will be redirected to home in 5 seconds...");
            }

            if (isset($_POST["login"])) {
                //Update the session vars if we modify login
                $_SESSION["login"] = $_POST["login"];
            }
            if (isset($_POST["name"])) {
                //Update the session vars if we modify login
                $_SESSION["name"] = $_POST["name"];
            }
        } else {
            echo "Error while updating, please try again...";
            die();
        }

        mysqli_close($link);
    } else {
        echo ("ERROR"); //DEBUG
    }
    ?>
</body>

</html>