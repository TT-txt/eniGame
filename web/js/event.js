
//Auto windows size
function onWindowResize() {
    if (typeof (container) != 'undefined') {
        // set the aspect ratio to match the new browser window aspect ratio
        camera.aspect = container.clientWidth / container.clientHeight;

        // update the camera's frustum
        camera.updateProjectionMatrix();

        // update the size of the renderer AND the canvas
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
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

function checkKeyPress(key) {
    if (gameStarted) {
        blocked = false;
        unmovableBox = false;
        if ((key.keyCode == "37" || key.keyCode == "81") && !trapped) {
            /*
            **************Left arrow key or q**************
            */
            //Change Map
            if (currentLevel.maps[currentMap].solved && hero.position.x - 1 == currentLevel.maps[currentMap].exits[0].x && hero.position.z == currentLevel.maps[currentMap].exits[0].z) {
                currentMap--;
                currentLevel.maps[currentMap].spawnPoint.x = currentLevel.maps[currentMap].exits[2].x - 1;
                currentLevel.maps[currentMap].spawnPoint.y = currentLevel.maps[currentMap].exits[2].y + 1;
                currentLevel.maps[currentMap].spawnPoint.z = currentLevel.maps[currentMap].exits[2].z;
                hero.rotation.y = Math.PI / 2;
                mapReset(false);
                blocked = true;
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

                for(let tmp of currentLevel.maps[currentMap].traps){
                    if(tmp.type != 0 && hero.position.x - 1 == tmp.coor.x && hero.position.z == tmp.coord.z){
                        blocked = true;
                    }
                }

                // PushableBox special case
                for (let k = 0; k < currentLevel.maps[currentMap].logics.length; k += 1) {
                    //Check if the logic element is a box
                    if (currentLevel.maps[currentMap].logics[k].type == 1) {
                        // Check if the hero is going try to push the box
                        if (currentLevel.maps[currentMap].logics[k].coord.x == hero.position.x - 1 && currentLevel.maps[currentMap].logics[k].coord.z == hero.position.z) {
                            // Check if there is another box behind our first one
                            for (element2 of currentLevel.maps[currentMap].logics) {
                                if (element2.type == 1) {
                                    //Check if element is behind the other box
                                    if (hero.position.x - 2 == element2.coord.x && hero.position.z == element2.coord.z) {
                                        blocked = true;
                                    }
                                }
                            }

                            //Checking if the box is currently in spikes
                            for (let elt of currentLevel.maps[currentMap].traps) { //Looking for the spikes
                                if (elt.type == 0) {
                                    if (elt.coord.x == currentLevel.maps[currentMap].logics[k].coord.x && elt.coord.z == currentLevel.maps[currentMap].logics[k].coord.z) {
                                        currentLevel.maps[currentMap].logics[k].coord.y = 0;
                                        pushableBoxes.meshes[k].position.y = 0;
                                        break;
                                    }
                                }
                            }
                            if (hero.position.x - 2 == -1 && hero.position.z == currentLevel.maps[currentMap].logics[k].coord.z && 0 == currentLevel.maps[currentMap].logics[k].coord.x && !blocked) {
                                //If a box is between the player and the default wall
                                blocked = true;
                                break;
                            }
                            //Case of a solid wall behind the pushableBox
                            for (let element2 of currentLevel.maps[currentMap].walls) {
                                if (element2.x == hero.position.x - 2 && element2.z == hero.position.z) {//Case of a solid wall behind the pushableBox
                                    blocked = true;
                                    break;
                                }
                            }
                            if (!blocked) {//If the pushableBox is movable
                                pushableBoxes.meshes[k].position.x -= 1;//Updating the render
                                currentLevel.maps[currentMap].logics[k].coord.x -= 1;//Updating the map
                                break;
                            }
                        }
                    }
                }
            }
            if (!trapped) {
                if (!blocked)
                    hero.position.x -= 1;
                hero.rotation.y = Math.PI / 2;
            }
        } else if ((key.keyCode == "38" || key.keyCode == "90") && !trapped) {
            /*
            **************Up arrow key or z**************
            */
            //Change Map
            if (currentLevel.maps[currentMap].solved && hero.position.x == currentLevel.maps[currentMap].exits[1].x && hero.position.z - 1 == currentLevel.maps[currentMap].exits[1].z) {
                currentMap -= currentLevel.size;
                currentLevel.maps[currentMap].spawnPoint.x = currentLevel.maps[currentMap].exits[3].x;
                currentLevel.maps[currentMap].spawnPoint.y = currentLevel.maps[currentMap].exits[3].y + 1;
                currentLevel.maps[currentMap].spawnPoint.z = currentLevel.maps[currentMap].exits[3].z - 1;
                hero.rotation.y = 0;
                mapReset(false);
                blocked = true;
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

                for(let tmp of currentLevel.maps[currentMap].traps){
                    if(tmp.type != 0 && hero.position.z - 1 == tmp.coor.z && hero.position.x == tmp.coord.x){
                        blocked = true;
                    }
                }

                // PushableBox special case
                for (let k = 0; k < currentLevel.maps[currentMap].logics.length; k += 1) {
                    //Check if the logic element is a box
                    if (currentLevel.maps[currentMap].logics[k].type == 1) {
                        // Check if the hero is going try to push the box
                        if (currentLevel.maps[currentMap].logics[k].coord.x == hero.position.x && currentLevel.maps[currentMap].logics[k].coord.z == hero.position.z - 1) {
                            // Check if there is another box behind our first one
                            for (element2 of currentLevel.maps[currentMap].logics) {
                                if (element2.type == 1) {
                                    //Check if element is behind the other box
                                    if (hero.position.x == element2.coord.x && hero.position.z - 2 == element2.coord.z) {
                                        blocked = true;
                                    }
                                }
                            }

                            //Checking if the box is currently in spikes
                            for (let elt of currentLevel.maps[currentMap].traps) { //Looking for the spikes
                                if (elt.type == 0) {
                                    if (elt.coord.x == currentLevel.maps[currentMap].logics[k].coord.x && elt.coord.z == currentLevel.maps[currentMap].logics[k].coord.z) {
                                        currentLevel.maps[currentMap].logics[k].coord.y = 0;
                                        pushableBoxes.meshes[k].position.y = 0;
                                        break;
                                    }
                                }
                            }
                            if (hero.position.z - 2 == -1 && hero.position.x == currentLevel.maps[currentMap].logics[k].coord.x && 0 == currentLevel.maps[currentMap].logics[k].coord.z && !blocked) {
                                //If a box is between the player and the default wall
                                blocked = true;
                                break;
                            }
                            //Case of a solid wall behind the pushableBox
                            for (let element2 of currentLevel.maps[currentMap].walls) {
                                if (element2.z == hero.position.z - 2 && element2.x == hero.position.x) {//Case of a solid wall behind the pushableBox
                                    blocked = true;
                                    break;
                                }
                            }
                            if (!blocked) {//If the pushableBox is movable
                                pushableBoxes.meshes[k].position.z -= 1;//Updating the render
                                currentLevel.maps[currentMap].logics[k].coord.z -= 1;//Updating the map
                                break;
                            }
                        }
                    }
                }
            }
            if (!trapped) {
                if (!blocked)
                    hero.position.z -= 1;
                hero.rotation.y = 0;
            }

        } else if ((key.keyCode == "39" || key.keyCode == "68") && !trapped) {
            /*
            **************Right arrow key or d**************
            */
            //Change Map
            if (currentLevel.maps[currentMap].solved && hero.position.x + 1 == currentLevel.maps[currentMap].exits[2].x && hero.position.z == currentLevel.maps[currentMap].exits[2].z) {
                currentMap++;
                currentLevel.maps[currentMap].spawnPoint.x = currentLevel.maps[currentMap].exits[0].x + 1;
                currentLevel.maps[currentMap].spawnPoint.y = currentLevel.maps[currentMap].exits[0].y + 1;
                currentLevel.maps[currentMap].spawnPoint.z = currentLevel.maps[currentMap].exits[0].z;
                hero.rotation.y = Math.PI * 3 / 2;
                mapReset(false);
                blocked = true;
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

                for(let tmp of currentLevel.maps[currentMap].traps){
                    if(tmp.type != 0 && hero.position.x + 1== tmp.coor.x && hero.position.z == tmp.coord.z){
                        blocked = true;
                    }
                }

                // PushableBox special case
                for (let k = 0; k < currentLevel.maps[currentMap].logics.length; k += 1) {
                    //Check if the logic element is a box
                    if (currentLevel.maps[currentMap].logics[k].type == 1) {
                        // Check if the hero is going try to push the box
                        if (currentLevel.maps[currentMap].logics[k].coord.x == hero.position.x + 1 && currentLevel.maps[currentMap].logics[k].coord.z == hero.position.z) {
                            // Check if there is another box behind our first one
                            for (element2 of currentLevel.maps[currentMap].logics) {
                                if (element2.type == 1) {
                                    //Check if element is behind the other box
                                    if (hero.position.x + 2 == element2.coord.x && hero.position.z == element2.coord.z) {
                                        blocked = true;
                                    }
                                }
                            }

                            //Checking if the box is currently in spikes
                            for (let elt of currentLevel.maps[currentMap].traps) { //Looking for the spikes
                                if (elt.type == 0) {
                                    if (elt.coord.x == currentLevel.maps[currentMap].logics[k].coord.x && elt.coord.z == currentLevel.maps[currentMap].logics[k].coord.z) {
                                        currentLevel.maps[currentMap].logics[k].coord.y = 0;
                                        pushableBoxes.meshes[k].position.y = 0;
                                        break;
                                    }
                                }
                            }
                            if (hero.position.x + 2 == currentLevel.maps[currentMap].floor.x && hero.position.z == currentLevel.maps[currentMap].logics[k].coord.z && currentLevel.maps[currentMap].floor.x - 1 == currentLevel.maps[currentMap].logics[k].coord.x && !blocked) {
                                //If a box is between the player and the default wall
                                blocked = true;
                                break;
                            }
                            //Case of a solid wall behind the pushableBox
                            for (let element2 of currentLevel.maps[currentMap].walls) {
                                if (element2.x == hero.position.x + 2 && element2.z == hero.position.z) {
                                    blocked = true;
                                    break;
                                }
                            }
                            if (!blocked) {//If the pushableBox is movable
                                pushableBoxes.meshes[k].position.x += 1;//Updating the render
                                currentLevel.maps[currentMap].logics[k].coord.x += 1;//Updating the map
                                break;
                            }
                        }
                    }
                }
            }
            if (!trapped) {
                if (!blocked)
                    hero.position.x += 1;
                hero.rotation.y = Math.PI * 3 / 2;
            }

        } else if ((key.keyCode == "40" || key.keyCode == "83") && !trapped) {
            /*
            **************Down arrow key or s**************
            */
            //Change Map
            if (currentLevel.maps[currentMap].solved && hero.position.x == currentLevel.maps[currentMap].exits[3].x && hero.position.z + 1 == currentLevel.maps[currentMap].exits[3].z) {
                currentMap += currentLevel.size;
                currentLevel.maps[currentMap].spawnPoint.x = currentLevel.maps[currentMap].exits[1].x;
                currentLevel.maps[currentMap].spawnPoint.y = currentLevel.maps[currentMap].exits[1].y + 1;
                currentLevel.maps[currentMap].spawnPoint.z = currentLevel.maps[currentMap].exits[1].z + 1;
                hero.rotation.y = Math.PI;
                mapReset(false);
                blocked = true;
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

                for(let tmp of currentLevel.maps[currentMap].traps){
                    if(tmp.type != 0 && hero.position.x == tmp.coor.x && hero.position.z + 1 == tmp.coord.z){
                        blocked = true;
                    }
                }

                // PushableBox special case
                for (let k = 0; k < currentLevel.maps[currentMap].logics.length; k += 1) {
                    //Check if the logic element is a box
                    if (currentLevel.maps[currentMap].logics[k].type == 1) {
                        // Check if the hero is going try to push the box
                        if (currentLevel.maps[currentMap].logics[k].coord.x == hero.position.x && currentLevel.maps[currentMap].logics[k].coord.z == hero.position.z + 1) {
                            // Check if there is another box behind our first one
                            for (element2 of currentLevel.maps[currentMap].logics) {
                                if (element2.type == 1) {
                                    //Check if element is behind the other box
                                    if (hero.position.x == element2.coord.x && hero.position.z + 2 == element2.coord.z) {
                                        blocked = true;
                                    }
                                }
                            }

                            //Checking if the box is currently in spikes
                            for (let elt of currentLevel.maps[currentMap].traps) { //Looking for the spikes
                                if (elt.type == 0) {
                                    if (elt.coord.x == currentLevel.maps[currentMap].logics[k].coord.x && elt.coord.z == currentLevel.maps[currentMap].logics[k].coord.z) {
                                        currentLevel.maps[currentMap].logics[k].coord.y = 0;
                                        pushableBoxes.meshes[k].position.y = 0;
                                        break;
                                    }
                                }
                            }
                            if (hero.position.z + 2 == currentLevel.maps[currentMap].floor.z && hero.position.x == currentLevel.maps[currentMap].logics[k].coord.x && !blocked) {
                                //If a box is between the player and the default wall
                                blocked = true;
                                break;
                            }
                            //Case of a solid wall behind the box
                            for (let element2 of currentLevel.maps[currentMap].walls) {
                                if (element2.z == hero.position.z + 2 && element2.x == hero.position.x) {//Case of a solid wall behind the pushableBox
                                    blocked = true;
                                    break;
                                }
                            }
                            if (!blocked) {//If the pushableBox is movable
                                pushableBoxes.meshes[k].position.z += 1;//Updating the render
                                currentLevel.maps[currentMap].logics[k].coord.z += 1;//Updating the map
                                break;
                            }
                        }
                    }
                }
            }
            if (!trapped) {
                if (!blocked)
                    hero.position.z += 1;
                hero.rotation.y = Math.PI;
            }
        } else if (key.keyCode == "82") { //checking if key pressed is r
            mapReset(true);
        }
    }
}

window.addEventListener("keydown", checkKeyPress, false); //false so the function doesn't return a thing