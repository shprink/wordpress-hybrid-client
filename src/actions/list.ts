import { Action } from '@ngrx/store';

export const ADD_LIST = 'ADD_LIST';
export const CLEAN_LIST = 'CLEAN_LIST';

export const addList = (itemType, query, payload): Action => ({
    type: ADD_LIST,
    payload: Object.assign(payload, { itemType, query })
})

export const cleanList = (itemType): Action => ({
    type: CLEAN_LIST,
    payload: { itemType }
})