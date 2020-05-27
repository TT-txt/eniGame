#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define MISSING_ARGS 2
#define WRONG_ARGS 3
#define WRONG_FILE_PATH 4
#define MALFORMED_JSON 5
#define MALLOC_ERROR 6
#define null 0

// *******************************************

typedef enum Direction
{
    w,
    n,
    e,
    s
} DIRECTION;

// C : Coord > Js : Vector3
typedef struct Coord
{
    int x;
    int y;
    int z;
} COORD;

typedef struct Trap
{
    int type;
    COORD coord;
    bool activated;
    DIRECTION facing;
    int group;
} TRAP;

typedef struct Logic
{
    int type;
    COORD coord;
    int onUse;
    int activated[3]; //is on/off or contains the SPAWN coords of a logic elem => 1, 0 and -2 or x,y,z (if type == 1)
    int group;        //Linked with a trap group or 0;
} LOGIC;

typedef struct Map
{
    COORD *walls;
    int wallAmount;
    COORD floor;
    TRAP *traps;   //traps array
    int trapAmount; 
    LOGIC *logics; //logics array 
    int logicAmount;
    bool solved;
    int type;       //Map presets to help the solver
    COORD exits[4]; //Contains the actual coords or (-2, -2, -2) if the exit is not defined
    COORD spawnPoint;
} MAP;

typedef struct Level
{
    int size;
    MAP *maps;
    int theme;
    int endMap;
} LEVEL;

//For Pathfinding

typedef struct Node { int x; int z; int SCost; int ECost; NODE* parentNode; } NODE;

typedef struct LiNodElt
{
	NODE val;
	struct LiNodElt* suiv;
	struct LiNodElt* prev;
}LiNodElt;

typedef struct LiChNod
{
	int size;
	struct LiNodElt* start;
	struct LiNodElt* end;
}LiChNod;

// *******************************************

// Prototypes
int loadLevel(FILE *, LEVEL *);
int readMap(FILE *, MAP *);
int readCoords(FILE *, COORD **);

// Prototypes for Pathfinding
LiChNod* newLiChNod(void);
bool isEmpLiChNod(LiChNod* li);
LiChNod* InsertLiNodElt(LiChNod* li, NODE Value, int pos);
LiChNod* SetLiNodElt(LiChNod* li, NODE Value, int pos);
LiChNod* SupprLiNodElt(LiChNod* li, int pos);
bool nodeIsIn(LiChNod* li, NODE Value);
bool IsWalkable(int x, int z, MAP* Room); // WIP
COORD* Pathfind(COORD* start, COORD* end, MAP* Room);