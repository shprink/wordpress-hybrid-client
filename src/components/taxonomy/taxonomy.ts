import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/*
  Generated class for the Taxonomy component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'taxonomy',
  templateUrl: 'taxonomy.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaxonomyComponent {
  @Input() item: any;

  constructor() {
  }

}
