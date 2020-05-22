function createMap(mapConstructor) {
    //removing the camera, controls and skybox to generate the scene
    scene.remove(camera);
    scene.remove(controls);

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
    pushableBoxes.meshes.length = 0; //FUNNY HAHA STACK OVERFLOW SOLUTION
    while(pushableBoxes.meshes.length > 0){
        pushableBoxes.meshes.pop();
    }

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
                        dropper.rotation.y -= Math.PI / 2;
                        trap.add(dropper);
                        break;
                    case 'n':
                        dropper.rotation.y += Math.PI / 2;
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
                        smoker.rotation.y -= Math.PI / 2;
                        trap.add(smoker);
                        break;
                    case 'n':
                        smoker.rotation.y += Math.PI / 2;
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

    //Creates an object that contains every pushableBox of the current Map

    for (let i = 0; i < mapConstructor.logics.length; i++) {

        if (mapConstructor.logics[i].coord.x > mapConstructor.floor.x - 1 || mapConstructor.logics[i].coord.y > mapConstructor.y - 1 || mapConstructor.logics[i].coord.z > mapConstructor.z - 1 || mapConstructor.logics[i].coord.z < 0 || mapConstructor.logics[i].coord.y < 0 || mapConstructor.logics[i].coord.z < 0) continue;
        switch (mapConstructor.logics[i].type) {
            case 0: //Pressure plate
                pressurePlate = new THREE.Mesh(flatRectangle, pressurePlateMaterial);
                pressurePlate.position.set(mapConstructor.logics[i].coord.x, mapConstructor.logics[i].coord.y - 0.49, mapConstructor.logics[i].coord.z);
                currentLevel.maps[currentMap].logics[i].activated = false;//NO PROBLEM HERE
                pushableBoxes.meshes[i] = null;
                logic.add(pressurePlate);
                break;
            case 1://Pushable box
                pushableBox = new THREE.Mesh(cube, pushableBoxMaterial);
                pushableBox.position.set(mapConstructor.logics[i].activated.x, mapConstructor.logics[i].activated.y - 0.1, mapConstructor.logics[i].activated.z);
                mapConstructor.logics[i].coord.x = mapConstructor.logics[i].activated.x;
                mapConstructor.logics[i].coord.y = mapConstructor.logics[i].activated.y - 0.1;
                mapConstructor.logics[i].coord.z = mapConstructor.logics[i].activated.z;
                pushableBox.scale.set(0.8, 0.8, 0.8);
                pushableBoxes.meshes[i] = pushableBox;
                logic.add(pushableBox);
                break;
            default:
                break;
        }
    }
    
    //spawning the hero
    hero.position.set(mapConstructor.spawnPoint.x, mapConstructor.spawnPoint.y - 0.5, mapConstructor.spawnPoint.z);

    //creating the camera + controls + skybox
    createCamera();
    createControls();

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
        if (3 - death > 0) {
            lifeCounterStr = 'Successfuly reseted, you have ' + (3 - death) + ' lives left';
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
        console.log("Permanent death");
    } else {
        //location.reload();
        console.log("Are you sure that you died that many times");
    }
}

//Game Over 
function gameOver(state) {
    //state == true => You've beaten the level !
    //state == false => You've lost
    document.getElementById("scene-container").childNodes[5].remove();
    let mainToRebuild = document.getElementById("scene-container");

    if (state) {
        /********* 10 MESSAGES *********
        - Tututututu tutuuuuuuuu VICTORY
        - Well, you’re not that bad after all
        - Don’t show off, that was the easiest level
        - All this time to complete one level ? Guess you had a hard time
        - You were lucky, believe us...
        - You won! Finally...
        - You deserve an oscar!
        - What a triumph!
        - What you did here was almost impressive
        - I'll find your cheats you little sly dog!
        *******************************/

        let message = '<div id="winScreen" style="background-color:black; width: 100%; height:100%;" ><p class="text-center" style="color:white; font-size:150%; font-family:\'8bit_wondernominal\'; padding-top:250px; line-height:2.5;"><span class="text-success" style="font-size:200%">Victory</span><br/>';
        let rand = Math.random();
        if (rand < 0.1) {
            message += 'Tututututu tutuuuuuuuu VICTORY';
        } else if(rand >= 0.1 && rand < 0.2) {
            message += 'Well, you\’re not that bad after all';
        } else if(rand >= 0.2 && rand < 0.3) {
            message += 'Don\'t show off, that was the easiest level';
        } else if(rand >= 0.3 && rand < 0.4) {
            message += 'All this time to complete one level...<br/> Guess you had a hard time';
        } else if(rand >= 0.4 && rand < 0.5) {
            message += 'You were lucky, believe us..';
        } else if(rand >= 0.5 && rand < 0.6) {
            message += 'You won! Finally...';
        } else if(rand >= 0.6 && rand < 0.7) {
            message += 'You deserve an oscar!';
        } else if(rand >= 0.7 && rand < 0.8) {
            message += 'What a triumph!';
        } else if(rand >= 0.8 && rand < 0.9) {
            message += 'What you did here was almost impressive.';
        } else {
            message += 'I\'ll find your cheats you little sly dog!';
    }
        message += '</p><button id="CONTINUE" type="button" class="btn btn-outline-secondary" onclick="">CONTINUE</button><button id="QUIT" type="button" class="btn btn-success" onclick="window.location.href=\'home.php\'">QUIT</button></div>';
        mainToRebuild.innerHTML += message;
    }
    else {
        /********* 16 MESSAGES *********
        - Good day to die don't you think...
        - The Devil will forgive you :)
        - Even Grandma would perform better...
        - You must be drunk...
        - Oh no... you're bad... try again...
        - Not cool to be blind hum...
        - No brain no gain...
        - I didn't know you could die with this...
        - It's not even made to kill you O_o...
        - Estimated time to finish this level: 3 years...
        - Even our bot didn't die on that...
        - This is like real life<br/>No more respawns...
        - Well... I guess you didn't read our detailed rules...
        - True, but what should we do with this death...
        - Go commit tortilla chip...
        - Ask TT for some help...
        *******************************/

        let message = '<div id="deathScreen" style="background-color:black; width: 100%; height:100%;" ><p class="text-center" style="color:white; font-size:150%; font-family:\'8bit_wondernominal\'; padding-top:250px; line-height:2.5;"><span class="text-danger" style="font-size:200%">Game Over</span><br/>';
        let rand = Math.random() * 10 % 10;
        if (rand < 0.625) {
            message += 'Good day to die don\'t you think...';
        } else if (rand >= 0.625 && rand < 1.25) {
            message += 'The Devil will forgive you :)';
        } else if (rand >= 1.25 && rand < 1.875) {
            message += 'Even Grandma would perform better...';
        } else if (rand >= 1.875 && rand < 2.5) {
            message += 'You must be drunk...';
        } else if (rand >= 2.5 && rand < 3.125) {
            message += 'Oh no... you\'re bad... try again...';
        } else if (rand >= 3.125 && rand < 3.75) {
            message += 'Not cool to be blind hum...';
        } else if (rand >= 3.75 && rand < 4.375) {
            message += 'No brain no gain...';
        } else if (rand >= 4.375 && rand < 5) {
            message += 'I didn\'t know you could die with this...';
        } else if (rand >= 5 && rand < 5.625) {
            message += 'It\'s not even made to kill you O_o...';
        } else if (rand >= 5.625 && rand < 6.25) {
            message += 'Estimated time to finish this level: 3 years...';
        } else if (rand >= 6.25 && rand < 6.875) {
            message += 'Even our bot didn\'t die on that...';
        } else if (rand >= 6.875 && rand < 7.5) {
            message += 'This is like real life<br/>No more respawns...';
        } else if (rand >= 7.5 && rand < 8.125) {
            message += 'Well... I guess you didn\'t read our detailed rules...';
        } else if (rand >= 8.125 && rand < 8.75) {
            message += 'True, but what should we do with this death...';
        } else if (rand >= 8.75 && rand < 9.375) {
            message += 'Go commit tortilla chip...';
        } else {
            message += 'Ask TT for some help...';
        }

        message += '</p><button id="REPLAY" type="button" class="btn btn-outline-secondary" onclick="">REPLAY</button><button id="SCORE" type="button" class="btn btn-success" onclick="window.location.href=\'score.php\'">Score</button></div>';
        mainToRebuild.innerHTML += message;
    }
}