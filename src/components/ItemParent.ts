import { NavController } from 'ionic-angular';
import { ChangeDetectorRef } from '@angular/core';
import { IItemComponent } from './interfaces';

export class ItemParentComponent implements IItemComponent {
    type: string;
    options: any;
    _item: any;

    constructor(
        public navCtrl: NavController,
        public cdRef: ChangeDetectorRef,
    ) {
    }

    // http://stackoverflow.com/questions/41797590/angular-2-onpush-change-detection-for-dynamic-components
    set item(val: any) { this._item = val; this.cdRef.markForCheck(); }
    get item() { return this._item };
}