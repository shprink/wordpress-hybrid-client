import { StoreModule, combineReducers } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Reducers } from './reducers';

export function reducer(state: any, action: any) {
  return combineReducers(Reducers)(state, action);
}

export const STORE = [
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
];