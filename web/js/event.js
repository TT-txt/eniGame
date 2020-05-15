
//Auto windows size
function onWindowResize() {

    // set the aspect ratio to match the new browser window aspect ratio
    camera.aspect = container.clientWidth / container.clientHeight;

    // update the camera's frustum
    camera.updateProjectionMatrix();

    // update the size of the renderer AND the canvas
    renderer.setSize(container.clientWidth, container.clientHeight);

}

window.addEventListener('resize', onWindowResize);

// Prevents scrolling with arrow keys
window.addEventListener("keydown", function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


// Player movements
var blocked = true;
var unmovableBox = false;

function checkKeyPress(key) {
    if (gameStarted) {
        blocked = false;
        unmovableBox = false;
        if (key.keyCode == "37" || key.keyCode == "81") {
            /*
            **************Left arrow key or q**************
            */
            //Change Map
            if (currentLevel.maps[currentMap].solved && hero.position.x - 1 == currentLevel.maps[currentMap].exits[0].x && hero.position.z == currentLevel.maps[currentMap].exits[0].z) {
                currentMap--;
                currentLevel.maps[currentMap].spawnPoint.set(currentLevel.maps[currentMap].exits[2].x, 1, currentLevel.maps[currentMap].exits[2].z);
                //hero.position.x -= 1;
                hero.rotation.y = Math.PI / 2;
                doorClose();
                mapReset();
            }
            if (0 == hero.position.x) {// Default Wall
                blocked = true;
            } else {
                // Manually placed walls
                for (let element of currentLevel.maps[currentMap].walls) {
                    if (element.x == hero.position.x - 1 && element.z == hero.position.z) {//Case of an alone player
                        blocked = true;
                        break;
                    }
                }

                // PushableBox special case
                for (let element of currentLevel.maps[currentMap].logics) {
                    if (element.type == 1) {
                        if (hero.position.x - 2 == -1 && hero.position.z == element.coord.z && 0 == element.coord.x) {
                            unmovableBox = true;//If a box is between the player and the default wall
                            blocked = true;
                            break;
                        }

                        if (element.coord.x == hero.position.x - 1 && element.coord.z == hero.position.z && !unmovableBox) {//Case of a pushableBox in the direction of the player's movement
                            for (let element2 of currentLevel.maps[currentMap].walls) {
                                if (element2.x == hero.position.x - 2 && element2.z == hero.position.z) {//Case of a solid wall behind the pushableBox
                                    unmovableBox = true;
                                    blocked = true;
                                    break;
                                }
                            }
                            if (!unmovableBox) {//If the pushableBox is movable
                                pushableBox.position.x -= 1;//Updating the render
                                element.coord.x -= 1;//Updating the map
                                break;
                            }
                        }
                    }
                }
            }
            if (!blocked)
                hero.position.x -= 1;
            hero.rotation.y = Math.PI / 2;

        } else if (key.keyCode == "38" || key.keyCode == "90") {
            /*
            **************Up arrow key or z**************
            */
            //Change Map
            if (currentLevel.maps[currentMap].solved && hero.position.x == currentLevel.maps[currentMap].exits[1].x && hero.position.z - 1 == currentLevel.maps[currentMap].exits[1].z) {
                currentMap -= 5;
                currentLevel.maps[currentMap].spawnPoint.set(currentLevel.maps[currentMap].exits[3].x, 1, currentLevel.maps[currentMap].exits[3].z);
                //hero.position.z -= 1;
                hero.rotation.y = 0;
                doorClose();
                mapReset();
            }

            if (0 == hero.position.z) {// Default Wall
                blocked = true;
            } else {
                // Manually placed walls
                for (let element of currentLevel.maps[currentMap].walls) {
                    if (element.x == hero.position.x && element.z == hero.position.z - 1) {//Case of an alone player
                        blocked = true;
                        break;
                    }
                }

                // PushableBox special case
                for (let element of currentLevel.maps[currentMap].logics) {
                    if (element.type == 1) {
                        if (hero.position.z - 2 == -1 && hero.position.x == element.coord.x && 0 == element.coord.z) {
                            unmovableBox = true;//If a box is between the player and the default wall
                            blocked = true;
                            break;
                        }

                        if (element.coord.x == hero.position.x && element.coord.z == hero.position.z - 1 && !unmovableBox) {//Case of a pushableBox in the direction of the player's movement
                            for (let element2 of currentLevel.maps[currentMap].walls) {
                                if (element2.x == hero.position.x && element2.z == hero.position.z - 2) {//Case of a solid wall behind the pushableBox
                                    unmovableBox = true;
                                    blocked = true;
                                    break;
                                }
                            }
                            if (!unmovableBox) {//If the pushableBox is movable
                                pushableBox.position.z -= 1;//Updating the render
                                element.coord.z -= 1; //Updating the map
                                break;
                            }
                        }
                    }
                }
            }
            if (!blocked)
                hero.position.z -= 1;
            hero.rotation.y = 0;

        } else if (key.keyCode == "39" || key.keyCode == "68") {
            /*
            **************Right arrow key or d**************
            */
            //Change Map
            if (currentLevel.maps[currentMap].solved && hero.position.x + 1 == currentLevel.maps[currentMap].exits[2].x && hero.position.z == currentLevel.maps[currentMap].exits[2].z) {
                currentMap++;
                currentLevel.maps[currentMap].spawnPoint.set(currentLevel.maps[currentMap].exits[0].x, 1, currentLevel.maps[currentMap].exits[0].z);
                //hero.position.x += 1;
                hero.rotation.y = Math.PI * 3 / 2;
                doorClose();
                mapReset();
            }
            if (currentLevel.maps[currentMap].floor.x == hero.position.x + 1) {// Default Wall
                blocked = true;
            } else {
                // Manually placed walls
                for (let element of currentLevel.maps[currentMap].walls) {
                    if (element.x == hero.position.x + 1 && element.z == hero.position.z) {//Case of an alone player
                        blocked = true;
                        break;
                    }
                }

                // PushableBox special case
                for (let element of currentLevel.maps[currentMap].logics) {
                    if (element.type == 1) {
                        if (hero.position.x + 2 == currentLevel.maps[currentMap].floor.x && hero.position.z == element.coord.z && currentLevel.maps[currentMap].floor.x - 1 == element.coord.x) {
                            unmovableBox = true;//If a box is between the player and the default wall
                            blocked = true;
                            break;
                        }

                        if (element.coord.x == hero.position.x + 1 && element.coord.z == hero.position.z && !unmovableBox) {//Case of a pushableBox in the direction of the player's movement
                            for (let element2 of currentLevel.maps[currentMap].walls) {
                                if (element2.x == hero.position.x + 2 && element2.z == hero.position.z) {//Case of a solid wall behind the pushableBox
                                    unmovableBox = true;
                                    blocked = true;
                                    break;
                                }
                            }
                            if (!unmovableBox) {//If the pushableBox is movable
                                pushableBox.position.x += 1;
                                element.coord.x += 1;
                                break;
                            }
                        }
                    }
                }
            }
            if (!blocked)
                hero.position.x += 1;
            hero.rotation.y = Math.PI * 3 / 2;

        } else if (key.keyCode == "40" || key.keyCode == "83") {
            /*
            **************Down arrow key or s**************
            */
            //Change Map
            if (currentLevel.maps[currentMap].solved && hero.position.x == currentLevel.maps[currentMap].exits[3].x && hero.position.z + 1 == currentLevel.maps[currentMap].exits[3].z) {
                for (elt of currentLevel.maps[currentMap].logics) {
                    elt.activated = false;//Resets the logics for next time
                }
                currentMap += 5;
                currentLevel.maps[currentMap].spawnPoint.set(currentLevel.maps[currentMap].exits[1].x, 1, currentLevel.maps[currentMap].exits[1].z);
                //hero.position.z += 1;
                hero.rotation.y = Math.PI;
                doorClose();
                mapReset();
            }

            if (currentLevel.maps[currentMap].floor.z == hero.position.z + 1) {// Default Wall
                blocked = true;
            } else {
                // Manually placed walls
                for (let element of currentLevel.maps[currentMap].walls) {
                    if (element.x == hero.position.x && element.z == hero.position.z + 1) {//Case of an alone player
                        blocked = true;
                        break;
                    }
                }

                // PushableBox special case
                for (let element of currentLevel.maps[currentMap].logics) {
                    if (element.type == 1) {
                        if (hero.position.z + 2 == currentLevel.maps[currentMap].floor.z && hero.position.x == element.coord.x && currentLevel.maps[currentMap].floor.z - 1 == element.coord.z) {
                            unmovableBox = true;//If a box is between the player and the default wall
                            blocked = true;
                            break;
                        }

                        if (element.coord.x == hero.position.x && element.coord.z == hero.position.z + 1 && !unmovableBox) {//Case of a pushableBox in the direction of the player's movement
                            for (let element2 of currentLevel.maps[currentMap].walls) {
                                if (element2.x == hero.position.x && element2.z == hero.position.z + 2) {//Case of a solid wall behind the pushableBox
                                    unmovableBox = true;
                                    blocked = true;
                                    break;
                                }
                            }
                            if (!unmovableBox) {//If the pushableBox is movable
                                pushableBox.position.z += 1;//Updating the render
                                element.coord.z += 1;//Updating the map.
                                break;
                            }
                        }
                    }
                }
            }
            if (!blocked)
                hero.position.z += 1;
            hero.rotation.y = Math.PI;
        } else if (key.keyCode == "82") { //checking if key pressed is r
            mapReset();
        }
    }
}

window.addEventListener("keydown", checkKeyPress, false); //false so the function doesn't return a thing