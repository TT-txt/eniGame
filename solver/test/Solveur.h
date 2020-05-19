typedef struct Coord { int x; int y; int z} COORD;
typedef struct Node { int x; int z; int GCost; int HCost; } NODE;
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

//IsWalkable todo
bool IsWalkable(COORD* test, MAP* Level);
COORD* Pathfind(COORD* start, COORD* end, MAP* Level);