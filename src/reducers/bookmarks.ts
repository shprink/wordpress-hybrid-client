import { ActionReducer, Action } from '@ngrx/store';
import {
    ADD_BOOKMARK, REMOVE_BOOKMARK, REMOVE_BOOKMARKS, CLEAN_CACHE
} from '../actions';

export interface IBookmarkState {
    id: number;
    type: String;
    timestamp: number;
}

const defaultState = {};

export const bookmarksReducer: ActionReducer<Object> = (state: Object = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case ADD_BOOKMARK: {
            const [type, id] = payload.uid.split(':');
            return Object.assign({}, state, {
                [payload.uid]: {
                    type,
                    id,
                    timestamp: payload.timestamp
                }
            });
        }

        case REMOVE_BOOKMARK: {
            const newState = Object.assign({}, state);
            delete newState[payload.uid];
            return newState;
        }

        case REMOVE_BOOKMARKS: {
            return {};
        }

        case CLEAN_CACHE: {
            return defaultState;
        }    

        default:
            return state;
    }
}