function createSkybox() {
    let materialArray = [];
    const texture_ft = new THREE.TextureLoader().load('textures/skybox/right.png');
    const texture_bk = new THREE.TextureLoader().load('textures/skybox/left.png');
    const texture_up = new THREE.TextureLoader().load('textures/skybox/top.png');
    const texture_dn = new THREE.TextureLoader().load('textures/skybox/bottom.png');
    const texture_rt = new THREE.TextureLoader().load('textures/skybox/front.png');
    const texture_lf = new THREE.TextureLoader().load('textures/skybox/back.png');

    //Not affected by light
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

    for (let i = 0; i < 6; i++)
        materialArray[i].side = THREE.BackSide;

    let skyboxGeo = new THREE.BoxBufferGeometry(50, 50, 50);
    let skybox = new THREE.Mesh(skyboxGeo, materialArray);
    skybox.position.set(currentLevel.maps[currentMap].floor.x / 2, 0, currentLevel.maps[currentMap].floor.z / 2);
    skybox.name = "Skybox";
    scene.add(skybox);
}

function createMesh() { 
    let textureLoader = new THREE.TextureLoader();

    //loading and encoding textures
    const wallTextureCobble = textureLoader.load('textures/env/walls/stoneBrick.png');
    const wallTextureCracked = textureLoader.load('textures/env/walls/crackedStoneBrick.png');
    const wallTextureMossy = textureLoader.load('textures/env/walls/mossyStoneBricks.png');
    const floorTexture = textureLoader.load('textures/env/floor/stone.png');
    const doorTexture = textureLoader.load('textures/logic/door.png');
    const pressurePlateTexture = textureLoader.load('textures/logic/pressurePlate.png');
    const pushableBoxTexture = textureLoader.load('textures/logic/pushableBox.png');
    const dispenserFrontTexture = textureLoader.load('textures/trap/dispenser/dispenserFront.png');
    const dispenserSideTexture = textureLoader.load('textures/trap/dispenser/dispenserSide.png');
    const dispenserTopTexture = textureLoader.load('textures/trap/dispenser/dispenserTop.png');
    const dropperFrontTexture = textureLoader.load('textures/trap/dropper/dropperFront.png');
    const dropperSideTexture = textureLoader.load('textures/trap/dropper/dropperSide.png');
    const dropperTopTexture = textureLoader.load('textures/trap/dropper/dropperTop.png');
    const smokerFrontTexture = textureLoader.load('textures/trap/smoker/smokerFront.png');
    const smokerSideTexture = textureLoader.load('textures/trap/smoker/smokerSide.png');
    const smokerTopTexture = textureLoader.load('textures/trap/smoker/smokerTop.png');

    dispenserMaterial.push(new THREE.MeshStandardMaterial({map : dispenserFrontTexture}));
    dispenserMaterial.push(new THREE.MeshStandardMaterial({map : dispenserSideTexture}));
    dispenserMaterial.push(new THREE.MeshStandardMaterial({map : dispenserTopTexture}));
    dispenserMaterial.push(new THREE.MeshStandardMaterial({map : dispenserSideTexture}));
    dispenserMaterial.push(new THREE.MeshStandardMaterial({map : dispenserSideTexture}));
    dispenserMaterial.push(new THREE.MeshStandardMaterial({map : dispenserSideTexture}));

    dropperMaterial.push(new THREE.MeshStandardMaterial({map : dropperFrontTexture}));
    dropperMaterial.push(new THREE.MeshStandardMaterial({map : dropperSideTexture}));
    dropperMaterial.push(new THREE.MeshStandardMaterial({map : dropperTopTexture}));
    dropperMaterial.push(new THREE.MeshStandardMaterial({map : dropperSideTexture}));
    dropperMaterial.push(new THREE.MeshStandardMaterial({map : dropperSideTexture}));
    dropperMaterial.push(new THREE.MeshStandardMaterial({map : dropperSideTexture}));

    smokerMaterial.push(new THREE.MeshStandardMaterial({map : smokerFrontTexture}));
    smokerMaterial.push(new THREE.MeshStandardMaterial({map : smokerSideTexture}));
    smokerMaterial.push(new THREE.MeshStandardMaterial({map : smokerTopTexture}));
    smokerMaterial.push(new THREE.MeshStandardMaterial({map : smokerSideTexture}));
    smokerMaterial.push(new THREE.MeshStandardMaterial({map : smokerSideTexture}));
    smokerMaterial.push(new THREE.MeshStandardMaterial({map : smokerSideTexture}));

    floorTexture.encoding = THREE.sRGBEncoding;
    floorTexture.anisotropy = 16;
    
    wallTextureCobble.encoding = THREE.sRGBEncoding;
    wallTextureCobble.anisotropy = 16;
    wallTextureCracked.encoding = THREE.sRGBEncoding;
    wallTextureCracked.anisotropy = 16;
    wallTextureMossy.encoding = THREE.sRGBEncoding;
    wallTextureMossy.anisotropy = 16;
    
    doorTexture.encoding = THREE.sRGBEncoding;
    doorTexture.anisotropy = 16;
    
    pressurePlateTexture.encoding = THREE.sRGBEncoding;
    pressurePlateTexture.anisotropy = 16;
    
    pushableBoxTexture.encoding = THREE.sRGBEncoding;
    pushableBoxTexture.anisotropy = 16;
    
    dispenserFrontTexture.encoding = THREE.sRGBEncoding;
    dispenserFrontTexture.anisotropy = 16;
    dispenserSideTexture.encoding = THREE.sRGBEncoding;
    dispenserSideTexture.anisotropy = 16;
    dispenserTopTexture.encoding = THREE.sRGBEncoding;
    dispenserTopTexture.anisotropy = 16;
    
    dropperFrontTexture.encoding = THREE.sRGBEncoding;
    dropperFrontTexture.anisotropy = 16;
    dropperSideTexture.encoding = THREE.sRGBEncoding;
    dropperSideTexture.anisotropy = 16;
    dropperTopTexture.encoding = THREE.sRGBEncoding;
    dropperTopTexture.anisotropy = 16;
    
    smokerFrontTexture.encoding = THREE.sRGBEncoding;
    smokerFrontTexture.anisotropy = 16;
    smokerSideTexture.encoding = THREE.sRGBEncoding;
    smokerSideTexture.anisotropy = 16;
    smokerTopTexture.encoding = THREE.sRGBEncoding;
    smokerTopTexture.anisotropy = 16;

    //creating materials
    floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
    wallMaterialCobble = new THREE.MeshStandardMaterial({ map: wallTextureCobble });
    wallMaterialCracked = new THREE.MeshStandardMaterial({ map: wallTextureCracked });
    wallMaterialMossy = new THREE.MeshStandardMaterial({ map: wallTextureMossy });
    doorMaterial = new THREE.MeshStandardMaterial({ map: doorTexture });
    pressurePlateMaterial = new THREE.MeshStandardMaterial({ map: pressurePlateTexture });
    pushableBoxMaterial = new THREE.MeshStandardMaterial({ map : pushableBoxTexture });
    
    //creating geometry
    cube = new THREE.BoxBufferGeometry(1, 1, 1);
    flatRectangle = new THREE.BoxBufferGeometry(0.9, 0.05, 0.9);
    slimRectangle = new THREE.BoxBufferGeometry(0.25, 2, 1);
}