#include"headers.h"

int GetDist(int x1, int z1, int x2, int z2) {return(abs(x2 - x1) + abs(z2 - z1));}

// set IgnoBox to (a;-1;a) to not ignore any box
// set IgnoBox to (a;-2;a) to ignore all box
// a can be any int
bool IsWalkable(int x, int z, MAP* Room, COORD IgnoBox)
{
	//printf("IgnoBox.y = %d\n", IgnoBox.y);
	if(x>=0 && z>=0 && x <= Room->floor.x && z <= Room->floor.z)//check in room
	{
		for (int i = 0; i < Room->wallAmount; i++)//check wall
		{
			if (x == Room->walls[i].x && z == Room->walls[i].z)
			{
				//printf("Bof, c'est un mur.\n");
				return(false);
			}
		}
		for (int i = 0; i < Room->trapAmount; i++)//check traps (no traps effect check here)
		{
			if (x == Room->traps[i].coord.x && z == Room->traps[i].coord.z)
			{
				//printf("Bof, c'est un piège.\n");
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
						//printf("case |x:%d y:%d| compared box |x:%d y:%d|\n", x, z, Room->logics[i].activated[0], Room->logics[i].activated[2]);
						if (x == Room->logics[i].activated[0] && z == Room->logics[i].activated[2])
						{
							//printf("It's a box !\n");
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
	//printf("Bof, t'est dehors.\n");
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

ENIPATH Pathfind(COORD* start, COORD* end, MAP* Room, COORD PassBox, COORD MakeWall)
{
	LiChNod* open = newLiChNod();
	LiChNod* close = newLiChNod();
	NODE* RoomNode = CreateMapOfNode(Room);
	//printf("\ntest RN : %d\n", RoomNode);
	NODE* StartN = &(RoomNode[(((*start).x)*(Room->floor.z))+(*start).z]);
	//printf("\ntest1 : %d\n", Room->floor.z);
	//printf("\ntest RNV : %d\n", (*start).x);
	StartN->ECost = GetDist(start->x, start->z, end->x, end->z);
	//printf("\ntest : %d\n", StartN->ECost);
	InsertLiNodElt(open, StartN, 0);
	while (open->size > 0) {
		NODE* currentNode = (open->start->val);
		LiNodElt* tmp = open->start;
		int tmpLiPos = 0;
		//printf("\ntest OS : %d\n", open->size);
		for (int i = 1; i < open->size; i++)
		{
			tmp = tmp->suiv;
			//printf("look %d\n", (tmp->val->SCost + tmp->val->ECost));
			//printf("compare to %d\n", (currentNode->SCost + currentNode->ECost));
			if ((tmp->val->SCost + tmp->val->ECost) < (currentNode->SCost + currentNode->ECost) || ((tmp->val->SCost + tmp->val->ECost) == (currentNode->SCost + currentNode->ECost) && (tmp->val->ECost < currentNode->ECost))) {
				currentNode = tmp->val;
				tmpLiPos = i;
				//printf("found at %d -> x:%d y:%d\n", i, currentNode->x, currentNode->z);
			}
		}
		if (!nodeIsIn(close, currentNode))
		{
			InsertLiNodElt(close, currentNode, close->size);
		}
		//printf("test TmpLiPos = %d\n", tmpLiPos);
		//printf("test Open0 = %d\n", open->start);
		SupprLiNodElt(open,tmpLiPos);
		//printf("test Open0 = %d\n", open->start);
		//printf("Dist to end = %d\n", GetDist(currentNode->x, currentNode->z, end->x, end->z));
		if (currentNode->x == end->x && currentNode->z == end->z)
		{
			LiChNod* resultNodLi = newLiChNod();
			NODE* tmpResuNod = currentNode;
			while (tmpResuNod->parentNode != NULL)
			{
				InsertLiNodElt(resultNodLi, tmpResuNod, resultNodLi->size);
				tmpResuNod = tmpResuNod->parentNode;
			}
			COORD* ResultCoords = NULL;
			ResultCoords = malloc(sizeof(COORD)*resultNodLi->size);
			if (ResultCoords == NULL)
			{
				printf("Error, allocation failed");
				exit(EXIT_FAILURE);
			}
			LiNodElt* tmpLiReElt = resultNodLi->end;
			for (int i = 0; i < resultNodLi->size; i++)
			{
				ResultCoords[i].x = tmpLiReElt->val->x;
				ResultCoords[i].y = 1;
				ResultCoords[i].z = tmpLiReElt->val->z;
				tmpLiReElt = tmpLiReElt->prev;
			}
			ENIPATH Result;
			Result.PathLength = resultNodLi->size;
			Result.PathCoordArray = ResultCoords;
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
					if ((currentNode->x)+i >= 0 && (currentNode->x)+i < Room->floor.x)
					{
						//printf("test pre-NN : (x:%d z:%d)\n", (currentNode->x)+i, currentNode->z);
						NeighbourNode = &(RoomNode[(((currentNode->x)+i)*(Room->floor.z))+currentNode->z]);
					}
				}
				else
				{
					if ((currentNode->z)+i >= 0 && (currentNode->z)+i < Room->floor.z)
					{
						//printf("test pre-NN : (x:%d z:%d)\n", currentNode->x, (currentNode->z)+i);
						NeighbourNode = &(RoomNode[((currentNode->x)*(Room->floor.z))+(currentNode->z)+i]);
					}
				}

				if (NeighbourNode != NULL)
				{
					//printf("test NN : (x:%d z:%d)\n", NeighbourNode->x, NeighbourNode->z);
					//printf("\ntest CS : %d\n", close->size);
					//printf("CN -> x:%d y:%d\n", currentNode->x, currentNode->z);
					if (!nodeIsIn(close, NeighbourNode) && IsWalkable(NeighbourNode->x, NeighbourNode->z, Room, PassBox) && (NeighbourNode->x != MakeWall.x || NeighbourNode->z != MakeWall.z))
					{
						int mouvCost = currentNode->SCost + 1;
						//printf("mouvCost = %d\n", mouvCost);
						//printf("NeighbourNode->SCost = %d	|	mouvCost = %d\n", NeighbourNode->SCost, mouvCost);
						//printf("\ntest OS : %d\n", open->size);
						if (mouvCost < NeighbourNode->SCost || !(nodeIsIn(open, NeighbourNode)))
						{
							NeighbourNode->SCost = mouvCost;
							NeighbourNode->ECost = GetDist(NeighbourNode->x, NeighbourNode->z, start->x, start->z);
							NeighbourNode->parentNode = currentNode;
							//printf("from (x:%d z:%d)\n", currentNode->x, currentNode->z);
						}
						//printf("\ntest OS : %d\n", open->size);
						if (!(nodeIsIn(open, NeighbourNode)))
						{
							InsertLiNodElt(open, NeighbourNode, open->size);
						}

					}
				}
			}
		}
	}
	COORD* FailureCoords = NULL;
	FailureCoords = malloc(sizeof(COORD));
	if (FailureCoords == NULL)
	{
		printf("Error, allocation failed");
		exit(EXIT_FAILURE);
	}
	FailureCoords->x = -1;
	FailureCoords->y = -1;
	FailureCoords->z = -1;
	ENIPATH Failure;
	Failure.PathLength =-1;
	Failure.PathCoordArray = FailureCoords;
	return(Failure);
}

COORD CoordInDir(int x, int z, DIRECTION dir)
{
	if (dir == n)
	{
		z -= 1;
	}
	else if (dir == e)
	{
		x += 1;
	}
	else if (dir == s)
	{
		z -= 1;
	}
	else if (dir == w)
	{
		x -= 1;
	}
	COORD result;
	result.x = x;
	result.z = z;
	result.y = 1;
	return(result);
}

bool CanPushBox(int x, int z, DIRECTION dir, MAP* Room)
{
	COORD BoxCoord;
	BoxCoord.x = x;
	BoxCoord.z = z;
	BoxCoord.y = 1;
	if(IsWalkable((CoordInDir(x, z, dir)).x, (CoordInDir(x, z, dir)).z, Room, BoxCoord))
	{
		return(true);
	}
	else
	{
		return(false);
	}
	
}

DIRECTION DeDir(int x1, int z1, int x2, int z2)
{
	int XF = x2 - x1;
	int ZF = z2 - z1;
	if (XF == 1)
	{
		return(e);
	}
	else if (XF == -1)
	{
		return(w);
	}
	else if (ZF == 1)
	{
		return(s);
	}
	else if (ZF == -1)
	{
		return(n);
	}
	else
	{
		exit(EXIT_FAILURE);
	}
	
}

ENIPATH PathfindWithBox(COORD* start, COORD* end, COORD Box, MAP* Room)
{
	COORD NoWall;
    NoWall.x = -1;
    NoWall.y = -1;
    NoWall.z = -1;
	ENIPATH mainPath = Pathfind(start, end, Room, Box, NoWall);
	if (mainPath.PathLength == -1)
	{
		COORD* FailureCoords = NULL;
		FailureCoords = malloc(sizeof(COORD));
		if (FailureCoords == NULL)
		{
			printf("Error, allocation failed");
			exit(EXIT_FAILURE);
		}
		FailureCoords->x = -1;
		FailureCoords->y = -1;
		FailureCoords->z = -1;
		ENIPATH Failure;
		Failure.PathLength =-1;
		Failure.PathCoordArray = FailureCoords;
		return(Failure);
	}
	/*
	printf("\nBox mainPath:\n");
		for (int b = 0; b < mainPath.PathLength; b++)
		{
			printf("x=%d z=%d|", mainPath.PathCoordArray[b].x, mainPath.PathCoordArray[b].z);
		}
	*/
	DIRECTION tmpDir = DeDir(start->x, start->z, mainPath.PathCoordArray[0].x, mainPath.PathCoordArray[0].z);
	COORD* finalCoordArray = NULL;
	finalCoordArray = malloc(sizeof(COORD)*2);
	if (finalCoordArray == NULL)
		{
			printf("Error, allocation failed");
			exit(EXIT_FAILURE);
		}
	finalCoordArray[0] = CoordInDir(start->x, start->z, DeDir(mainPath.PathCoordArray[0].x, mainPath.PathCoordArray[0].z, start->x, start->z));
	mainPath = Pathfind(finalCoordArray, end, Room, Box, NoWall);
	if (mainPath.PathLength == -1)
	{
		COORD* FailureCoords = NULL;
		FailureCoords = malloc(sizeof(COORD));
		if (FailureCoords == NULL)
		{
			printf("Error, allocation failed");
			exit(EXIT_FAILURE);
		}
		FailureCoords->x = -1;
		FailureCoords->y = -1;
		FailureCoords->z = -1;
		ENIPATH Failure;
		Failure.PathLength =-1;
		Failure.PathCoordArray = FailureCoords;
		return(Failure);
	}
	/*
	printf("\nBox mainPath:\n");
		for (int b = 0; b < mainPath.PathLength; b++)
		{
			printf("x=%d z=%d|", mainPath.PathCoordArray[b].x, mainPath.PathCoordArray[b].z);
		}
	*/
	finalCoordArray[1] = mainPath.PathCoordArray[0];
	int FCACount = 1;
	for (int i = 1; i < (mainPath.PathLength)-1; i++)
	{
		/*
		printf("\nCurrent BoxPath:\n");
		for (int b = 0; b < i+FCACount; b++)
		{
			printf("x=%d z=%d|", finalCoordArray[b].x, finalCoordArray[b].z);
		}
		*/
		DIRECTION accDir = DeDir(mainPath.PathCoordArray[i].x, mainPath.PathCoordArray[i].z, mainPath.PathCoordArray[i+1].x, mainPath.PathCoordArray[i+1].z);
		if(accDir != tmpDir)
		{
			//printf("\nTurn Trigger at_____________________\n");
			//printf("1st => x:%d z:%d\n2nd => x:%d z:%d\n",mainPath.PathCoordArray[i].x, mainPath.PathCoordArray[i].z, mainPath.PathCoordArray[i+1].x, mainPath.PathCoordArray[i+1].z);
			COORD tmpRaCoord = CoordInDir(mainPath.PathCoordArray[i].x, mainPath.PathCoordArray[i].z, DeDir(mainPath.PathCoordArray[i+1].x, mainPath.PathCoordArray[i+1].z, mainPath.PathCoordArray[i].x, mainPath.PathCoordArray[i].z));
			ENIPATH tmpPath = Pathfind(&(mainPath.PathCoordArray[i-1]), &(tmpRaCoord), Room, Box, mainPath.PathCoordArray[i]);
			//printf("\nPathRacc_____________________\n");
			//printf("1st => x:%d z:%d\n2nd => x:%d z:%d\n",(mainPath.PathCoordArray[i-1]).x, (mainPath.PathCoordArray[i-1]).z, tmpRaCoord.x, tmpRaCoord.z);
			if (tmpPath.PathLength == -1)
			{
				COORD* FailureCoords = NULL;
				FailureCoords = malloc(sizeof(COORD));
				if (FailureCoords == NULL)
				{
					printf("Error, allocation failed");
					exit(EXIT_FAILURE);
				}
				FailureCoords->x = -1;
				FailureCoords->y = -1;
				FailureCoords->z = -1;
				ENIPATH Failure;
				Failure.PathLength =-1;
				Failure.PathCoordArray = FailureCoords;
				return(Failure);
			}
			finalCoordArray = realloc(finalCoordArray, sizeof(COORD)*(mainPath.PathLength + FCACount + i)+sizeof(COORD)*tmpPath.PathLength);
			FCACount += (tmpPath.PathLength);
			if (finalCoordArray == NULL)
				{
					printf("Error, allocation failed");
					exit(EXIT_FAILURE);
				}
			//printf("tmpPathlen%d\n", tmpPath.PathLength);
			//printf("i%d\n", i);
			for (int j = 0; j < tmpPath.PathLength; j++)
			{
				//printf("I+J = %d => ", i+j);
				finalCoordArray[i+j+1] = tmpPath.PathCoordArray[j];
				//printf("x:%d z:%d\n",finalCoordArray[i+j].x, finalCoordArray[i+j].z);
			}
		}
			finalCoordArray = realloc(finalCoordArray, sizeof(COORD)*(mainPath.PathLength + FCACount + i));
			if (finalCoordArray == NULL)
				{
					printf("Error, allocation failed");
					exit(EXIT_FAILURE);
				}
			finalCoordArray[i+FCACount] = mainPath.PathCoordArray[i];
			//printf("\n_______________________Add From mainPath:\n");
			//printf("x=%d z=%d\n", mainPath.PathCoordArray[i].x, mainPath.PathCoordArray[i].z);
	}
	ENIPATH Result;
	Result.PathLength = mainPath.PathLength + FCACount - 1;
	Result.PathCoordArray = finalCoordArray;
	return(Result);
}