let trapped = false;

function trapTrigger(trap, heroPos, gameStarted) {
    if(gameStarted && !trap.activated){
        switch(trap.type){
            case 0://SPIKES
                if(heroPos.x == trap.coord.x && trap.coord.z == heroPos.z) trapped = true;
                break;

            case 1: //ARROW DISPENSER 1, need ANIMATION
                //create arrow mesh
                scene.add(arrowMesh);
                switch(trap.facing){
                    case 'e':
                        arrowMesh.scale.set(0.01,0.01, 0.01);
                        arrowMesh.position.set(trap.coord.x, trap.coord.y, trap.coord.z);
                        arrowMesh.rotation.set(Math.PI / 2, 0, -Math.PI / 2);
                        trap.activated = true;
                        if(trap.coord.z == heroPos.z && trap.coord.x < heroPos.x) trapped = true;
                        break;
                    case 'n':
                        arrowMesh.scale.set(0.01,0.01, 0.01);
                        arrowMesh.position.set(trap.coord.x, trap.coord.y, trap.coord.z);
                        arrowMesh.rotation.set(Math.PI / 2, 0, 0);
                        trap.activated = true;
                        if(trap.coord.x == heroPos.x && trap.coord.z < heroPos.z) trapped = true;
                        break;
                    case 'w':
                        arrowMesh.scale.set(0.01,0.01, 0.01);
                        arrowMesh.position.set(trap.coord.x, trap.coord.y, trap.coord.z);
                        arrowMesh.rotation.set(0, 0, Math.PI / 2);
                        trap.activated = true;
                        if(trap.coord.z == heroPos.z && trap.coord.x > heroPos.x) trapped = true;
                        break;
                    case 's':
                        arrowMesh.scale.set(0.01,0.01, 0.01);
                        arrowMesh.position.set(trap.coord.x, trap.coord.y, trap.coord.z);
                        arrowMesh.rotation.set(-Math.PI / 2, 0, 0);
                        trap.activated = true;
                        if(trap.coord.x == heroPos.x && trap.coord.z > heroPos.z) trapped = true;
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }
}

function trapActivate(map){
    for(let elt of map.traps){
        if(elt.activated){
            switch(elt.type){
                case 0://SPIKES

                    break;
                case 1://ARROW ONCE
                    switch(elt.facing){
                        case 'e':
                            if(arrowMesh.position.x <= map.floor.x) arrowMesh.position.x+=0.2;
                            else scene.remove(arrowMesh);
                            break;
                        case 'w':
                            if(arrowMesh.position.x >= 0) arrowMesh.position.x-=0.2;
                            else scene.remove(arrowMesh);
                            break;
                        case 'n':
                            if(arrowMesh.position.z <= map.floor.z) arrowMesh.position.z+=0.2;
                            else scene.remove(arrowMesh);
                            break;
                        case 's':
                            if(arrowMesh.position.z >= 0) arrowMesh.position.z-=0.2;
                            else scene.remove(arrowMesh);
                            break;
                    }
                    break;
            }
        }
    }
}