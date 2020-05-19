let trapped = false;
let unmovableBox = false;


function trapTrigger(trap, heroPos, gameStarted) {
    if(gameStarted && !trap.activated){
        switch(trap.type){
            case 0://SPIKES
            switch(trap.facing){
                case 'e':
                    dispenserArrow.rotation.set(Math.PI / 2, 0, -Math.PI / 2);
                    trap.activated = true;
                    if(trap.coord.z == heroPos.z && trap.coord.x < heroPos.x) trapped = true;
                    break;
                case 'n':
                    dispenserArrow.rotation.set(Math.PI / 2, 0, 0);
                    trap.activated = true;
                    if(trap.coord.x == heroPos.x && trap.coord.z < heroPos.z) trapped = true;
                    break;
                case 'w':
                    dispenserArrow.rotation.set(0, 0, Math.PI / 2);
                    trap.activated = true;
                    if(trap.coord.z == heroPos.z && trap.coord.x > heroPos.x) trapped = true;
                    break;
                case 's':
                    dispenserArrow.rotation.set(-Math.PI / 2, 0, 0);
                    trap.activated = true;
                    if(trap.coord.x == heroPos.x && trap.coord.z > heroPos.z) trapped = true;
                    break;
                default:
                    break;
            }
                break;

            case 1: //ARROW DISPENSER 1, need ANIMATION
                //create arrow mesh
                dispenserArrow = arrowMesh.clone();
                scene.add(dispenserArrow);
                dispenserArrow.scale.set(0.01,0.01, 0.01);
                dispenserArrow.position.set(trap.coord.x, trap.coord.y, trap.coord.z);
                switch(trap.facing){
                    case 'e':
                        dispenserArrow.rotation.set(Math.PI / 2, 0, -Math.PI / 2);
                        trap.activated = true;
                        if(trap.coord.z == heroPos.z && trap.coord.x < heroPos.x) trapped = true;
                        break;
                    case 'n':
                        dispenserArrow.rotation.set(Math.PI / 2, 0, 0);
                        trap.activated = true;
                        if(trap.coord.x == heroPos.x && trap.coord.z < heroPos.z) trapped = true;
                        break;
                    case 'w':
                        dispenserArrow.rotation.set(0, 0, Math.PI / 2);
                        trap.activated = true;
                        if(trap.coord.z == heroPos.z && trap.coord.x > heroPos.x) trapped = true;
                        break;
                    case 's':
                        dispenserArrow.rotation.set(-Math.PI / 2, 0, 0);
                        trap.activated = true;
                        if(trap.coord.x == heroPos.x && trap.coord.z > heroPos.z) trapped = true;
                        break;
                    default:
                        break;
                }
                break;
            case 2:
                
                break;
            default:
                break;
        }
    }
}

function trapActivate(map, heroPos){
    for(let elt of map.traps){
        if(elt.activated){
            switch(elt.type){
                case 0://SPIKES
                    //box event made in event.js
                    if(heroPos.x == elt.coord.x && elt.coord.z == heroPos.z) trapped = true;    
                    break;
                case 1://ARROW ONCE
                    switch(elt.facing){
                        case 'e':
                            if(dispenserArrow.position.x <= map.floor.x) dispenserArrow.position.x+=0.2;
                            else scene.remove(arrowMesh);
                            break;
                        case 'w':
                            if(dispenserArrow.position.x >= 0) dispenserArrow.position.x-=0.2;
                            else scene.remove(dispenserArrow);
                            break;
                        case 'n':
                            if(dispenserArrow.position.z <= map.floor.z) dispenserArrow.position.z+=0.2;
                            else scene.remove(dispenserArrow);
                            break;
                        case 's':
                            if(dispenserArrow.position.z >= 0) dispenserArrow.position.z-=0.2;
                            else scene.remove(dispenserArrow);
                            break;
                    }
                    break;
                case 2:
                    if(arrowIn){
                        switch(elt.facing){
                            case 'e':
                                if(dropperArrow.position.x <= map.floor.x) dropperArrow.position.x+=0.2;
                                else{ 
                                    scene.remove(dropperArrow);
                                    arrowIn = false;
                                }
                                break;
                            case 'w':
                                if(dropperArrow.position.x >= 0) dropperArrow.position.x-=0.2;
                                else{ 
                                    scene.remove(dropperArrow);
                                    arrowIn = false;
                                }                                
                                break;
                            case 'n':
                                if(dropperArrow.position.z <= map.floor.z) dropperArrow.position.z+=0.2;
                                else{ 
                                    scene.remove(dropperArrow);
                                    arrowIn = false;
                                }                                
                                break;
                            case 's':
                                if(dropperArrow.position.z >= 0) dropperArrow.position.z-=0.2;
                                else{ 
                                    scene.remove(dropperArrow);
                                    arrowIn = false;
                                }
                                break;
                        }   
                    }
                    else{
                        dropperArrow = arrowMesh.clone();
                        dropperArrow.position.set(elt.coord.x, elt.coord.y, elt.coord.z);
                        arrowIn = true;
                        scene.add(dropperArrow);
                        dropperArrow.scale.set(0.01,0.01, 0.01);
                        switch(elt.facing){
                            case 'e':
                                dropperArrow.rotation.set(Math.PI / 2, 0, -Math.PI / 2);
                                trap.activated = true;
                                if(elt.coord.z == heroPos.z && elt.coord.x < heroPos.x) trapped = true;
                                break;
                            case 'n':
                                dropperArrow.rotation.set(Math.PI / 2, 0, 0);
                                elt.activated = true;
                                if(elt.coord.x == heroPos.x && elt.coord.z < heroPos.z) trapped = true;
                                break;
                            case 'w':
                                dropperArrow.rotation.set(0, 0, Math.PI / 2);
                                trap.activated = true;
                                if(elt.coord.z == heroPos.z && elt.coord.x > heroPos.x) trapped = true;
                                break;
                            case 's':
                                dropperArrow.rotation.set(-Math.PI / 2, 0, 0);
                                elt.activated = true;
                                if(elt.coord.x == heroPos.x && elt.coord.z > heroPos.z) trapped = true;
                                break;
                            default:
                                break;
                        }
                    }
                break;
            }
        }
    }
}