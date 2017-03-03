import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppearIn } from './../../utils/animations';
import { IListComponent } from './../interfaces';
import { ListParentComponent } from './../ListParent';
import { ListPage } from './../../pages/list/list';

/*
  Generated class for the CategoriesList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'categories-list',
  templateUrl: 'categories-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [AppearIn],
})
export class CategoriesListComponent extends ListParentComponent implements IListComponent {

  constructor(
    public navCtrl: NavController,
    public cdRef: ChangeDetectorRef,
  ) {
    super(navCtrl, cdRef);
  }

  openPage = (e, item) => {
    this.navCtrl.push(ListPage, {
      type: 'posts',
      options: JSON.stringify({
        query: {
          [this.type]: item.id
        }
      }),
    })
  }
}

