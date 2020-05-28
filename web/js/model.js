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
    loader.load("models/firecharge.glb", handleBasiccc_load);

    function handleBasic_load(gltf) {
        //Model without animation
        spikesMesh = gltf.scene.children[0];
    }

    function handleBasicc_load(gltf){
        //Model without animation
        arrowMesh = gltf.scene.children[0];
    }

    function handleBasiccc_load(gltf){
        //Model without animation
        fireMesh = gltf.scene.children[0];
    }

    //LOADING SOUNDS
    var listener = new THREE.AudioListener();
    camera.add( listener );
    oof = new THREE.Audio(listener);
    doorSound = new THREE.Audio(listener);
    arrowSound = new THREE.Audio(listener);
    pressureSound = new THREE.Audio(listener);

    //load a sound and set it as the Audio object's buffer
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( 'sounds/oof.ogg', function( buffer ) {
        oof.setBuffer( buffer );
        oof.setLoop( false );
        oof.setVolume( 0.5 );
    });
    audioLoader.load( 'sounds/doors.ogg', function( buffer ) {
        doorSound.setBuffer( buffer );
        doorSound.setLoop( false );
        doorSound.setVolume( 0.5 );
    });
    audioLoader.load( 'sounds/arrow.ogg', function( buffer ) {
        arrowSound.setBuffer( buffer );
        arrowSound.setLoop( false );
        arrowSound.setVolume( 0.5 );
    });
    audioLoader.load( 'sounds/pressure.ogg', function( buffer ) {
        pressureSound.setBuffer( buffer );
        pressureSound.setLoop( false );
        pressureSound.setVolume( 0.5 );
    });
}