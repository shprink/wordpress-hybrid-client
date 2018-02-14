import {AppState} from "../reducers/index";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import * as AuthenticationActions from '../actions/authentication';
import {WpApiUsers} from "wp-api-angular";
import {AuthenticationState} from "../reducers/authentication";

@Injectable()
export class AuthenticationService {

    constructor(
        private store: Store<AppState>,
        private wpApiUsers: WpApiUsers,
    ) {}

    /**
     * Returns a promise if the user has not been prompted and has no authentication token.
     */
    promptLogin() {
        return this.store.select<AuthenticationState>('authentication')
            .filter(auth => {
                let noToken = (auth.token === null);
                return noToken && auth.firstTimeLogin
            })
            .take(1)
            .toPromise()
            .then(auth => {
                this.store.dispatch(new AuthenticationActions.Prompted());
            })
    }

    /**
     * Authenticates the current user and returns a resolved promise upon success and a rejected promise upon failure.
     */
    authenticate() {
        return this.wpApiUsers
            .me()
            .toPromise()
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.store.dispatch(new AuthenticationActions.Signin());
                return response;
            })
    }

}