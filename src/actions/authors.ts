import { Action } from '@ngrx/store';

export const ADD_AUTHORS = 'ADD_AUTHORS';
export const CLEAN_AUTHORS = 'CLEAN_AUTHORS';

export const addAuthors = (payload): Action => ({
    type: ADD_AUTHORS,
    payload
})

export const cleanAuthors = (): Action => ({
    type: CLEAN_AUTHORS
})