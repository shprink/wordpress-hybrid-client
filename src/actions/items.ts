import { Action } from '@ngrx/store';

export const ADD_ITEM = 'ADD_ITEM';

export const addItem = (itemType, item): Action => ({
    type: ADD_ITEM,
    payload: { item, itemType }
})