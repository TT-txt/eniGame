// Asynchronous call
// url > target url
// jsonLoadSuccess > function to call on success
function loadMap(url) {
    var xhr = new XMLHttpRequest();
    let jsonToObject = new level();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onload = function () {
        jsonToObject = xhr.response;
        init(jsonToObject);
    }
    xhr.send();
}

/*
******************* /\ loading levels *******************
******************* \/ writing levels *******************
*/
const startMap0 = new map(
    [
        new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, 2, 1), new THREE.Vector3(1, 3, 1),
        new THREE.Vector3(3, 1, 1),
        new THREE.Vector3(1, 1, 3), new THREE.Vector3(1, 2, 3),
        new THREE.Vector3(3, 1, 3),
        new THREE.Vector3(0, 1, 3)
    ],
    new THREE.Vector3(5, 0, 5),
    [],
    [new logic(0, new THREE.Vector3(4, 1, 2), 0, false)],
    false,
    null,
    [false, false, new THREE.Vector3(5, 0, 2), false],
    new THREE.Vector3(2, 1, 2),
);

const startMap1 = new map(
    [new THREE.Vector3(-5, 5, -5), new THREE.Vector3(1, 1, 3), new THREE.Vector3(1, 1, 4), new THREE.Vector3(3, 2, 2), new THREE.Vector3(3, 1, 2)],
    new THREE.Vector3(5, 0, 5),
    [new trap(1, new THREE.Vector3(1, 2, 3), false, 'e')],
    [new logic(0, new THREE.Vector3(4, 1, 4), 0, false), new logic(1, new THREE.Vector3(), 0, new THREE.Vector3(2, 1, 1))],
    false,
    null,
    [new THREE.Vector3(-1, 0, 1), false, false, false],
    new THREE.Vector3(2, 1, 2),
);

var testLevel = new level(
    [
        startMap0,
        startMap1
    ],
    0
);
var objToJsonFile = JSON.stringify(testLevel);
//console.log(objToJsonFile);

// Creating a XHR object 
let xhr = new XMLHttpRequest();
let url = "http://localhost/CIR1Project/eniGame/web/maps/saveMap.php";

// open a connection 
xhr.open("POST", url, true); //true is for async (so the client doesn't have to wait the complete save of the file to continue using the site)

// Set the request header i.e. which type of content you are sending 
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {//Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
        alert(xhr.responseText);
    }
}
xhr.send("textToWrite=" + objToJsonFile);


