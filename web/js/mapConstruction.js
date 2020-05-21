function createMap(mapConstructor) {
    currentLevel.maps[currentMap].solved = false;
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

    //Exits
    //Doors groups reset
    for (child of doorL.children) doorL.children.pop();//removes the previous meshes added to each door
    for (child of doorT.children) doorT.children.pop();
    for (child of doorR.children) doorR.children.pop();
    for (child of doorB.children) doorB.children.pop();

    for (let elt = 0; elt < mapConstructor.exits.length; elt += 1) {
        if (mapConstructor.exits[elt]) {//in order to not have 
            if ((mapConstructor.exits[elt].x < 0 || mapConstructor.exits[elt].x == mapConstructor.floor.x) || (mapConstructor.exits[elt].z < 0 || mapConstructor.exits[elt].z == mapConstructor.floor.z) && mapConstructor.exits[elt].y == 0) {
                let exit = new THREE.Mesh(cube, wallMaterialCobble);
                exit.position.set(mapConstructor.exits[elt].x, mapConstructor.exits[elt].y, mapConstructor.exits[elt].z);
                exits.add(exit);
                switch (elt) {
                    case 0:
                        let doorLeft = new THREE.Mesh(slimRectangle, doorMaterial);
                        doorL.add(doorLeft);
                        doorL.rotation.set(0, 0, 0);
                        doorL.position.set(mapConstructor.exits[elt].x, 1.5, mapConstructor.exits[elt].z);
                        break;
                    case 1:
                        let doorTop = new THREE.Mesh(slimRectangle, doorMaterial);
                        doorT.add(doorTop);
                        doorT.rotation.set(0, Math.PI / 2, 0);
                        doorT.position.set(mapConstructor.exits[elt].x, 1.5, mapConstructor.exits[elt].z);
                        break;
                    case 2:
                        doorRight = new THREE.Mesh(slimRectangle, doorMaterial);
                        doorR.add(doorRight);
                        doorR.rotation.set(0, Math.PI, 0);
                        doorR.position.set(mapConstructor.exits[elt].x, 1.5, mapConstructor.exits[elt].z);
                        break;
                    case 3:
                        let doorBottom = new THREE.Mesh(slimRectangle, doorMaterial);
                        doorB.add(doorBottom);
                        doorB.rotation.set(0, -Math.PI / 2, 0);
                        doorB.position.set(mapConstructor.exits[elt].x, 1.5, mapConstructor.exits[elt].z);
                        break;
                }
            }
        }
        else {
            mapConstructor.exits[elt] = false;
            continue
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

    for (let elt of mapConstructor.traps) {
        if (elt.coord.x > mapConstructor.floor.x - 1 || elt.coord.y > mapConstructor.y - 1 || elt.coord.z > mapConstructor.z - 1 || elt.coord.z < 0 || elt.coord.y < 0 || elt.coord.z < 0) continue;
        switch (elt.type) {
            case 0://SPIKES
                let spikes = spikesMesh.clone();
                spikes.position.set(elt.coord.x + 0.25, elt.coord.y + 1, elt.coord.z - 0.25);
                trap.add(spikes);
                elt.activated = true;
                break;
            case 1://arrow 1
                let dispenser = new THREE.Mesh(cube, dispenserMaterial);
                dispenser.position.set(elt.coord.x, elt.coord.y, elt.coord.z);
                elt.activated = false;
                switch (elt.facing) {
                    case 'e':
                        trap.add(dispenser);
                        break;
                    case 's':
                        dispenser.rotation.y += Math.PI / 2;
                        trap.add(dispenser);
                        break;
                    case 'n':
                        dispenser.rotation.y -= Math.PI / 2;
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
            case 2: //arrow infinite
                let dropper = new THREE.Mesh(cube, dropperMaterial);
                dropper.position.set(elt.coord.x, elt.coord.y, elt.coord.z);
                for (let element of mapConstructor.logics) {
                    if (element.group == elt.group && element.onUse == elt.type && element.activated && elt.activated) elt.activated = false;
                    else if (element.group == elt.group && element.onUse == elt.type && element.activated && !elt.activated) elt.activated = true;
                    else if (element.group == elt.group && element.onUse == elt.type && !element.activated && elt.activated) elt.activated = true;
                    else if (element.group == elt.group && element.onUse == elt.type && !element.activated && !elt.activated) elt.activated = false;
                }
                switch (elt.facing) {
                    case 'e':
                        trap.add(dropper);
                        break;
                    case 's':
                        dropper.rotation.y += Math.PI / 2;
                        trap.add(dropper);
                        break;
                    case 'n':
                        dropper.rotation.y -= Math.PI / 2;
                        trap.add(dropper);
                        break;
                    case 'w':
                        dropper.rotation.y += Math.PI;
                        trap.add(dropper);
                        break;
                    default:
                        continue;
                }
                break;
            case 3://flames
                let smoker = new THREE.Mesh(cube, smokerMaterial);
                smoker.position.set(elt.coord.x, elt.coord.y, elt.coord.z);
                switch (elt.facing) {
                    case 'e':
                        trap.add(smoker);
                        break;
                    case 's':
                        smoker.rotation.y += Math.PI / 2;
                        trap.add(smoker);
                        break;
                    case 'n':
                        smoker.rotation.y -= Math.PI / 2;
                        trap.add(smoker);
                        break;
                    case 'w':
                        smoker.rotation.y += Math.PI;
                        trap.add(smoker);
                        break;
                    default:
                        continue;
                }
                break;
            default:
                continue;
        }
    }

    //Creating logic elements
    for (let i = 0; i < mapConstructor.logics.length; i++) {
        if (mapConstructor.logics[i].coord.x > mapConstructor.floor.x - 1 || mapConstructor.logics[i].coord.y > mapConstructor.y - 1 || mapConstructor.logics[i].coord.z > mapConstructor.z - 1 || mapConstructor.logics[i].coord.z < 0 || mapConstructor.logics[i].coord.y < 0 || mapConstructor.logics[i].coord.z < 0) continue;
        switch (mapConstructor.logics[i].type) {
            case 0: //Pressure plate
                pressurePlate = new THREE.Mesh(flatRectangle, pressurePlateMaterial);
                pressurePlate.position.set(mapConstructor.logics[i].coord.x, mapConstructor.logics[i].coord.y - 0.49, mapConstructor.logics[i].coord.z);
                currentLevel.maps[currentMap].logics[i].activated = false;//NO PROBLEM HERE
                logic.add(pressurePlate);
                break;
            case 1://Pushable box
                pushableBox = new THREE.Mesh(cube, pushableBoxMaterial);
                pushableBox.position.set(mapConstructor.logics[i].activated.x, mapConstructor.logics[i].activated.y - 0.1, mapConstructor.logics[i].activated.z);
                mapConstructor.logics[i].coord.x = mapConstructor.logics[i].activated.x;
                mapConstructor.logics[i].coord.y = mapConstructor.logics[i].activated.y - 0.1;
                mapConstructor.logics[i].coord.z = mapConstructor.logics[i].activated.z;
                pushableBox.scale.set(0.8, 0.8, 0.8);
                logic.add(pushableBox);
                break;
            default:
                break;
        }
    }

    //spawning the hero
    hero.position.set(mapConstructor.spawnPoint.x, mapConstructor.spawnPoint.y - 0.5, mapConstructor.spawnPoint.z);

    gameStarted = true;
    trapped = false;
    blocked = false;

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

//Map Reset
function mapReset(stuck) {
    if (stuck) {
        death += 1;
        deathNotif.dismissAll();
        resetNotif.dismissAll();
        if(3-death > 0){
            lifeCounterStr = 'Successfuly reseted, you have '+ (3-death) + ' lives left';
            resetNotif.success(lifeCounterStr);
        }
        else deathNotif.error('No lives left, game over...');
    }
    if (death < 3) {
        doorClose();
        for (child of scene.children) {
            if (child.name == "Map") { //getting the array position of the map group in order to reset it
                scene.remove(child); //removing it
                gameStarted = false;
                currentLevel.maps[currentMap].solved = false;
                break;
            }
            if (typeof (dropperArrow) != 'undefined') scene.remove(dropperArrow);
            if (typeof (dispenserArrow) != 'undefined') scene.remove(dispenserArrow);
            if (typeof (firecharge) != 'undefined') scene.remove(firecharge);
        }
        createMap(currentLevel.maps[currentMap]); //re creating the map
    } else if (death == 3) {
        gameOver(false);
        console.log("ZOUF");
    } else {
        //location.reload();
        console.log("Are you sure that you died that many times");
    }
}

//Game Over 
function gameOver(state){
    //state == true => You've beaten the level !
    //state == false => You've lost
    document.getElementById("scene-container").childNodes[5].remove();
    let mainToRebuild = document.getElementById("scene-container");
    mainToRebuild.innerHTML += '<div>DEATH SCREEN</div>';
    //const parent = document.querySelector("#scene-container");
    //if (parent != null) parent.parentNode.removeChild(parent);
    
    if(state){
            
    }
    
    else{

    }
}