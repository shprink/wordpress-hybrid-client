import { Component } from '@angular/core';
import { ListPage } from '../../src/pages/list/list';

@Component({
    selector: 'page-movie-list',
    templateUrl: '../../src/pages/list/list.html'
})
export class ListMoviePage extends ListPage {
    type: string = 'movie';
}