import { ActionReducer, Action } from '@ngrx/store';
import { ADD_ITEM, ADD_AUTHOR, ADD_AUTHORS, CLEAN_CACHE } from '../actions';

export interface IAuthorState {
    id: number;
    name: string;
    url: string;
    description: string;
    link: string;
    slug: string;
    avatar_urls: Object;
}

const defaultState = {};

export const authorReducer: ActionReducer<Object> = (state: Object = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case ADD_AUTHOR: {
            return Object.assign({}, state, {
                [payload.id]: payload
            });
        }

        case ADD_AUTHORS: {
            const { list } = payload;
            const newItems = {};

            list.forEach((item) => newItems[item.id] = item);
            return Object.assign({}, state, newItems);
        }

        case ADD_ITEM: {
            const { list } = payload;
            const newItems = {};

            list.forEach((item) => {
                const { _embedded: { author: authors = []} } = item;
                authors.forEach((author: IAuthorState) => newItems[author.id] = author);
            });
            return Object.assign({}, state, newItems);
        }

        case CLEAN_CACHE: {
            return defaultState;
        }

        default:
            return state;
    }
}