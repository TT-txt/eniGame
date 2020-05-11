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
    //SQL QUERY FOR LOGIN, PASSWORD
    $queryLogin = "SELECT ID,LOGIN, PASSWORD, NAME FROM `users` WHERE LOGIN=\"$login\" AND PASSWORD=\"$password\"";
    $result = mysqli_query($link, $queryLogin);
    $array = mysqli_fetch_assoc($result);
    mysqli_close($link);

    if (!$array) //if the query didn't return an user
    { // Setting auth and name with wrong default values
        $_SESSION["auth"] = 0;
        //CONNECTION FAILED
        $connected = false;
    } else {
        // Setting session variables
        $_SESSION["auth"] = 1;
        //RECUPERER LE NOM
        $_SESSION["name"] = $array["NAME"];
        $_SESSION["login"] = $array["LOGIN"];
        $_SESSION["id"] = $array["ID"];
        //CONNECTED
        $connected = true;
    }
}
if (!isset($_SESSION["cart"])) $_SESSION["cart"] = array();

/*
DELETE CART ITEMS
*/
if (isset($_POST["del"])) {
    if (($key = array_search($_POST["del"], $_SESSION["cart"])) !== false)
        unset($_SESSION["cart"][$key]);
}
?>

<nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" style="box-shadow: 0px 6px 5px grey;">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="home.php">𝓣𝓣𝓢𝓚8</a>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
                <a class="nav-link" href="shop.php">Shop</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                    Products
                </a>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="shop.php?type=Deck">Decks</a>
                    <a class="dropdown-item" href="shop.php?type=Wheels">Wheels</a>
                    <a class="dropdown-item" href="shop.php?type=Truck">Trucks</a>
                </div>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="needHelp.php">Need Help ?</a>
            </li>
        </ul>
        <form class="form-inline my-2 my-lg-0" method="get" action="searchAction.php">
            <input class="form-control mr-sm-2" name="search" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item">
                <a class="nav-link" data-toggle="modal" data-target="#Cart" href="#">Cart <span class="badge"><?php echo count($_SESSION['cart']) ?><i class="fas fa-shopping-cart"></i></span></a>
            </li>
            <?php
            echo ('<li class="nav-item');
            if ($connected == true) {
                echo (' dropdown"><button data-toggle="dropdown" type="button" class="btn btn-success dropdown-toggle">' . $_SESSION["name"] . '</button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="profile.php">Profile</a>
                    <a class="dropdown-item" href="purchases.php">Purchases</a>
                    <a class="dropdown-item text-danger" href="disconnect.php">Disconnect</a>
                </div>');
            } else {
                echo ('"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#Connect">Connect</button>');
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
                        <input type="password" class="form-control" placeholder="Password" name="password" required /><br /><br />
                        <button type="submit" class="btn btn-primary">Connect</button>
                        <!--<button type="submit" class="btn btn-success">Register</button>-->
                        <a class="btn btn-success text-light" data-toggle="modal" data-target="#register" data-dismiss="modal" role="button">Register</a>
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
<!-- CART -->
<div class=" modal fade" id="Cart">
    <div class="modal-dialog modal-lg">
        <div class="modal-content" style="text-align: center;">
            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Your Cart</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                <?php
                $totalProduct = 0;
                if (empty($_SESSION['cart'])) echo '<br/><h3>Your cart is empty</h3><br/>';
                else {
                    $totalPrice = 0;
                    echo '<form method="POST" action="' . test_input($_SERVER["PHP_SELF"]) . '"><table class="table table-striped table-hover"><thead><tr><th scope="col">Product</th><th>Brand</th><th>Type</th><th>Price</th><th></th></tr></thead><tbody>';
                    include("include/connect.php");
                    foreach ($_SESSION['cart'] as $ref) {
                        $query = 'SELECT NAME,BRAND,TYPE,PRICE FROM stock WHERE REF="' . $ref . '";';
                        $result = mysqli_query($link, $query);
                        if ($result) {
                            $queryResult = mysqli_num_rows($result);
                            if ($queryResult > 0) {
                                while ($row = mysqli_fetch_assoc($result)) {
                                    echo '<tr><th scope="row">' . $row['NAME'] . '</th>';
                                    echo '<td>' . $row['BRAND'] . '</td>';
                                    echo '<td>' . $row['TYPE'] . '</td>';
                                    echo '<td>' . $row['PRICE'] . '$</td>';
                                    echo '<td><button class="btn btn-danger" type="submit" name="del" value="' . $ref . '">Del</button></td>';
                                    echo '</tr>';
                                    $totalProduct++;
                                    $totalPrice += $row['PRICE'];
                                }
                            }
                        }
                    }
                    echo '<tr><th>TOTAL</th><th>' . $totalProduct . '</th><th>/</th><th>' . $totalPrice . '</th></tr>';
                    echo '</tbody></table></form>';
                }
                ?>
            </div>
            <!-- Modal footer -->
            <div class="modal-footer">
                <?php
                if ($totalProduct >= 1) {
                    echo('<a href="checkout.php"><button type="button" class="btn btn-success">Checkout</button></a>');
                }
                ?>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- Register modal-->
<div class="modal fade" id="register" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="registerlabel">𝓡𝓮𝓰𝓲𝓼𝓽𝓮𝓻</h5>
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
                        <div class="col-md-6">
                            <label for="name">Name:</label>
                            <input type="text" class="form-control" name="name" placeholder="Name" required>
                        </div>
                        <div class="col-md-6">
                            <label for="phone">Phone :</label>
                            <input type="text" class="form-control" name="phone" placeholder="Phone" required>
                        </div>
                    </div>
                    <div class="form group">
                        <label for="adress">Address:</label>
                        <input type="text" class="form-control" name="address" placeholder="Address" required>
                    </div>
                    <div class="form-row">
                        <div class="col-md-8">
                            <label for="city">City :</label>
                            <input type="text" class="form-control" name="city" placeholder="City" required>
                        </div>
                        <div class="col-md-4">
                            <label for="zipcode">Zipcode</label>
                            <input class="form-control" type="text" placeholder="Zipcode" name="zipcode" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-7">
                            <label for="country">Country :</label>
                            <select class="form-control" name="country" name="country" required>
                                <option value="">Choose a country</option>
                                <option value="France">France</option>
                                <option value="England">England</option>
                                <option value="US">USA</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="Australia">Australia</option>
                                <option value="Japan">Japan</option>
                                <option value="Russia">Russia</option>
                            </select>
                        </div>
                        <div class="col-md-5">
                            <label for="submit">Submit:</label><br />
                            <button type="submit" class="btn btn-success">Register</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--Cart modal-->