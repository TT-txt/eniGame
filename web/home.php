<?php include("include/head.php"); ?>
<title>eniGame</title>
<style>
	body {
		height: 100%;
		width: 100%;
		padding: 0;
		margin: 0;
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
</head>

<body>
	<?php include("include/nav.php"); ?>
	<div class="row">
		<div class="col-lg-1">
		</div>
		<div class="col-lg-10">
			<aside class="row" style="text-align:center;padding:20px;background-color:red;">
				<button type="button" id="cameraChange" class="btn btn-primary">Change Camera View</button>
			</aside>
			<main class="row game" id="scene-container">
				<menu id="MENU" style="background-color:black;width:100%">
					<h1 style="color:white;">eniGame</h1>
					<button id="PLAY" type="button" class="btn btn-success" onclick="init()">PLAY</button>
					<br />
					<button id="TUTORIAL" type="button" class="btn btn-outline-secondary" onclick="">TUTORIAL</button>
					<br />
					<button id="EDITOR" type="button" class="btn btn-outline-secondary" onclick="">EDITOR</button>
				</menu>
				<script>
					//NEEDED TO HAVE A WORKING SCENE
					let container;
					let camera;
					let controls;
					let renderer;
					let scene;
					let gameStarted; //TO BEGIN TESTING LOGIC ELTS

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

					function init() {
						toVanish = document.querySelector("#MENU");
						toVanish.style["display"] = "none";

						container = document.querySelector('#scene-container');

						scene = new THREE.Scene();
						scene.background = new THREE.Color(0x8FBCD4);

						currentLevel = testLevel;
						currentMap = 0; // Top right of the level

						createSkybox();
						createMesh();
						createMap(currentLevel.maps[currentMap]);
						createCamera();
						createControls();
						createLights();
						loadModels();
						createRenderer();

						//Will not be set automatically in the future (mapLoader)
						gameStarted = true; //Used in update

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