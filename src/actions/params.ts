import { Action } from '@ngrx/store';

export const SET_LOCALE = 'SET_LOCALE';
export const SET_ZOOM = 'SET_ZOOM';
export const CLEAN_CACHE = 'CLEAN_CACHE';

export const setLocale = (payload): Action => ({
    type: SET_LOCALE,
    payload
});

export const setZoom = (payload): Action => ({
    type: SET_ZOOM,
    payload
});

export const cleanCache = (): Action => ({
    type: CLEAN_CACHE
});