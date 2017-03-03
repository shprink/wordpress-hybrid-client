import { TranslateService } from 'ng2-translate/ng2-translate';
import { Observable, Subject } from 'rxjs';
import { InfiniteScroll, Refresher, NavParams } from 'ionic-angular';
import { URLSearchParams } from '@angular/http';
import { Injector } from '@angular/core';
import _get from 'lodash/get';

import { Toast, Config } from './../../providers';

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

    constructor(
        public injector: Injector
    ) {
        this.config = injector.get(Config, Config);
        this.navParams = injector.get(NavParams, NavParams);
        this.toast = injector.get(Toast, Toast);
        this.translate = injector.get(TranslateService, TranslateService);
        this.perPage = this.config.getApi('perPage', 5);
        this.updateItemsToDisplay();
    }

    ionViewDidLoad() {
        console.log('[ListPage] init');
        let currentList;
        this.store$.take(1).subscribe(listParams => currentList = _get(listParams, 'list', []));
        if (!currentList.length) {
            this.doLoad();
        } else {
            this.init = true;
            this.updateItemsToDisplay();
        }
    }

    setStream = (stream: Observable<any>) => this.stream$ = stream;
    setStore = (store: Observable<any>) => this.store$ = store;
    setService = (service: any) => this.service = service;
    setType = (type: string) => this.type = type;
    setOptions = (options: any = {}) => this.options = options;
    updateItemsToDisplay = () => this.itemsToDisplay$.next(this.page * this.perPage);

    onLoad(data: Object) { }
    onClean() { }

    private getCurrentPage(): number {
        let currentPage;
        this.store$.take(1).subscribe((listParams) => currentPage = _get(listParams, 'page', 0));
        return currentPage;
    }

    private getQuery(): Object {
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

    private fetch(): Observable<any> {
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

        console.debug(`[ListPage] doLoad ${this.type}:${this.options} ${searchParams.page}`, searchParams);
        return this.service.getList({ search: uRLSearchParams })
            .debounceTime(this.config.getApi('debounceTime', 400))
            .timeout(this.config.getApi('timeout', 10000))
            .retry(this.config.getApi('maxAttempt', 3) - 1)
            .map((r) => {
                this.shouldRetry = false;
                const totalPages = parseInt(r.headers.get('x-wp-totalpages'));
                this.onLoad({
                    page: nextPage,
                    totalPages,
                    totalItems: parseInt(r.headers.get('x-wp-total')),
                    list: r.json()
                });
                this.page = nextPage;
                this.init = true;
                this.isPaginationEnabled = true;
                this.updateItemsToDisplay();
                return totalPages <= nextPage;
            })
            .catch(res => {
                this.init = true;
                this.shouldRetry = true;
                this.isPaginationEnabled = false;
                this.toast.show(this.translate.instant('error'));

                console.error("[ListPage] error", res);
                return res;
            });
    }

    doLoad(): void {
        this.fetch().take(1).subscribe();
    }

    doRefresh(refresher: Refresher): void {
        this.onClean();
        this.fetch().take(1).subscribe(() => refresher.complete(), (error) => refresher.complete());
    }

    doInfinite(infiniteScroll: InfiniteScroll): void {
        console.log('[ListPage] doInfinite');
        const currentPage = this.getCurrentPage();

        if (this.page < currentPage) {
            this.page += 1;
            this.updateItemsToDisplay();
            infiniteScroll.complete();
        } else {
            this.fetch().take(1).subscribe((isComplete) => {
                infiniteScroll.complete();
                this.isPaginationEnabled = !isComplete;
            }, (error) => infiniteScroll.complete());
        }

    }

    trackById = (index: number, item) => item.id;
}  