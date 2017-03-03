import { ActionReducer, Action } from '@ngrx/store';
import { ADD_TAXONOMY, ADD_TAXONOMIES } from '../actions';

const defaultState = {};

export const postReducer: ActionReducer<Object> = (state: Object = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case ADD_TAXONOMY: {
            return Object.assign({}, state, {
                [payload.id]: payload
            });
        }
    
        case ADD_TAXONOMIES: {
            const { list } = payload;
            const newPosts = {};

            list.forEach((post) => newPosts[post.id] = post);
            return Object.assign({}, state, newPosts);
        }

        default:
            return state;
    }
}