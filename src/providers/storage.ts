import { Injectable } from '@angular/core';
import { Storage as IonicStorage } from '@ionic/storage';
import { Store } from '@ngrx/store';
import debug from 'debug';

import { AppState } from './../reducers';
import { INIT } from './../actions';

const log = debug('Storage');

@Injectable()
export class Storage {

    toSave = ['bookmarks', 'list', 'items', 'params']

    constructor(
        private store: Store<AppState>,
        public storage: IonicStorage
    ) { }

    init() {
        // POPULATE STORE
        // because this blocks => https://github.com/ngrx/store/pull/217
        let defaultState = {};
        const storagePromise = this.storage.forEach((val, key) => {
            defaultState[key] = JSON.parse(val);
        });

        return storagePromise
            .then(() => this.store.dispatch({ type: INIT, payload: defaultState }))
    }

    run() {
        this.toSave.forEach(name => {
            this.store.select(name).skip(1).debounceTime(500).subscribe((things: any) => {
                log(`[Store] saving ${name}`);
                this.storage.set(name, JSON.stringify(things));
            });
        });
    }
}
