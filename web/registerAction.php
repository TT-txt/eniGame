<?php include("include/head.php");

require_once('include/PHPMailer/PHPMailerAutoload.php'); //importing the mail library
$mail = new PHPMailer(true);
//$mail->SMTPDebug = '2';
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->STMPSecure = 'tls';
$mail->Host = 'smtp.gmail.com';
$mail->Port = '587';
$mail->isHTML();
$mail->Username = 'enigameonline'; //gmail id for the account
$mail->Password = "pJLWZ!67e.8$\$zc]"; //gmail passwd
$mail->setFrom('no-reply@enigame.com'); //name that he will get
?>
<title>eniGame ~ Loading...</title>
<link rel="icon" href="favicon.ico" />
<meta src="utf-8" />
</head>

<body style="background-color:#e9ecef;">
    <?php include("include/nav.php"); ?>
    <main>
        <?php
        //checking if everything is nicely set
        if (isset($_POST['login']) && isset($_POST['passwd1']) && isset($_POST['passwd2']) && isset($_POST['name'])) {
            //retriveing the variables
            $login = $_POST['login'];
            $passwd1 = $_POST['passwd1'];
            $passwd2 = $_POST['passwd2'];
            $name = $_POST['name'];

            //checking if the passwords matches and are valid
            if ($passwd1 == $passwd2 && verificationPassword($passwd1)) {
                //if so we connect to the db
                include("include/connect.php");
                $query = 'INSERT INTO USERS (login, password, name) VALUES ("' . $login . '","' . $passwd1 . '","' . $name . '");';
                //query above inserts every infos for a new user into the db
                //echo ($query);//for safety purpose
                $result = mysqli_query($link, $query); //executing the query
                if (!$result) echo 'Error has occured'; //if not done..
                else {
                    $usrMessage = "<h3>Hello !</h3><p>Welcome to our Website " . $name . " !<br/> We hope you will have a lot of fun on our website! <br/>Thank you !</p>";
                    $mail->Subject = "Welcome to eniGame !";
                    $mail->Body = $usrMessage;
                    $mail->addAddress($login); //getting the list of receivers
                    $mail->send(); //sending
                    echo ('<div class="alert alert-success alert-dismissible fade show" role="alert">
                    <p style="text-align:center;">You successfully registered!</p>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>');
                }
            } else {
                echo ('<div class="alert alert-danger alert-dismissible fade show" role="alert">
                <p style="text-align:center;">ERROR, wrong password format/not using the same password twice...<br/>Please do register again</p>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>');
            }
        }
        ?>
    </main>
    <?php include("include/footer.php"); ?>
</body>

</html>