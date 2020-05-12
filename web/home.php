<?php include("include/head.php"); ?>
<title>eniGame</title>
<style>
	body {
		height: 100%;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-areas: "navbar navbar"
			"sidebar content"
			"footer footer";
		grid-template-columns: 10% 90%;
	}

	nav {
		grid-area: navbar;
	}

	aside {
		grid-area: sidebar;
	}

	div.content {
		grid-area: content;
	}

	footer {
		grid-area: footer;
	}
</style>
<script src="include/three/three.js"></script>
<script src="include/three/OrbitControls.js"></script>
<script src="include/three/GLTFLoader.js"></script>
<!-- Functions include -->
<script src="js/camera.js"></script>
<script src="js/event.js"></script>
<script src="js/mesh.js"></script>
<script src="js/model.js"></script>
</head>

<body>
	<?php include("include/nav.php"); ?>
	<aside style="text-align:center;padding-top:20px;">
		<button type="button" id="cameraChange" class="btn btn-primary">Change Camera View</button>
	</aside>
	<main class="game" id="scene-container" style="width:99%">
		<script>
			let container;
			let camera;
			let controls;
			let renderer;
			let scene;
			let heroMesh;
			const mixers = [];
			const clock = new THREE.Clock();

			class coord {
				constructor(x, y, z) {
					this.x = x;
					this.y = y;
					this.z = z;
				}
			}
			class mapConstruction {
				constructor(walls) {
					this.walls = walls;
				}
			}

			function init() {

				container = document.querySelector('#scene-container');

				scene = new THREE.Scene();
				scene.background = new THREE.Color(0x8FBCD4);

				let test = new mapConstruction([new coord(3, 1, 1), new coord(1, 1, 3)]);

				createCamera();
				createControls();
				createLights();
				createSkybox();
				createMap(test);
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

				const delta = clock.getDelta();

				for (const mixer of mixers) {

					mixer.update(delta);

				}

			}

			// render, or 'draw a still image', of the scene
			function render() {

				renderer.render(scene, camera);

			}

			init();
		</script>
	</main>
	<?php include("include/footer.php"); ?>
</body>

</html>