import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { InfiniteScroll, Refresher, NavParams } from 'ionic-angular';
import { URLSearchParams } from '@angular/http';
import { Injector, ViewChild } from '@angular/core';
import _get from 'lodash/get';
import debug from 'debug';

import { Toast, Config } from './../../providers';

const log = debug('List');

export interface IListPage {
    onLoad(data: Object): void;
    onClean(): void;
}

export interface IListResult {
    page: number;
    totalPages: number;
    totalItems: number;
    list: Array<any>;
}

export class AbstractListPage {
    // Injections
    config: Config;
    navParams: NavParams;
    toast: Toast;
    translate: TranslateService;

    isPaginationEnabled: boolean = true;
    shouldRetry: boolean = false;
    init: boolean = false;
    page: number = 1;
    perPage: number;
    store$: Observable<any>;
    stream$: Observable<any>;
    itemsToDisplay$ = new Subject<number>();
    service: any;
    type: string;
    options: any = {};

    @ViewChild(InfiniteScroll) infinite: InfiniteScroll;

    constructor(
        public injector: Injector
    ) {
        this.config = injector.get(Config, Config);
        this.navParams = injector.get(NavParams, NavParams);
        this.toast = injector.get(Toast, Toast);
        this.translate = injector.get(TranslateService, TranslateService);
        this.updateItemsToDisplay();
    }

    ionViewDidLoad() {
        log('[ListPage] ionViewDidLoad');
        this.perPage = this.getQuery().per_page || this.config.getApi('per_page', 5);
        this.doInit();
    }

    doInit() {
        this.init = false;
        this.isPaginationEnabled = true;
        this.page = 1;
    }

    // @TODO: remove when fixed: https://github.com/driftyco/ionic/issues/9209
    resetInfiniteScroll(){
        this.infinite._onScroll({
         timeStamp: Date.now(),
          scrollTop: 1,
          scrollLeft: 1,
          scrollHeight: 1,
          scrollWidth: 1,
          contentHeight: 1,
          contentWidth: 1,
          contentTop: 1,
          contentBottom: 1,
          startY: 1,
          startX: 1,
          deltaY: 1,
          deltaX: 1,
          velocityY: 1,
          velocityX: 1,
          directionY: '',
          directionX: '',
          domWrite: null
      });
      this.infinite._lastCheck = 0;
    }

    setStream = (stream: Observable<any>) => this.stream$ = stream;
    setStore = (store: Observable<any>) => this.store$ = store;
    setService = (service: any) => this.service = service;
    setType = (type: string) => this.type = type;
    setOptions = (options: any = {}) => this.options = options;
    updateItemsToDisplay = (resetInfiniteScroll = true) => {
        this.itemsToDisplay$.next(this.page * this.perPage);
        resetInfiniteScroll && setTimeout(() => this.resetInfiniteScroll(), 200);
    }

    onLoad(data: Object) { }
    onClean() { }

    public getCurrentList(): any[] {
        let currentList;
        this.store$.first().subscribe(listParams => currentList = _get(listParams, 'list', []));
        return currentList;
    }

    public getCurrentPage(): number {
        let currentPage;
        this.store$.first().subscribe((listParams) => currentPage = _get(listParams, 'page', 0));
        return currentPage;
    }

    public getQuery(): any {
        // if (this.type === 'customPosts' && this.navParams.get('slug')) {
        //     return this.config.get(`[${this.navParams.get('slug')}].query`, {})
        // } else if (this.type === 'taxonomiesPosts' && this.postType) {
        //     return this.config.get(`[${this.postType}].query`, {})
        // }
        return Object.assign(
            {},
            this.config.get(`[${this.type}].query`, {}),
            _get(this.options, 'query', {})
        );
    }

    public fetch(): Observable<any> {
        const currentPage = this.getCurrentPage();
        const nextPage = currentPage + 1;
        const searchParams = Object.assign({
            per_page: this.perPage,
        }, this.getQuery(), {
                page: nextPage,
                "_embed": true
            });
        const uRLSearchParams = new URLSearchParams();
        Object.keys(searchParams).map((key) => {
            uRLSearchParams.set(key, searchParams[key]);
        });

        debug(`[ListPage] doLoad ${this.type}:${this.options} ${searchParams.page}`, searchParams);
        return this.service.getList({ search: uRLSearchParams })
            .debounceTime(this.config.getApi('debounceTime', 400))
            .timeout(this.config.getApi('timeout', 10000))
            .retry(this.config.getApi('maxAttempt', 3) - 1)
            .map((r) => {
                this.shouldRetry = false;
                const totalPages = parseInt(r.headers.get('x-wp-totalpages'));
                const response = {
                    page: nextPage,
                    totalPages,
                    totalItems: parseInt(r.headers.get('x-wp-total')),
                    list: r.json()
                };
                this.page = nextPage;
                this.init = true;
                this.isPaginationEnabled = true;
                this.onLoad(response);
                this.updateItemsToDisplay();
                return response;
            })
            .catch(res => {
                const json = res.json();
                if (json.code === 'rest_post_invalid_page_number') {
                    return res;
                }
                this.init = true;
                this.shouldRetry = true;
                this.isPaginationEnabled = false;
                this.toast.show(this.translate.instant('error'));

                log("[ListPage] error", res);
                return res;
            });
    }

    doRefresh(refresher: Refresher): void {
        this.onClean();
        this.fetch().first().subscribe(() => refresher.complete(), (error) => refresher.complete());
    }

    doInfinite(infiniteScroll: InfiniteScroll): void {
        log('[ListPage] doInfinite');
        const currentPage = this.getCurrentPage();
        console.log(this.page, currentPage);

        if (this.page < currentPage) {
            this.page += 1;
            this.updateItemsToDisplay();
            infiniteScroll.complete();
        } else {
            this.fetch().first().subscribe(({ totalPages, page }) => {
                const isComplete = totalPages <= page;
                infiniteScroll.complete();
                this.isPaginationEnabled = !isComplete;
            }, (error) => infiniteScroll.complete());
        }

    }

    trackById = (index: number, item) => item.id;
}  
