function createCamera() {

    camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 100);

    camera.position.set(15, 8, 15);

}

function createControls() {
    controls = new THREE.OrbitControls(camera, container);
    //ZOOM DISTANCE
    controls.minDistance = 10;
    controls.maxDistance = 30;

    //VERTICAL ROTATION
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2;

    //HORIZONTAL ROTATION
    controls.minAzimuthAngle = Math.PI / 8;
    controls.maxAzimuthAngle = 3*Math.PI / 8;
}

function createLights() {

    const ambientLight = new THREE.AmbientLight(0xffffff, 0);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(5, 1, 2);
    scene.add(mainLight);

}