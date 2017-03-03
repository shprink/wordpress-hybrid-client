import { ActionReducer, Action } from '@ngrx/store';
import { ADD_ITEM, ADD_LIST, CLEAN_CACHE } from '../actions';

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
            return Object.assign({}, state, {
                [itemType]: Object.assign({}, state[itemType], {
                    [item.id]: item
                })
            });
        }

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

        case CLEAN_CACHE: {
            return defaultState;
        }

        default:
            return state;
    }
}