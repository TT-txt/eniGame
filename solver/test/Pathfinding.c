#include<stdio.h>
#include <stdlib.h>
#include<math.h>
#include<stdbool.h>
#include<conio.h>

#include"Solveur.h"
//#include"headers.h"

int GetDist(int x1, int z1, int x2, int z2);
bool IsWalkable(int x, int z, MAP* Room, COORD IgnoBox);
NODE* CreateMapOfNode(MAP* Room);
COORD* Pathfind(COORD* start, COORD* end, MAP* Room, bool PassBox);
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

// set IgnoBox to (a;-1;a) to not ignore any box
// set IgnoBox to (a;-2;a) to ignore all box
// a can be any int
bool IsWalkable(int x, int z, MAP* Room, COORD IgnoBox)
{
	if(x>=0 && z>=0 && x <= Room->floor.x && z <= Room->floor.z)//check in room
	{
		for (int i = 0; i < Room->wallAmount; i++)//check wall
		{
			if (x == Room->walls[i].x && z == Room->walls[i].z)
			{
				return(false);
			}
		}
		for (int i = 0; i < Room->trapAmount; i++)//check traps (no traps effect check here)
		{
			if (x == Room->traps[i].coord.x && z == Room->traps[i].coord.z)
			{
				return(false);
			}
		}
		if(IgnoBox.y != -2)//check if ignore box
		{
			if(IgnoBox.y == -1)//check all box
			{
				for (int i = 0; i < Room->logicAmount; i++)
				{
					if (Room->logics[i].type == 1)
					{
						if (x == Room->logics[i].coord.x && z == Room->logics[i].coord.z)
						{
							return(false);
						}
					}
				}
			}
			else // check all box with the expetion of the given one
			{
				if (x == IgnoBox.x && z == IgnoBox.z){return(true);}
				for (int i = 0; i < Room->logicAmount; i++)
				{
					if (Room->logics[i].type == 1)
					{
						if (x == Room->logics[i].coord.x && z == Room->logics[i].coord.z)
						{
							return(false);
						}
					}
				}
			}
		}
		return(true);
	}
	return(false);
}

NODE* CreateMapOfNode(MAP* Room)
{
	NODE* NodeMap = NULL;
	NodeMap = malloc(sizeof(NODE)*(Room->floor.x)*(Room->floor.z));
	if (NodeMap == NULL)
		{
			printf("Error, allocation failed");
			exit(EXIT_FAILURE);
		}
	for (int i = 0; i < ((Room->floor.x)*(Room->floor.z)); i++)
	{
		NodeMap[i].x = i/(Room->floor.z);
		NodeMap[i].z = i-((NodeMap[i].x)*(Room->floor.z));
		NodeMap[i].ECost = 0;
		NodeMap[i].SCost = 0;
		NodeMap[i].parentNode = NULL;
	}
	return(NodeMap);
}

//not finish
COORD* Pathfind(COORD* start, COORD* end, MAP* Room, bool PassBox)
{
	LiChNod* open = newLiChNod();
	LiChNod* close = newLiChNod();
	NODE* RoomNode = CreateMapOfNode(Room);
	NODE* StartN = &(RoomNode[((start->x)*(Room->floor.z))+start->z]);
	StartN->ECost = GetDist(start->x, start->z, end->x, end->z);
	InsertLiNodElt(open, *StartN, 0);
	while (open->size > 0) {
		NODE* currentNode = &(open->start->val);
		LiNodElt* tmp = open->start;
		int tmpLiPos = 0;
		for (int i = 1; i < open->size; i++)
		{
			tmp = tmp->suiv;
			
			if ((tmp->val->SCost + tmp->val->ECost) < (currentNode->SCost + currentNode->ECost) || ((tmp->val->SCost + tmp->val->ECost) == (currentNode->SCost + currentNode->ECost) && tmp->val->ECost < currentNode->ECost)) {
				currentNode = tmp->val;
				tmpLiPos = i;
			}
		}
		SupprLiNodElt(open,tmpLiPos);
		InsertLiNodElt(close, *currentNode, close->size);
		if (currentNode->x == end->x && currentNode->z == end->z)
		{
			LiChNod* resultNodLi = newLiChNod();
			NODE* tmpResuNod = currentNode;
			while (tmpResuNod->parentNode != NULL)
			{
				InsertLiNodElt(resultNodLi, *tmpResuNod, resultNodLi->size);
				tmpResuNod = tmpResuNod->parentNode;
			}
			COORD* Result = NULL;
			Result = malloc(sizeof(COORD)*resultNodLi->size);
			if (Result == NULL)
			{
				printf("Error, allocation failed");
				exit(EXIT_FAILURE);
			}
			LiNodElt* tmpLiReElt = resultNodLi->start;
			for (int i = 0; i < resultNodLi->size; i++)
			{
				Result[i].x = tmpLiReElt->val->x;
				Result[i].y = 1;
				Result[i].z = tmpLiReElt->val->z;
				tmpLiReElt = tmpLiReElt->suiv;
			}
			free(RoomNode);
			return(Result);
		}

		for (int j = 0; j < 2; j++)
		{
			for (int i = -1; i < 2; i += 2)
			{
				NODE* NeighbourNode = NULL;
				if (j == 0)
				{
					if ((currentNode->x)+i >= 0 && (currentNode->x)+i <= Room->floor.x)
					{
						NeighbourNode = &(RoomNode[(((currentNode->x)+i)*(Room->floor.z))+currentNode->z]);
					}
					else
					{
						continue;
					}
				}
				else
				{
					if ((currentNode->z)+i >= 0 && (currentNode->z)+i <= Room->floor.z)
					{
						NeighbourNode = &(RoomNode[((currentNode->x)*(Room->floor.z))+(currentNode->z)+i]);
					}
					else
					{
						continue;
					}
				}

				COORD BoxHandle;
				if (PassBox == true)
				{
					BoxHandle.x = 0;
					BoxHandle.y = -1;
					BoxHandle.z = 0;
				}
				else
				{
					BoxHandle.x = 0;
					BoxHandle.y = -2;
					BoxHandle.z = 0;
				}
				
				if (!nodeIsIn(close, *NeighbourNode) && IsWalkable(NeighbourNode->x, NeighbourNode->z, Room, BoxHandle))
				{
					int mouvCost = currentNode->SCost + 1;
					if (mouvCost < NeighbourNode->SCost || !nodeIsIn(open, *NeighbourNode))
					{
						NeighbourNode->SCost = mouvCost;
						NeighbourNode->ECost = GetDist(NeighbourNode->x, NeighbourNode->z, start->x, start->z);
						NeighbourNode->parentNode = &currentNode;
					}
					if (!nodeIsIn(open, *NeighbourNode))
					{
						InsertLiNodElt(open, *NeighbourNode, open->size);
					}
					
				}
			}
		}
	}
	COORD Failure;
	Failure.x = -1;
	Failure.y = -1;
	Failure.z = -1;
	return(&Failure);
}