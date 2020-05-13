function createMap(mapConstructor) {
    //generating the groups
    const map = new THREE.Group();
    map.name = "Map; everything is here !";
    const floor = new THREE.Group();
    floor.name = "Floor";
    const walls = new THREE.Group();
    walls.name = "Walls";
    const backWalls = new THREE.Group();
    backWalls.name = "BackWalls";
    let exits = new THREE.Group();
    exits.name = "Exits";
    let logic = new THREE.Group();
    logic.name = "Logic";

    //creating the floor
    for (let x = 0; x < mapConstructor.floor.x; x -= -1) {
        for (let z = 0; z < mapConstructor.floor.z; z -= -1) {
            let floorPart = new THREE.Mesh(block, floorMaterial);
            floorPart.position.set(x, 0, z);
            floor.add(floorPart);
        }
    }

    //Exits NEED UPDATE TO ADD DOORS on exit
    for(let elt = 0; elt < mapConstructor.exits.length; elt-=-1){
        let exit = new THREE.Mesh(block, wallMaterialCobble);
        exit.position.set(mapConstructor.exits[elt].x, mapConstructor.exits[elt].y, mapConstructor.exits[elt].z);
        exits.add(exit);
        switch(elt){
            case 0:
                let doorTopLeft = new THREE.Mesh(SlimRectangle, doorTopMaterial);
                let doorBottomLeft = new THREE.Mesh(SlimRectangle, doorBottomMaterial);
                doorTopLeft.position.set(mapConstructor.exits[elt].x+0.4, 2, mapConstructor.exits[elt].y);
                doorBottomLeft.position.set(mapConstructor.exits[elt].x+0.4, 1, mapConstructor.exits[elt].y);
                exit.add(doorTopLeft);
                exit.add(doorBottomLeft);
                break;
        }
    }

    //Creating walls
    for (coord of mapConstructor.walls) {
        if(coord.x > mapConstructor.floor.x - 1 || coord.y > mapConstructor.y - 1 || coord.z > mapConstructor.z - 1|| coord.z < 0 || coord.y < 0 || coord.z < 0) continue;
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

    //creating BackWalls
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

    //Creating logic elements
    for(let elt of mapConstructor.logics){
        if(elt.coord.x > mapConstructor.floor.x - 1 || elt.coord.y > mapConstructor.y - 1 || elt.coord.z > mapConstructor.z - 1|| elt.coord.z < 0 || elt.coord.y < 0 || elt.coord.z < 0) continue;
        switch(elt.type){
            case 0: //pressure plate
                pressurePlate = new THREE.Mesh(flatRectangle, pressurePlateMaterial);
                pressurePlate.position.set(elt.coord.x, elt.coord.y, elt.coord.z);
                logic.add(pressurePlate);
                break;
            default:
                continue;
        }
    }

    map.add(backWalls);
    map.add(floor);
    map.add(walls);
    map.add(exits);
    map.add(logic);
    scene.add(map);
}