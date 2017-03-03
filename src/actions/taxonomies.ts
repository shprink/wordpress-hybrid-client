import { Action } from '@ngrx/store';

export const ADD_TAXONOMIES = 'ADD_TAXONOMIES';
export const CLEAN_TAXONOMIES = 'CLEAN_TAXONOMIES';

export const addTaxonomies = (payload): Action => ({
    type: ADD_TAXONOMIES,
    payload
})

export const cleanTaxonomies = (): Action => ({
    type: CLEAN_TAXONOMIES
})