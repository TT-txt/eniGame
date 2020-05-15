function logicTrigger(logics, heroPos, gameStarted) {
    if (gameStarted) {
        let isPressurePlate = false;//Is there a pressure plate in the map
        for (let i = 0; i < logics.length; i++) {
            switch (logics[i].type) {
                case 0://pressurePlate
                    isPressurePlate = true;
                    if (logics[i].activated == false && logics[i].coord.x == heroPos.x && logics[i].coord.z == heroPos.z) {
                        pressurePlateOn(logics[i], i);
                    } else if (logics[i].activated == true && (logics[i].coord.x != heroPos.x || logics[i].coord.z != heroPos.z)) {
                        pressurePlateOff(logics[i], i);
                    }
                    break;
                case 1:
                    //PushableBox (only the onPressurePlate will be detected here, to see the actual pushing > event.js)
                    if (isPressurePlate) {
                        for (let j = 0; j < logics.length; j++) {
                            if (logics[j].type == 0) {
                                if (logics[j].activated == false && logics[j].coord.x == logics[i].coord.x && logics[j].coord.z == logics[i].coord.z) {
                                    pressurePlateOn(logics[j], j);// /!\ use the plate coord /!\
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
        //console.log(currentLevel.maps[currentMap].logics[0].activated);
    }
}

function doorOpen() {
    if (!(currentLevel.maps[currentMap].solved)) {
        slimRectangle.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        
        //Moving the doors to stick to the wall
        //doorL.position.set(doorL.position.x, doorL.position.y, doorL.position.z - 0.4);
        //doorT.position.set(doorT.position.x - 0.4, doorT.position.y, doorT.position.z);
        //doorB.position.set(doorB.position.x + 0.4, doorB.position.y, doorB.position.z);
        //doorR.position.set(doorR.position.x, doorR.position.y, doorR.position.z + 0.4);

        currentLevel.maps[currentMap].solved = true;
    }
}

function doorClose() {
    if (currentLevel.maps[currentMap].solved) {
        slimRectangle.applyMatrix4(new THREE.Matrix4().makeRotationY(-Math.PI / 2));

        //Moving the doors to stick to the wall
        /*
        doorL.position.set(doorL.position.x, doorL.position.y, doorL.position.z + 0.4);
        doorT.position.set(doorT.position.x + 0.4, doorT.position.y, doorT.position.z);
        doorB.position.set(doorB.position.x - 0.4, doorB.position.y, doorB.position.z);
        doorR.position.set(doorR.position.x, doorR.position.y, doorR.position.z - 0.4);
        */
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