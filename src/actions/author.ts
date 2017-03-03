import { Action } from '@ngrx/store';

export const ADD_AUTHOR = 'ADD_AUTHOR';

export const addAuthor = (payload): Action => ({
    type: ADD_AUTHOR,
    payload
});