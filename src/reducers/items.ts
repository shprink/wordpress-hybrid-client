import { ActionReducer, Action } from '@ngrx/store';
import { INIT, ADD_ITEM, ADD_LIST, ADD_SEARCH_LIST, CLEAN_CACHE } from '../actions';

export interface IAuthorState {
    id: number;
    name: string;
    url: string;
    description: string;
    link: string;
    slug: string;
    avatar_urls: Object;
}

const defaultState = {
    pages: {},
    posts: {},
    tags: {},
    categories: {},
    users: {},
};

export const itemsReducer: ActionReducer<Object> = (state: Object = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case ADD_ITEM: {
            const { item, itemType } = payload;
            const indexes = {
                [item.id]: item
            };
            if (item._indexes) {
                if (item._indexes instanceof Array === false) {
                    console.warn('item._indexes should be instance of Array');
                }
                item._indexes.forEach((key) => {
                    indexes[item[key]] = item;
                });
            }
            return Object.assign({}, state, {
                [itemType]: Object.assign({}, state[itemType], indexes)
            });
        }

        case ADD_SEARCH_LIST:            
        case ADD_LIST: {
            const { list, itemType } = payload;
            const newAuthors = {};
            const newItems = {};

            list.forEach((item) => {
                newItems[item.id] = item;
                if (item._embedded && item._embedded.author) { // already stored in the state. avoid duplicates
                    item._embedded.author.forEach((author: IAuthorState) => newAuthors[author.id] = author);
                    delete item._embedded.author;
                }

            });

            return Object.assign({}, state, {
                users: Object.assign({}, state['users'], newAuthors),
                [itemType]: Object.assign({}, state[itemType], newItems)
            });
        }

        case INIT: {
            return payload.items || defaultState;
        }

        case CLEAN_CACHE: {
            return defaultState;
        }

        default:
            return state;
    }
}
