import { Action } from '@ngrx/store';

export const ADD_TAXONOMY = 'ADD_TAXONOMY'; 

export const addTaxonomy = (payload): Action => ({
    type: ADD_TAXONOMY,
    payload
})