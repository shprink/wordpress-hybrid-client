import { Component } from '@angular/core';
import { ListPage } from '../../src/pages/list/list';

@Component({
    selector: 'page-actors-list',
    templateUrl: '../../src/pages/list/list.html'
})
export class ListActorsPage extends ListPage {
    type: string = 'actor';
}