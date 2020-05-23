let trapped = false;
let boxing = false;
unmovableBox = false;

function trapTrigger(trap, heroPos, gameStarted) {
    if (gameStarted && !trapped) {
        switch (trap.type) {
            case 0://SPIKES
                if (heroPos.x == trap.coord.x && heroPos.z == trap.coord.z) trapped = true;
                deathNotif.error('You died, press R to <strong>restart</strong>');
                break;

            case 1: //ARROW DISPENSER 1
                //create arrow mesh
                dispenserArrowD = {
                    x: currentLevel.maps[currentMap].floor.x,
                    y: 0,
                    z: currentLevel.maps[currentMap].floor.z
                }
                console.log("DISPENSER AFFICHE");
                dispenserArrow = arrowMesh.clone();
                scene.add(dispenserArrow);
                dispenserArrow.scale.set(0.01, 0.01, 0.01);
                dispenserArrow.position.set(trap.coord.x, trap.coord.y, trap.coord.z);
                switch (trap.facing) {
                    case 'e':
                        dispenserArrow.rotation.set(Math.PI / 2, 0, -Math.PI / 2);
                        trap.activated = true;
                        for (let element of currentLevel.maps[currentMap].logics) {
                            if (element.type == 1 && element.coord.z == trap.coord.z && trap.coord.x < element.coord.x && heroPos.x > element.coord.x && element.coord.y + 0.1 == trap.coord.y) {
                                boxing = true;
                                break;
                            }
                            else boxing = false;
                        }
                        //WORKING THORICALY
                        for (let wall of currentLevel.maps[currentMap].walls) {
                            if (wall.z == trap.coord.z && wall.x > trap.coord.x && wall.y == trap.coord.y) {
                                if (heroPos.z == wall.z && wall.x < heroPos.x) {
                                    boxing = true;
                                    dispenserArrowD.x = wall.x;
                                    break;
                                }
                            }
                        }
                        if (!boxing && trap.coord.z == heroPos.z && trap.coord.x < heroPos.x) {
                            trapped = true;
                            console.log("DEAD");
                            deathNotif.error('You died, press R to <strong>restart</strong>');
                        }
                        break;
                    case 'n':
                        dispenserArrow.rotation.set(-Math.PI / 2, 0, 0);
                        trap.activated = true;
                        for (let element of currentLevel.maps[currentMap].logics) {
                            if (element.type == 1 && element.coord.x == trap.coord.x && element.coord.z > trap.coord.z && element.coord.z < heroPos.z && element.coord.y + 0.1 == trap.coord.y) {
                                boxing = true;
                                break;
                            }
                            else boxing = false;
                        }
                        for (let wall of currentLevel.maps[currentMap].walls) {
                            if (wall.x == trap.coord.x && wall.z < trap.coord.z && wall.y == trap.coord.y) {
                                if (heroPos.x == wall.x && wall.z > heroPos.z) {
                                    boxing = true;
                                    dispenserArrowD.z = wall.z;
                                    break;
                                }
                            }
                        }
                        if (!boxing && trap.coord.x == heroPos.x && trap.coord.z > heroPos.z) {
                            trapped = true;
                            console.log("DEAD!");
                            deathNotif.error('You died, press R to <strong>restart</strong>');
                        }
                        break;
                    case 'w':
                        dispenserArrow.rotation.set(0, 0, Math.PI / 2);
                        trap.activated = true;
                        for (let element of currentLevel.maps[currentMap].logics) {
                            if (element.type == 1 && trap.coord.x > element.coord.x && trap.coord.z == element.coord.z && element.coord.x > heroPos.x && trap.coord.y == element.coord.y + 0.1) {
                                boxing = true;
                                break;
                            }
                            else boxing = false;
                        }
                        for (let wall of currentLevel.maps[currentMap].walls) {
                            if (wall.z == trap.coord.z && wall.x < trap.coord.x && wall.y == trap.coord.y) {
                                if (heroPos.z == wall.z && wall.x > heroPos.x) {
                                    boxing = true;
                                    dispenserArrowD.x = wall.x;
                                    break;
                                }
                            }
                        }
                        if (!boxing && trap.coord.z == heroPos.z && trap.coord.x > heroPos.x) {
                            trapped = true;
                            console.log("DEAD!");
                            deathNotif.error('You died, press R to <strong>restart</strong>');
                        }
                        break;
                    case 's':
                        dispenserArrow.rotation.set(Math.PI / 2, 0, 0);
                        trap.activated = true;
                        for (let element of currentLevel.maps[currentMap].logics) {
                            if (element.type == 1 && trap.coord.x == trap.coord.x && element.coord.z < trap.coord.z && heroPos.z < element.coord.z && trap.coord.y == element.coord.y + 0.1) {
                                boxing = true;
                                break;
                            }
                            else boxing = false;
                        }
                        for (let wall of currentLevel.maps[currentMap].walls) {
                            if (wall.x == trap.coord.x && wall.z > trap.coord.z && wall.y == trap.coord.y) {
                                if (heroPos.x == wall.x && wall.z < heroPos.z) {
                                    boxing = true;
                                    dispenserArrowD.z = wall.z;
                                    break;
                                }
                            }
                        }
                        if (!boxing && trap.coord.x == heroPos.x && trap.coord.z < heroPos.z) {
                            trapped = true;
                            console.log("DEAD!");
                            deathNotif.error('You died, press R to <strong>restart</strong>');
                        }
                        break;
                    default:
                        break;
                }
                break;
            case 2:
                if (trap.activated) trap.activated = false;
                else if (!trap.activated) trap.activated = true;
                scene.remove(dropperArrow);
                break;
            case 3:
                if (trap.activated) trap.activated = false;
                else if (!trap.activated) trap.activated = true;
                scene.remove(firecharge);
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
                        deathNotif.error('You died, press R to <strong>restart</strong>');
                    }
                    break;
                case 1://ARROW ONCE
                    switch (elt.facing) {//TOFIX HERE IS THE PB IDK HOW TO DO MATHS§
                        case 'e':
                            if (dispenserArrow.position.x <= dispenserArrowD.x) dispenserArrow.position.x += 0.2;
                            else scene.remove(dispenserArrow);
                            break;
                        case 'w':
                            if (dispenserArrow.position.x >= map.floor.x - dispenserArrowD.x) dispenserArrow.position.x -= 0.2;
                            else scene.remove(dispenserArrow);
                            break;
                        case 'n':
                            if (dispenserArrow.position.z <= map.floor.z - dispenserArrowD.z) dispenserArrow.position.z -= 0.2;
                            else scene.remove(dispenserArrow);
                            break;
                        case 's':
                            if (dispenserArrow.position.z >= elt.coord.z + dispenserArrowD.z) dispenserArrow.position.z += 0.2;
                            else scene.remove(dispenserArrow);
                            break;
                    }
                    break;
                case 2: //arrow infinite
                    //Death detection
                    if (!trapped) {
                        switch (elt.facing) {
                            case 'e':
                                for (let element of currentLevel.maps[currentMap].logics) {
                                    if (element.type == 1 && element.coord.z == elt.coord.z && elt.coord.x < element.coord.x && heroPos.x > element.coord.x && element.coord.y + 0.1 == elt.coord.y) {
                                        boxing = true;
                                        break;
                                    }
                                    else boxing = false;
                                }
                                if (!boxing && elt.coord.z == heroPos.z && elt.coord.x < heroPos.x) {
                                    trapped = true;
                                    deathNotif.error('You died, press R to <strong>restart</strong>');
                                    console.log("DEAD");
                                }
                                break;
                            case 'n':
                                for (let element of currentLevel.maps[currentMap].logics) {
                                    if (element.type == 1 && element.coord.x == elt.coord.x && element.coord.z < elt.coord.z && element.coord.z > heroPos.z && element.coord.y + 0.1 == elt.coord.y) {
                                        boxing = true;
                                        break;
                                    }
                                    else boxing = false;
                                }
                                if (!boxing && elt.coord.x == heroPos.x && elt.coord.z > heroPos.z) {
                                    trapped = true;
                                    deathNotif.error('You died, press R to <strong>restart</strong>');
                                    console.log("DEAD!");
                                }
                                break;
                            case 'w':
                                for (let element of currentLevel.maps[currentMap].logics) {
                                    if (element.type == 1 && elt.coord.x > element.coord.x && elt.coord.z == element.coord.z && element.coord.x > heroPos.x && elt.coord.y == element.coord.y + 0.1) {
                                        boxing = true;
                                        break;
                                    }
                                    else boxing = false;
                                }
                                if (!boxing && elt.coord.z == heroPos.z && elt.coord.x > heroPos.x) {
                                    trapped = true;
                                    deathNotif.error('You died, press R to <strong>restart</strong>');
                                    console.log("DEAD!");
                                }
                                break;
                            case 's':
                                for (let element of currentLevel.maps[currentMap].logics) {
                                    if (element.type == 1 && elt.coord.x == elt.coord.x && element.coord.z > elt.coord.z && heroPos.z > element.coord.z && elt.coord.y == element.coord.y + 0.1) {
                                        boxing = true;
                                        break;
                                    }
                                    else boxing = false;
                                }
                                if (!boxing && elt.coord.x == heroPos.x && elt.coord.z < heroPos.z) {
                                    trapped = true;
                                    console.log("DEAD!");
                                    deathNotif.error('You died, press R to <strong>restart</strong>');
                                }
                                break;
                            default:
                                break;
                        }
                    }

                    //Arrow display
                    if (arrowMesh != undefined) {
                        if (arrowIn) {
                            console.log("DROPPER AFFICHE");
                            switch (elt.facing) {
                                case 'e':
                                    if (dropperArrow.position.x <= map.floor.x) dropperArrow.position.x += 0.2;
                                    else {
                                        scene.remove(dropperArrow);
                                        arrowIn = false;
                                    }
                                    break;
                                case 'w':
                                    if (dropperArrow.position.x >= 0) dropperArrow.position.x -= 0.2;
                                    else {
                                        scene.remove(dropperArrow);
                                        arrowIn = false;
                                    }
                                    break;
                                case 'n':
                                    if (dropperArrow.position.z >= 0) dropperArrow.position.z -= 0.2;
                                    else {
                                        scene.remove(dropperArrow);
                                        arrowIn = false;
                                    }
                                    break;
                                case 's':
                                    if (dropperArrow.position.z <= map.floor.z) dropperArrow.position.z += 0.2;
                                    else {
                                        scene.remove(dropperArrow);
                                        arrowIn = false;
                                    }
                                    break;
                            }
                        }
                        else { //AVANT ICI arrowMesh n'existe pas (arrowMesh is not defined)
                            dropperArrow = arrowMesh.clone();
                            dropperArrow.position.set(elt.coord.x, elt.coord.y, elt.coord.z);
                            arrowIn = true;
                            scene.add(dropperArrow);
                            dropperArrow.scale.set(0.01, 0.01, 0.01);
                            switch (elt.facing) {
                                case 'e':
                                    dropperArrow.rotation.set(0, 0, -Math.PI / 2);
                                    elt.activated = true;
                                    break;
                                case 'n':
                                    dropperArrow.rotation.set(-Math.PI / 2, 0, 0);
                                    elt.activated = true;
                                    break;
                                case 'w':
                                    dropperArrow.rotation.set(0, 0, Math.PI / 2);
                                    elt.activated = true;
                                    break;
                                case 's':
                                    dropperArrow.rotation.set(Math.PI / 2, 0, 0);
                                    elt.activated = true;
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
                                    console.log("DEAD!");
                                    deathNotif.error('You died, press R to <strong>restart</strong>');
                                }
                                break;
                            case 'n':
                                if (elt.coord.x == heroPos.x && elt.coord.z > heroPos.z) {
                                    trapped = true;
                                    console.log("DEAD!");
                                    deathNotif.error('You died, press R to <strong>restart</strong>');
                                }
                                break;
                            case 'w':
                                if (elt.coord.z == heroPos.z && elt.coord.x > heroPos.x) {
                                    trapped = true;
                                    console.log("DEAD!");
                                    deathNotif.error('You died, press R to <strong>restart</strong>');
                                }
                                break;
                            case 's':
                                if (elt.coord.x == heroPos.x && elt.coord.z < heroPos.z) {
                                    trapped = true;
                                    console.log("DEAD!");
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
                            console.log("FIRECHARGE AFFICHE");
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