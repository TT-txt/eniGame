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
                            break;

                        case 'n':
                            dispenserArrow.rotation.set(-Math.PI / 2, 0, 0);
                            break;

                        case 'e':
                            dispenserArrow.rotation.set(0, 0, -Math.PI / 2);

                            break;
                        case 's':
                            dispenserArrow.rotation.set(Math.PI / 2, 0, 0);

                            //Checks the max travel distance of an arrow
                            let closestObstacle = currentLevel.maps[currentMap].floor.z;
                            for (wall of currentLevel.maps[currentMap].walls) {
                                if (wall.z < closestObstacle && wall.z > trap.coord.z && trap.coord.x == wall.x && trap.coord.y == wall.y) {
                                    closestObstacle = wall.z;
                                }
                            }
                            for (logic of currentLevel.maps[currentMap].logics) {
                                if (logic.type == 1 && logic.coord.z < closestObstacle && logic.coord.z > trap.coord.z && trap.coord.x == logic.coord.x && trap.coord.y == logic.coord.y + 0.1) {
                                    closestObstacle = logic.coord.z;
                                }
                            }
                            // Display the arrow
                            console.log(closestObstacle);
                            while (dispenserArrow.position.z + 1 <= closestObstacle) {
                                dispenserArrow.position.z += 0.1;
                                console.log("ZOUF");
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

                    break;
                case 2: //arrow infinite
                    //Death detection
                    if (!trapped) {
                        arrowDeathDetection(elt, heroPos);
                    }
                    //Arrow display
                    if (arrowMesh != undefined) {
                        if (arrowIn) {
                            switch (elt.facing) {
                                case 'e':
                                    if (dropperArrow.position.x < map.floor.x) {
                                        // If the arrow hits a wall
                                        for (let wall of currentLevel.maps[currentMap].walls) {
                                            //If the arrow is in a wall
                                            if (dropperArrow.position.z == wall.z && dropperArrow.position.x + 1 >= wall.x) {
                                                scene.remove(dropperArrow);
                                                arrowIn = false;
                                            }
                                        }
                                        for (let logic of currentLevel.maps[currentMap].logics) {
                                            //If the arrow is in a box
                                            if (logic.type == 1 && dropperArrow.position.z == logic.coord.z && dropperArrow.position.x + 1 >= logic.coord.x) {
                                                scene.remove(dropperArrow);
                                                arrowIn = false;
                                            }
                                        }
                                        dropperArrow.position.x += 0.1;
                                    }
                                    else {
                                        scene.remove(dropperArrow);
                                        arrowIn = false;
                                    }
                                    break;
                                case 'w':
                                    if (dropperArrow.position.x > 0) {
                                        // If the arrow hits a wall
                                        for (let wall of currentLevel.maps[currentMap].walls) {
                                            //If the arrow is in a wall
                                            if (dropperArrow.position.z == wall.z && dropperArrow.position.x - 1 <= wall.x) {
                                                scene.remove(dropperArrow);
                                                arrowIn = false;
                                            }
                                        }
                                        for (let logic of currentLevel.maps[currentMap].logics) {
                                            //If the arrow is in a box
                                            if (logic.type == 1 && dropperArrow.position.z == logic.coord.z && dropperArrow.position.x - 1 <= logic.coord.x) {
                                                scene.remove(dropperArrow);
                                                arrowIn = false;
                                            }
                                        }
                                        dropperArrow.position.x -= 0.1;
                                    }
                                    else {
                                        scene.remove(dropperArrow);
                                        arrowIn = false;
                                    }
                                    break;
                                case 'n':
                                    if (dropperArrow.position.z > 0) {
                                        // If the arrow hits a wall
                                        for (let wall of currentLevel.maps[currentMap].walls) {
                                            //If the arrow is in a wall
                                            if (dropperArrow.position.x == wall.x && dropperArrow.position.z - 1 <= wall.z) {
                                                scene.remove(dropperArrow);
                                                arrowIn = false;
                                            }
                                        }
                                        for (let logic of currentLevel.maps[currentMap].logics) {
                                            //If the arrow is in a box
                                            if (logic.type == 1 && dropperArrow.position.x == logic.coord.x && dropperArrow.position.z - 1 <= logic.coord.z) {
                                                scene.remove(dropperArrow);
                                                arrowIn = false;
                                            }
                                        }
                                        dropperArrow.position.z -= 0.1;
                                    }
                                    else {
                                        scene.remove(dropperArrow);
                                        arrowIn = false;
                                    }
                                    break;
                                case 's':
                                    if (dropperArrow.position.z < map.floor.z) {
                                        // If the arrow hits a wall
                                        for (let wall of currentLevel.maps[currentMap].walls) {
                                            //If the arrow is in a wall
                                            if (dropperArrow.position.x == wall.x && dropperArrow.position.z + 1 >= wall.z) {
                                                scene.remove(dropperArrow);
                                                arrowIn = false;
                                            }
                                        }
                                        for (let logic of currentLevel.maps[currentMap].logics) {
                                            //If the arrow is in a box
                                            if (logic.type == 1 && dropperArrow.position.x == logic.coord.x && dropperArrow.position.z + 1 >= logic.coord.z) {
                                                scene.remove(dropperArrow);
                                                arrowIn = false;
                                            }
                                        }
                                        dropperArrow.position.z += 0.1;
                                    }
                                    else {
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
                }
            }
            break;
        default:
            break;
    }
}