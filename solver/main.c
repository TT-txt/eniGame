#include "levelLoader.c"

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
                    printf("\nMap Successfully loaded\n");

                    /******************************
                    ************ TESTS ************
                    ******************************/
                    printf("-----------------\nTests (on map 1) :\nWalls :\n");
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
                        if(levelToSolve.maps[1].exits[i].x == -2 && levelToSolve.maps[1].exits[i].y == -2 && levelToSolve.maps[1].exits[i].z == -2)
                        {continue;}
                        printf("Coords : (%d, %d, %d)\n",
                               levelToSolve.maps[1].exits[i].x,
                               levelToSolve.maps[1].exits[i].y,
                               levelToSolve.maps[1].exits[i].z);
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