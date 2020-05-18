function loadModels() {

    const loader = new THREE.GLTFLoader();

    loader.load("models/Soldier.glb", handleHero_load);
    //loader.load("models/Parrot.glb", handle_load); //EASTER EGG

    function handleHero_load(gltf) {
        //Playable character loader
        heroMesh = gltf.scene.children[0];
        
        const animation = gltf.animations[0];

        const mixer = new THREE.AnimationMixer(heroMesh);
        mixers.push(mixer);

        const action = mixer.clipAction(animation);
        action.play();
        hero.add(heroMesh);
        scene.add(hero);
    }

    loader.load("models/arrow.glb", handleBasicc_load);
    loader.load("models/spikes.glb", handleBasic_load);

    function handleBasic_load(gltf) {
        //Model without animation
        spikesMesh = gltf.scene.children[0];
    }

    function handleBasicc_load(gltf){
        arrowMesh = gltf.scene.children[0];
    }
}