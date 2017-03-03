import { ActionReducer, Action } from '@ngrx/store';
import _get from 'lodash/get';

import { Config } from './../providers';
import { SET_LOCALE, SET_ZOOM } from '../actions';

export interface IParamsState {
    locale: string;
    zoom: number;
}

const defaultState = {
    locale: _get(Config.getConfig(), 'defaultLanguage', 'en'),
    zoom: _get(Config.getConfig(), 'defaultZoom', 2)
};

export const paramsReducer: ActionReducer<Object> = (state: Object = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case SET_LOCALE: {
            return Object.assign({}, state, {
                locale: payload
            });
        }

        case SET_ZOOM: {
            return Object.assign({}, state, {
                zoom: payload
            });
        }

        default:
            return state;
    }
}