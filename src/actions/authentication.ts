import { Action } from '@ngrx/store'

export const SIGNIN = 'SIGNIN';
export const PROMPTED = 'PROMPTED';

export class Signin implements Action {
    readonly type = SIGNIN;
}

export class Prompted implements Action {
    readonly type = PROMPTED;
}

export type AuthenticationActions = Signin | Prompted;