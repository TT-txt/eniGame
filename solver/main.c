#include "headers.c"

int main(int argc, char *argv[])
{
    /*
    //argc > number of args
    //argv contains the args
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
            printf("TODO : fopen();");
            return (EXIT_SUCCESS);
        }
        else
            return (WRONG_ARGS);
    }
    else
        return (MISSING_ARGS);
}