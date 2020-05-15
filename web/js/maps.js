//BETA LEVEL (only one map)
const startMap0 = new map(
    [
        new THREE.Vector3(1, 1, 1),new THREE.Vector3(1, 2, 1),new THREE.Vector3(1, 3, 1),
        new THREE.Vector3(3, 1, 1),
        new THREE.Vector3(1, 1, 3),new THREE.Vector3(1, 2, 3),
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
    [new THREE.Vector3(-5, 5, -5), new THREE.Vector3(1, 1, 3), new THREE.Vector3(1, 1, 4), new THREE.Vector3(3, 2,  2),new THREE.Vector3(3, 1,  2)],
    new THREE.Vector3(5, 0, 5),
    [new trap(1, new THREE.Vector3(1, 2, 3), false, "e")],
    [new logic(0, new THREE.Vector3(4, 1, 4), 0, false), new logic(1, new THREE.Vector3(), 0, new THREE.Vector3(2, 1, 1))],
    false,
    null,
    [new THREE.Vector3(-1, 0, 1), false, false, false],
    new THREE.Vector3(2, 1, 2),
);

const startLevel = new level([startMap0, startMap1]);