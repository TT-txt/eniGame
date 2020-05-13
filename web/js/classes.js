class coord {
    constructor(x, y, z) {
        this.x = x;//easy
        this.y = y;//to 
        this.z = z;//understand
    }
}
class map {
    constructor(walls, floor, traps, logics, solved, type, exits) {
        this.walls = walls; //array containing COORD of walls
        this.floor = new coord(5,0,5); //dimension of the floor, coord of the maximum (x, 0 , z)
        this.traps = traps; //array containing all var in trap class
        this.logics = logics; //array containing all logic elt
        this.solved = false; //boolean, not hard to understand
        this.type = 0; //map type
        this.exits = [new coord(-1, 0, 2), new coord(2, 0, -1), new coord(5, 0, 2), new coord(2, 0, 5)]; //array with the exits, 0=>left, 1=>top; 2=>right; 3=>bottom
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

class logic {
    constructor(type, coord, onUse, activated){
        this.type = type; //id, see the table
        this.coord = coord; //coord of the elt
        this.onUse = onUse; //char containing what to do if the player is on it
        this.activated = false; //is on/off
        
    }
}