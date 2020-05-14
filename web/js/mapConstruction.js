function createMap(mapConstructor) {
    //generating the groups
    const mapBuild = new THREE.Group();
    mapBuild.name = "Map";
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
    let trap = new THREE.Group();
    trap.name = "Traps";

    //creating the floor
    for (let x = 0; x < mapConstructor.floor.x; x -= -1) {
        for (let z = 0; z < mapConstructor.floor.z; z -= -1) {
            let floorPart = new THREE.Mesh(cube, floorMaterial);
            floorPart.position.set(x, 0, z);
            floor.add(floorPart);
        }
    }

    //Exits NEED UPDATE TO ADD DOORS on exit
    for (let elt = 0; elt < mapConstructor.exits.length; elt -= -1) {
        let exit = new THREE.Mesh(cube, wallMaterialCobble);
        exit.position.set(mapConstructor.exits[elt].x, mapConstructor.exits[elt].y, mapConstructor.exits[elt].z);
        exits.add(exit);
        switch (elt) {
            case 0:
                let doorLeft = new THREE.Mesh(slimRectangle, doorMaterial);
                doorLeft.rotation.set(0, 0, 0);
                doorLeft.position.set(mapConstructor.exits[elt].x, 1.5, mapConstructor.exits[elt].z);
                doorL.add(doorLeft);
                break;
            case 1:
                let doorTop = new THREE.Mesh(slimRectangle, doorMaterial);
                doorTop.rotation.set(0, Math.PI / 2, 0);
                doorTop.position.set(mapConstructor.exits[elt].x, 1.5, mapConstructor.exits[elt].z);

                doorT.add(doorTop);
                break;
            case 2:
                let doorRight = new THREE.Mesh(slimRectangle, doorMaterial);
                doorRight.rotation.set(0, Math.PI, 0);
                doorRight.position.set(mapConstructor.exits[elt].x, 1.5, mapConstructor.exits[elt].z);

                doorR.add(doorRight);
                break;
            case 3:
                let doorBottom = new THREE.Mesh(slimRectangle, doorMaterial);
                doorBottom.rotation.set(0, -Math.PI / 2, 0);
                doorBottom.position.set(mapConstructor.exits[elt].x, 1.5, mapConstructor.exits[elt].z);

                doorB.add(doorBottom);
                break;
        }
    }

    //Creating walls
    for (coord of mapConstructor.walls) {
        if (coord.x > mapConstructor.floor.x - 1 || coord.y > mapConstructor.y - 1 || coord.z > mapConstructor.z - 1 || coord.z < 0 || coord.y < 0 || coord.z < 0) continue;
        let texture_choice = Math.random() * 10 % 5;
        if (texture_choice <= 3) {
            //normal stonebrick;
            let wallPartBrick = new THREE.Mesh(cube, wallMaterialCobble);
            wallPartBrick.position.set(coord.x, coord.y, coord.z);
            walls.add(wallPartBrick);
        }
        else if (texture_choice > 3 && texture_choice <= 4) {
            //cracked
            let wallPartCracked = new THREE.Mesh(cube, wallMaterialCracked);
            wallPartCracked.position.set(coord.x, coord.y, coord.z);
            walls.add(wallPartCracked);
        }
        else {
            //mossy
            let wallPartMossy = new THREE.Mesh(cube, wallMaterialMossy);
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
                    let wallBackPartBrick = new THREE.Mesh(cube, wallMaterialCobble);
                    wallBackPartBrick.position.set(-1, y, z);
                    backWalls.add(wallBackPartBrick);
                }
                else if (texture_choice > 3 && texture_choice <= 4) {
                    //cracked
                    let wallBackPartCracked = new THREE.Mesh(cube, wallMaterialCracked);
                    wallBackPartCracked.position.set(-1, y, z);
                    backWalls.add(wallBackPartCracked);
                }
                else {
                    //mossy
                    let wallBackPartMossy = new THREE.Mesh(cube, wallMaterialMossy);
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
                    let wallBackPartBrick = new THREE.Mesh(cube, wallMaterialCobble);
                    wallBackPartBrick.position.set(x, y, -1);
                    backWalls.add(wallBackPartBrick);
                }
                else if (texture_choice > 3 && texture_choice <= 4) {
                    //cracked
                    let wallBackPartCracked = new THREE.Mesh(cube, wallMaterialCracked);
                    wallBackPartCracked.position.set(x, y, -1);
                    backWalls.add(wallBackPartCracked);
                }
                else {
                    //mossy
                    let wallBackPartMossy = new THREE.Mesh(cube, wallMaterialMossy);
                    wallBackPartMossy.position.set(x, y, -1);
                    backWalls.add(wallBackPartMossy);
                }
            }
        }
    }

    //Creating logic elements
    for (let elt of mapConstructor.logics) {
        if (elt.coord.x > mapConstructor.floor.x - 1 || elt.coord.y > mapConstructor.y - 1 || elt.coord.z > mapConstructor.z - 1 || elt.coord.z < 0 || elt.coord.y < 0 || elt.coord.z < 0) continue;
        switch (elt.type) {
            case 0: //Pressure plate
                pressurePlate = new THREE.Mesh(flatRectangle, pressurePlateMaterial);
                pressurePlate.position.set(elt.coord.x, elt.coord.y - 0.49, elt.coord.z);
                logic.add(pressurePlate);
                break;
            case 1://Pushable box
                pushableBox = new THREE.Mesh(cube, pushableBoxMaterial);
                pushableBox.position.set(elt.activated.x, elt.activated.y - 0.1, elt.activated.z);
                elt.coord.set (elt.activated.x, elt.activated.y - 0.1, elt.activated.z)
                pushableBox.scale.set(0.8, 0.8, 0.8);
                logic.add(pushableBox);
            default:
                continue;
        }
    }

    for(let elt of mapConstructor.traps){
        if (elt.coord.x > mapConstructor.floor.x - 1 || elt.coord.y > mapConstructor.y - 1 || elt.coord.z > mapConstructor.z - 1 || elt.coord.z < 0 || elt.coord.y < 0 || elt.coord.z < 0) continue;
        switch(elt.type){
            case 0://SPIKES, to do
                break;
            case 1://arrow 1
            let dispenser = new THREE.Mesh(cube, dispenserMaterial);
            dispenser.position.set(elt.coord.x, elt.coord.y, elt.coord.z);
                switch(elt.facing){
                    case 'e':    
                        trap.add(dispenser);
                        break;
                    case 's':
                        dispenser.rotation.y+= Math.PI / 2;
                        trap.add(dispenser);
                        break;
                    case 'n':
                        dispenser.rotation.y-= Math.PI / 2;
                        trap.add(dispenser);
                        break;
                    case 'w':
                        dispenser.rotation.y += Math.PI;
                        trap.add(dispenser);
                        break;
                    default:
                        continue;
                }
                break;
            default:
                continue;
        }
    }

    //spawning the hero
    hero.position.set(mapConstructor.spawnPoint.x, mapConstructor.spawnPoint.y - 0.5, mapConstructor.spawnPoint.z);

    gameStarted = true;

    mapBuild.add(backWalls);
    mapBuild.add(floor);
    mapBuild.add(walls);
    mapBuild.add(exits);
    mapBuild.add(doorL);
    mapBuild.add(doorT);
    mapBuild.add(doorR);
    mapBuild.add(doorB);
    mapBuild.add(logic);
    mapBuild.add(trap);
    scene.add(mapBuild);
}

//Build inznnaoi fa