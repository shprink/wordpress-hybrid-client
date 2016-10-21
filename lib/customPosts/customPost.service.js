import AbstractItemService from '../abstract/AbstractItemService.js';

export default class extends AbstractItemService {
    constructor($wpApiCustom, $injector, $ionicModal, $rootScope) {
        'ngInject';

        super($injector);
        this.setType('customPost');
		
		this.$ionicModal = $ionicModal;
        this.$rootScope = $rootScope;
        this.modal = null; 	
	}
	
	showImageInModal(imageUrl,imageTitle = null) {
        let self = this;
        if (!this.modal) {
			this.modal = this.$ionicModal.fromTemplate(require('./modal.html'), {
                scope: this.$rootScope.$new(),
                animation: 'slide-in-up'
            });
            this.modal.scope.modal = this.modal;
        }
        this.modal.scope.item = {
            imageTitle: imageTitle,
            imageUrl: imageUrl,
        }
        this.modal.show().then(() => {
            self.modal.scope.item.imageTitle = imageTitle;
			self.modal.scope.item.imageUrl = imageUrl;
        });
    }

    getCacheUniqueString(id, query){
        return `${this.config.api.baseUrl}${this.type}${this.$stateParams.slug}${id}${query}`;
    }

    getHttpPromise(id) {
        let service = this.$injector.get('$wpApiCustom').getInstance(this.$stateParams.slug);
        this.setService(service);
        return this.service.get(id);
    }
}
