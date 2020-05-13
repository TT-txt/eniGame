function logicTrigger(logics) {
    for (let elt of logics) {
        switch (elt.type) {
            case 0 ://pressurePlate
                if (elt.activated == false && elt.coord.x == heroMesh.position.x && elt.coord.z == heroMesh.position.z) {
                    pressurePlateOn(elt.onUse);
                } else if (elt.activated == true && elt.coord.x != heroMesh.position.x || elt.coord.z != heroMesh.position.z){
                    pressurePlateOff(elt.onUse);
                }
                break;
            default :
                break;
        }
    }
}

function doorOpen() {
    exit.rotation.z += Math.PI / 2;
}

function doorClose() {
    exit.rotation.z -= Math.PI / 2;
}

function pressurePlateOn(action) {
    switch (action) {
        case 0 :
            //Open the map doors
            doorOpen();
            console.log("Doors opened!");
            break;
        default :
            break;
    }
}

function pressurePlateOn(action) {
    switch (action) {
        case 0 :
            //Open the map doors
            doorClose();
            console.log("Doors closed!");
            break;
        default :
            break;
    }
}