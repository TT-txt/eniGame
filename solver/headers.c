#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define MISSING_ARGS 2
#define WRONG_ARGS 3

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

typedef struct Map {
    COORD *walls;
    COORD floor;
    TRAP *traps;
    LOGIC *logics;
    bool solved;
    int type;//Map presets to help the solver
    COORD exits[4];
    COORD spawnPoint;
} MAP;

    typedef struct Level
{
    MAP *maps;
    int theme;
} LEVEL;