<?php include("include/head.php"); ?>
<title>eniGame</title>
<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>-->
</head>

<body>
    <?php include("include/nav.php"); ?>
    <!-- Button trigger modal -->
    <!-- <button type="button" class="" data-toggle="modal" data-target="#trapsModal">Launch trap modal</button>
    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#pressureModal">Launch logic modal</button>-->
    <!--Trap Modal -->
    <!--<div class="modal fade bd-example-modal-sm" id="trapsModal" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Trap details</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <label for="facing">Direction ?</label>
                            <select class="form-control" id="facing">
                                <option value="e">East</option>
                                <option value="w">West</option>
                                <option value="n">North</option>
                                <option value="s">South</option>
                            </select><b"/"
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="onoff" id="on" value="true" checked>
                                <label class="form-check-label" for="activated">activated</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="onoff" id="off" value="false">
                                <label class="form-check-label" for="deactivated">deactivated</label>
                            </div><br/>
                            <label for="group">group ?</label>
                            <select class="form-control" id="group">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select><br/>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button"  class="btn btn-outline-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>-->
        <!-- Logic modal -->
        <!--<div class="modal fade bd-example-modal-sm" id="pressureModal" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Pressure Plate details</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <label for="onUse">onUse activate ?</label>
                            <select class="form-control" id="onUse">
                                <option value="null">Open Doors</option>
                                <option value="1">Arrow once</option>
                                <option value="2">Arrow infinite</option>
                                <option value="3">Flames</option>
                            </select><br/>
                            <label for="group">group ? (if you want it to open doors, ignore this)</label>
                            <select class="form-control" id="group">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select><br/>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>-->
        <div class="container jumbotron">
            <p class="h1">Levels</p>
            <?php
            include("include/connect.php");
            //selecting everything from user purchases
            $query = 'SELECT * FROM SEEDS;';
            $result = mysqli_query($link, $query);
            if($result){
              $queryResult = mysqli_num_rows($result);
              echo '<p class="h3">There are '.$queryResult. ' map';
              if($queryResult > 1) echo 's';
              echo ' online</p><br/>';
              if($queryResult <= 0) echo '<p>yet there are no map online... Try to create your own using the editor</p>';
              else{
                echo '<table class="table"><thead class="thead-dark"><tr><th scope="col">level ID</th><th scope="col">Who Posted</th><th scope="col">play!</th></tr></thead><tbody>';
                while ($row = mysqli_fetch_assoc($result)) {
                    $furtherQuery = 'SELECT NAME FROM USERS WHERE ID="' . $row["whoposted"] . '";'; //select stuff from the stock db in order to show it
                    $furtherResult = mysqli_query($link, $furtherQuery); 
                    if ($furtherResult) {//checking if the query was successful
                        $furtherQueryResult = mysqli_num_rows($furtherResult);
                        if ($furtherQueryResult > 0) { //if we have results
                            while ($row2 = mysqli_fetch_assoc($furtherResult)) {
                                echo '<tr><th scope="row">' . $row['ID'] . '</th>';
                                echo '<td> @' . $row2['NAME'] . '</td>';
                                echo '<td style="padding:0px"><button type="button" class="btn btn-success btn-sm">PLAY</button></td>';
                                //echo for finished ?
                                echo '</tr>';
                                }
                            }
                        }
                    }
                    echo '</tbody></table>';//close the table at the end
                }
            }
            ?>
        </div>
        <?php include('include/footer.php'); ?>
</body>
