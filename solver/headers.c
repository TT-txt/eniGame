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
    int activated[3]; //is on/off or contains the SPAWN coords of a logic elem => 1, 0 or x,y,z (if type == 1)
    int group;        //Linked with a trap group or 0;
} LOGIC;

typedef struct Map
{
    COORD *walls;
    COORD floor;
    TRAP *traps;
    LOGIC *logics;
    bool solved;
    int type;       //Map presets to help the solver
    COORD exits[4]; //Contains the actual coords or (-2, -2, -2) if the exit is not defined
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
                if (i + 1 != level->size * level->size)
                {
                    fgetc(jsonObject); //skip the coma separating two maps (to avoid MALFORMED_JSON)
                }
            }
        }

        //theme
        while (fgetc(jsonObject) != ':');
        level->theme = fgetc(jsonObject) - '0';

        //endMap
        while (fgetc(jsonObject) != ':');
        int end = fgetc(jsonObject) - '0';
        int tmp;
        while ((tmp = fgetc(jsonObject)) != '}'){
            end *= 10;
            end += tmp - '0';
        }
        level->endMap = end;
        printf("endMap : %d", level->endMap);

        return (EXIT_SUCCESS);
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
    }
    else if (tmp != '{')
    {
        return (MALFORMED_JSON);
    }

    // Map Walls
    while (fgetc(jsonObject) != '[')
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
    while (tmp = fgetc(jsonObject) != '[') //Gets at the start of the JSON traps array
    {
        printf("%c", tmp);
    }
    printf("\n");

    map->traps = NULL;
    int trapAmount = 0;
    while (fgetc(jsonObject) != ']')
    {
        trapAmount += 1;
        TRAP *tmp = (TRAP *)realloc(map->traps, trapAmount * sizeof(TRAP));
        if (tmp == NULL)
        {
            return (MALFORMED_JSON);
        }
        else
        {
            map->traps = tmp;
            //Read the next trap
            //trap type
            while (fgetc(jsonObject) != ':')
                ;
            map->traps[trapAmount - 1].type = fgetc(jsonObject) - '0';

            //trap coords
            while (fgetc(jsonObject) != ':')
                ;
            while (fgetc(jsonObject) != ':')
                ;
            map->traps[trapAmount - 1].coord.x = fgetc(jsonObject) - '0';
            while (fgetc(jsonObject) != ':')
                ;
            map->traps[trapAmount - 1].coord.y = fgetc(jsonObject) - '0';
            while (fgetc(jsonObject) != ':')
                ;
            map->traps[trapAmount - 1].coord.z = fgetc(jsonObject) - '0';

            //trap activated
            while (fgetc(jsonObject) != ':')
                ;
            if (fgetc(jsonObject) == 't')
            {
                map->traps[trapAmount - 1].activated = true;
            }
            else
            {
                map->traps[trapAmount - 1].activated = false;
            }

            //trap facing
            while (fgetc(jsonObject) != ':')
                ;
            int facing = fgetc(jsonObject);
            if (facing == 'w')
            {
                map->traps[trapAmount - 1].facing = w;
            }
            else if (facing == 'n')
            {
                map->traps[trapAmount - 1].facing = n;
            }
            else if (facing == 'e')
            {
                map->traps[trapAmount - 1].facing = e;
            }
            else if (facing == 's')
            {
                map->traps[trapAmount - 1].facing = s;
            }
            else
            {
                return (MALFORMED_JSON);
            }

            //trap group
            while (fgetc(jsonObject) != ':')
                ;
            int group = fgetc(jsonObject);
            if (group == 'n')
            {
                map->traps[trapAmount - 1].group = null;
            }
            else
            {
                map->traps[trapAmount - 1].group = group - '0';
            }
            //Places the cursor for the next possible trap
            while (fgetc(jsonObject) != '}')
                ;
        }
    }

    //Logics
    while (tmp = fgetc(jsonObject) != '[') //Gets at the start of the JSON traps array
    {
        printf("%c", tmp);
    }
    printf("\n");

    map->traps = NULL;
    int logicAmount = 0;
    while (fgetc(jsonObject) != ']')
    {
        logicAmount += 1;
        LOGIC *tmp = (LOGIC *)realloc(map->logics, logicAmount * sizeof(LOGIC));
        if (tmp == NULL)
        {
            return (MALFORMED_JSON);
        }
        else
        {
            map->logics = tmp;
            //Read the next logic
            //logic type
            while (fgetc(jsonObject) != ':')
                ;
            map->logics[logicAmount - 1].type = fgetc(jsonObject) - '0';

            //trap coords
            while (fgetc(jsonObject) != ':')
                ;
            while (fgetc(jsonObject) != ':')
                ;
            map->logics[logicAmount - 1].coord.x = fgetc(jsonObject) - '0';
            while (fgetc(jsonObject) != ':')
                ;
            map->logics[logicAmount - 1].coord.y = fgetc(jsonObject) - '0';
            while (fgetc(jsonObject) != ':')
                ;
            map->logics[logicAmount - 1].coord.z = fgetc(jsonObject) - '0';

            //trap onUse
            while (fgetc(jsonObject) != ':')
                ;
            int group = fgetc(jsonObject);
            map->logics[logicAmount - 1].group = group - '0';

            //trap activated
            while (fgetc(jsonObject) != ':')
                ;
            if (map->logics[logicAmount - 1].type == 1)
            {
                while (fgetc(jsonObject) != ':')
                    ;
                map->logics[logicAmount - 1].activated[0] = fgetc(jsonObject) - '0'; //x
                while (fgetc(jsonObject) != ':')
                    ;
                map->logics[logicAmount - 1].activated[1] = fgetc(jsonObject) - '0'; //y
                while (fgetc(jsonObject) != ':')
                    ;
                map->logics[logicAmount - 1].activated[2] = fgetc(jsonObject) - '0'; //z
            }
            else if (fgetc(jsonObject) == 'f')
            {
                map->logics[logicAmount - 1].activated[0] = 0; //false
            }
            else
            {
                map->logics[logicAmount - 1].activated[0] = 1; //true
            }

            //trap group
            while (fgetc(jsonObject) != ':')
                ;
            group = fgetc(jsonObject);
            if (group == 'n')
            {
                map->logics[logicAmount - 1].group = null;
            }
            else
            {
                map->logics[logicAmount - 1].group = group - '0';
            }
            //Places the cursor for the next possible logic in the array
            while (fgetc(jsonObject) != '}')
                ;
        }
    }

    //solved
    while (fgetc(jsonObject) != ':')
        ;
    if (fgetc(jsonObject) == 'f')
        map->solved = false;
    else
        return (MALFORMED_JSON);

    //type
    while (fgetc(jsonObject) != ':')
        ;
    tmp = fgetc(jsonObject);
    if (tmp == 'n')
        map->type = null;
    else
        map->type = tmp - '0';

    //exits (COORD array)
    while (fgetc(jsonObject) != ':')
        ;
    if (fgetc(jsonObject) != '[')
        return (MALFORMED_JSON);
    COORD falseEquivalent = {-2, -2, -2};
    for (int i = 0; i < 4; i += 1)
    {
        if (fgetc(jsonObject) == 'f')
            map->exits[i] = falseEquivalent;
        else
        {
            while (fgetc(jsonObject) != ':')
                ;
            map->exits[i].x = fgetc(jsonObject) - '0'; //x
            while (fgetc(jsonObject) != ':')
                ;
            map->exits[i].y = fgetc(jsonObject) - '0'; //y
            while (fgetc(jsonObject) != ':')
                ;
            map->exits[i].z = fgetc(jsonObject) - '0'; //z
        }
    }

    //spawnPoint
    while (fgetc(jsonObject) != ':')
        ;
    while (fgetc(jsonObject) != ':')
                ;
            map->spawnPoint.x = fgetc(jsonObject) - '0'; //x
            while (fgetc(jsonObject) != ':')
                ;
            map->spawnPoint.y = fgetc(jsonObject) - '0'; //y
            while (fgetc(jsonObject) != ':')
                ;
            map->spawnPoint.z = fgetc(jsonObject) - '0'; //z
    
    //Get to the end of the map element
    fgetc(jsonObject);
    fgetc(jsonObject);

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