export default class {
    constructor($injector, $scope) {
        'ngInject';

        this.type = null;
        this.title = null;
        this.list = null;
        this.service = null;
        this.isLoadingMore = false;
        this.isPaginationOver = false;
        this.$injector = $injector;
        this.config = $injector.get('$WPHCConfig');
        this.$stateParams = $injector.get('$stateParams');
        this.$q = $injector.get('$q');
        this.$log = $injector.get('$log');
        this.page = 1;
        this.$scope = $scope;
        this.loadMore = ionic.throttle(angular.bind(this, () => {
            this.doLoadMore().finally(() => this.$scope.$broadcast('scroll.infiniteScrollComplete'));
        }), 1000);
    }

    init() {
        this.page = 1;
        this.isPaginationOver = false;
        return this.doLoadMore();
    }

    refresh() {
        this.page = 1;
        this.isPaginationOver = false;
        this.service.clearCache();
        this.doLoadMore(true).then((response) => {
            this.$log.debug('[AbstractList] refresh', response);
        }).finally(() => this.$scope.$broadcast('scroll.refreshComplete'));
    }

    doLoadMore(refresh = false) {
        // prevent multiple call when the server takes some time to answer
        if (this.isLoadingMore || this.isPaginationOver) {
            return this.$q.when(null);
        }
        this.isLoadingMore = true;

        const query = this.getMergedQuery();        
        this.$log.debug('[AbstractList] type', this.type);
        this.$log.debug('[AbstractList] query', query);

        return this.service.get(query).then((response) => {
            this.page++;
            this.list = (this.list && !refresh) ? this.list.concat(response.data) : response.data;
            this.isPaginationOver = (response.data.length === 0 || response.data.length < query.per_page);
            this.$log.debug('[AbstractList] data loded');
            this.$log.debug('[AbstractList] data loded: page', this.page);
            this.$log.debug('[AbstractList] data loded: items', response.data);
            this.$log.debug('[AbstractList] data loded: isPaginationOver', this.isPaginationOver);
            this.onDataLoaded(response);
            return response;
        }).finally(() => this.isLoadingMore = false);
    }

    getQuery() {
        return {
            page: this.page,
            per_page: 5,
            "_embed": true
        }
    }

    getMergedQuery() {
        let typeQuery = _.get(this.config, `[${this.type}].query`, {});
        if (this.type === 'customPosts' && this.$stateParams.slug) {
            typeQuery = _.get(this.config, `[${this.$stateParams.slug}].query`, {})
        } else if (this.type === 'taxonomiesPosts' && this.postType) {
            typeQuery = _.get(this.config, `[${this.postType}].query`, {})
        }
        return angular.merge(this.getQuery(), typeQuery);
    }

    setType(type = null) {
        this.type = type;
    }

    setService(service = null) {
        this.service = service;
    }

    setTitle(title = null) {
        this.title = title;
    }

    onDataLoaded(response) {

    }
}
