
function logicTrigger(logics, pos) {
    for (let elt of logics) {
        switch (elt.type) {
            case 0://pressurePlate
                if (elt.activated == false && elt.coord.x == pos.x && elt.coord.z == pos.z) {
                    pressurePlateOn(elt);
                } else if (elt.activated == true && (elt.coord.x != pos.x || elt.coord.z != pos.z)) {
                    pressurePlateOff(elt);
                }
                break;
            default:
                break;
        }
    }
}

function doorOpen(toActivate) {
    slimRectangle.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI/2));
    doorL.position.set(doorL.position.x, doorL.position.y, doorL.position.z);
    toActivate.activated = true;
    //TODO CHANGE TO STICK TO THE WALL
}

function doorClose(toActivate) {
    slimRectangle.applyMatrix4(new THREE.Matrix4().makeRotationY(-Math.PI/2));
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