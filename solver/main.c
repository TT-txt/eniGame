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
                    printf("\nBRAVO\n");
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