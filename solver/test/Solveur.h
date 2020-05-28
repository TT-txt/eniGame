typedef struct Coord { int x; int y; int z; } COORD;
typedef struct Node { int x; int z; int SCost; int ECost; struct NODE* parentNode; } NODE;

typedef enum Direction
{
    w,
    n,
    e,
    s
} DIRECTION;

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

typedef struct LiNodElt
{
	NODE* val;
	struct LiNodElt* suiv;
	struct LiNodElt* prev;
}LiNodElt;

typedef struct LiChNod
{
	int size;
	struct LiNodElt* start;
	struct LiNodElt* end;
}LiChNod;

LiChNod* newLiChNod(void);
bool isEmpLiChNod(LiChNod* li);
LiChNod* InsertLiNodElt(LiChNod* li, NODE Value, int pos);
LiChNod* SetLiNodElt(LiChNod* li, NODE Value, int pos);
LiChNod* SupprLiNodElt(LiChNod* li, int pos);
bool nodeIsIn(LiChNod* li, NODE Value);

int GetDist(int x1, int z1, int x2, int z2);
bool IsWalkable(int x, int z, MAP* Room, COORD IgnoBox);
NODE* CreateMapOfNode(MAP* Room);
COORD* Pathfind(COORD* start, COORD* end, MAP* Room, bool PassBox);