function logicTrigger(logics, heroPos, gameStarted) {
    if (gameStarted) {
        let isPressurePlate = false;//Is there a pressure plate in the map
        for (let i = 0; i < logics.length; i++) {
            switch (logics[i].type) {
                case 0://pressurePlate
                    isPressurePlate = true;
                    if (logics[i].activated == false && logics[i].coord.x == heroPos.x && logics[i].coord.z == heroPos.z) {
                        pressurePlateOn(logics[i], i);
                        console.log("PLAQUE ACTIVEE");
                    } else if (logics[i].activated == true && (logics[i].coord.x != heroPos.x || logics[i].coord.z != heroPos.z)) {
                        pressurePlateOff(logics[i], i);
                        console.log("PLAQUE DESACTIVEE");
                    }
                    break;
                case 1:
                    //PushableBox (only the onPressurePlate will be detected here, to see the actual pushing > event.js)
                    if (isPressurePlate) {
                        for (let j = 0; j < logics.length; j++) {
                            if (logics[j].type == 0) {
                                if (logics[j].activated == false && logics[j].coord.x == logics[i].coord.x && logics[j].coord.z == logics[i].coord.z) {
                                    pressurePlateOn(logics[j], j);// /!\ use the plate coord /!\
                                    console.log("PLAQUE ACTIVEE");
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

function doorOpen() {
    if (!(currentLevel.maps[currentMap].solved)) {
        //Moving the doors to stick to the wall
        if (typeof (doorL.children[0]) != 'undefined') {
            doorL.rotation.y += Math.PI / 2;
            doorL.position.set(doorL.position.x, doorL.position.y, doorL.position.z - 0.4);
        }
        if (typeof (doorR.children[0]) != 'undefined') {
            doorR.rotation.y += Math.PI / 2;
            doorR.position.set(doorR.position.x, doorR.position.y, doorR.position.z + 0.4);
        }
        if (typeof (doorT.children[0]) != 'undefined') {
            doorT.rotation.y += Math.PI / 2;
            doorT.position.set(doorT.position.x - 0.4, doorT.position.y, doorT.position.z);
        }
        if (typeof (doorB.children[0]) != 'undefined') {
            doorB.rotation.y -= Math.PI / 2;
            doorB.position.set(doorB.position.x - 0.4, doorB.position.y, doorB.position.z);
        }
        currentLevel.maps[currentMap].solved = true;
    }
}

function doorClose() {
    if (currentLevel.maps[currentMap].solved) {
        //Moving the doors to stick to the wall
        if (typeof (doorL.children[0]) != 'undefined') {
            doorL.rotation.y -= Math.PI / 2;
            doorL.position.set(doorL.position.x, doorL.position.y, doorL.position.z + 0.4);
        }
        if (typeof (doorR.children[0]) != 'undefined') {
            doorR.rotation.y -= Math.PI / 2;
            doorR.position.set(doorR.position.x, doorR.position.y, doorR.position.z - 0.4);
        }
        if (typeof (doorT.children[0]) != 'undefined') {
            doorT.rotation.y -= Math.PI / 2;
            doorT.position.set(doorT.position.x + 0.4, doorT.position.y, doorT.position.z);
        }
        if (typeof (doorB.children[0]) != 'undefined') {
            doorB.rotation.y -= Math.PI / 2;
            doorB.position.set(doorB.position.x - 0.4, doorB.position.y, doorB.position.z);
        }
        currentLevel.maps[currentMap].solved = false;
    }
}

function pressurePlateOn(logicElem, toActivateIndex) {
    switch (logicElem.onUse) {
        case 0:
            //Open the map doors
            //logicElem.coord.y-= 0.2;//Shows that the pressure plate in onUse
            doorOpen(logicElem);
            currentLevel.maps[currentMap].logics[toActivateIndex].activated = true;
            break;
        default:
            break;
    }
}

function pressurePlateOff(logicElem, toActivateIndex) {
    switch (logicElem.onUse) {
        case 0:
            //Open the map doors
            //logicElem.coord.y+= 0.2;//Shows that the pressure plate in onUse
            doorClose(logicElem);
            currentLevel.maps[currentMap].logics[toActivateIndex].activated = false;
            break;
        default:
            break;
    }
}