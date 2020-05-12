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
			let renderer;
			let scene;
			let mesh;

			function init() {

				container = document.querySelector('#scene-container');

				scene = new THREE.Scene();
				scene.background = new THREE.Color(0x8FBCD4);

				createCamera();
				createLights();
				createMeshes();
				createRenderer();

				renderer.setAnimationLoop(() => {

					update();
					render();

				});

			}

			function createCamera() {

				camera = new THREE.PerspectiveCamera(
					35, // FOV
					container.clientWidth / container.clientHeight, // aspect

					0.1, // near clipping plane
					100, // far clipping plane
				);

				camera.position.set(0, 0, 10);

			}

			function createLights() {

				const ambientLight = new THREE.AmbientLight(0xffffff, 1);
				scene.add(ambientLight);

				const mainLight = new THREE.DirectionalLight(0xffffff, 1);
				mainLight.position.set(10, 10, 10);

				/*
				const ambientLight = new THREE.HemisphereLight(
					0xddeeff, // sky color
					0x202020, // ground color
					5, // intensity
				);

				const mainLight = new THREE.DirectionalLight(0xffffff, 5);
				mainLight.position.set(10, 10, 10);
				*/
				
				// remember to add the light to the scene
				scene.add(ambientLight, mainLight);

			}

			function createMeshes() {

				const geometry = new THREE.BoxBufferGeometry(2, 2, 2);

				const textureLoader = new THREE.TextureLoader();

				const texture = textureLoader.load('textures/uv_test_bw.png');

				texture.encoding = THREE.sRGBEncoding;
				texture.anisotropy = 16;

				const material = new THREE.MeshStandardMaterial({
					map: texture,
				});

				mesh1 = new THREE.Mesh(geometry, material);

				mesh2 = new THREE.Mesh(geometry, material);
				mesh2.position.set(-6, 2, -2);

				mesh3 = new THREE.Mesh(geometry, material);
				mesh3.position.set(-4, 2, -2);

				mesh4 = new THREE.Mesh(geometry, material);
				mesh4.position.set(-6, 0, -2);

				scene.add(mesh1);
				scene.add(mesh2);
				scene.add(mesh3);
				scene.add(mesh4);

				const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
				const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0x800080 } );
				sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
				sphereMesh.position.set(4, 2, -2);
				scene.add(sphereMesh);

				const knotGeometry = new THREE.TorusKnotBufferGeometry(0.5, 0.2, 64, 4);
				const knotMaterial = new THREE.MeshStandardMaterial( { color: 0xffff00 } );
				knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
				knotMesh.position.set(6, 2, -2);
				scene.add(knotMesh);
			}

			function createRenderer() {

				renderer = new THREE.WebGLRenderer({
					antialias: true
				});
				renderer.setSize(container.clientWidth, container.clientHeight);

				renderer.setPixelRatio(window.devicePixelRatio);

				renderer.gammaFactor = 2.2;
				renderer.gammaOutput = true;

				container.appendChild(renderer.domElement);

			}

			// perform any updates to the scene, called once per frame
			// avoid heavy computation here
			function update() {

				// increase the mesh's rotation each frame
				mesh1.rotation.z += 0.01;
				mesh1.rotation.x += 0.01;
				mesh1.rotation.y += 0.01;

				/*
				mesh.position.set(Math.random() * -1, Math.random() * -1, Math.random() * -1);
				mesh.rotation.set(Math.random() * -1, Math.random() * -1, Math.random() * -1);
				mesh.scale.set(Math.random() * -1, Math.random() * -1, Math.random() * -1);
				*/
			}

			// render, or 'draw a still image', of the scene
			function render() {

				renderer.render(scene, camera);

			}

			/*
			 ************** EVENTS ****************
			 */

			// a function that will be called every time the window gets resized.
			// It can get called a lot, so don't put any heavy computation in here!
			function onWindowResize() {

				// set the aspect ratio to match the new browser window aspect ratio
				camera.aspect = container.clientWidth / container.clientHeight;

				// update the camera's frustum
				camera.updateProjectionMatrix();

				// update the size of the renderer AND the canvas
				renderer.setSize(container.clientWidth, container.clientHeight);

			}

			window.addEventListener('resize', onWindowResize);

			window.addEventListener("keydown", checkKeyPress, false); //false so the function doesn't return a thing

			function checkKeyPress(key) {
				if (key.keyCode == "37") {
					//Left arrow key
					mesh1.position.x -= 1;
				} else if (key.keyCode == "38") {
					//Up arrow key
					mesh1.position.y += 1;
				} else if (key.keyCode == "39") {
					//Right arrow key
					mesh1.position.x += 1;
				} else if (key.keyCode == "40") {
					//Down arrow key
					mesh1.position.y -= 1;
				}
				console.log(mesh1.position);
			}


			document.getElementById("cameraChange").onclick = function() {
				camera.position.set(0, 0, 20);
				console.log("Camera successfully changed");
			}
			// call the init function to set everything up
			init();
		</script>
	</main>
	<?php include("include/footer.php"); ?>
</body>

</html>