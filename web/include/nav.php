<?php
if (isset($_SESSION["auth"])) {
    if (isset($_SESSION["auth"]) == 1) {
        $connected = true;
    }
} else $connected = false;

if (isset($_POST['login']) and isset($_POST['password'])) {
    $login = htmlspecialchars($_POST['login']);
    $password = htmlspecialchars($_POST['password']);

    include("connect.php");
    //SQL QUERY FOR login, password
    $queryLogin = "SELECT ID,login, password, name FROM `USERS` WHERE login=\"$login\" AND password=\"$password\"";
    $result = mysqli_query($link, $queryLogin);
    $array = mysqli_fetch_assoc($result);

    if (!$array) //if the query didn't return an user
    { // Setting auth and name with wrong default values
        $_SESSION["auth"] = 0;
        //CONNECTION FAILED
        $connected = false;
    } else {
        // Setting session variables
        $_SESSION["auth"] = 1;
        //RECUPERER LE NOM
        $_SESSION["name"] = $array["name"];
        $_SESSION["login"] = $array["login"];
        $_SESSION["id"] = $array["ID"];
        //CONNECTED
        $connected = true;
    }
}
?>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" style="box-shadow: 0px 6px 5px grey; margin-bottom:20px;">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand text-autre" href="home.php">
        <p style="color:white; font-family:'8bit_wondernominal'; margin:0;"><img src="img/logo.svg" alt="LOGO" height="80px">eniGame</p>
    </a>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0" style="font-size:20px;">
            <style>
                .navbar-expand-lg .navbar-nav .nav-link {
                    margin-right: 60px;
                }
            </style>
            <li class="nav-item" id="test">
                <a class="nav-link" href="rules.php">Rules</a>
            </li>
            <li class="nav-item dropdown" id="test">
                <a class="nav-link dropdown-toggle" href="" id="navbardrop" data-toggle="dropdown">
                    Leaderboards
                </a>
                <div class="dropdown-menu">
                    <style>
                        .dropdown-item:active,
                        .dropdown-item:focus,
                        .dropdown-item:hover {
                            background-color: #6351CE;
                            color: white;
                            text-decoration: none;
                        }
                    </style>
                    <a class="dropdown-item" href="leaderboards.php?sortBy=score">By Score</a>
                    <a class="dropdown-item" href="leaderboards.php?sortBy=level">By Levels</a>
                </div>
            </li>
            <li class="nav-item" id="test">
                <a class="nav-link" href="theTeam.php">The Team</a>
            </li>
        </ul>
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <?php
            echo ('<li class="nav-item');
            if ($connected == true) {
                echo (' dropdown"><button data-toggle="dropdown" type="button" class="btn btn-success dropdown-toggle" style="min-width:150px">' . $_SESSION["name"] . '</button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="profile.php">Profile</a>
                    <a class="dropdown-item" href="scores.php">Scores</a>
                    <a class="dropdown-item text-danger" href="disconnect.php">Disconnect</a>
                </div>');
            } else {
                echo ('"><button type="button" id="Bouton" class="btn btn-success" data-toggle="modal" data-target="#Connect">Connect</button>');
            }
            echo ('</li>');
            ?>
        </ul>
    </div>
</nav>
<?php
if ($connected == false) {
    echo ('<div class="modal fade" id="Connect">
            <div class="modal-dialog modal-sm">
                <div class="modal-content" style="text-align: center;">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Connect to your Account</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <!-- Modal body -->
                    <form method="POST" action="#" class="modal-body">
                        <div class="input-group mb-3">
                            <input type="email" class="form-control" placeholder="Email" name="login" required>
                        </div>
                        <br />
                        <script>
                            <!--Change the password s visibility-->
                            function changeType(){
                            var x = document.getElementById("password");
                            var y = document.getElementById("motdepasse");
                            
                            if (x.type === "password") {
                                x.type = "text";
                                y.src= "img/hide.png";
                            } else {
                                x.type = "password";
                                y.src = "img/see.png";
                            }
                            }
                        </script>
                        <div class="input-group mb-3">
                        <input type="password" value="" class="form-control" placeholder="Password" id="password" name="password" required />
                            <div class="input-group-append">
                            <button type="button"  onclick="changeType()">  
                                <img src="img/see.png" id="motdepasse" height="20px">
                            </button> 
                            </div>
                        </div>
                       
                        <button type="submit" class="btn btn-success">Connect</button>
                        <button class="btn btn-success" data-toggle="modal" data-target="#register" data-dismiss="modal">Register</button>
                        <style>
                            .btn-success:hover, .btn-success:active, .btn-success:visited {border-color: white !important;}                          
                            
                        </style>
                    </form>
                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>');
}
?>

<!-- Register modal-->
<div class="modal fade" id="register" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="registerlabel">Register</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="registerAction.php" method="post">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" name="login" aria-describedby="emailHelp" placeholder="Enter email" required>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone.</small>
                        <label for="passwd">Password (must be 8 char, with number and uppercase and lowercase letters)</label>
                        <input type="password" class="form-control" name="passwd1" placeholder="Password" required>
                        <label for="passwdverif">Enter it again</label>
                        <input type="password" class="form-control" name="passwd2" placeholder="Enter again" required>
                    </div>
                    <div class="form-row">
                        <div class="col-md-12">
                            <label for="name">Username:</label>
                            <input type="text" class="form-control" name="name" placeholder="Username" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-12 text-center">
                            <br />
                            <button type="submit" class="btn btn-success">Register</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
            </div>
            </form>
        </div>
    </div>
</div>
</div>