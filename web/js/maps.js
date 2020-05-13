//BETA LEVEL (only one map)
const testMap = new map(
    [new coord(-5, 5, -5), new coord(1, 1, 3), new coord(1, 1, 4), new coord(3, 2,  2)], // 1st block isnt displaying
    new coord(5, 0, 5),
    null,
    [new logic(0, new coord(2,0.5,2), 0, false)],
    false,
    null,
    [new coord(-1, 0, 3), new coord(1, 0, -1), new coord(5, 0, 1), new coord(2, 0, 5)]
);
const testLevel = new level([testMap]);