<?php include("include/head.php"); ?>
<title>eniGame</title>
<style>
	body {
		height: 100%;
		width: 100%;
		padding: 0;
		margin: 0;
		background-color: #e0e0e0;
	}

	.btn {
		margin: 10px;
	}

	.btn-success {
		background-color: #6351ce !important;
		border-color: #6351ce !important;
	}

	.btn-success:hover,
	.btn-success:active,
	.btn-success:visited {
		border-color: #A9A9A9 !important;
	}

	.btn-success.focus,
	.btn-success:focus {
		box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, .25);
	}

	.btn-success:not(:disabled):not(.disabled).active:focus,
	.btn-success:not(:disabled):not(.disabled):active:focus,
	.show>.btn-success.dropdown-toggle:focus {
		box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, .25);
	}

	.btn-success:hover,
	.btn-success:active,
	.btn-success:visited {
		border-color: #A9A9A9 !important;
	}

	.text-autre {
		color: #6351ce !important;
	}

	.row {
		margin-right: 0px !important;
	}

	@font-face {
		font-family: '8bit_wondernominal';
		src: url('fonts/8-bit_wonder-webfont.woff2') format('woff2'),
			url('fonts/8-bit_wonder-webfont.woff') format('woff');
		font-weight: normal;
		font-style: normal;
	}
</style>
<script src="include/three/three.js"></script>
<script src="include/three/OrbitControls.js"></script>
<script src="include/three/GLTFLoader.js"></script>
<!-- Functions include -->
<script src="js/classes.js"></script>
<script src="js/maps.js"></script>
<script src="js/traps.js"></script>
<script src="js/logic.js"></script>
<script src="js/camera.js"></script>
<script src="js/mesh.js"></script>
<script src="js/model.js"></script>
<script src="js/mapConstruction.js"></script>
<script src="js/event.js"></script>

<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>-->
</head>

<body>
	<?php include("include/nav.php"); ?>
	<div class="row">
		<div class="col-lg-1">
		</div>
		<div class="col-lg-10" style="box-shadow: 0px 6px 5px grey; padding-right: 0px !important;">
			<aside class="row" style="text-align:center; padding:20px; background-color:#6351ce; box-shadow: 0px 6px 5px grey;">
				<button type="button" id="reset" class="btn btn-dark" onclick="mapReset()"><img src="img/reset.png" height="20px"></button>
			</aside>
			<main class="row game" id="scene-container" style="text-align: center;  box-shadow: 0px 6px 5px grey;">
				<div id="MENU" style="background-color:black;width:100%;padding:15%;">
					<h1 style="color:white; font-family:'8bit_wondernominal'">eniGame</h1>
					<button id="PLAY" type="button" class="btn btn-outline-secondary" onclick="">PLAY</button>
					<br />
					<button id="TUTORIAL" type="button" class="btn btn-success" onclick="loadMap('http://localhost/eniGame/web/maps/tutorial.json')">TUTORIAL</button>
					<br />
					<button id="EDITOR" type="button" class="btn btn-outline-secondary" onclick="">EDITOR</button>
				</div>
				<script>
					//NEEDED TO HAVE A WORKING SCENE
					let container;
					let camera;
					let controls;
					let renderer;
					let scene;
					let gameStarted; //TO BEGIN TESTING LOGIC ELTS
					let currentLevel;
					let currentMap;

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

					//Animation
					const mixers = [];
					const clock = new THREE.Clock();

					function init(levelToPlay) {
						toVanish = document.querySelector("#MENU");
						toVanish.style["display"] = "none";

						container = document.querySelector('#scene-container');

						scene = new THREE.Scene();
						scene.background = new THREE.Color(0x8FBCD4);//Default blue for debug

						currentLevel = levelToPlay;

						currentMap = 0; // Top right of the level

						createSkybox();
						createMesh();
						createMap(currentLevel.maps[currentMap]);
						createCamera();
						createControls();
						createLights();
						loadModels();
						createRenderer();

						renderer.setAnimationLoop(() => {
							update();
							render();
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
						logicTrigger(currentLevel.maps[currentMap].logics, hero.position, gameStarted);
						trapActivate(currentLevel.maps[currentMap]);
					}

					// render of the scene
					function render() {
						
						const delta = clock.getDelta();
						for (const mixer of mixers) {

							mixer.update(delta);

						}
						renderer.render(scene, camera);

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