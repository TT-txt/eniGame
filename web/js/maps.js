//BETA LEVEL (only one map)
const testMap = new map(
    [new THREE.Vector3(-5, 5, -5), new THREE.Vector3(1, 1, 3), new THREE.Vector3(1, 1, 4), new THREE.Vector3(3, 2,  2),new THREE.Vector3(3, 1,  2)], // 1st block isnt displaying
    new THREE.Vector3(5, 0, 5),
    null,
    [new logic(0, new THREE.Vector3(4,0.51,4), 0, false), new logic(1, new THREE.Vector3(2, 0.9, 1), 0, false)],
    false,
    null,
    [new THREE.Vector3(-1, 0, 3), new THREE.Vector3(1, 0, -1), new THREE.Vector3(5, 0, 1), new THREE.Vector3(2, 0, 5)]
);
const testLevel = new level([testMap]);