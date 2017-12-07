import { Component, Injector } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WpApiPages, WpApiPosts, WpApiCustom } from 'wp-api-angular';
import { Store } from '@ngrx/store';
import _get from 'lodash/get';

import { addItem } from '../../actions';
import { AppState } from '../../reducers';
import { AbstractItemPage } from './../abstract/ItemPage';

/*
  Generated class for the Item page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage extends AbstractItemPage {
  constructor(
    public injector: Injector,
    public navCtrl: NavController,
    private store: Store<AppState>,
    private wpApiPages: WpApiPages,
    private wpApiPosts: WpApiPosts,
    private wpApiCustom: WpApiCustom,
  ) {
    super(injector);
    this.setType(this.navParams.get('type'));
    this.setStream(this.store.select(state => {
      let item = _get(state, `items[${this.type}][${this.navParams.get('id')}]`);
      if (!item) {
        return item;
      }
      if (!item._full) {
        item._needsRefresh = true;
      }
      return item;
    }));

    if (this.type === 'pages') this.setService(wpApiPages)
    else if (this.type === 'posts') this.setService(wpApiPosts)
    else this.setService(wpApiCustom.getInstance(this.type))

  }

  onLoad(item) {
    item._full = true;
    this.store.dispatch(addItem(this.type, item));
  }
}
