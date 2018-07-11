import { Component } from '@angular/core';
import { ListPage } from '../../src/pages/list/list';

@Component({
    selector: 'page-actor-list',
    templateUrl: '../../src/pages/list/list.html'
})
export class ListActorPage extends ListPage {
    type: string = 'movie';

    getQuery() {
        let query = super.getQuery();
        query.actor = parseInt(this.navParams.get('id'));
        return query;
    }
}