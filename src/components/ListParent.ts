import { NavController } from 'ionic-angular';
import { ChangeDetectorRef } from '@angular/core';
import _isEmpty from 'lodash/isEmpty';

import { IListComponent } from './interfaces';
import { ItemPage } from './../pages/item/item';

export class ListParentComponent implements IListComponent {
    type: string;
    options: any;
    _list: Array<any>;

    constructor(
        public navCtrl: NavController,
        public cdRef: ChangeDetectorRef,
    ) {
    }

    openPage = (e, item) => {
        const params: any = {
            type: this.type,
            id: item.id,
        }
        if (!_isEmpty(this.options)) {
            params.options = JSON.stringify(this.options);
        }
        this.navCtrl.push(ItemPage, params)
    }

    trackBy = (index: number, item) => item.id;

    // http://stackoverflow.com/questions/41797590/angular-2-onpush-change-detection-for-dynamic-components
    set list(val: Array<any>) { this._list = val; this.cdRef.markForCheck(); }
    get list() { return this._list };
}