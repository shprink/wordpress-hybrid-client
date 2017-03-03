export default class {
    constructor($ionicModal, $rootScope) {
        'ngInject';

        this.$ionicModal = $ionicModal;
        this.$rootScope = $rootScope;
        this.modal = null;
    }

    showTaxonomiesInModal(translation, list, term, postType) {
        let self = this;
        if (!this.modal) {
            this.modal = this.$ionicModal.fromTemplate(require('./modal.html'), {
                scope: this.$rootScope.$new(),
                animation: 'slide-in-up'
            });
            this.modal.scope.modal = this.modal;
        }

        this.modal.scope.taxonomies = {
            title: translation,
            term: null,
            type: null,
            list: []
        }

        this.modal.show().then(() => {
            self.modal.scope.taxonomies.type = postType
            self.modal.scope.taxonomies.term = term
            self.modal.scope.taxonomies.list = list
        });
    }

}
