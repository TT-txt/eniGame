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

    let skyboxGeo = new THREE.BoxBufferGeometry(35, 35, 35);
    let skybox = new THREE.Mesh(skyboxGeo, materialArray);
    skybox.position.set(currentLevel.maps[currentMap].floor.x / 2, 0, currentLevel.maps[currentMap].floor.z / 2);
    scene.add(skybox);
}

function createMesh() { //TT well made; probably gonna shit one day or another
    let textureLoader = new THREE.TextureLoader();

    //loading and encoding textures
    const wallTextureCobble = textureLoader.load('textures/stoneBrick.png');
    const wallTextureCracked = textureLoader.load('textures/crackedStoneBrick.png');
    const wallTextureMossy = textureLoader.load('textures/mossyStoneBricks.png');
    const floorTexture = textureLoader.load('textures/stone.png');
    const doorTopTexture = textureLoader.load('textures/doorTop.png');
    const doorBottomTexture = textureLoader.load('textures/doorBottom.png');
    const pressurePlateTexture = textureLoader.load('textures/pressurePlate.png');    

    floorTexture.encoding = THREE.sRGBEncoding;
    floorTexture.anisotropy = 16;
    wallTextureCobble.encoding = THREE.sRGBEncoding;
    wallTextureCobble.anisotropy = 16;
    wallTextureCracked.encoding = THREE.sRGBEncoding;
    wallTextureCracked.anisotropy = 16;
    wallTextureMossy.encoding = THREE.sRGBEncoding;
    wallTextureMossy.anisotropy = 16;
    doorTopTexture.encoding = THREE.sRGBEncoding;
    doorTopTexture.anisotropy = 16;
    doorBottomTexture.encoding = THREE.sRGBEncoding;
    doorBottomTexture.anisotropy = 16;
    pressurePlateTexture.encoding = THREE.sRGBEncoding;
    pressurePlateTexture.anisotropy = 16;

    //creating materials
    floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
    wallMaterialCobble = new THREE.MeshStandardMaterial({ map: wallTextureCobble });
    wallMaterialCracked = new THREE.MeshStandardMaterial({ map: wallTextureCracked });
    wallMaterialMossy = new THREE.MeshStandardMaterial({ map: wallTextureMossy });
    doorTopMaterial = new THREE.MeshStandardMaterial({ map: doorTopTexture });
    doorBottomMaterial = new THREE.MeshStandardMaterial({ map: doorBottomTexture });
    pressurePlateMaterial = new THREE.MeshStandardMaterial({ map: pressurePlateTexture });
    
    //creating geometry
    block = new THREE.BoxBufferGeometry(1, 1, 1);
    flatRectangle = new THREE.BoxBufferGeometry(1, 0.1, 1);
    SlimRectangle = new THREE.BoxBufferGeometry(0.5, 1, 1)
}