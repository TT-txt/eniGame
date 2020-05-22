let dispenserArrows = {
	meshes: [],
	distance: [],
};
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
                dispenserArrow = arrowMesh.clone();
                dispenserArrows.meshes.push(dispenserArrow);
                //not in the scene ?
                scene.add(dispenserArrows.meshes[dispenserArrows.meshes.length - 1]);
                dispenserArrows.meshes[dispenserArrows.meshes.length - 1].scale.set(0.01, 0.01, 0.01);
                dispenserArrows.meshes[dispenserArrows.meshes.length - 1].position.set(trap.coord.x, trap.coord.y, trap.coord.z);
                switch (trap.facing) {
                    case 'e':
                        dispenserArrows.meshes[dispenserArrows.meshes.length - 1].rotation.set(Math.PI / 2, 0, -Math.PI / 2);
                        trap.activated = true;
                        for (let element of currentLevel.maps[currentMap].logics) {
                            if (element.type == 1 && element.coord.z == trap.coord.z && trap.coord.x < element.coord.x && heroPos.x > element.coord.x && element.coord.y + 0.1 == trap.coord.y) {
                                boxing = true;
                                break;
                            }
                            else boxing = false;
                        }
                        //WORKING THORICALY
                        for(let wall of currentLevel.maps[currentMap].walls){
                            if(wall.z == trap.coord.z && wall.x > trap.coord.x && wall.y == trap.coord.y){
                                if(heroPos.z == wall.z && wall.x < heroPos.x){
                                    boxing = true;
                                    dispenserArrows.distance.push(wall.x);
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
                        dispenserArrows.meshes[dispenserArrows.meshes.length-1].rotation.set(-Math.PI / 2, 0, 0);
                        trap.activated = true;
                        for (let element of currentLevel.maps[currentMap].logics) {
                            if (element.type == 1 && element.coord.x == trap.coord.x && element.coord.z > trap.coord.z && element.coord.z < heroPos.z && element.coord.y + 0.1 == trap.coord.y) {
                                boxing = true;
                                break;
                            }
                            else boxing = false;
                        }
                        for(let wall of currentLevel.maps[currentMap].walls){
                            if(wall.x == trap.coord.x && wall.z < trap.coord.z && wall.y == trap.coord.y){
                                if(heroPos.x == wall.x && wall.z > heroPos.z){
                                    boxing = true;
                                    dispenserArrows.distance.push(wall.z);
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
                        dispenserArrows.meshes[dispenserArrows.meshes.length-1].rotation.set(0, 0, Math.PI / 2);
                        trap.activated = true;
                        for (let element of currentLevel.maps[currentMap].logics) {
                            if (element.type == 1 && trap.coord.x > element.coord.x && trap.coord.z == element.coord.z && element.coord.x > heroPos.x && trap.coord.y == element.coord.y + 0.1) {
                                boxing = true;
                                break;
                            }
                            else boxing = false;
                        }
                        for(let wall of currentLevel.maps[currentMap].walls){
                            if(wall.z == trap.coord.z && wall.x < trap.coord.x && wall.y == trap.coord.y){
                                if(heroPos.z == wall.z && wall.x > heroPos.x){
                                    boxing = true;
                                    dispenserArrows.distance.push(wall.coord.x);
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
                        dispenserArrows.meshes[dispenserArrows.meshes.length-1].rotation.set(Math.PI / 2, 0, 0);
                        trap.activated = true;
                        for (let element of currentLevel.maps[currentMap].logics) {
                            if (element.type == 1 && trap.coord.x == trap.coord.x && element.coord.z < trap.coord.z && heroPos.z < element.coord.z && trap.coord.y == element.coord.y + 0.1) {
                                boxing = true;
                                break;
                            }
                            else boxing = false;
                        }
                        for(let wall of currentLevel.maps[currentMap].walls){
                            if(wall.x == trap.coord.x && wall.z > trap.coord.z && wall.y == trap.coord.y){
                                if(heroPos.x == wall.x && wall.z < heroPos.z){
                                    boxing = true;
                                    dispenserArrows.distance.push(wall.z);
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
    let dispenserCount = 0;
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
                    switch (elt.facing) {
                        case 'e':
                            if (dispenserArrows.meshes[dispenserCount].position.x <= dispenserArrows.distance[dispenserCount].x) dispenserArrows.meshes[dispenserCount].position.x += 0.2;
                            else {
                                scene.remove(dispenserArrows.meshes[dispenserCount]);
                                // dispenserArrows.meshes.splice(dispenserCount, 1);
                                // dispenserArrows.distance.splice(dispenserCount, 1);
                            }
                            break;
                        case 'w':
                            if (dispenserArrows.meshes[dispenserCount].position.x >= dispenserArrows.distance[dispenserCount].x) dispenserArrows.meshes[dispenserCount].position.x -= 0.2;
                            else{ 
                                scene.remove(dispenserArrows.meshes[dispenserCount]);
                                // dispenserArrows.meshes.splice(dispenserCount, 1);
                                // dispenserArrows.distance.splice(dispenserCount, 1);
                            }
                            break;
                        case 'n':
                            if (dispenserArrows.meshes[dispenserCount].position.z <= dispenserArrows.distance[dispenserCount].z) dispenserArrows.meshes[dispenserCount].position.z -= 0.2;
                            else{ 
                                scene.remove(dispenserArrows.meshes[dispenserCount]);
                                // dispenserArrows.meshes.splice(dispenserCount, 1);
                                // dispenserArrows.distance.splice(dispenserCount, 1);
                            }
                            break;
                        case 's':
                            if (dispenserArrows.meshes[dispenserCount].position.z >= dispenserArrows.distance[dispenserCount].z) dispenserArrows.meshes[dispenserCount].position.z += 0.2;
                            else {
                                scene.remove(dispenserArrows.meshes[dispenserCount]);
                                //dispenserArrows.meshes.splice(dispenserCount, 1);
                                //dispenserArrows.distance.splice(dispenserCount, 1);
                            }
                            break;
                    }
                    dispenserCount+=1;
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
                    if (arrowIn) {
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
                    else {
                        dropperArrow = arrowMesh.clone();
                        dropperArrow.position.set(elt.coord.x, elt.coord.y, elt.coord.z);
                        arrowIn = true;
                        scene.add(dropperArrow);
                        dropperArrow.scale.set(0.01, 0.01, 0.01);
                        switch (elt.facing) {
                            case 'e':
                                dropperArrow.rotation.set(0 , 0, -Math.PI / 2);
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
                    break;
            }
        }
    }
}