import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import _orderBy from 'lodash/orderBy';
import _get from 'lodash/get';

import { removeBookmark, removeBookmarks } from '../../actions';
import { AppState } from '../../reducers';
import { ItemPage } from './../item/item';

/*
  Generated class for the Bookmarks page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bookmarks',
  templateUrl: 'bookmarks.html'
})
export class BookmarksPage {
  page: number = 0;
  hasBookmarks: boolean = false;
  stream$: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<AppState>
  ) {
    this.stream$ = Observable.combineLatest(
      this.store.select('bookmarks'),
      this.store.select('items'),
      (bookmarks, items: any) => {
        const list = [];
        console.log('[BookmarksPage] observable rerun')
        Object.keys(bookmarks).forEach((bookmarkUid) => {
          const bookmark = bookmarks[bookmarkUid];
          bookmark.item = _get(items, `[${bookmark.type}][${bookmark.id}]`);
          list.push(bookmark);
        });
        this.hasBookmarks = list.length > 0;
        return _orderBy(list, 'timestamp', 'desc');
      });
  }

  ionViewDidLoad() {
    console.log('[BookmarksPage] ionViewDidLoad');
  }

  doOpen = (e, item) => {
    this.navCtrl.push(ItemPage, {
      id: item.id,
      type: item.type
    })
  };

  doRemove = (e, item) => this.store.dispatch(removeBookmark(`${item.type}:${item.id}`));

  doRemoveAll = (e) => this.store.dispatch(removeBookmarks());
}
