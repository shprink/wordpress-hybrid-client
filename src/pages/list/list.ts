import { Observable } from 'rxjs';
import {
  Component, Injector,
  ComponentFactoryResolver
} from '@angular/core';
import { NavController } from 'ionic-angular';
import { WpApiPages, WpApiPosts, WpApiCustom } from 'wp-api-angular';
import { Store } from '@ngrx/store';
import _get from 'lodash/get';
import _take from 'lodash/take';
import _isObject from 'lodash/isObject';

import { AbstractListPage, IListPage, IListResult } from '../abstract/PaginatedPage';
import { addList, cleanList } from '../../actions';
import { AppState } from '../../reducers';

/*
  Generated class for the Pages page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage extends AbstractListPage implements IListPage {

  constructor(
    public inject: Injector,
    public componentFactoryResolver: ComponentFactoryResolver,
    private navCtrl: NavController,
    private store: Store<AppState>,
    private wpApiPages: WpApiPages,
    private wpApiPosts: WpApiPosts,
    private wpApiCustom: WpApiCustom,
  ) {
    super(inject);
    const options = this.navParams.get('options');

    this.setType(this.navParams.get('type'));

    if (_isObject(options)) {
      this.setOptions(options);
    } else if (typeof options === 'string') {
      this.setOptions(JSON.parse(options || "{}"))
    }

    const listKey = this.options.query ? this.type + JSON.stringify(this.options.query) : this.type;
    console.log('listKey', listKey)

    this.setStore(store.select(state => state.list[listKey]));

    this.setStream(
      Observable.combineLatest(
        this.store$,
        this.store.select(state => state.items[this.type]),
        this.itemsToDisplay$,
        (listState: any, item = {}, itemsToDisplay) => {
          console.log('list', listState, item, itemsToDisplay)
          return _take(_get(listState, 'list', []), itemsToDisplay).map(id => item[id])
        }))

    if (this.type === 'pages') this.setService(wpApiPages)
    else if (this.type === 'posts') this.setService(wpApiPosts)
    else this.setService(wpApiCustom.getInstance(this.type))
  }

  ionViewDidLoad() {
    super.ionViewDidLoad();
  }

  onLoad({ page, totalPages, totalItems, list }: IListResult) {
    this.store.dispatch(addList(this.type, this.options.query, {
      page,
      totalPages,
      totalItems,
      list
    }));
  }

  onClean() {
    this.store.dispatch(cleanList(this.type));
  }
}
