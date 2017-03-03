import { bookmarksReducer } from './bookmarks';
import { paramsReducer, IParamsState } from './params';
import { itemsReducer } from './items';
import { listReducer, IListState } from './list';

export * from './bookmarks';
export * from './params';
export * from './items';
export * from './list';

export interface AppState {
    params: IParamsState;
    bookmarks: Array<String>;
    items: any;
    list: IListState;
}

export const Reducers = {
    params: paramsReducer,
    bookmarks: bookmarksReducer,
    items: itemsReducer,
    list: listReducer,
}