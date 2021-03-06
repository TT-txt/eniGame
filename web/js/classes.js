class map {
    constructor(walls, floor, traps, logics, solved, type, exits, spawnPoint) {
        this.walls = walls; //array containing COORD of walls
        this.floor = floor; //dimension of the floor, coord of the maximum (x, 0 , z)
        this.traps = traps; //array containing all var in trap class
        this.logics = logics; //array containing all logic elt ENTER THEM BY ID !
        this.solved = solved; //boolean, not hard to understand
        this.type = type; //map type
        this.exits = exits; //array with the exits,false if not present or coords, 0=>left, 1=>top; 2=>right; 3=>bottom
        this.spawnPoint = spawnPoint; //coord of the spawnpoint for the level
    }
}

/*
EXIT ARRAY
    1
0       2
    3
*/

/* ************************
level array :
0 1 2 3 4
5 6 7 8 9
10 ... 14
15 ... 19
20 ... 24
************************ */
class level {
    constructor(size, maps, theme, endMap) {
        this.size = size; //size of the level (square)
        this.maps = maps; //containing array with all the maps in the level (25)
        this.theme = theme; //texture themes
        this.endMap = endMap; //int with the end map index
    }
} 
/* ************************
level array :
0 1 2 3 4
5 6 7 8 9
10 ... 14
15 ... 19
20 ... 24
************************ */

class trap {
    constructor(type, coord, activated, facing, group) {
        this.type = type; //id, see the table
        this.coord = coord; //coord of the trap
        this.activated = activated; //boolean
        this.facing = facing; // w n e s
        this.group = group; //MUST BE THE SAME AS TRAP GROUP
    }
}

/*
+------------------------+----+--------+
|         trap           | id | done ? |
+------------------------+----+--------+
| spikes                 |  0 | yes    |
| arrow once             |  1 | yes    |
| arrow infinite grouped |  2 | yes    |
| flame                  |  3 | yes    |
+------------------------+----+--------+
*/

/*****************************************************
!!!!!!!!!!!!! ENTER LOGIC ELEMENTS BY ID !!!!!!!!!!!!!
******************************************************/
class logic {
    constructor(type, coord, onUse, activated, group){
        this.type = type; //id, see the table
        this.coord = coord; //coord of the elt
        this.onUse = onUse; //char containing what to do if the player is on it
        this.activated = activated; //is on/off or contains the SPAWN coords
        this.group = group; //MUST BE THE SAME AS TRAP THAT U WANT TO ACTIVATE
    }
}
/*
+----------------+----+--------------------------------------+
| Logic Elements | ID |                 onUse                |
+----------------+----+--------------------------------------+
| pressurePlate  |  0 | 0 - Open/Close main doors            |
| pushableBox    |  1 | 0 - Push                             | (activated stores the default coords)
| ...            |    |                                      |
+----------------+----+--------------------------------------+

PressurePlate:
+----+------------------------------------+
| id |               OnUse                |
+----+------------------------------------+
| -1 | finish the level (you win!)        |
|  0 | open level door                    |
|  1 | enable arrow once trap             |
|  2 | enable/disable arrow infinite trap |
|  3 | enable/disable fire trap           |
+----+------------------------------------+
*/