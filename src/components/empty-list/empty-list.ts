import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/*
  Generated class for the EmptyList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'empty-list',
  templateUrl: 'empty-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyListComponent {
  @Input() text: String;
  @Input() icon: String;

  constructor() {}

}
