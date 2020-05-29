#include "headers.h"
#include "levelLoader.c"
#include "Linked-List.c"
#include "Pathfinding.c"

int main(int argc, char *argv[])
{
    /*
    argc > number of args
    argv contains the args
    for (int i = 0; i < argc; i += 1)
    {
        printf("%d, %s\n", i, argv[i]);
    }
    */
    //path to test.json
    //../web/maps/test.json

    //If the programm has been called correctly
    if (argc == 3)
    {
        if (strcmp(argv[1], "-f") == 0)
        {
            //char *path = "../web/maps/"; + argv[2]
            char mapPath[50] = "../web/maps/";
            strcat(mapPath, argv[2]);

            LEVEL levelToSolve;

            FILE *mapToSolve;

            if ((mapToSolve = fopen(mapPath, "r")))
            {
                // Starts reading the json file
                if (loadLevel(mapToSolve, &levelToSolve))
                {
                    printf("JSON not valid...\n");
                    return (EXIT_FAILURE);
                }
                else
                {
                    /*
                    printf("\nMap Successfully loaded\n");

                    printf("-----------------\nTests (on map 1) :\n");
                    printf("\nFloor Size :\n");
                    printf("(%d, %d, %d)\n", levelToSolve.maps[1].floor.x, levelToSolve.maps[1].floor.y, levelToSolve.maps[1].floor.z);
                    printf("\nWalls :\n");
                    for (int i = 0; i < levelToSolve.maps[1].wallAmount; i += 1)
                    {
                        printf("(%d, %d, %d)\n", levelToSolve.maps[1].walls[i].x, (levelToSolve.maps[1].walls + i)->y, (levelToSolve.maps[1].walls + i)->z);
                    }
                    printf("\nLogics :\n");
                    for (int i = 0; i < levelToSolve.maps[1].logicAmount; i += 1)
                    {
                        printf("Type : %d | Coords : (%d, %d, %d) | Activated : (%d, %d, %d)\n",
                               levelToSolve.maps[1].logics[i].type,
                               levelToSolve.maps[1].logics[i].coord.x,
                               levelToSolve.maps[1].logics[i].coord.y,
                               levelToSolve.maps[1].logics[i].coord.z,
                               (levelToSolve.maps[1].logics + i)->activated[0],
                               (levelToSolve.maps[1].logics + i)->activated[1],
                               (levelToSolve.maps[1].logics + i)->activated[2]);
                    }
                    printf("\nTraps :\n");
                    for (int i = 0; i < levelToSolve.maps[1].trapAmount; i += 1)
                    {
                        printf("Type : %d | Coords : (%d, %d, %d) | Activated : %d | Facing : %d\n",
                               levelToSolve.maps[1].traps[i].type,
                               levelToSolve.maps[1].traps[i].coord.x,
                               levelToSolve.maps[1].traps[i].coord.y,
                               levelToSolve.maps[1].traps[i].coord.z,
                               (levelToSolve.maps[1].traps + i)->activated,
                               (levelToSolve.maps[1].traps + i)->facing);
                    }
                    printf("\nDoors :\n");
                    for (int i = 0; i < 4; i += 1)
                    {
                        if (levelToSolve.maps[1].exits[i].x == -2 && levelToSolve.maps[1].exits[i].y == -2 && levelToSolve.maps[1].exits[i].z == -2)
                        {
                            printf("false\n");
                        }
                        else
                        {
                            printf("Coords : (%d, %d, %d)\n",
                                   levelToSolve.maps[1].exits[i].x,
                                   levelToSolve.maps[1].exits[i].y,
                                   levelToSolve.maps[1].exits[i].z);
                        }
                    }
                    */
                    COORD NoWall;
                    NoWall.x = -1;
                    NoWall.y = -1;
                    NoWall.z = -1;
                    COORD BoxHandleCoord;
                    BoxHandleCoord.x = 0;
                    BoxHandleCoord.y = -2;
                    BoxHandleCoord.z = 0;
                   for (int i = 0; i < 4; i += 1)
                    {
                        if (!(levelToSolve.maps[1].exits[i].y == -2))
                        {
                            if (levelToSolve.maps[1].exits[i].x < 0)
                            {
                                levelToSolve.maps[1].exits[i].x += 1;
                            }
                            else if (levelToSolve.maps[1].exits[i].x > levelToSolve.maps[1].floor.x)
                            {
                                levelToSolve.maps[1].exits[i].x -= 1;
                            }
                            else if (levelToSolve.maps[1].exits[i].z < 0)
                            {
                                levelToSolve.maps[1].exits[i].z += 1;
                            }
                            else if (levelToSolve.maps[1].exits[i].z > levelToSolve.maps[1].floor.z)
                            {
                                levelToSolve.maps[1].exits[i].z -= 1;
                            }
                            
                            COORD startCoord;
                                startCoord.x = levelToSolve.maps[1].spawnPoint.x;
                                startCoord.y = 1;
                                startCoord.z = levelToSolve.maps[1].spawnPoint.z;
                            COORD endCoord;
                                endCoord.x = levelToSolve.maps[1].exits[i].x;
                                endCoord.y = 1;
                                endCoord.z = levelToSolve.maps[1].exits[i].z;
                            
                            for (int j = 0; j < levelToSolve.maps[1].logicAmount; j += 1)
                            {
                                if (levelToSolve.maps[1].logics[j].type == 0)
                                {
                                    if ( (levelToSolve.maps[1].logics[j].coord.x == levelToSolve.maps[1].exits[i].x) && (levelToSolve.maps[1].logics[j].coord.z == levelToSolve.maps[1].exits[i].z))
                                    {
                                        ENIPATH Soluce = Pathfind(&startCoord, &endCoord, &(levelToSolve.maps[1]), BoxHandleCoord, NoWall);
                                        if (Soluce.PathLength == -1)
                                        {
                                            BoxHandleCoord.y = -1;
                                            ENIPATH Soluce = Pathfind(&startCoord, &endCoord, &(levelToSolve.maps[1]), BoxHandleCoord, NoWall);
                                            if (Soluce.PathLength == -1)
                                            {
                                                printf("No solution for this door %d\n", i);
                                            }
                                            printf("\nPath for door %d :\n", i);
                                            printf("Size : %d\n", Soluce.PathLength);
                                            printf("Coords :\n");
                                            for (int k = 0; k < Soluce.PathLength; k++)
                                            {
                                                printf("(%d, %d, %d)|",
                                                Soluce.PathCoordArray[k].x,
                                                Soluce.PathCoordArray[k].y,
                                                Soluce.PathCoordArray[k].z);
                                            }
                                        }
                                        printf("\nPath for door %d :\n", i);
                                        printf("Size : %d\n", Soluce.PathLength);
                                        printf("Coords :\n");
                                        for (int k = 0; k < Soluce.PathLength; k++)
                                        {
                                            printf("(%d, %d, %d)|",
                                            Soluce.PathCoordArray[k].x,
                                            Soluce.PathCoordArray[k].y,
                                            Soluce.PathCoordArray[k].z);
                                        }                                
                                    }
                                    else
                                    {
                                        COORD BoxCoord;
                                        for (int k = 0; k < levelToSolve.maps[1].logicAmount; k += 1)
                                        {
                                            if (levelToSolve.maps[1].logics[k].type == 1)
                                            {
                                                BoxCoord.x = levelToSolve.maps[1].logics[k].activated[0];
                                                BoxCoord.y = levelToSolve.maps[1].logics[k].activated[1];
                                                BoxCoord.z = levelToSolve.maps[1].logics[k].activated[2];
                                            }
                                        }
                                        COORD PlCoord;
                                        for (int k = 0; k < levelToSolve.maps[1].logicAmount; k += 1)
                                        {
                                            if (levelToSolve.maps[1].logics[k].type == 0 && levelToSolve.maps[1].logics[k].group == 0)
                                            {
                                                PlCoord.x = levelToSolve.maps[1].logics[k].coord.x;
                                                PlCoord.y = levelToSolve.maps[1].logics[k].coord.y;
                                                PlCoord.z = levelToSolve.maps[1].logics[k].coord.z;
                                                //printf("found k at x:%d z:%d\n", levelToSolve.maps[1].logics[k].coord.x, levelToSolve.maps[1].logics[k].coord.z);
                                            }
                                        }
                                        //printf("PlCoord = x%d z%d\n",PlCoord.x, PlCoord.z);
                                        ENIPATH BoxPath = PathfindWithBox(&BoxCoord, &PlCoord, BoxCoord, &(levelToSolve.maps[1]));
                                        ENIPATH FristPath = Pathfind(&startCoord, &(BoxPath.PathCoordArray[0]), &(levelToSolve.maps[1]), BoxHandleCoord, NoWall);
                                        //printf("BigCoord = x%d z%d\n",BoxPath.PathCoordArray[BoxPath.PathLength].x, BoxPath.PathCoordArray[BoxPath.PathLength].z);
                                        ENIPATH LastPath = Pathfind(&(BoxPath.PathCoordArray[BoxPath.PathLength-1]), &endCoord, &(levelToSolve.maps[1]), BoxHandleCoord, NoWall);
                                        printf("\nPath for door %d :\n", i);
                                        printf("Size : %d\n", (FristPath.PathLength + BoxPath.PathLength + LastPath.PathLength));
                                        printf("Coords :\n");
                                        for (int k = 0; k < FristPath.PathLength; k++)
                                        {
                                            printf("(%d, %d, %d)|",
                                            FristPath.PathCoordArray[k].x,
                                            FristPath.PathCoordArray[k].y,
                                            FristPath.PathCoordArray[k].z);
                                        }
                                        for (int k = 0; k < BoxPath.PathLength; k++)
                                        {
                                            printf("(%d, %d, %d)|",
                                            BoxPath.PathCoordArray[k].x,
                                            BoxPath.PathCoordArray[k].y,
                                            BoxPath.PathCoordArray[k].z);
                                        }
                                        for (int k = 0; k < LastPath.PathLength; k++)
                                        {
                                            printf("(%d, %d, %d)|",
                                            LastPath.PathCoordArray[k].x,
                                            LastPath.PathCoordArray[k].y,
                                            LastPath.PathCoordArray[k].z);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return (EXIT_SUCCESS);
                }
            }
            else
                return (WRONG_FILE_PATH);
        }
        else
            return (WRONG_ARGS);
    }
    else
        return (MISSING_ARGS);
}