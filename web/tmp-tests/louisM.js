const testMapLM = new map(
    [new THREE.Vector3(6, 1, 0), new THREE.Vector3(6, 1, 1), new THREE.Vector3(6, 1, 2), new THREE.Vector3(6, 1, 3),
        new THREE.Vector3(8, 1, 0), new THREE.Vector3(8, 1, 1), new THREE.Vector3(8, 1, 2), new THREE.Vector3(8, 1, 3),
        new THREE.Vector3(0, 1, 6), new THREE.Vector3(1, 1, 6), new THREE.Vector3(2, 1, 6), new THREE.Vector3(3, 1, 6),
        new THREE.Vector3(0, 1, 8), new THREE.Vector3(1, 1, 8), new THREE.Vector3(2, 1, 8), new THREE.Vector3(3, 1, 8),
        new THREE.Vector3(6, 1, 11), new THREE.Vector3(6, 1, 12), new THREE.Vector3(6, 1, 13), new THREE.Vector3(6, 1, 14),
        new THREE.Vector3(8, 1, 11), new THREE.Vector3(8, 1, 12), new THREE.Vector3(8, 1, 13), new THREE.Vector3(8, 1, 14),
        new THREE.Vector3(11, 1, 6), new THREE.Vector3(12, 1, 6), new THREE.Vector3(13, 1, 6), new THREE.Vector3(14, 1, 6),
        new THREE.Vector3(11, 1, 8), new THREE.Vector3(12, 1, 8), new THREE.Vector3(13, 1, 8), new THREE.Vector3(14, 1, 8),
        new THREE.Vector3(4, 1, 5), new THREE.Vector3(5, 1, 4),
        new THREE.Vector3(5, 1, 10), new THREE.Vector3(4, 1, 9),
        new THREE.Vector3(10, 1, 5), new THREE.Vector3(9, 1, 4),
        new THREE.Vector3(10, 1, 9), new THREE.Vector3(9, 1, 10),
        new THREE.Vector3(6, 2, 1), new THREE.Vector3(6, 3, 1), new THREE.Vector3(6, 2, 3), new THREE.Vector3(6, 3, 3),
        new THREE.Vector3(8, 2, 1), new THREE.Vector3(8, 3, 1), new THREE.Vector3(8, 2, 3), new THREE.Vector3(8, 3, 3),
        new THREE.Vector3(6, 2, 11), new THREE.Vector3(6, 3, 11), new THREE.Vector3(6, 2, 13), new THREE.Vector3(6, 3, 13),
        new THREE.Vector3(8, 2, 11), new THREE.Vector3(8, 3, 11), new THREE.Vector3(8, 2, 13), new THREE.Vector3(8, 3, 13),
        new THREE.Vector3(1, 2, 6),new THREE.Vector3(1, 3, 6),new THREE.Vector3(3, 2, 6),new THREE.Vector3(3, 3, 6),
        new THREE.Vector3(1, 2, 8),new THREE.Vector3(1, 3, 8),new THREE.Vector3(3, 2, 8),new THREE.Vector3(3, 3, 8),
        new THREE.Vector3(11, 2, 6),new THREE.Vector3(11, 3, 6),new THREE.Vector3(13, 2, 6),new THREE.Vector3(13, 3, 6),
        new THREE.Vector3(11, 2, 8),new THREE.Vector3(11, 3, 8),new THREE.Vector3(13, 2, 8),new THREE.Vector3(13, 3, 8),
        new THREE.Vector3(6, 1, 6), new THREE.Vector3(6, 2, 6), new THREE.Vector3(6, 3, 6),
        new THREE.Vector3(6, 1, 8), new THREE.Vector3(6, 2, 8), new THREE.Vector3(6, 3, 8),
        new THREE.Vector3(8, 1, 6), new THREE.Vector3(8, 2, 6), new THREE.Vector3(8, 3, 6),
        new THREE.Vector3(8, 1, 8), new THREE.Vector3(8, 2, 8), new THREE.Vector3(8, 3, 8)
    ],
    new THREE.Vector3(15, 0, 15),
    null,
    [new logic(1, new THREE.Vector3(7, 0.9, 7), 0, false)],
    false,
    null,
    [new THREE.Vector3(-1, 0, 7), new THREE.Vector3(7, 0, -1), new THREE.Vector3(7, 0, 15), new THREE.Vector3(15, 0, 7)],
    new THREE.Vector3(0, 1, 0)
);

const startMap = new map(
    [
        new THREE.Vector3(1, 1, 1),new THREE.Vector3(1, 2, 1),new THREE.Vector3(1, 3, 1),
        new THREE.Vector3(3, 1, 1),
        new THREE.Vector3(1, 1, 3),new THREE.Vector3(1, 2, 3),
        new THREE.Vector3(3, 1, 3),
        new THREE.Vector3(1, 1, 4)
    ],
    new THREE.Vector3(5, 0, 5),
    [],
    [new logic(0, new THREE.Vector3(2, 1, 0), 0, false)],
    false,
    null,
    [false, new THREE.Vector3(2, 0, -1), false, false],
    new THREE.Vector3(2, 1, 2)
);
const startLevel = new level([startMap]);

const lv1Map = new map(
    [
        new THREE.Vector3(0, 1, 2),
        new THREE.Vector3(2, 1, 1),
        new THREE.Vector3(0, 1, 3),new THREE.Vector3(0, 2, 3),new THREE.Vector3(0, 3, 3),
        new THREE.Vector3(0, 1, 1),new THREE.Vector3(0, 2, 1),new THREE.Vector3(0, 3, 1),
        new THREE.Vector3(1, 1, 3),
    ],
    new THREE.Vector3(4, 0, 4),
    [new trap(1, new THREE.Vector3(0, 1, 0), false, "e")],
    [new logic(0, new THREE.Vector3(1, 1, 0), 0, false), new logic(1, new THREE.Vector3(), 0, new THREE.Vector3(1, 1, 1))],
    false,
    null,
    [false, new THREE.Vector3(1, 0, -1), false, new THREE.Vector3(2, 0, 4)],
    new THREE.Vector3(2, 1, 2)
);
const lv1Level = new level([lv1Map]);

const lv2Map = new map(
    [
        new THREE.Vector3(3, 1, 0),new THREE.Vector3(3, 2, 0),new THREE.Vector3(3, 3, 0),
        new THREE.Vector3(1, 1, 3),new THREE.Vector3(1, 2, 3),
        new THREE.Vector3(2, 1, 6)
    ],
    new THREE.Vector3(4, 0, 7),
    [new trap(1, new THREE.Vector3(3, 1, 6), false, "s"),new trap(1, new THREE.Vector3(3, 1, 1), false, "n")],
    [new logic(0, new THREE.Vector3(3, 1, 4), 0, false), new logic(1, new THREE.Vector3(), 0, new THREE.Vector3(2, 1, 3)), new logic(1, new THREE.Vector3(), 0, new THREE.Vector3(2, 1, 1))],
    false,
    null,
    [false, false, new THREE.Vector3(4, 0, 4), new THREE.Vector3(1, 0, 7)],
    new THREE.Vector3(1, 1, 6)
);
const lv2Level = new level([lv2Map]);