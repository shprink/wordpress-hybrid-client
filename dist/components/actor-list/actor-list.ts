import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppearIn } from './../../../src/utils/animations';
import { IListComponent } from './../../../src/components/interfaces';
import { ListParentComponent } from './../../../src/components/ListParent';
import { ListPage } from './../../../src/pages/list/list';

/*
  Generated class for the ActorList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'actor-list',
  templateUrl: 'actor-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [AppearIn],
})
export class ActorListComponent extends ListParentComponent implements IListComponent {

  constructor(
    public navCtrl: NavController,
    public cdRef: ChangeDetectorRef,
  ) {
    super(navCtrl, cdRef);
  }

  openPage = (e, item) => {
    this.navCtrl.push(ListPage, {
      type: 'movie',
      options: JSON.stringify({
        query: {
          [this.type]: item.id
        }
      }),
    })
  }
}

