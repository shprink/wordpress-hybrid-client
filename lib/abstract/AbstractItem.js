export default class {
    constructor($injector, $scope) {
        'ngInject';

        this.type = null;
        this.title = null;
        this.item = null;
        this.service = null;
        this.$injector = $injector;
        this.config = $injector.get('$WPHCConfig');
        this.$stateParams = $injector.get('$stateParams');
        this.$q = $injector.get('$q');
        this.$scope = $scope;
    }

    init() {
        this.page = 1;
        return this.doLoadMore();
    }

    refresh() {
        this.init();
        this.item = null;
        this.doLoadMore().finally(() => this.$scope.$broadcast('scroll.refreshComplete'));
    }

    doLoadMore() {
        var self = this;
        if (!this.$stateParams.id){
            return this.$q.reject();
        }
        return this.service.get(this.$stateParams.id, angular.merge(this.getQuery(), _.get(this.config, `[${this.type}].query`) || {})).then((response) => {
            self.item = response.data;
        });
    }

    getQuery() {
        return {
            "_embed": true
        }
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
}
