#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <stdbool.h>
#include "Solveur.h"

LiChNod* newLiChNod(void) {
	return(NULL);
}

LiChNod* InitLiChNod(void) {
	LiChNod* tmp = newLiChNod();
	tmp->start = NULL;
	tmp->end = NULL;
	tmp->size = 0;
	return(tmp);
}

bool isEmpLiChNod(LiChNod* li) {
	if (li == NULL) {
		return true;
	}
	return false;
}

LiChNod* InsertLiNodElt(LiChNod* li, NODE Value, int pos) {
	if (isEmpLiChNod(li) || li->size == 0)
	{
		LiNodElt* newElt = NULL;
		newElt = malloc(sizeof(LiNodElt));
		if (newElt == NULL)
		{
			printf("Error, allocation failed");
			exit(EXIT_FAILURE);
		}
		newElt->val = Value;
		newElt->suiv = NULL;
		newElt->prev = NULL;
		li->start = &newElt;
		li->end = &newElt;
		li->size = 1;
		return(li);
	}
	if (pos <= li->size && pos >= 0)
	{
		LiNodElt* newElt = NULL;
		newElt = malloc(sizeof(LiNodElt));
		if (newElt == NULL)
		{
			printf("Error, allocation failed");
			exit(EXIT_FAILURE);
		}
		newElt->val = Value;
		newElt->suiv = NULL;
		newElt->prev = NULL;
		if ((li->size - pos) < pos) {
			LiNodElt* tmp = li->end;
			for (int i = li->size; i >= pos; i--)
			{
				tmp = tmp->prev;
			}
			newElt->prev = &tmp->prev;
			newElt->suiv = &tmp;
			(tmp->prev)->suiv = &newElt;
			tmp->prev = &newElt;
		}
		else
		{
			LiNodElt* tmp = li->start;
			for (int i = li->size; i <= pos; i++)
			{
				tmp = tmp->suiv;
			}
			newElt->suiv = &tmp->suiv;
			newElt->prev = &tmp;
			(tmp->suiv)->prev = &newElt;
			tmp->suiv = &newElt;
		}
		li->size++;
		return(li);
	}
	else
	{
		printf("Error, wrong index");
		exit(EXIT_FAILURE);
	}
}

LiChNod* SetLiNodElt(LiChNod* li, NODE Value, int pos) {
	if (isEmpLiChNod(li) || li->size == 0)
	{
		printf("Error, list is empty");
		exit(EXIT_FAILURE);
	}
	if (pos <= li->size && pos >= 0)
	{
		if ((li->size - pos) < pos) {
			LiNodElt* tmp = li->end;
			for (int i = li->size; i >= pos; i--)
			{
				tmp = tmp->prev;
			}
			tmp->val = Value;
		}
		else
		{
			LiNodElt* tmp = li->start;
			for (int i = li->size; i <= pos; i++)
			{
				tmp = tmp->suiv;
			}
			tmp->val = Value;
		}
		return(li);
	}
	else
	{
		printf("Error, wrong index");
		exit(EXIT_FAILURE);
	}
}

LiChNod* SupprLiNodElt(LiChNod* li, int pos) {
	if (isEmpLiChNod(li) || li->size == 0)
	{
		printf("Error, list is empty");
		exit(EXIT_FAILURE);
	}
	if (pos <= li->size && pos >= 0)
	{
		if ((li->size - pos) < pos) {
			LiNodElt* tmp = li->end;
			for (int i = li->size; i >= pos; i--)
			{
				tmp = tmp->prev;
			}
			(tmp->suiv)->prev = &tmp->prev;
			(tmp->prev)->suiv = &tmp->suiv;
			free(tmp);
		}
		else
		{
			LiNodElt* tmp = li->start;
			for (int i = li->size; i <= pos; i++)
			{
				tmp = tmp->suiv;
			}
			(tmp->suiv)->prev = &tmp->prev;
			(tmp->prev)->suiv = &tmp->suiv;
			free(tmp);
		}
		li->size--;
		return(li);
	}
	else
	{
		printf("Error, wrong index");
		exit(EXIT_FAILURE);
	}
}