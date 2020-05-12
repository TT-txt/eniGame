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
    skybox.position.set(0, 0, 0);
    scene.add(skybox);
}

function createMap(mapConstructor) {
    //creating map group
    const map = new THREE.Group();
    //loading everything in order to make the floor
    let textureLoader = new THREE.TextureLoader();
    const floorTexture = textureLoader.load('textures/stone.png');
    floorTexture.encoding = THREE.sRGBEncoding;
    floorTexture.anisotropy = 16;
    const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
    const block = new THREE.BoxBufferGeometry(1, 1, 1);
    const floor = new THREE.Group();
    floor.name = "Floor";
    //loading everything to create a wall
    //loading and encoding textures
    const wallTextureCobble = textureLoader.load('textures/stoneBrick.png');
    const wallTextureCracked = textureLoader.load('textures/crackedStoneBrick.png');
    const wallTextureMossy = textureLoader.load('textures/mossyStoneBricks.png');
    wallTextureCobble.encoding = THREE.sRGBEncoding;
    wallTextureCobble.anisotropy = 16;
    wallTextureCracked.encoding = THREE.sRGBEncoding;
    wallTextureCracked.anisotropy = 16;
    wallTextureMossy.encoding = THREE.sRGBEncoding;
    wallTextureMossy.anisotropy = 16;
    //creating materials
    const wallMaterialCobble = new THREE.MeshStandardMaterial({ map: wallTextureCobble });
    const wallMaterialCracked = new THREE.MeshStandardMaterial({ map: wallTextureCracked });
    const wallMaterialMossy = new THREE.MeshStandardMaterial({ map: wallTextureMossy });
    const walls = new THREE.Group();
    walls.name = "Walls";

    const backWalls = new THREE.Group();

    for (let x = 0; x < 5; x -= -1) {
        for (let z = 0; z < 5; z -= -1) {
            let floorPart = new THREE.Mesh(block, floorMaterial);
            floorPart.position.set(x, 0, z);
            floor.add(floorPart);
        }
    }

    //Right and Bottom exits
    let rightExit = new THREE.Mesh(block, wallMaterialCobble);
    rightExit.position.set(5, 0, 2);
    floor.add(rightExit);
    let bottomExit = new THREE.Mesh(block, wallMaterialCobble);
    bottomExit.position.set(2, 0, 5);
    floor.add(bottomExit);

    for (coord of mapConstructor.walls) {
        let texture_choice = Math.random() * 10 % 5;
        if (texture_choice <= 3) {
            //normal stonebrick;
            let wallPartBrick = new THREE.Mesh(block, wallMaterialCobble);
            wallPartBrick.position.set(coord.x, coord.y, coord.z);
            walls.add(wallPartBrick);
        }
        else if (texture_choice > 3 && texture_choice <= 4) {
            //cracked
            let wallPartCracked = new THREE.Mesh(block, wallMaterialCracked);
            wallPartCracked.position.set(coord.x, coord.y, coord.z);
            walls.add(wallPartCracked);
        }
        else {
            //mossy
            let wallPartMossy = new THREE.Mesh(block, wallMaterialMossy);
            wallPartMossy.position.set(coord.x, coord.y, coord.z);
            walls.add(wallPartMossy);
        }
    }

    for (let z = 0; z < 5; z -= -1) {
        for (let y = 0; y < 4; y -= -1) {
            if (y > 2 || z != 2) {
                let texture_choice = Math.random() * 10 % 5;
                if (texture_choice <= 3) {
                    //normal stonebrick;
                    let wallBackPartBrick = new THREE.Mesh(block, wallMaterialCobble);
                    wallBackPartBrick.position.set(-1, y, z);
                    backWalls.add(wallBackPartBrick);
                }
                else if (texture_choice > 3 && texture_choice <= 4) {
                    //cracked
                    let wallBackPartCracked = new THREE.Mesh(block, wallMaterialCracked);
                    wallBackPartCracked.position.set(-1, y, z);
                    backWalls.add(wallBackPartCracked);
                }
                else {
                    //mossy
                    let wallBackPartMossy = new THREE.Mesh(block, wallMaterialMossy);
                    wallBackPartMossy.position.set(-1, y, z);
                    backWalls.add(wallBackPartMossy);
                }
            }
        }
    }

    for (let x = -1; x < 5; x -= -1) {
        for (let y = 0; y < 4; y -= -1) {
            if (y > 2 || x != 2) {
                let texture_choice = Math.random() * 10 % 5;
                if (texture_choice <= 3) {
                    //normal stonebrick;
                    let wallBackPartBrick = new THREE.Mesh(block, wallMaterialCobble);
                    wallBackPartBrick.position.set(x, y, -1);
                    backWalls.add(wallBackPartBrick);
                }
                else if (texture_choice > 3 && texture_choice <= 4) {
                    //cracked
                    let wallBackPartCracked = new THREE.Mesh(block, wallMaterialCracked);
                    wallBackPartCracked.position.set(x, y, -1);
                    backWalls.add(wallBackPartCracked);
                }
                else {
                    //mossy
                    let wallBackPartMossy = new THREE.Mesh(block, wallMaterialMossy);
                    wallBackPartMossy.position.set(x, y, -1);
                    backWalls.add(wallBackPartMossy);
                }
            }
        }
    }

    scene.add(backWalls);
    scene.add(floor);
    scene.add(walls);
    scene.add(map);
}