import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Config } from '../../../src/providers';
import { WpApiAuth, WpApiUsers } from 'wp-api-angular';
import { Store } from '@ngrx/store';
import { AppState } from "../../../src/reducers/index";
import * as AuthenticationActions from '../../../src/actions/authentication';

@Component({
    selector: 'login-form',
    templateUrl: 'login-form.html'
})
export class LoginFormComponent {

    @Input() onLoginSuccess: Function;
    @Input() onLoginError: Function;
    private auth: FormGroup;
    formType: string;
    registrationUrl: string;
    user: any;

    constructor(
        private formBuilder: FormBuilder,
        private iab: InAppBrowser,
        private config: Config,
        private wpApiAuth: WpApiAuth,
        private wpApiUsers: WpApiUsers,
        private store: Store<AppState>,
    ) {
        this.registrationUrl = this.config.get('registrationUrl');
        this.auth = this.formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required],
            'password2': ['', this.isPassword2Correct.bind(this)],
            'type': ['login']
        });
        this.setFormType('login');
    }

    isPassword2Correct() {
        if (!this.isRegisterForm) {
            return true;
        }
        return this.auth.value.password2 === this.auth.value.password;
    }

    setFormType(type) {
        let oldType = this.formType;
        this.formType = type;
        if (this.isRegisterForm) {
            const browser = this.iab.create(this.registrationUrl);
            this.formType = oldType;
        }
    }

    get isRegisterForm() { return this.formType === 'register'; }
    set isRegisterForm(val: boolean) {}

    get isLoginForm() { return this.formType === 'login'; }
    set isLoginForm(val: boolean) {
        this.wpApiAuth.auth(this.auth.value)
            .toPromise()
            .then(response => response.json())
            .then(json => {
                this.wpApiAuth.saveSession(json);
            })
            .catch(error => console.log(error));
    }

    authFormOnSubmit() {
        if (this.isRegisterForm) {
            this.register();
        }
        else {
            this.login();
        }
    }

    register() {
        console.log('register');
        this.wpApiUsers.create({
            username: this.auth.value.username,
            email: this.auth.value.username,
            password: this.auth.value.password,
        })
            .toPromise()
            .then(response => response.json())
            .then(json => {
                console.log(json);
            })
            .catch(error => console.log(error));
    }

    login() {
        this.wpApiAuth.auth(this.auth.value)
            .toPromise()
            .then(response => response.json())
            .then(json => {
                console.log('Got session');
                this.wpApiAuth.saveSession(json);
                this.store.dispatch(new AuthenticationActions.Signin());
                this.onLoginSuccess();
            })
            .catch(error => {
                this.onLoginError();
                console.log("error", error)
            });
    }

}