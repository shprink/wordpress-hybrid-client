import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ItemParentComponent } from './../ItemParent';
import { IItemComponent } from './../interfaces';

/*
  Generated class for the PostsItem component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'pages-item',
  templateUrl: 'pages-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagesItemComponent extends ItemParentComponent implements IItemComponent {

  constructor(
    public navCtrl: NavController,
    public cdRef: ChangeDetectorRef,
  ) {
    super(navCtrl, cdRef);
  }
}
