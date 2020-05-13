function createMap(mapConstructor) {
    //creating map group
    const map = new THREE.Group();
    map.name = "Map; everything is here !"
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
    
    //creating the backWalls
    const backWalls = new THREE.Group();

    for (let x = 0; x < mapConstructor.floor.x; x -= -1) {
        for (let z = 0; z < mapConstructor.floor.z; z -= -1) {
            let floorPart = new THREE.Mesh(block, floorMaterial);
            floorPart.position.set(x, 0, z);
            floor.add(floorPart);
        }
    }

    //Exits
    let exits = new THREE.Group();
    exits.name = "Exits";
    for(let elt of mapConstructor.exits){
        let exit = new THREE.Mesh(block, wallMaterialCobble);
        exit.position.set(elt.x, elt.y, elt.z);
        exits.add(exit);
    }

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

    for (let y = 0; y < 4; y -= -1) {
        for (let z = 0; z < mapConstructor.floor.z; z -= -1) {
            if (y > 2 || mapConstructor.exits[0].z != z) {
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
        for (let x = -1; x < mapConstructor.floor.x; x -= -1) {
            if (y > 2 || x != mapConstructor.exits[1].x) {
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
    map.add(backWalls);
    map.add(floor);
    map.add(walls);
    map.add(exits);
    scene.add(map);
}