function logicTrigger(logics, heroPos, gameStarted) {
    if (gameStarted) {
        let isPressurePlate = false;//Is there a pressure plate in the map ?
        let boxOnPlate = false;//Is there a box activating a pressurePlate ?

        for (let i = 0; i < logics.length; i++) {
            switch (logics[i].type) {
                case 0://pressurePlate
                    //Checking if a box is on a pressure plate
                    for (let indexToCheck = i + 1; indexToCheck < logics.length; indexToCheck++)
                        if (logics[i].coord.x == logics[indexToCheck].coord.x && logics[i].coord.z == logics[indexToCheck].coord.z)
                            boxOnPlate = true;
                    isPressurePlate = true;
                    if (!boxOnPlate) {
                        if (logics[i].activated == false && logics[i].coord.x == heroPos.x && logics[i].coord.z == heroPos.z) {
                            pressurePlateOn(logics[i], i);
                            //console.log("PLAQUE ACTIVEE");
                        } else if (logics[i].activated == true && (logics[i].coord.x != heroPos.x || logics[i].coord.z != heroPos.z)) {
                            pressurePlateOff(logics[i], i);
                            //console.log("PLAQUE DESACTIVEE");
                        }
                    }
                    break;
                case 1:
                    //PushableBox (only the onPressurePlate will be detected here, to see the actual pushing > event.js)
                    if (isPressurePlate) {
                        for (let j = 0; j < logics.length; j++) {
                            if (logics[j].type == 0) {
                                if (logics[j].activated == false && logics[j].coord.x == logics[i].coord.x && logics[j].coord.z == logics[i].coord.z) {
                                    pressurePlateOn(logics[j], j);// /!\ use the plate coord /!\
                                    //console.log("PLAQUE ACTIVEE");
                                    break;
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
    doorSound.play();
    if (!(currentLevel.maps[currentMap].solved)) {
        //Moving the doors to stick to the wall
        if (typeof (doorL.children[0]) != 'undefined') {
            doorL.rotation.y += Math.PI / 2;
            doorL.position.z -= 0.4;
        }
        if (typeof (doorR.children[0]) != 'undefined') {
            doorR.rotation.y += Math.PI / 2;
            doorR.position.z += 0.4;
        }
        if (typeof (doorT.children[0]) != 'undefined') {
            doorT.rotation.y += Math.PI / 2;
            doorT.position.x -= 0.4;
        }
        if (typeof (doorB.children[0]) != 'undefined') {
            doorB.rotation.y -= Math.PI / 2;
            doorB.position.x += 0.4;
        }
        currentLevel.maps[currentMap].solved = true;
    }
}

function doorClose() {
    doorSound.play();
    if (currentLevel.maps[currentMap].solved) {
        //Moving the doors to stick to the wall
        if (typeof (doorL.children[0]) != 'undefined') {
            doorL.rotation.y -= Math.PI / 2;
            doorL.position.z += 0.4;
        }
        if (typeof (doorR.children[0]) != 'undefined') {
            doorR.rotation.y -= Math.PI / 2;
            doorR.position.z -= 0.4;
        }
        if (typeof (doorT.children[0]) != 'undefined') {
            doorT.rotation.y -= Math.PI / 2;
            doorT.position.x += 0.4;
        }
        if (typeof (doorB.children[0]) != 'undefined') {
            doorB.rotation.y -= Math.PI / 2;
            doorB.position.x -= 0.4;
        }
        currentLevel.maps[currentMap].solved = false;
    }
}

function pressurePlateOn(logicElem, toActivateIndex) {
    switch (logicElem.onUse) {
        case -1:
            gameOver(true);
            break;
        case 0:
            //Open the map doors
            //logicElem.coord.y-= 0.2;//Shows that the pressure plate in onUse
            doorOpen();
            break;
        case 1://single arrow
            for (let elt of currentLevel.maps[currentMap].traps) {
                if (logicElem.group == elt.group) {
                    trapTrigger(elt, hero.position, gameStarted);
                }
            }
            break;
        case 2:
            pressureSound.play();
            for (let elt of currentLevel.maps[currentMap].traps) {
                if (logicElem.group == elt.group) {
                    trapTrigger(elt, hero.position, gameStarted);
                }
            }
            break;
        case 3:
            pressureSound.play();
            for (let elt of currentLevel.maps[currentMap].traps) {
                if (logicElem.group == elt.group) {
                    trapTrigger(elt, hero.position, gameStarted);
                }
            }
            break;
    }
    currentLevel.maps[currentMap].logics[toActivateIndex].activated = true;
}

function pressurePlateOff(logicElem, toActivateIndex) {
    pressureSound.play();
    switch (logicElem.onUse) {
        case 0:
            //Open the map doors
            //logicElem.coord.y+= 0.2;//Shows that the pressure plate in onUse
            doorClose();
            break;
        case 1:
            break;
        case 2:
            for (let elt of currentLevel.maps[currentMap].traps) {
                if (logicElem.group == elt.group) {
                    trapTrigger(elt, hero.position, gameStarted);
                }
            }
            break;
        case 3:
            for (let elt of currentLevel.maps[currentMap].traps) {
                if (logicElem.group == elt.group) {
                    trapTrigger(elt, hero.position, gameStarted);
                }
            }
            break;
        default:
            break;
    }
    currentLevel.maps[currentMap].logics[toActivateIndex].activated = false;//NO PROBLEM HERE
}