import { Observable, Subject, Subscription } from 'rxjs';
import {
  Component, Injector,
  ComponentFactoryResolver, ViewChild
} from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { WpApiCustom } from 'wp-api-angular';
import { Store } from '@ngrx/store';
import _get from 'lodash/get';
import _take from 'lodash/take';

import { AbstractListPage, IListResult } from '../abstract/PaginatedPage';
import { addSearchList, cleanSearchList } from '../../actions';
import { Config } from './../../providers';
import { AppState } from '../../reducers';
import { getKey } from '../../reducers/search';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage extends AbstractListPage {
  @ViewChild(Content) content: Content;
  types: string[];
  searchTerm: string;
  searchTermSubject = new Subject<string>();
  typeSubject = new Subject<string>();
  fetchSubscription: Subscription;

  constructor(
    public inject: Injector,
    public componentFactoryResolver: ComponentFactoryResolver,
    private navCtrl: NavController,
    private store: Store<AppState>,
    private wpApiCustom: WpApiCustom,
    public config: Config,
  ) {
    super(inject);
    this.types = this.config.getSearch('types', ['posts']);

    this.setType(this.types[0]);
    this.setStore(this.store.select(state => state.search['']));
    this.setService(wpApiCustom.getInstance(this.type));

    this.fetchSubscription = Observable.combineLatest(
      this.searchTermSubject,
      this.typeSubject,
      (searchTerm: string, type: string) => {
        this.setType(type);
        this.setService(this.wpApiCustom.getInstance(type));
        this.setStore(this.store.select(state => state.search[getKey(type, searchTerm)]));
      })
      .debounceTime(300) // wait 300ms after each keystroke before considering the term
      .switchMap(() => this.doInit())
      .subscribe(() => { })

    this.setStream(
      Observable.combineLatest(
        this.searchTermSubject,
        this.typeSubject,
        this.store.select(state => state.search),
        this.store.select(state => state.items),
        this.itemsToDisplay$,
        (searchTerm: string, type: string, searchState, items = {}, itemsToDisplay) => {
          const item = items[type]
          return _take(_get(searchState, `[${getKey(type, searchTerm)}].list`, []), itemsToDisplay).map(id => item[id])
        })
    )
  }

  doInit(): Observable<any> {
    super.doInit();
    const currentList = this.getCurrentList();
    if (!currentList.length && this.searchTerm) {
      return this.fetch();
    } else {
      this.init = true;
      this.updateItemsToDisplay();
      return Observable.of<any>([]);
    }
  }

  getQuery() {
    const query = super.getQuery();
    return Object.assign({}, query, {
      search: this.searchTerm
    });
  }

  search(e) {
    this.searchTerm = e.target.value;
    this.searchTermSubject.next(this.searchTerm);
  }

  onTypeChange(e) {
    this.page = 1;
    this.typeSubject.next(this.type);
    this.updateItemsToDisplay(false);
    this.content.scrollToTop();
  }

  ionViewDidLoad() {
    super.ionViewDidLoad();
    this.searchTermSubject.next("");
    this.typeSubject.next(this.type);
  }

  ionViewWillUnload() {
    this.fetchSubscription.unsubscribe();
  }

  onLoad({ page, totalPages, totalItems, list }: IListResult) {
    this.store.dispatch(addSearchList(this.searchTerm, this.type, this.options.query, {
      page,
      totalPages,
      totalItems,
      list
    }));
  }

  onClean() {
    this.store.dispatch(cleanSearchList(this.searchTerm, this.type));
  }
}
