import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/*
  Generated class for the Bookmarks component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'bookmarks',
  templateUrl: 'bookmarks.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksComponent {
  @Input() list: Array<Object>;
  @Input() onRemove: (e, item) => void;
  @Input() onClick: (e, item) => void;

  constructor() {}

  trackByUid = (index: number, item) => `${item.type}:${item.id}`;  
}
