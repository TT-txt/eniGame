function loadEditor() {
    const container = document.querySelector('#scene-container');
    //Fills the container with a level size selctor
    container.innerHTML = '<div id="levelScaler" style="background-color:white;width:100%;padding:15%;"><label style="font-size:20px;">Input your level size : &nbsp; </label><input class="levelSize" placeholder="0 < size < 9" name="name"/><br/><button class="btn btn-outline-success" onClick="startEditing()">Create</button></div>';
}

function startEditing() {
    //Gets the size from the input and uses it to go the the level selector
    let size = document.getElementsByClassName('levelSize')[0].value;
    if (0 < size && size < 9) {
        mapSelector(size);
    } else { mapSelector(5); }
}

function mapSelector(size) {
    if (createdLevel == undefined || createdLevel == null) {
        var createdLevel = new level();
        createdLevel.size = size;
        let array = [];
        for (let k = 0; k < size * size; k += 1) {
            array[k] = null;
        }
        createdLevel.maps = array;
        createdLevel.theme = null;
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
    let styleToInsert = '<style>#levelEditor {display:grid;grid-template-columns:';
    for (i = 0; i < size; i += 1) {
        styleToInsert += '1fr ';
    }
    styleToInsert += ';}</style>';
    container.innerHTML += styleToInsert;

    // Adds the clickable table elements to the table
    container = document.querySelector('#levelEditor');
    for (i = 0; i < size; i += 1) {
        for (j = 0; j < size; j += 1) {
            container.innerHTML += '<button onClick="mapEditor(' + i + ', ' + j + ', ' + size + ')" style="border:black solid 2px;" class="editorGrid' + i + j + '"><p>' + i + j + '</p></button>';
        }
    }
}

function mapEditor(line, column, levelSize) {
    // Empties the previous container
    var parent = document.getElementById("levelEditor");
    parent.parentNode.removeChild(parent);
    var container = document.querySelector('#scene-container');

    // Creating the workspace and the toolBar (floating to the right)
    container.innerHTML = '<div id="mapEditor" style="background-color:white;width:100%;"><aside class="float-right" id="toolBar" style="background-color:#343a40;margin:1%;padding:0;height:98%;"></aside></div>';
    container = document.querySelector("#toolBar");
    container.innerHTML += '<button type="button" onClick="toolBarToggle()" class="toolBarToggle btn btn-success" data-toggle="button" aria-pressed="false" style="margin=0;background-color:#6351ce">&#8227; Tool Bar</button>';
    //TODO 


    // Map Editor display
    container = document.querySelector("#mapEditor");
    container.innerHTML += '<button id="buttonBack" class="btn btn-outline-danger" class="float-left" onclick="mapSelector(' + levelSize + ')">&lt;</button>';
}

function toolBarToggle() {
    //TODO (change .active on the button + set display none to #toolBar except button.toolBarToggle)
    
}