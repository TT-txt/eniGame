#include<stdio.h>
#include<math.h>
#include<stdbool.h>
#include<conio.h>

#include"Solveur.h"
//#include"headers.h"

int GetDist(int x1, int z1, int x2, int z2);
//IsWalkable todo
bool IsWalkable(int x, int z, MAP* Room);
COORD* Pathfind(COORD* start, COORD* end, MAP* Room);
/*
int main()
{


	for (int i = -1; i < 2; i+=2)
	{
		printf("%i\n", i);
	}
	printf("\n\n");

	//return 0;
}
*/
int GetDist(int x1, int z1, int x2, int z2) {return(abs(x2 - x1) + abs(z2 - z1));}

bool IsWalkable(int x, int z, MAP* Room)
{
	/*
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
*/
	
}

//not finish
COORD* Pathfind(COORD* start, COORD* end, MAP* Room)
{
	LiChNod* open = newLiChNod();
	LiChNod* close = newLiChNod();
	NODE StartN;
	StartN.x = start->x;
	StartN.z = start->z;
	StartN.parentNode = NULL;
	StartN.SCost = 0;
	StartN.ECost = GetDist(start->x, start->z, end->x, end->z);
	InsertLiNodElt(open, StartN, 0);
	while (open->size > 0) {
		NODE currentNode = open->start->val;
		LiNodElt* tmp = open->start;
		int tmpLiPos = 0;
		for (int i = 1; i < open->size; i++)
		{
			tmp = tmp->suiv;
			
			if ((tmp->val.SCost + tmp->val.ECost) < (currentNode.SCost + currentNode.ECost) || ((tmp->val.SCost + tmp->val.ECost) == (currentNode.SCost + currentNode.ECost) && tmp->val.ECost < currentNode.ECost)) {
				currentNode = tmp->val;
				tmpLiPos = i;
			}
		}
		SupprLiNodElt(open,tmpLiPos);
		InsertLiNodElt(close, currentNode, close->size);
		if (currentNode.x == end->x && currentNode.z == end->z)
		{
			//path found
			//(convesion NODE array to COORD array + return) todo
		}

		NODE NeighbourNode;
		NeighbourNode.parentNode = NULL;
		for (int j = 0; j < 2; j++)
		{
			for (int i = -1; i < 2; i += 2)
			{
				if (j == 0)
				{
					NeighbourNode.x = currentNode.x + i;
					NeighbourNode.z = currentNode.z;
				}
				else
				{
					NeighbourNode.x = currentNode.x;
					NeighbourNode.z = currentNode.z + i;
				}
				//IsWalkable todo
				if (!nodeIsIn(close, NeighbourNode) && IsWalkable(NeighbourNode.x, NeighbourNode.z, Room))
				{
					int mouvCost = currentNode.SCost + 1;
					if (mouvCost < NeighbourNode.SCost || !nodeIsIn(open, NeighbourNode))
					{
						NeighbourNode.SCost = mouvCost;
						NeighbourNode.ECost = GetDist(NeighbourNode.x, NeighbourNode.z, start->x, start->z);
						NeighbourNode.parentNode = &currentNode;
					}
					if (!nodeIsIn(open, NeighbourNode))
					{
						InsertLiNodElt(open, NeighbourNode, open->size);
					}
					
				}
			}
		}
	}
}