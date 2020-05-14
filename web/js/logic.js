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
                                if (elt2.coord.x == elt.coord.x && elt2.coord.z == elt.coord.z) {
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
    doorL.position.set(doorL.position.x, doorL.position.y, doorL.position.z);
    toActivate.activated = true;
    //TODO CHANGE TO STICK TO THE WALL
}

function doorClose(toActivate) {
    slimRectangle.applyMatrix4(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
    toActivate.activated = false;
    //TODO REVERT POSITION
}

function pressurePlateOn(logicElem) {
    switch (logicElem.onUse) {
        case 0:
            //Open the map doors
            doorOpen(logicElem);
            break;
        default:
            break;
    }
}

function pressurePlateOff(logicElem) {
    switch (logicElem.onUse) {
        case 0:
            //Open the map doors
            doorClose(logicElem);
            break;
        default:
            break;
    }
}