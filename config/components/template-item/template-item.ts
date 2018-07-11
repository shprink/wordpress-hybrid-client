import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ItemParentComponent } from './../../../src/components/ItemParent';
import { IItemComponent } from './../../../src/components/interfaces';

@Component({
  selector: 'template-item',
  templateUrl: 'template-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateItemComponent extends ItemParentComponent implements IItemComponent {

  constructor(
    public navCtrl: NavController,
    public cdRef: ChangeDetectorRef,
  ) {
    super(navCtrl, cdRef);
  }
}
