#include<stdio.h>
#include<math.h>
#include<stdbool.h>
#include<conio.h>

#include"Solveur.h"

int GetDist(int x1, int z1, int x2, int z2);
//IsWalkable todo
bool IsWalkable(int x, int z, MAP* Level);
COORD* Pathfind(COORD* start, COORD* end, MAP* Level);
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

//not finish
COORD* Pathfind(COORD* start, COORD* end, MAP* Level)
{
	LiChNod* open = newLiChNod();
	LiChNod* close = newLiChNod();
	NODE StartN;
	StartN.x = start->x;
	StartN.z = start->z;
	StartN.parentNode = NULL;
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
				//!nodeIsIn() here, might not be necessary, still need to check if the algo behave normaly without it.
				if (!nodeIsIn(close, NeighbourNode) && IsWalkable(NeighbourNode.x, NeighbourNode.z, Level))
				{
					int mouvCost = currentNode.SCost + GetDist(currentNode.x, currentNode.z, NeighbourNode.x, NeighbourNode.z);
					if (mouvCost < NeighbourNode.SCost || !nodeIsIn(open, NeighbourNode))
					{
						NeighbourNode.SCost = mouvCost;
						NeighbourNode.ECost = GetDist(NeighbourNode.x, NeighbourNode.z, start->x, start->z);
					}
					//NeighbourNode.SCost = GetDist(NeighbourNode.x, NeighbourNode.z, end->x, end->z);
					//NeighbourNode.ECost = GetDist(NeighbourNode.x, NeighbourNode.z, start->x, start->z);
					NeighbourNode.parentNode = &currentNode;
					if (!nodeIsIn(open, NeighbourNode))
					{
						InsertLiNodElt(open, NeighbourNode, open->size);
					}
					
				}
			}
		}
	}
}