/*class coord {
    constructor(x, y, z) {
        this.x = x;//easy
        this.y = y;//to 
        this.z = z;//understand
    }
}
*/
//new THREE.Vector3(x, y, z)

class map {
    constructor(walls, floor, traps, logics, solved, type, exits) {
        this.walls = walls; //array containing COORD of walls
        this.floor = floor; //dimension of the floor, coord of the maximum (x, 0 , z)
        this.traps = traps; //array containing all var in trap class
        this.logics = logics; //array containing all logic elt
        this.solved = solved; //boolean, not hard to understand
        this.type = type; //map type
        this.exits = exits; //array with the exits, 0=>left, 1=>top; 2=>right; 3=>bottom
    }
}

/* ************************
maps array :
0 1 2 3 4
5 6 7 8 9
10 ... 14
15 ... 19
20 ... 24
************************ */
class level {
    constructor(maps, theme) {
        this.maps = maps; //containing array with all the maps in the level (25)
        this.theme = theme; //texture themes
    }
} 

class trap {
    constructor(type, coord, activated) {
        this.type = type; //id, see the table
        this.coord = coord; //coord of the trap
        this.activated = activated; //boolean
    }
}

/*
+----------------+----+
|      Traps     | ID |
+----------------+----+
| spikes         |  0 |
| arrowOnce      |  1 |
| arrowInfinite  |  2 |
| ...            |    |
+----------------+----+
*/

class logic {
    constructor(type, coord, onUse, activated){
        this.type = type; //id, see the table
        this.coord = coord; //coord of the elt
        this.onUse = onUse; //char containing what to do if the player is on it
        this.activated = activated; //is on/off
        
    }
}
/*
+----------------+----+---------------------------+
| Logic Elements | ID |           onUse           |
+----------------+----+---------------------------+
| pressurePlate  |  0 | 0 - Open/Close main doors |
| pushableBox    |  1 | 0 - Push                  |
| ...            |    |                           |
+----------------+----+---------------------------+
*/