function loadModels() {

    const loader = new THREE.GLTFLoader();

    loader.load("models/Soldier.glb", handle_load);

    function handle_load(gltf) {
        heroMesh = gltf.scene.children[0];
        const animation = gltf.animations[0];

        const mixer = new THREE.AnimationMixer(heroMesh);
        mixers.push(mixer);

        const action = mixer.clipAction(animation);
        action.play();
        hero.add(heroMesh);
        scene.add(hero);
        hero.position.set(2, 0.5, 2);
    }
}