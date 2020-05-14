function logicTrigger(logics, heroPos, gameStarted) {
    if (gameStarted) {
        let isPressurePlate = false;//Is there a pressure plate in the map
        for (let elt of logics) {
            switch (elt.type) {
                case 0://pressurePlate
                    isPressurePlate = true;
                    if (elt.activated == false && elt.coord.x == heroPos.x && elt.coord.z == heroPos.z) {
                        pressurePlateOn(elt);
                    } else if (elt.activated == true && (elt.coord.x != heroPos.x || elt.coord.z != heroPos.z)) {
                        pressurePlateOff(elt);
                    }
                    break;
                case 1:
                    //PushableBox (only the onPressurePlate will be detected here, to see the actual pushing > event.js)
                    if (isPressurePlate) {
                        for (let elt2 of logics) {
                            if (elt2.type == 0) {
                                if (elt2.activated == false && elt2.coord.x == elt.coord.x && elt2.coord.z == elt.coord.z) {
                                    pressurePlateOn(elt2);
                                }
                            }
                        }
                        //onPressurePlate(); future animation ?
                    }
                    break;
                default:
                    break;
            }
        }
    }
}

function doorOpen(toActivate) { 
    slimRectangle.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
    //Moving the doors to stick to the wall
    doorL.position.set(doorL.position.x, doorL.position.y, doorL.position.z-0.4);
    doorT.position.set(doorT.position.x-0.4, doorT.position.y, doorT.position.z);
    doorB.position.set(doorB.position.x+0.4, doorB.position.y, doorB.position.z);
    doorR.position.set(doorR.position.x, doorR.position.y, doorR.position.z+0.4);
    currentLevel.maps[currentMap].solved = true;
}

function doorClose(toActivate) {
    slimRectangle.applyMatrix4(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
    //Moving the doors to stick to the wall
    doorL.position.set(doorL.position.x, doorL.position.y, doorL.position.z+0.4);
    doorT.position.set(doorT.position.x+0.4, doorT.position.y, doorT.position.z);
    doorB.position.set(doorB.position.x-0.4, doorB.position.y, doorB.position.z);
    doorR.position.set(doorR.position.x, doorR.position.y, doorR.position.z-0.4);
    currentLevel.maps[currentMap].solved = false;
}

function pressurePlateOn(logicElem) {
    switch (logicElem.onUse) {
        case 0:
            //Open the map doors
            //logicElem.coord.y-= 0.2;//Shows that the pressure plate in onUse
            doorOpen(logicElem);
            logicElem.activated = true;
            break;
        default:
            break;
    }
}

function pressurePlateOff(logicElem) {
    switch (logicElem.onUse) {
        case 0:
            //Open the map doors
            //logicElem.coord.y+= 0.2;//Shows that the pressure plate in onUse
            doorClose(logicElem);
            logicElem.activated = false;
            break;
        default:
            break;
    }
}