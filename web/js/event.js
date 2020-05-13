
//Auto windows size
function onWindowResize() {

    // set the aspect ratio to match the new browser window aspect ratio
    camera.aspect = container.clientWidth / container.clientHeight;

    // update the camera's frustum
    camera.updateProjectionMatrix();

    // update the size of the renderer AND the canvas
    renderer.setSize(container.clientWidth, container.clientHeight);

}

window.addEventListener('resize', onWindowResize);

// Prevents scrolling with arrow keys
window.addEventListener("keydown", function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


// Player movements
var blocked = true;

function checkKeyPress(key) {
    blocked = false;

    if (key.keyCode == "37" || key.keyCode == "81") {
        //Left arrow key or q
        if (0 == heroMesh.position.x) {
            blocked = true;
        } else {
            for (let element of currentLevel.maps[currentMap].walls) {
                console.log(element);
                if (element.x == heroMesh.position.x - 1 && element.z == heroMesh.position.z) {
                    blocked = true;
                    break;
                }
            }
        }
        if (!blocked)
            heroMesh.position.x -= 1;
        heroMesh.rotation.z = Math.PI / 2;
    } else if (key.keyCode == "38" || key.keyCode == "90") {
        //Up arrow key or z

        if (0 == heroMesh.position.z) {
            blocked = true;
        } else {
            for (let element of currentLevel.maps[currentMap].walls) {
                console.log(element);
                if (element.x == heroMesh.position.x && element.z == heroMesh.position.z - 1) {
                    blocked = true;
                    break;
                }
            }
        }
        if (!blocked)
            heroMesh.position.z -= 1;
        heroMesh.rotation.z = 0;
    } else if (key.keyCode == "39" || key.keyCode == "68") {
        //Right arrow key or d

        if (currentLevel.maps[currentMap].floor.x == heroMesh.position.x + 1) {
            blocked = true;
        } else {
            for (let element of currentLevel.maps[currentMap].walls) {
                console.log(element);
                if (element.x == heroMesh.position.x + 1 && element.z == heroMesh.position.z) {
                    blocked = true;
                    break;
                }
            }
        }
        if (!blocked)
            heroMesh.position.x += 1;
        heroMesh.rotation.z = Math.PI * 3 / 2;
    } else if (key.keyCode == "40" || key.keyCode == "83") {
        //Down arrow key or s

        if (currentLevel.maps[currentMap].floor.z == heroMesh.position.z + 1) {
            blocked = true;
        } else {
            for (let element of currentLevel.maps[currentMap].walls) {
                console.log(element);
                if (element.x == heroMesh.position.x && element.z == heroMesh.position.z + 1) {
                    blocked = true;
                    break;
                }
            }
        }
        if (!blocked)
            heroMesh.position.z += 1;
        heroMesh.rotation.z = Math.PI;
    }
    console.log(heroMesh.position);
    console.log(heroMesh.rotation);
}

window.addEventListener("keydown", checkKeyPress, false); //false so the function doesn't return a thing