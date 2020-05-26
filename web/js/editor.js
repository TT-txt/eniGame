var createdLevel = new level(null, null, null, null);

function loadEditor() {
    const container = document.querySelector('#scene-container');
    //Fills the container with a level size selctor
    let toInsert = '<div id="levelScaler" class="align-items-center" style="display: flex;justify-content: center;flex-direction:column;background-color:white;width:100%;"><div style="width:100%"><div style="justify-content: center;" class="form-inline"><label style="font-size:20px;" for="levelSize">Choose your level&#39;s difficulty : &nbsp; </label><select class="form-control" id="levelSize" name="size"><option value="3" selected>DEFAULT : 3</option>'
    for (let i = 1; i <= 5; i += 1) {
        toInsert += '<option value="' + i + '">' + i + '</option>';
    }
    toInsert += '</select></div><br/><button class="btn btn-success" onClick="startEditing()">Create</button></div><legend class="text-secondary">Preview of the level :</legend><table id="levelPreview" style="border:solid black 2px"><td style="color:#6351ce;">Select a difficulty to update</td></table></div>';

    container.innerHTML = toInsert;

    // Event listener for the level preview
    document.getElementById("levelSize").addEventListener('change', updatePreviewTable);
}
//<input id="levelSize" placeholder="Between 1 and 5" name="name"/>
function startEditing() {
    //Gets the size from the input and uses it to go the the level selector
    let size = parseInt(document.getElementById("levelSize").value);
    if (0 < size && size < 6) {
        size += 2;
        mapSelector(size);
    } else { mapSelector(5); }
}

function mapSelector(size) {
    //Create a new level object if this is the first time the function is called
    if (createdLevel.size == null) {
        createdLevel.size = size;
        let array = [];
        for (let k = 0; k < size * size; k += 1) {
            array[k] = new map([], new THREE.Vector3(5, 0, 5), [], [], false, 0, [false, false, false, false], new THREE.Vector3(1, 1, 1));
        }
        createdLevel.maps = array;
        createdLevel.theme = 0;
        createdLevel.endMap = createdLevel.size * createdLevel.size;
    }

    // Indexes used 
    let i;
    let j;

    // Empties the previous container
    var parent = document.getElementById("levelScaler");//Case of a first display
    if (parent != null) parent.parentNode.removeChild(parent);
    parent = document.getElementById("mapEditor");//Case of a map change
    if (parent != null) parent.parentNode.removeChild(parent);
    var container = document.querySelector('#scene-container');

    // Adds a table to select the map to edit
    container.innerHTML = '<div id="levelEditor" style="background-color:white;width:100%;"></div>';
    let styleToInsert = '<style>#levelEditor {border:4px black solid;display:grid;grid-template-columns:';
    for (i = 0; i < size; i += 1) {
        styleToInsert += '1fr ';
    }
    styleToInsert += ';}</style>';
    container.innerHTML += styleToInsert;

    // Adds the clickable table elements to the table
    container = document.querySelector('#levelEditor');
    for (i = 0; i < size; i += 1) {
        for (j = 0; j < size; j += 1) {
            let mapToAdd = '<button onClick="mapEditor(' + (i * size + j) + ', ' + size + ')" style="border-color:black;border-width:4px;border-top-style:';
            //Top
            if (i == 0) {
                mapToAdd += 'solid';
            } else {
                mapToAdd += 'dashed';
            }
            mapToAdd += ';border-right-style:'
            //Right
            if (j == size - 1) {
                mapToAdd += 'solid';
            } else {
                mapToAdd += 'dashed';
            }
            mapToAdd += ';border-bottom-style:'
            //Bottom
            if (i == size - 1) {
                mapToAdd += 'solid';
            } else {
                mapToAdd += 'dashed';
            }
            mapToAdd += ';border-left-style:'
            //Left
            if (j == 0) {
                mapToAdd += 'solid';
            } else {
                mapToAdd += 'dashed';
            }

            mapToAdd += ';" class="editorGrid' + i + j + '"><p>' + (i * size + j) + '</p></button>';
            container.innerHTML += mapToAdd;
        }
    }
}

function mapEditor(index, levelSize) {
    // Empties the previous container
    var parent = document.getElementById("levelEditor");
    parent.parentNode.removeChild(parent);
    var container = document.querySelector('#scene-container');

    // Creating the workspace and the toolBar (floating to the right)
    container.innerHTML = '<div id="mapEditor" style="background-color:white;width:100%;"><aside class="float-right" id="toolBar" style="width:250px;margin:1%;padding:0;height:98%;"></aside></div>';
    container = document.querySelector("#toolBar");
    container.innerHTML += '<button id="toolBarButton" type="button" onClick="toolBarToggle()" class="toolBarToggle btn-success" data-toggle="button" aria-pressed="false" style="width:100%;margin=0;background-color:#6351ce;font-weight:400;text-aline:cente;vertical-aline:middle;user-select:none;border:1px solid transparent;padding:.375rem .75rem;font-size:1rem;line-height:1.5;border-radius: .25rem;transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;">&#8744; Tool Bar</button>';
    container.innerHTML += '<div id="toolBarBody" style="min-height:40%;width:100%;margin:0;padding:20px 0;background-color:#343a40;"></div>'

    // Filling the toolBarBody
    container = document.querySelector("#toolBarBody");
    //mapSizeX, mapSizeZ
    container.innerHTML += '<label class="text-white" for="mapSize">Map size (max 9): </label><div id="mapSize" class="input-group"><input placeholder="Length &#9472;" class="form-control" id="mapSizeX" type="text" name="mapSize"/> <div class="input-group-prepend"><span class="input-group-text">&times;</span></div> <input placeholder="Width &#124;" class="form-control" id="mapSizeZ" type="text" name="mapSizeZ"/></div><br/><hr style="height: 0;border:none;border-top:4px white dotted;"/>';
    container.innerHTML += '<button id="buttonWall" class="btn btn-light" onClick="updateItemButton(\'Wall\')">Add Wall</button>';
    container.innerHTML += '<br/><label class="text-white" for="logics">Logics</label><br/><select multiple class="form-control form-control-lg" id="logics" name="logics"><option value="Pressure Plate">Pressure Plate</option><option value="Pushable Box">Pushable Box</option></select>';
    container.innerHTML += '<br/><br/><label class="text-white :" for="traps">Traps</label><br/><select multiple class="form-control form-control-lg" id="traps" name="traps"><option value="Spikes">Spikes</option><option value="Arrow Once">Arrow Once</option><option value="Arrow Infinite">Arrow Infinite</option><option value="Flame Infinite">Flame Thrower</option></select>';
    container.innerHTML += '<br/><button id="deleteItem" class="btn btn-danger" onClick="updateItemButton(\'Delete Item\')">Delete Item</button>';
    container.innerHTML += '<br/><p class="text-white" style="border:2px solid #6351ce">Item selected : <strong id="selectedItem">NONE</strong></p>';

    // Map Editor display
    container = document.querySelector("#mapEditor");
    container.innerHTML += '<button id="buttonBack" class="btn btn-outline-danger float-left" onclick="mapSelector(' + levelSize + ')">&lt;</button>';
    container.innerHTML += '<legend><strong>Map layout : </strong></legend><br/><table id="mapToEdit" style="background-color:#e0e0e0;margin:auto;border:solid black 2px"></table>';
    updateMapToEdit(createdLevel.maps[index].floor.x, createdLevel.maps[index].floor.z, index);


    // Event listener to update the table size from the text inputs
    document.getElementById("mapSizeX").addEventListener('change', function (x) {
        let newX = parseInt(x.target.value);
        if (newX > 9) {
            //Takes the maximum value
            createdLevel.maps[index].floor.x = 9;
            updateMapToEdit(9, createdLevel.maps[index].floor.z, index);
            return;
        } else if (newX > 3 && newX <= 9) {
            //Updates the floor size
            createdLevel.maps[index].floor.x = newX;
            updateMapToEdit(newX, createdLevel.maps[index].floor.z, index);
            return;
        }
        else {
            //Takes the default value
            createdLevel.maps[index].floor.x = 5;
            updateMapToEdit(5, createdLevel.maps[index].floor.z, index);
            return;
        }
    });
    document.getElementById("mapSizeZ").addEventListener('change', function (z) {
        let newZ = parseInt(z.target.value);
        if (newZ > 9) {
            //Takes the maximum value
            createdLevel.maps[index].floor.z = 9;
            updateMapToEdit(createdLevel.maps[index].floor.x, 9, index);
        } else if (newZ > 3 && newZ <= 9) {
            //Updates the floor size
            createdLevel.maps[index].floor.z = newZ;
            updateMapToEdit(createdLevel.maps[index].floor.x, newZ, index);
            return;
        }
        else {
            //Takes the default value
            createdLevel.maps[index].floor.z = 5;
            updateMapToEdit(createdLevel.maps[index].floor.x, 5, index);
            return;
        }
    });

    // Event listener to change the selected Item (buttons triggered by onClick)
    document.getElementById("logics").addEventListener('change', updateItemSelect);
    document.getElementById("traps").addEventListener('change', updateItemSelect);
}


// Updating the preview table
function updatePreviewTable(event) {
    let tableContent = ' ';
    for (let i = 0; i < parseInt(event.target.value) + 2; i += 1) {
        tableContent += '<tr>';
        for (let j = 0; j < parseInt(event.target.value) + 2; j += 1) {
            tableContent += '<td style="border:black 1px solid;padding:0 10px;"> ' + (i * (parseInt(event.target.value) + 2) + j) + ' </td>';
        }
        tableContent += '</tr>'
    }
    document.getElementById("levelPreview").innerHTML = tableContent;
}


// Toggling the tool bar
function toolBarToggle() {
    let toolBarBody = document.getElementById("toolBarBody");

    if (document.getElementById("toolBarButton").classList.contains("active")) {
        toolBarBody.style.display = "block";
        document.getElementById("toolBarButton").classList.remove("active");
        document.getElementById("toolBarButton").innerHTML = '&#8744; Tool Bar';
    }
    else {
        document.getElementById("toolBarButton").classList.add("active");
        toolBarBody.style.display = "none";
        document.getElementById("toolBarButton").innerHTML = '&gt; Tool Bar';
    }
}


//Change the selected element
function updateItemSelect(event) {
    document.getElementById("selectedItem").textContent = event.target.value;
}
function updateItemButton(value) {
    document.getElementById("selectedItem").textContent = value;
}


//Current map size table update
function updateMapToEdit(x, z, index) {
    console.log(index);
    let tableContent = ' ';
    for (let j = 0; j < x; j += 1) {
        tableContent += '<tr>';
        for (let i = 0; i < z; i += 1) {
            //traps here 
            tableContent += '<td id="' + i + ', ' + j + '" style="border:black 1px solid;padding:0 10px;">(' + i + ', ' + j + ')<br/>';
            let elementsToInsert = [];
            for (let elt of createdLevel.maps[index].traps) {
                if (elt.coord.x == i && elt.coord.z == j) {
                    //add background image of the item, then 
                    switch (elt.type) {
                        case 0: //spikes, so idk...
                            elementsToInsert.push(elt.coord.y);
                            elementsToInsert.push('<button type="button" onClick="itemClick()" style="padding:0;width:32px;height:32px;"><img src="textures/logic/pressurePlate.png" alt="Plate" height="28px"/></button>');
                            break;
                        case 1://dispenser
                            switch (elt.facing) {
                                //texture is on textures/trap/dispenser/dispenserFront.png
                                case 'n':
                                    //rotate pi
                                    break;
                                case 's':
                                    //no rotation
                                    break;
                                case 'e':
                                    //rotation pi/2
                                    break;
                                case 'w':
                                    //rotation of -pi/2
                                    break;
                            }
                            break;
                        case 2://dropper, same texture
                            switch (elt.facing) {
                                //texture is on textures/trap/dropper/dropperFront.png
                                case 'n':
                                    //rotate pi
                                    break;
                                case 's':
                                    //no rotation
                                    break;
                                case 'e':
                                    //rotation pi/2
                                    break;
                                case 'w':
                                    //rotation of -pi/2
                                    break;
                            }
                            break;
                        case 3://smoker
                            switch (elt.facing) {
                                //texture is on textures/trap/smoker/smokerFront.png
                                case 'n':
                                    //rotate pi
                                    break;
                                case 's':
                                    //no rotation
                                    break;
                                case 'e':
                                    //rotation pi/2
                                    break;
                                case 'w':
                                    //rotation of -pi/2
                                    break;
                            }
                            break;
                    }
                }
            }
            //logic here
            for (let elt of createdLevel.maps[index].logics) {
                if (elt.coord.x == i && elt.coord.z == j) {
                    //add background image of the item, then 
                    switch (elt.type) {
                        case 0://pressure plate
                            elementsToInsert.push(elt.coord.y);
                            elementsToInsert.push('<button type="button" data-toggle="modal" data-target="#pressureModal' + i + j + '" style="padding:0;width:32px;height:32px;"><img src="textures/logic/pressurePlate.png" alt="Plate" height="28px"/></button> <div class="modal fade" id="pressureModal' + i + j + '" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true"> <div class="modal-dialog modal-sm modal-dialog-centered" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLongTitle">Pressure Plate details</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body"> <form> <label for="onUse">onUse activate ?</label> <select class="form-control" id="onUse"> <option value="null">Open Doors</option> <option value="1">Arrow once</option> <option value="2">Arrow infinite</option> <option value="3">Flames</option> </select><br/> <label for="group">Group ? (If you want it to open doors, ignore this)</label> <select class="form-control" id="group"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> </select><br/> </form> </div> <div class="modal-footer"><button type="button" class="btn btn-danger">Delete</button> <button type="button" class="btn btn-outline-danger" data-dismiss="modal">Close</button> </div> </div> </div> </div>');
                            console.log("ZOUF");
                            break;
                        case 1://box
                            elementsToInsert.push(elt.coord.y);
                            elementsToInsert.push('<img src="textures/logic/pushableBox.png" alt="Plate" height="32px"/>');
                            break;
                    }
                }
            }
            //walls
            for (let elt of createdLevel.maps[index].logics) {
                if (elt.coord.x == i && elt.coord.z == j) {
                    //texture is under textures/env/walls/stoneBrick.png
                }
            }
            //Sorts the y to display them in the right order
            for (let sorted = 0; sorted < elementsToInsert.length; sorted += 2) {
                for (let sortIndex = elementsToInsert.length - 2; sortIndex > sorted; sortIndex -= 2) {
                    if (elementsToInsert[sortIndex] < elementsToInsert[sortIndex - 2]) {
                        //swap the 4 occurences
                        //Swap y coords (for the sorting)
                        let tmp = elementsToInsert[sortIndex];
                        elementsToInsert[sortIndex] = elementsToInsert[sortIndex - 2];
                        elementsToInsert[sortIndex - 2] = tmp;
                        //Swap the actual string values
                        tmp = elementsToInsert[sortIndex + 1];
                        elementsToInsert[sortIndex + 1] = elementsToInsert[sortIndex - 1];
                        elementsToInsert[sortIndex - 1] = tmp;
                    }
                }
            }
            console.log(elementsToInsert);
            //Actually adds the elements 
            for (let k = 1; k < elementsToInsert.length; k += 2) {
                tableContent += elementsToInsert[k];
            }
            tableContent += '<button class="btn btn-primary" onClick="addContent(' + i + ', ' + j + ', ' + index + ')">Add</button> </td>';
        }
        tableContent += '</tr>'
    }
    document.getElementById("mapToEdit").innerHTML = tableContent;
}


function addTrap(mapIndex, type, coord, activated, facing, group) {
    if (type == 0) createdLevel.maps[mapIndex].traps.push(new trap(type, new THREE.Vector3(coord.x, coord.y, coord.z), true, null, null));
    else {
        createdLevel.maps[mapIndex].traps.push(new trap(type, new THREE.Vector3(coord.x, coord.y, coord.z), activated, facing, group));
    }
}

function addLogic(mapIndex, type, coord, onUSe, group) {
    if (type == 0) createdLevel.maps[mapIndex].logics.push(new logic(type, coord, onUse, false, group));
    else if (type == 1) createdLevel.maps[mapIndex].logics.push(new logic(type, new THREE.Vector3(0, 0, 0), onUse, coord, group))
}

function addWall(coord, mapIndex) {
    createdLevel.maps[mapIndex].walls.push(new THREE.Vector3(coord.x, coord.y, coord.z));
}

function addContent(x, z, mapIndex) {
    selectedItem = document.getElementById("selectedItem").textContent
    if (x < 0 || z < 0)
        return;

    //Get y
    let idToFind = x + ', ' + z;
    let y = document.getElementById(idToFind).children.length - 1;
    if (y < 1) y = 1;

    // Adds the item to the level object 
    if (selectedItem == "Pressure Plate") {
        if (y < 2) {
            createdLevel.maps[mapIndex].logics.push(new logic(0, new THREE.Vector3(x, y, z), 0, false, null));
        } else {
            deathNotif.dismissAll();
            deathNotif.error("You can't add a pressure plate on top of another block...");
        }
    } else if (selectedItem == "Spikes") {
        if (y < 2) {
            createdLevel.maps[mapIndex].traps.push(new logic(0, new THREE.Vector3(x, y - 1, z), 0, false, null));
        } else {
            deathNotif.dismissAll();
            deathNotif.error("You can't add spikes on top of another block...");
        }
    } else if (selectedItem == "Spikes") {
        if (y < 2) {
            createdLevel.maps[mapIndex].logics.push(new logic(1, new THREE.Vector3(0, 0, 0), 0, new THREE.Vector3(x, y - 1, z), null));
        } else {
            deathNotif.dismissAll();
            deathNotif.error("You can't add boxes on top of another block...");
        }
    }else if (selectedItem == "Arrow Once") {

    } else if (selectedItem == "Arrow Infinite") {

    } else if (selectedItem == "Flame Infinite") {

    } else if (selectedItem == "Wall") {

    }

    updateMapToEdit(createdLevel.maps[mapIndex].floor.x, createdLevel.maps[mapIndex].floor.z, mapIndex);
    return;
}

function itemClick() {

    return;
}

/*
                               /$$                 /$$
                              | $$                | $$
 /$$$$$$/$$$$  /$$   /$$      | $$$$$$$   /$$$$$$ | $$  /$$$$$$
| $$_  $$_  $$| $$  | $$      | $$__  $$ /$$__  $$| $$ /$$__  $$
| $$ \ $$ \ $$| $$  | $$      | $$  \ $$| $$$$$$$$| $$| $$  \ $$
| $$ | $$ | $$| $$  | $$      | $$  | $$| $$_____/| $$| $$  | $$
| $$ | $$ | $$|  $$$$$$$      | $$  | $$|  $$$$$$$| $$| $$$$$$$/
|__/ |__/ |__/ \____  $$      |__/  |__/ \_______/|__/| $$____/
               /$$  | $$                              | $$
              |  $$$$$$/                              | $$
               \______/                               |__/

need to add something when clicking on a trap: new menu showing activate: radio ?, coord: ,group, facing and submit button in order to add it; maybe modal ?
need to add the same for the logic group,
might aswell do some adjustement to the update map, to add some stuf in the for in order to show the multiples elements
maybe add a var containing coords of the elements added, in order to not allow the player to add stuff at the same place
need to find how to export json to play actually those levels ?
when on a map, you can choose the exits, BUT
if the index is 0, or size Z, or size Z * int, you can't add a left exit (exit 0),
of if the index is inferior to size Z, you can't add a top exit (exit 1)
or if the index of the map is size z - Z * int, you can't add a right exit (exit 2)
or if the index of the map is superior (size y - 1) * size Z, you can't add a bottom exit (exit 3)
*/