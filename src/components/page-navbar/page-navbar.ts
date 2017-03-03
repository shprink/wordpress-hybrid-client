import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/*
  Generated class for the PageNavbar component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'page-navbar',
  templateUrl: 'page-navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNavbarComponent {

  @Input() title : string;

  constructor() {}

}
