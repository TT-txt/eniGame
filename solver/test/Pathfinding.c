#include<stdio.h>
#include<math.h>
#include<stdbool.h>
#include<conio.h>

#include"Solveur.h"

//IsWalkable todo
bool IsWalkable(COORD* test, MAP* Level);
COORD* Pathfind(COORD* start, COORD* end, MAP* Level);

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
		int tmpLiPos;
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
			//convesion NODE array to COORD arrey + return todo
		}

		//big calcul part todo

	}


}