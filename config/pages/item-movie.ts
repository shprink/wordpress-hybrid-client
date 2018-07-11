import { Component } from '@angular/core';
import { ItemPage } from '../../src/pages/item/item';

@Component({
    selector: 'page-movie-item',
    templateUrl: '../../src/pages/item/item.html'
})
export class ItemMoviePage extends ItemPage {
    type: string = 'movie';
}