import { ActionReducer, Action } from '@ngrx/store';
import { ADD_TAXONOMIES, CLEAN_TAXONOMIES } from '../actions';

interface ITaxonomy {
    page: number;
    totalPages: number;
    totalItems: number;
    list: Array<any>
}

export interface ITaxonomiesState {
    categories: ITaxonomy,
    tags: ITaxonomy
}

const defaultTaxonomiesList = {
    page: 0,
    totalPages: undefined,
    totalItems: undefined,
    list: []
}

const defaultState = {
    tags: Object.assign({}, defaultTaxonomiesList),
    categories: Object.assign({}, defaultTaxonomiesList)
};

export const postsReducer: ActionReducer<Object> = (state: ITaxonomiesState = defaultState, action: Action) => {
    const payload = action.payload;
    const { type } = payload;
    if (!type) return state;

    switch (action.type) {
        case ADD_TAXONOMIES: {
            const { totalPages, totalItems, list, page, type } = payload;
            const ids = list.map((post) => post.id);
            return Object.assign({}, state, {
                page,
                totalPages,
                totalItems,
                list: state[type].list.concat(ids)
            });
        }

        case CLEAN_TAXONOMIES: {
            const { type } = payload;
            return Object.assign({}, state, {
                [type]: Object.assign({}, defaultTaxonomiesList)
            });
        }

        default:
            return state;
    }
}