import { Action } from '@ngrx/store';

export const ADD_PAGES = 'ADD_PAGES';
export const CLEAN_PAGES = 'CLEAN_PAGES';

export const addPages = (payload): Action => ({
    type: ADD_PAGES,
    payload
})

export const cleanPages = (): Action => ({
    type: CLEAN_PAGES
})