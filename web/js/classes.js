class coord {
    constructor(x, y, z) {
        this.x = x;//easy
        this.y = y;//to 
        this.z = z;//understand
    }
}
class map {
    constructor(walls, floor, traps, puzzle, solved, type, exits) {
        this.walls = walls; //array containing COORD of walls
        this.floor = floor; //dimension of the floor, coord of the maximum (x, 0 , z)
        this.traps = traps; //array containing all var in trap class
        this.puzzle = puzzle; //array containing something
        this.solved = solved; //boolean, not hard to understand
        this.type = type; //map type
        this.exits = exits; //array with the exits, 0=>left, 1=>top; 2=>right; 3=>bottom
    }
}

class trap {
    constructor(type, coord, activated) {
        this.type = type; //string or char, or id, idk yet
        this.coord = coord; //coord of the trap
        this.activated = activated; //boolean
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