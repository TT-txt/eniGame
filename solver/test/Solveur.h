typedef struct Coord { int x; int y; int z; } COORD;
typedef struct Node { int x; int z; int SCost; int ECost; NODE* parentNode; } NODE;
//struct Map todo
typedef struct Map { int XSize; int YSize; } MAP;

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

LiChNod* newLiChNod(void);
bool isEmpLiChNod(LiChNod* li);
LiChNod* InsertLiNodElt(LiChNod* li, NODE Value, int pos);
LiChNod* SetLiNodElt(LiChNod* li, NODE Value, int pos);
LiChNod* SupprLiNodElt(LiChNod* li, int pos);
bool nodeIsIn(LiChNod* li, NODE Value);

//IsWalkable todo
bool IsWalkable(int x, int z, MAP* Level);
COORD* Pathfind(COORD* start, COORD* end, MAP* Level);