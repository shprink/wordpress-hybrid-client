import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { ListPage } from './../list/list';

/*
  Generated class for the Taxonomies page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-taxonomies-modal',
  templateUrl: 'taxonomies-modal.html'
})
export class TaxonomiesModal {
  title: string;
  postType: string;
  term: string;
  list: Array<any>;
  // list$: Observable<Array<any>>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
  ) {
    this.title = navParams.get('title');
    this.postType = navParams.get('postType');
    this.term = navParams.get('term');
    this.list = navParams.get('list');
    console.debug('TaxonomiesPage', this.title, this.postType, this.term, this.list)
  }

  openPage = (e, item) => {
    this.navCtrl.push(ListPage, {
      type: 'posts',
      options: JSON.stringify({
        query: {
          [this.term]: item.id
        }
      }),
    }).then(() => this.dismiss(), () => this.dismiss())
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  trackBy = (index: number, item) => item.id;

}
