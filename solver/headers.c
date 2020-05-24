#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define MISSING_ARGS 2
#define WRONG_ARGS 3
#define WRONG_FILE_PATH 4
#define MALFORMED_JSON 5
#define MALLOC_ERROR 6
#define null 0

// *******************************************

typedef enum Direction
{
    w,
    n,
    e,
    s
} DIRECTION;

// C : Coord > Js : Vector3
typedef struct Coord
{
    int x;
    int y;
    int z;
} COORD;

typedef struct Trap
{
    int type;
    COORD coord;
    bool activated;
    DIRECTION facing;
    int group;
} TRAP;

typedef struct Logic
{
    int type;
    COORD coord;
    int onUse;
    char *activated; //is on/off or contains the SPAWN coords of a logic elem
    int group;       //Linked with a trap group or 0;
} LOGIC;

typedef struct Map
{
    COORD *walls;
    COORD floor;
    TRAP *traps;
    LOGIC *logics;
    bool solved;
    int type; //Map presets to help the solver
    COORD exits[4];
    COORD spawnPoint;
} MAP;

typedef struct Level
{
    int size;
    MAP *maps;
    int theme;
    int endMap;
} LEVEL;

// *******************************************

// Prototypes
int loadLevel(FILE *, LEVEL *);
int readMap(FILE *, MAP *);
COORD *readCoords(FILE *);

// *******************************************

//Functions
int loadLevel(FILE *jsonObject, LEVEL *level)
{
    if (!jsonObject)
        return (EXIT_FAILURE);

    if (fgetc(jsonObject) != '{')
    {
        return (MALFORMED_JSON);
    }
    else
    {
        /********************************
            Starts reading the level
        ********************************/
        int toCheck;

        //Reads the level size
        while ((toCheck = fgetc(jsonObject)) != ':') // size:
        {
            printf("%c", toCheck);
        }
        printf("\n");
        int size = fgetc(jsonObject) - '0'; //converts char (ASCII) to int
        printf("-- %d --\n", size);

        //Reads the map
        while ((toCheck = fgetc(jsonObject)) != '[') //Gets at the start of the JSON maps array
        {
            printf("%c", toCheck);
        }
        printf("\n");
        MAP *mapsToLoad = (MAP *)malloc(size * size * sizeof(MAP)); // Mallocs the level
        if (mapsToLoad == NULL)
        {
            return (MALLOC_ERROR);
        }
        else
        {
            //Reads the maps
            //printf("Maps : ");
            for (int i = 0; i < (level->size * level->size); i += 1)
            {
                //Reads an entire map and adds it to the level struct
                if (readMap(jsonObject, mapsToLoad + i))
                    return (MALFORMED_JSON);
                else
                    printf("%d, ", i);
            }

            return (EXIT_SUCCESS);
        }
    }
}

int readMap(FILE *jsonObject, MAP *map)
{
    if (!jsonObject || !map)
        return (EXIT_FAILURE);

    // Checks if the map is in fact a JSON object
    int tmp = fgetc(jsonObject);
    if (tmp == 'n')
    {
        map = NULL;
        return (EXIT_SUCCESS);
    } else if (tmp != '{'){
        return(MALFORMED_JSON);
    }

    // Map Walls
    while ((fgetc(jsonObject)) != '[')
        ; //Gets at the start of the walls COORD array
    map->walls = readCoords(jsonObject);

    // Floor
    while ((fgetc(jsonObject)) != '{')
        ;
    while ((fgetc(jsonObject)) != ':')
        ;
    map->floor.x = fgetc(jsonObject) - '0';
    while ((fgetc(jsonObject)) != ':')
        ;
    map->floor.y = fgetc(jsonObject) - '0';
    while ((fgetc(jsonObject)) != ':')
        ;
    map->floor.z = fgetc(jsonObject) - '0';
    printf("%d, %d, %d\n", map->floor.x, map->floor.y, map->floor.z);

    //Traps
    while ((tmp = fgetc(jsonObject)) != '[') //Gets at the start of the JSON traps array
    {
        printf("%c", tmp);
    }
    printf("\n");

    return (EXIT_SUCCESS);
}

COORD *readCoords(FILE *jsonObject)
{
    //This function returns a COORD array
    if (!jsonObject)
        return NULL;

    //While in the walls array > load coords
    int tmp;
    int amountOfCoords = 0;
    int tmpSave[150]; //This array will save the coords for later (150/3 = 50 coords max storage = 50 walls on the map)
    do
    {
        tmp = fgetc(jsonObject);
        if (tmp == ':')
            tmpSave[amountOfCoords++] = fgetc(jsonObject) - '0';
    } while (tmp != ']');

    COORD *coords = (COORD *)malloc(amountOfCoords * sizeof(COORD)); // Mallocs the level
    if (coords == NULL)
    {
        return (NULL);
    }
    else
    {
        for (int i = 0; i < amountOfCoords; i += 1)
        {
            (coords + i)->x = tmpSave[i];
        }
        return (coords);
    }
}