import { Action } from '@ngrx/store';

export const ADD_POSTS = 'ADD_POSTS';
export const CLEAN_POSTS = 'CLEAN_POSTS';

export const addPosts = (payload): Action => ({
    type: ADD_POSTS,
    payload
})

export const cleanPosts = (): Action => ({
    type: CLEAN_POSTS
})