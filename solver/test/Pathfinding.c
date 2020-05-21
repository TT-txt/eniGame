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
	InsertLiNodElt(open, StartN, 0);
	while (open->size > 0) {
		NODE currentNode = open->start->val;
		LiNodElt* tmp = open->start;
		int tmpLiPos = 0;
		for (int i = 1; i < open->size; i++)
		{
			tmp = tmp->suiv;
			
			if ((tmp->val.GCost + tmp->val.HCost) < (currentNode.GCost + currentNode.HCost) || ((tmp->val.GCost + tmp->val.HCost) == (currentNode.GCost + currentNode.HCost) && tmp->val.HCost < currentNode.HCost)) {
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
				//Might not be necessary, still need to check if the algo behave normaly without it.
				//here to ...
				bool isInClose = false;
				tmp = close->start;
				for (int c = 0; c < close->size; c++)
				{
					if (NeighbourNode.x == tmp->val.x && NeighbourNode.z == tmp->val.z)
					{
						isInClose = true;
					}
					tmp = tmp->suiv;
				}
				//here
				//IsWalkable todo
				if (!isInClose && IsWalkable(NeighbourNode.x, NeighbourNode.z, Level))
				{
					NeighbourNode.GCost = GetDist(NeighbourNode.x, NeighbourNode.z, end->x, end->z);
					NeighbourNode.HCost = GetDist(NeighbourNode.x, NeighbourNode.z, start->x, start->z);
				
				
				
				}
			}
		}
	}
}