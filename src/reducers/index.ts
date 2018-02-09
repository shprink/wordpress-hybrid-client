import { bookmarksReducer } from './bookmarks';
import { paramsReducer, IParamsState } from './params';
import { itemsReducer } from './items';
import { listReducer, IListState } from './list';
import { searchReducer, ISearchState } from './search';
import { pushNotificationsReducer, IPushNotifications } from './pushNotifications';
import { authenticationReducer, AuthenticationState } from './authentication';
import { AuthenticationActions } from "../actions/authentication";

export * from './bookmarks';
export * from './params';
export * from './items';
export * from './list';
export * from './search';
export * from './pushNotifications';

export interface AppState {
    params: IParamsState;
    bookmarks: Array<String>;
    items: any;
    list: IListState;
    search: ISearchState;
    pushNotifications: IPushNotifications;
    authentication: AuthenticationState;
}

export const Reducers = {
    params: paramsReducer,
    bookmarks: bookmarksReducer,
    items: itemsReducer,
    list: listReducer,
    search: searchReducer,
    pushNotifications: pushNotificationsReducer,
    authentication: authenticationReducer
}