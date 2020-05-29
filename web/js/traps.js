let trapped = false;
let boxing = false;
unmovableBox = false;

function trapTrigger(trap, heroPos, gameStarted) {
    if (gameStarted && !trapped) {
        switch (trap.type) {
            case 0://SPIKES
                if (heroPos.x == trap.coord.x && heroPos.z == trap.coord.z) trapped = true;
                deathNotif.error('You died, press R to <strong>restart</strong>');
                oof.play();
                break;

            case 1: //ARROW DISPENSER 1
                //create arrow mesh
                if (!trap.activated) {
                    dispenserArrow = arrowMesh.clone();
                    dispenserArrow.name = "Dispenser Arrow";
                    scene.add(dispenserArrow);
                    dispenserArrow.scale.set(0.01, 0.01, 0.01);
                    dispenserArrow.position.set(trap.coord.x, trap.coord.y, trap.coord.z);
                    trap.activated = true;

                    //Checks if the player should be dead
                    if (!trapped) {
                        arrowDeathDetection(trap, heroPos);
                    }

                    //Display of the arrow
                    switch (trap.facing) {
                        case 'w':
                            dispenserArrow.rotation.set(0, 0, Math.PI / 2);
                            closestDispenserObstacle = 0;
                            for (wall of currentLevel.maps[currentMap].walls) {
                                if (wall.x > closestDispenserObstacle && wall.x < trap.coord.x && trap.coord.z == wall.z && trap.coord.y == wall.y) {
                                    closestDispenserObstacle = wall.x;
                                }
                            }
                            for (logic of currentLevel.maps[currentMap].logics) {
                                if (logic.type == 1 && logic.coord.x > closestDispenserObstacle && logic.coord.x < trap.coord.x && trap.coord.z == logic.coord.z && trap.coord.y == logic.coord.y + 0.1) {
                                    closestDispenserObstacle = logic.coord.x;
                                }
                            }
                            break;
                        case 'n':
                            dispenserArrow.rotation.set(-Math.PI / 2, 0, 0);
                            //Checks the max travel distance of an arrow
                            closestDispenserObstacle = 0;
                            for (wall of currentLevel.maps[currentMap].walls) {
                                if (wall.z > closestDispenserObstacle && wall.z < trap.coord.z && trap.coord.x == wall.x && trap.coord.y == wall.y) {
                                    closestDispenserObstacle = wall.x;
                                }
                            }
                            for (logic of currentLevel.maps[currentMap].logics) {
                                if (logic.type == 1 && logic.coord.z > closestDispenserObstacle && logic.coord.z < trap.coord.z && trap.coord.x == logic.coord.x && trap.coord.y == logic.coord.y + 0.1) {
                                    closestDispenserObstacle = logic.coord.x;
                                }
                            }
                            break;
                        case 'e':
                            dispenserArrow.rotation.set(0, 0, -Math.PI / 2);
                            //Checks the max travel distance of an arrow
                            closestDispenserObstacle = currentLevel.maps[currentMap].floor.x;
                            for (wall of currentLevel.maps[currentMap].walls) {
                                if (wall.x < closestDispenserObstacle && wall.x > trap.coord.x && trap.coord.z == wall.z && trap.coord.y == wall.y) {
                                    closestDispenserObstacle = wall.x;
                                }
                            }
                            for (logic of currentLevel.maps[currentMap].logics) {
                                if (logic.type == 1 && logic.coord.x < closestDispenserObstacle && logic.coord.x > trap.coord.x && trap.coord.z == logic.coord.z && trap.coord.y == logic.coord.y + 0.1) {
                                    closestDispenserObstacle = logic.coord.x;
                                }
                            }
                            break;
                        case 's':
                            dispenserArrow.rotation.set(Math.PI / 2, 0, 0);
                            //Checks the max travel distance of an arrow
                            closestDispenserObstacle = currentLevel.maps[currentMap].floor.z;
                            for (wall of currentLevel.maps[currentMap].walls) {
                                if (wall.z < closestDispenserObstacle && wall.z > trap.coord.z && trap.coord.x == wall.x && trap.coord.y == wall.y) {
                                    closestDispenserObstacle = wall.z;
                                }
                            }
                            for (logic of currentLevel.maps[currentMap].logics) {
                                if (logic.type == 1 && logic.coord.z < closestDispenserObstacle && logic.coord.z > trap.coord.z && trap.coord.x == logic.coord.x && trap.coord.y == logic.coord.y + 0.1) {
                                    closestDispenserObstacle = logic.coord.z;
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
                break;

            case 2:
                if (trap.activated) trap.activated = false;
                else if (!trap.activated) trap.activated = true;
                scene.remove(dropperArrow);
                break;
            case 3:
                firecharge = new THREE.Mesh(fireMesh.geometry, fireMesh.material);
                firecharge.name = "Firecharge";
                if (trap.activated){
                    trap.activated = false;
                    for(let elt of scene.children){ 
                        if(elt.name == "Cube") scene.remove(elt);
                    }
                }
                else if (!trap.activated) trap.activated = true;
            default:
                break;
        }
    }
}

function trapActivate(map, heroPos) {
    for (let elt of map.traps) {
        if (elt.activated) {
            switch (elt.type) {
                case 0://SPIKES
                    //box event made in event.js
                    if (!trapped && heroPos.x == elt.coord.x && elt.coord.z == heroPos.z) {
                        trapped = true;
                        console.log("DEAD!");
                        oof.play();
                        deathNotif.error('You died, press R to <strong>restart</strong>');
                    }
                    break;
                case 1://ARROW ONCE
                    arrowSound.play();
                    switch(elt.facing){
                        case 'e':
                            if(dispenserArrow.position.x + 1 <= closestDispenserObstacle) dispenserArrow.position.x += 0.1;
                            else{ 
                                scene.remove(dispenserArrow);
                                elt.activated = false;
                            }
                            break;
                        case 's':
                            if(dispenserArrow.position.z + 1 <= closestDispenserObstacle) dispenserArrow.position.z+=0.1;
                            else{ 
                                scene.remove(dispenserArrow);
                                elt.activated = false;
                            }
                            break;
                        case 'w':
                            if(dispenserArrow.position.x >= closestDispenserObstacle + 0.5) dispenserArrow.position.x-=0.1;
                            else{ 
                                scene.remove(dispenserArrow);
                                elt.activated = false;
                            }
                            break;
                        case 'n':
                            if(dispenserArrow.position.z >= closestDispenserObstacle + 0.5) dispenserArrow.position.z-=0.1;
                            else{ 
                                scene.remove(dispenserArrow);
                                elt.activated = false;
                            }
                            break;
                    }
                    break; //comment this line in order to have funny shit
                case 2: //arrow infinite
                    //Death detection
                    if (!trapped) {
                        arrowDeathDetection(elt, heroPos);
                    }
                    //Arrow display
                    if (arrowMesh != undefined) {
                        if (arrowIn) {
                            switch(elt.facing){
                                case 'e':
                                    if(dropperArrow.position.x + 1 <= closestDropperObstacle) dropperArrow.position.x += 0.1;
                                    else{ 
                                        scene.remove(dropperArrow);
                                        arrowIn = false;
                                    }
                                    break;
                                case 's':
                                    if(dropperArrow.position.z + 1 <= closestDropperObstacle) dropperArrow.position.z+=0.1;
                                    else{ 
                                        scene.remove(dropperArrow);
                                        arrowIn = false;
                                    }
                                    break;
                                case 'w':
                                    if(dropperArrow.position.x - 1 >= closestDropperObstacle) dropperArrow.position.x-=0.1;
                                    else{ 
                                        scene.remove(dropperArrow);
                                        arrowIn = false;
                                    }
                                    break;
                                case 'n':
                                    if(dropperArrow.position.z - 1 >= closestDropperObstacle) dropperArrow.position.z-=0.1;
                                    else{ 
                                        scene.remove(dropperArrow);
                                        arrowIn = false;
                                    }
                                    break;
                            }
                        }
                        else {
                            dropperArrow = arrowMesh.clone();
                            dropperArrow.position.set(elt.coord.x, elt.coord.y, elt.coord.z);
                            arrowIn = true;
                            scene.add(dropperArrow);
                            dropperArrow.scale.set(0.01, 0.01, 0.01);
                            switch (elt.facing) {
                                case 'w':
                                    dropperArrow.rotation.set(0, 0, Math.PI / 2);
                                    closestDropperObstacle = 0;
                                    for (wall of currentLevel.maps[currentMap].walls) {
                                        if (wall.x > closestDropperObstacle && wall.x < elt.coord.x && elt.coord.z == wall.z && elt.coord.y == wall.y) {
                                            closestDropperObstacle = wall.x;
                                        }
                                    }
                                    for (logic of currentLevel.maps[currentMap].logics) {
                                        if (logic.type == 1 && logic.coord.x > closestDropperObstacle && logic.coord.x < elt.coord.x && elt.coord.z == logic.coord.z && elt.coord.y == logic.coord.y + 0.1) {
                                            closestDropperObstacle = logic.coord.x;
                                        }
                                    }
                                    break;
                                case 'n':
                                    dropperArrow.rotation.set(-Math.PI / 2, 0, 0);
                                    //Checks the max travel distance of an arrow
                                    closestDropperObstacle = 0;
                                    for (wall of currentLevel.maps[currentMap].walls) {
                                        if (wall.z > closestDropperObstacle && wall.z < elt.coord.z && elt.coord.x == wall.x && elt.coord.y == wall.y) {
                                            closestDropperObstacle = wall.x;
                                        }
                                    }
                                    for (logic of currentLevel.maps[currentMap].logics) {
                                        if (logic.type == 1 && logic.coord.z > closestDropperObstacle && logic.coord.z < elt.coord.z && elt.coord.x == logic.coord.x && elt.coord.y == logic.coord.y + 0.1) {
                                            closestDropperObstacle = logic.coord.x;
                                        }
                                    }
                                    break;
                                case 'e':
                                    dropperArrow.rotation.set(0, 0, -Math.PI / 2);
                                    //Checks the max travel distance of an arrow
                                    closestDropperObstacle = currentLevel.maps[currentMap].floor.x;
                                    for (wall of currentLevel.maps[currentMap].walls) {
                                        if (wall.x < closestDropperObstacle && wall.x > elt.coord.x && elt.coord.z == wall.z && elt.coord.y == wall.y) {
                                            closestDropperObstacle = wall.x;
                                        }
                                    }
                                    for (logic of currentLevel.maps[currentMap].logics) {
                                        if (logic.type == 1 && logic.coord.x < closestDropperObstacle && logic.coord.x > elt.coord.x && elt.coord.z == logic.coord.z && elt.coord.y == logic.coord.y + 0.1) {
                                            closestDropperObstacle = logic.coord.x;
                                        }
                                    }
                                    break;
                                case 's':
                                    dropperArrow.rotation.set(Math.PI / 2, 0, 0);
                                    //Checks the max travel distance of an arrow
                                    closestDropperObstacle = currentLevel.maps[currentMap].floor.z;
                                    for (wall of currentLevel.maps[currentMap].walls) {
                                        if (wall.z < closestDropperObstacle && wall.z > elt.coord.z && elt.coord.x == wall.x && elt.coord.y == wall.y) {
                                            closestDropperObstacle = wall.z;
                                        }
                                    }
                                    for (logic of currentLevel.maps[currentMap].logics) {
                                        if (logic.type == 1 && logic.coord.z < closestDropperObstacle && logic.coord.z > elt.coord.z && elt.coord.x == logic.coord.x && elt.coord.y == logic.coord.y + 0.1) {
                                            closestDropperObstacle = logic.coord.z;
                                        }
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    break;

                case 3:
                    if (!trapped) {
                        switch (elt.facing) {
                            case 'e':
                                if (elt.coord.z == heroPos.z && elt.coord.x < heroPos.x) {
                                    trapped = true;
                                    scene.remove(firecharge);
                                    console.log("DEAD!");
                                    oof.play();
                                    deathNotif.error('You died, press R to <strong>restart</strong>');
                                }
                                break;
                            case 'n':
                                if (elt.coord.x == heroPos.x && elt.coord.z > heroPos.z) {
                                    trapped = true;
                                    scene.remove(firecharge);
                                    console.log("DEAD!");
                                    deathNotif.error('You died, press R to <strong>restart</strong>');
                                    oof.play();
                                }
                                break;
                            case 'w':
                                if (elt.coord.z == heroPos.z && elt.coord.x > heroPos.x) {
                                    trapped = true;
                                    scene.remove(firecharge);
                                    console.log("DEAD!");
                                    oof.play();
                                    deathNotif.error('You died, press R to <strong>restart</strong>');
                                }
                                break;
                            case 's':
                                if (elt.coord.x == heroPos.x && elt.coord.z < heroPos.z) {
                                    trapped = true;
                                    scene.remove(firecharge);
                                    console.log("DEAD!");
                                    oof.play();
                                    deathNotif.error('You died, press R to <strong>restart</strong>');
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    if (fireMesh != undefined) {
                        if (fireIn) {
                            switch (elt.facing) {
                                case 'e':
                                    if (firecharge.position.x <= map.floor.x) {
                                        firecharge.position.x += 0.2;
                                        firecharge.rotation.x += 0.2;
                                        firecharge.rotation.y += 0.2;
                                        firecharge.rotation.z += 0.2;
                                    }
                                    else {
                                        scene.remove(firecharge);
                                        fireIn = false;
                                    }
                                    break;
                                case 'w':
                                    if (firecharge.position.x >= 0) {
                                        firecharge.position.x -= 0.2;
                                        firecharge.rotation.x += 0.2;
                                        firecharge.rotation.y += 0.2;
                                        firecharge.rotation.z += 0.2;
                                    }
                                    else {
                                        scene.remove(firecharge);
                                        fireIn = false;
                                    }
                                    break;
                                case 'n':
                                    if (firecharge.position.z >= 0) {
                                        firecharge.position.z -= 0.2;
                                        firecharge.rotation.x += 0.2;
                                        firecharge.rotation.y += 0.2;
                                        firecharge.rotation.z += 0.2;
                                    }
                                    else {
                                        scene.remove(firecharge);
                                        fireIn = false;
                                    }
                                    break;
                                case 's':
                                    if (firecharge.position.z <= map.floor.z) {
                                        firecharge.position.z += 0.2;
                                        firecharge.rotation.x += 0.2;
                                        firecharge.rotation.y += 0.2;
                                        firecharge.rotation.z += 0.2;
                                    }
                                    else {
                                        scene.remove(firecharge);
                                        fireIn = false;
                                    }
                                    break;
                            }
                        }
                        else {
                            firecharge = fireMesh.clone();
                            firecharge.position.set(elt.coord.x, elt.coord.y, elt.coord.z);
                            fireIn = true;
                            scene.add(firecharge);
                            firecharge.scale.set(0.2, 0.2, 0.2);
                        }
                    }
                    break;
            }
        }
    }
}

function arrowDeathDetection(elt, heroPos) {
    boxing = false;
    switch (elt.facing) {
        case 'e':
            for (let wall of currentLevel.maps[currentMap].walls) {
                if (wall.z == elt.coord.z && elt.coord.x < wall.x && heroPos.x > wall.x && wall.y == elt.coord.y) {
                    boxing = true;
                    break;
                }
                else boxing = false;
            }
            if (!boxing && elt.coord.z == heroPos.z && elt.coord.x < heroPos.x) {
                for (let element of currentLevel.maps[currentMap].logics) {
                    if (element.type == 1 && element.coord.z == elt.coord.z && elt.coord.x < element.coord.x && heroPos.x > element.coord.x && element.coord.y + 0.1 == elt.coord.y) {
                        boxing = true;
                        break;
                    }
                    else boxing = false;
                }
                if (!boxing) {
                    trapped = true;
                    deathNotif.error('You died, press R to <strong>restart</strong>');
                    console.log("DEAD");
                    oof.play();
                }
            }
            break;
        case 'n':
            for (let wall of currentLevel.maps[currentMap].walls) {
                if (wall.x == elt.coord.x && elt.coord.z > wall.z && heroPos.z < wall.z && wall.y == elt.coord.y) {
                    boxing = true;
                    break;
                }
                else boxing = false;
            }
            if (!boxing && elt.coord.x == heroPos.x && elt.coord.z > heroPos.z) {
                for (let element of currentLevel.maps[currentMap].logics) {
                    if (element.type == 1 && element.coord.x == elt.coord.x && elt.coord.z > element.coord.z && heroPos.z < element.coord.z && element.coord.y + 0.1 == elt.coord.y) {
                        boxing = true;
                        break;
                    }
                    else boxing = false;
                }
                if (!boxing) {
                    trapped = true;
                    deathNotif.error('You died, press R to <strong>restart</strong>');
                    console.log("DEAD");
                    oof.play();
                }
            }
            break;
        case 'w':
            for (let wall of currentLevel.maps[currentMap].walls) {
                if (wall.z == elt.coord.z && elt.coord.x > wall.x && heroPos.x < wall.x && wall.y == elt.coord.y) {
                    boxing = true;
                    break;
                }
                else boxing = false;
            }
            if (!boxing && elt.coord.z == heroPos.z && elt.coord.x > heroPos.x) {
                for (let element of currentLevel.maps[currentMap].logics) {
                    if (element.type == 1 && element.coord.z == elt.coord.z && elt.coord.x > element.coord.x && heroPos.x < element.coord.x && element.coord.y + 0.1 == elt.coord.y) {
                        boxing = true;
                        break;
                    }
                    else boxing = false;
                }
                if (!boxing) {
                    trapped = true;
                    deathNotif.error('You died, press R to <strong>restart</strong>');
                    console.log("DEAD");
                    oof.play();
                }
            }
            break;
        case 's':
            for (let wall of currentLevel.maps[currentMap].walls) {
                if (wall.x == elt.coord.x && elt.coord.z < wall.z && heroPos.z > wall.z && wall.y == elt.coord.y) {
                    boxing = true;
                    break;
                }
                else boxing = false;
            }
            if (!boxing && elt.coord.x == heroPos.x && elt.coord.z < heroPos.z) {
                for (let element of currentLevel.maps[currentMap].logics) {
                    if (element.type == 1 && element.coord.x == elt.coord.x && elt.coord.z < element.coord.z && heroPos.z > element.coord.z && element.coord.y + 0.1 == elt.coord.y) {
                        boxing = true;
                        break;
                    }
                    else boxing = false;
                }
                if (!boxing) {
                    trapped = true;
                    deathNotif.error('You died, press R to <strong>restart</strong>');
                    console.log("DEAD");
                    oof.play();
                }
            }
            break;
        default:
            break;
    }
}