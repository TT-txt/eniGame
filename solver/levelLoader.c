#include "headers.h"

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
        level->size = size;

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
                if (readMap(jsonObject, mapsToLoad+i))
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
        while (fgetc(jsonObject) != ':')
            ;
        level->theme = fgetc(jsonObject) - '0';

        //endMap
        while (fgetc(jsonObject) != ':')
            ;
        int end = fgetc(jsonObject) - '0';
        int tmp;
        while ((tmp = fgetc(jsonObject)) != '}')
        {
            end *= 10;
            end += tmp - '0';
        }
        level->endMap = end;

        return (EXIT_SUCCESS);
    }
}

//*********************************

//Map read
int readMap(FILE *jsonObject, MAP *map)
{
    if (!jsonObject || !map)
        return (EXIT_FAILURE);

    // Checks if the map is in fact a JSON object
    int tmp = fgetc(jsonObject);
    //printf("\n%c\n", tmp);
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
    //printf("%d, %d, %d\n", map->floor.x, map->floor.y, map->floor.z);

    //Traps
    while ((tmp = fgetc(jsonObject)) != '[')
        ; //Gets at the start of the JSON traps array
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
            fgetc(jsonObject);//to clear the " before the actual facing
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
    while ((tmp = fgetc(jsonObject)) != '[')
        ; //Gets at the start of the JSON logics array

    map->logics = NULL;
    int logicAmount = 0;
    while (fgetc(jsonObject) != ']')
    {
        logicAmount += 1;
        LOGIC *tmp = (LOGIC *)realloc(map->logics, logicAmount * sizeof(LOGIC));
        if (tmp == NULL)
        {
            return (MALLOC_ERROR);
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
            else
            {
                if (fgetc(jsonObject) == 'f')
                {
                    map->logics[logicAmount - 1].activated[0] = 0; //false
                }
                else
                {
                    map->logics[logicAmount - 1].activated[0] = 1; //true
                }

                map->logics[logicAmount - 1].activated[1] = -2; //Means these aren't coords
                map->logics[logicAmount - 1].activated[2] = -2; //Means these aren't coords
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
        {
            map->exits[i] = falseEquivalent;
        }
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
        while (fgetc(jsonObject) != ',')
            ; //Go to the next array entry
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
    COORD tmpSave[50] = {0, 0, 0}; //This array will save the coords for later (150/3 = 50 coords max storage = 50 walls on the map)
    while (fgetc(jsonObject) != ']')
    {
        while (fgetc(jsonObject) != ':')
            ;
        tmpSave[amountOfCoords].x = fgetc(jsonObject) - '0';
        while (fgetc(jsonObject) != ':')
            ;
        tmpSave[amountOfCoords].y = fgetc(jsonObject) - '0';
        while (fgetc(jsonObject) != ':')
            ;
        tmpSave[amountOfCoords].z = fgetc(jsonObject) - '0';
        amountOfCoords++;
        fgetc(jsonObject); //to bypass the closing bracket
    }

    COORD *coords = (COORD *)malloc((amountOfCoords) * sizeof(COORD)); // Mallocs the level
    if (coords == NULL)
    {
        return (NULL);
    }
    else
    {
        for (int i = 0; i < amountOfCoords; i += 3)
        {
            coords[i] = tmpSave[i];
        }
        return (coords);
    }
}