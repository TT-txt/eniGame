
FLAG_STSM = -fno-stack-protector

all:
	gcc $(FLAG_STSM) main.c -o main

db:
	gcc -g $(FLAG_STSM) main.c -o main

run:
	gcc $(FLAG_STSM) main.c -o main
	./main -f tutorial.json

valgrind:
	gcc -g $(FLAG_STSM) main.c -o main
	valgrind --leak-check=full --track-origins=yes --show-leak-kinds=all --main-stacksize=83886080 ./main -f tutorial.json