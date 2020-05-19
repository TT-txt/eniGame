function loadEditor() {
    const container = document.querySelector('#scene-container');
    container.innerHTML = '<div id="levelScaler" style="background-color:white;width:100%;padding:15%;"><label style="font-size:20px;">Input your level size : &nbsp; </label><input class="levelSize" placeholder="0 < size < 9" name="name"/><br/><button class="btn btn-outline-success" onClick="startEditing()">Create</button></div>';
}

function startEditing() {
    let size = document.getElementsByClassName('levelSize')[0].value;
    if (0 < size && size < 9) {
        mapSelector(size);
    } else { mapSelector(5); }
}

function mapSelector(size) {
    var createdLevel = new level();
    console.log(size);
    var parent = document.getElementById("levelScaler");
    parent.parentNode.removeChild(parent);
    var container = document.querySelector('#scene-container');
    container.innerHTML = '<div id="levelEditor" style="background-color:white;width:100%;"></div>';
    let styleToInsert = '<style>#levelEditor {display:grid;grid-template-columns:';
    for (let i = 0; i < size; i += 1) {
        styleToInsert += '1fr ';
    } 
    styleToInsert += ';}</style>';
    console.log(styleToInsert);
    container.innerHTML += styleToInsert;
    container = document.querySelector('#levelEditor');
    for (let i = 0; i < size; i += 1) {
        for (let j = 0; j < size; j += 1) {
            container.innerHTML += '<div class="editorGrid' + i + j + '"><p>' + i + j + '</p></div>';
        }
    }

}