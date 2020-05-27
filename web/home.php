<?php include("include/head.php"); ?>
<title>eniGame</title>

<style>
	main {
		height: 900px;
	}
</style>
<script src="include/three/three.js"></script>
<script src="include/three/OrbitControls.js"></script>
<script src="include/three/GLTFLoader.js"></script>
<!-- Functions include -->
<script src="js/model.js"></script>
<script src="js/classes.js"></script>
<script src="js/maps.js"></script>
<script src="js/traps.js"></script>
<script src="js/logic.js"></script>
<script src="js/camera.js"></script>
<script src="js/mesh.js"></script>
<script src="js/mapConstruction.js"></script>
<script src="js/event.js"></script>
<script src="js/editor.js"></script>
<script src="include/notyf/notyf.min.js"></script>
<link rel="stylesheet" href="include/notyf/notyf.min.css">
<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>-->
</head>

<body>
	<?php include("include/nav.php"); ?>
	<div class="row">
		<div class="col-lg-1">
		</div>
		<div class="col-lg-10" id="mainContainer" style="box-shadow: 0px 6px 5px grey; padding-right: 0px !important;">
			<aside class="row" id="topAside" style="display:flex;justify-content:center;text-align:center; padding:20px; background-color:#6351ce; box-shadow: 0px 6px 5px grey;min-height:80px;">

			</aside>
			<main class="row game" id="scene-container" style="text-align: center;  box-shadow: 0px 6px 5px grey;">
				<div id="MENU" style="background-color:black;width:100%;padding:15%;">
					<h1 style="color:white; font-family:'8bit_wondernominal';">eniGame</h1>
					<button id="PLAY" type="button" class="btn btn-success" onclick="playPressed()">PLAY</button>
					<br />
					<button id="TUTORIAL" type="button" class="btn btn-success" onclick="loadMap('http://localhost/eniGame/web/maps/tutorial.json')">TUTORIAL</button>
					<br />
					<button id="EDITOR" type="button" class="btn btn-success" onclick="loadEditor()">EDITOR</button>
				</div>
				<div class="row" id="levelSelector" style="display:none;background-color: black; width: 100%;padding-top:20px;margin-left:auto;margin-right:auto;">
					<p class="h1 text-white" style="font-family:'8bit_wondernominal'">Levels</p>
					<br />
					<?php
					include("include/connect.php");
					//selecting everything from user created levels
					$query = 'SELECT * FROM MAPS ORDER BY ID DESC LIMIT 0,10;';
					$result = mysqli_query($link, $query);
					if ($result) {
						$queryResult = mysqli_num_rows($result);
						if ($queryResult <= 1) echo '<p class="h3 text-white">There is ' . $queryResult . ' level online</p><br/>';
						else if ($queryResult > 1) echo '<p class="h3 text-white">There are ' . $queryResult . ' levels online</p><br/>';
						if ($queryResult <= 0) echo '<p class="h3 text-white">Yet there are no map online... Try to create your own using the editor!</p><br/>';
						else {
							echo '<table class="table table-dark table-hover"><thead class="thead-dark"><tr><th scope="col">level ID</th><th scope="col">Who Posted</th><th scope="col">play!</th></tr></thead><tbody>';
							while ($row = mysqli_fetch_assoc($result)) {
								$furtherQuery = 'SELECT NAME FROM USERS WHERE ID="' . $row["whoposted"] . '";'; //select stuff from the stock db in order to show it
								$furtherResult = mysqli_query($link, $furtherQuery);
								if ($furtherResult) { //checking if the query was successful
									$furtherQueryResult = mysqli_num_rows($furtherResult);
									if ($furtherQueryResult > 0) { //if we have results
										while ($row2 = mysqli_fetch_assoc($furtherResult)) {
											echo '<tr><th scope="row">' . $row['ID'] . '</th>';
											echo '<td> @' . $row2['NAME'] . '</td>';
											echo '<td style="padding:0px"><button type="button" class="btn btn-success btn-sm" onclick="loadMap(\'http://localhost/eniGame/web/maps/' . $row['ID'] . '.json\')">PLAY</button></td>';
											//echo for finished ?
											echo '</tr>';
										}
									}
								}
							}
							echo '</tbody></table>'; //close the table at the end
						}
					}
					?>
				</div>
				<div id="endScreen" style="background-color:black; width: 100%; height:100%;display:none;">
				</div>
				<script>
					//NEEDED TO HAVE A WORKING SCENE
					let container;
					let camera = null;
					let controls;
					let renderer;
					let scene;
					let gameStarted; //TO BEGIN TESTING LOGIC ELTS
					let currentLevel;
					let currentMap;
					let death = 0;

					let pushableBoxes = {
						meshes: []
					};

					let closestDispenserObstacle;
					let closestDroppererObstacle;

					const deathNotif = new Notyf({
						duration: 40000,
						position: {
							x: 'center',
							y: 'top'
						},
						dismissible: true,
					});
					const resetNotif = new Notyf({
						duration: 1500,
						position: {
							x: 'center',
							y: 'center'
						},
						dismissible: true,
					})


					//Groups
					let mapBuild = new THREE.Group();
					mapBuild.name = "Map; everything is here !";
					let hero = new THREE.Group();
					hero.name = "Hero";
					let doorL = new THREE.Group();
					doorL.name = "Left Door";
					let doorT = new THREE.Group();
					doorT.name = "Top Door";
					let doorR = new THREE.Group();
					doorR.name = "Right Door";
					let doorB = new THREE.Group();
					doorB.name = "Bottom Door";

					//Materials
					let floorMaterial;
					let wallMaterialCobble;
					let wallMaterialCracked;
					let wallMaterialMossy;
					let doorMaterial;
					let dispenserMaterial = [];
					let dropperMaterial = [];
					let smokerMaterial = [];
					let pressurePlateMaterial;
					let pushableBoxMaterial;

					//Geometry
					let cube;
					let flatRectangle;
					let slimRectangle;

					//Meshes
					let heroMesh; //USE hero TO MOVE THE CHAR AROUND
					let block;
					let door;
					let dispenser;
					let pressurePlate;
					let pushableBox;
					let arrowMesh;
					let fireMesh;

					//random variables, finding uses somewhere
					let arrowIn = false;
					let fireIn = false;
					let dispenserArrow;
					let dropperArrow;
					let firecharge;

					//Animation
					const mixers = [];
					const clock = new THREE.Clock();

					function init(levelToPlay) {
						//Adds a reset map button
						let whereToInsert = document.getElementById('topAside');
						console.log(whereToInsert);
						whereToInsert.innerHTML = '<button type="button" id="reset" class="btn btn-dark" onclick="mapReset(true)"><img src="img/reset.png" height="20px"></button>';

						container = document.querySelector('#scene-container');

						scene = new THREE.Scene();
						scene.background = new THREE.Color(0x8FBCD4); //Default blue for debug

						currentLevel = levelToPlay;

						currentMap = 0; // Top right of the level

						createSkybox();
						createMesh();
						createLights();
						createMap(currentLevel.maps[currentMap]);
						loadModels();
						createRenderer();

						renderer.setAnimationLoop(() => {
							update();
							render();
							if (death >= 3) return;
						});

					}

					function createRenderer() {

						renderer = new THREE.WebGLRenderer({
							antialias: true
						});
						renderer.setSize(container.clientWidth, container.clientHeight);

						renderer.setPixelRatio(window.devicePixelRatio);

						renderer.gammaFactor = 2.2;
						renderer.gammaOutput = true;

						renderer.physicallyCorrectLights = true;

						container.appendChild(renderer.domElement);

					}

					// perform any updates to the scene, called once per frame
					// avoid heavy computation here
					function update() {
						trapActivate(currentLevel.maps[currentMap], hero.position);
						logicTrigger(currentLevel.maps[currentMap].logics, hero.position, gameStarted);
						if (death >= 3) return;
					}

					// render of the scene
					function render() {

						const delta = clock.getDelta();
						for (const mixer of mixers) {

							mixer.update(delta);

						}
						if (death >= 3) return;
						renderer.render(scene, camera);

					}

					function playPressed() {
						toVanish = document.querySelector("#MENU");
						toVanish.style["display"] = "none";
						toVanish = document.querySelector("#endScreen");
						toVanish.style["display"] = "none";


						container = document.querySelector("#levelSelector");
						container.style["display"] = "block";
						return;
					}
				</script>
			</main>
		</div>
		<div class="col-lg-1">
		</div>
	</div>
	<?php include("include/footer.php"); ?>
</body>

</html>