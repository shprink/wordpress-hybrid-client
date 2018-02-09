import { ActionReducer, Action } from '@ngrx/store';
import { SIGNIN, PROMPTED, AuthenticationActions} from '../actions/authentication'

export interface AuthenticationState {
    token: string;
    authenticated: boolean;
    firstTimeLogin: boolean;
}

const defaultState = {
    token: null,
    authenticated: false,
    firstTimeLogin: true
}

export const authenticationReducer: ActionReducer<Object> = (state: AuthenticationState = defaultState, action: AuthenticationActions) => {
    switch (action.type) {
        case SIGNIN : {
            return {
                ...state,
                authenticated: true
            };
        }
        case PROMPTED : {
            return {
                ...state,
                firstTimeLogin: false
            }
        }
    }
    return state;
}
