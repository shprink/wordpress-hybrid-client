import { Action } from '@ngrx/store';

export const ADD_PAGE = 'ADD_PAGE';

export const addPage = (payload): Action => ({
    type: ADD_PAGE,
    payload
});