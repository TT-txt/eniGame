#include"headers.h"

LiChNod* newLiChNod(void) {
	LiChNod* NLCN = NULL;
	NLCN = malloc(sizeof(LiChNod));
	if (NLCN == NULL)
		{
			printf("Error, allocation failed");
			exit(EXIT_FAILURE);
		}
	NLCN->size = 0;
	NLCN->start = NULL;
	NLCN->end = NULL;
	return(NLCN);
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
		return(true);
	}
	return(false);
}

LiChNod* InsertLiNodElt(LiChNod* li, NODE* Value, int pos) {
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
		li->start = newElt;
		li->end = newElt;
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
			for (int i = li->size; i > pos; i--)
			{
				tmp = tmp->prev;
			}
			newElt->prev = tmp;
			newElt->suiv = tmp->suiv;
			tmp->suiv = newElt;
			if (pos != li->size)
			{
				(tmp->suiv)->prev = newElt;
			}
			else
			{
				li->end = newElt;
			}
			
		}
		else
		{
			LiNodElt* tmp = li->start;
			for (int i = 0; i < pos; i++)
			{
				tmp = tmp->suiv;
			}
			newElt->suiv = tmp;
			newElt->prev = tmp->prev;
			if (pos != 0)
			{
				(tmp->prev)->suiv = newElt;
			}
			else
			{
				li->start = newElt;
			}
			tmp->prev = newElt;
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

LiChNod* SetLiNodElt(LiChNod* li, NODE* Value, int pos) {
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
	if (pos < li->size && pos >= 0)
	{
		if (li->size == 1)
		{	
			free(li->start);
			li->start = NULL;
			li->end = NULL;
		}
		else if (pos == (li->size)-1)
		{
			LiNodElt* tmp = li->end;
			(tmp->prev)->suiv = NULL;
			li->end = tmp->prev;
			free(tmp);
		}
		else if (pos == 0)
		{
			LiNodElt* tmp = li->start;
			(tmp->suiv)->prev = NULL;
			li->start = tmp->suiv;
			free(tmp);
		}
		else
		{
			if ((li->size - pos) <= pos)
			{
				LiNodElt* tmp = li->end;
				for (int i = (li->size)-1; i > pos; i--)
				{
					tmp = tmp->prev;
				}
				(tmp->suiv)->prev = tmp->prev;
				(tmp->prev)->suiv = tmp->suiv;
				free(tmp);
			}
			else
			{
				LiNodElt* tmp = li->start;
				for (int i = 0; i < pos; i++)
				{
					tmp = tmp->suiv;
				}
				(tmp->suiv)->prev = tmp->prev;
				(tmp->prev)->suiv = tmp->suiv;
				free(tmp);
			}
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

bool nodeIsIn(LiChNod* li, NODE* Value) {
	bool isIn = false;
	LiNodElt* tmp = li->start;
	//printf("\n------------------------------------------test NII-ls : %d\n", li->size);
	for (int c = 0; c < li->size; c++)
	{
		/*
		printf("\ntest NII-C : %d---------------------------------\n", c);
		printf("test NII-V : %d\n", Value);
		printf("test NII-V (x:%d;z:%d)\n", Value->x, Value->z);
		printf("test NII-TV : %d\n", tmp->val);
		printf("test NII-V (x:%d;z:%d)\n", tmp->val->x, tmp->val->z);
		*/
		if (tmp->suiv != NULL)
		{
			//printf("test NII-TS : %d\n", tmp->suiv->val);
		}
		
		if (Value == tmp->val)
		{
			isIn = true;
			//printf("SPOT\n");
		}
		tmp = tmp->suiv;
	}
	if (isIn)
	{
		//printf("\nok\n");
	}
	
	return(isIn);
}