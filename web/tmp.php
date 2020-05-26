<?php include("include/head.php"); ?>
<title>eniGame</title>
<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>-->
</head>

<body>
    <?php include("include/nav.php"); ?>
    <!-- Button trigger modal -->
    <button type="button" class="" data-toggle="modal" data-target="#trapsModal">Launch trap modal</button>
    <button type="button" class="" data-toggle="modal" data-target="#pressureModal">Launch logic modal</button>
    <!--Trap Modal -->
    <div class="modal fade bd-example-modal-sm" id="trapsModal" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
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
        </div>
        <!-- Logic modal -->
        <div class="modal fade bd-example-modal-sm" id="pressureModal" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
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
        </div>
        <?php include('include/footer.php'); ?>
</body>