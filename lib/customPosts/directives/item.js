export default function() {
    return {
        bindToController: true,
        replace: false,
        controller: Controller,
        controllerAs: 'customPostsItemCtrl',
        restrict: 'E',
        scope: {
            item: '=',
            type: '@'
        },
        template: `
            <div ng-include="customPostsItemCtrl.templateUrl" ng-if="customPostsItemCtrl.type"></div>
        `
    };
	
    function Controller($scope, $templateCache, $WPHCCustomPost /* Modal */, $injector /* Modal */ ) {
	    'ngInject';
		
        var vm = this;
        vm.templateUrl = `customPosts/${vm.type}/item.html`;
		
		if (!$templateCache.get(vm.templateUrl)) {
            throw new Error(`Template ${vm.templateUrl} does not exist`);
        }
		
		/* Modal */
		this.$injector = $injector;
		vm.showImageInModal = function (imageUrl, title = null, description = null) {
            return showInModal(vm,'image', imageUrl, title, description);
        };
		vm.showTextInModal = function (text, title = null, description = null) {
            return showInModal(vm,'text', text, title, description);
        };
		/* Modal */
	
	}
	
	/* Modal */
	function showInModal(vm, type, textOrUrl, title = null, description = null) {
		
		vm.$ionicModal = vm.$injector.get('$ionicModal');
		vm.$rootScope = vm.$injector.get('$rootScope');
		vm.$templateCache = vm.$injector.get('$templateCache');
		vm.$log = vm.$injector.get('$log');
		
		switch(type){
			case 'text':
			case 'image':
				var templateType = type;
				break;
			default:
				throw new Error(`showInModal type: ${type} does not exist`);
		}
		/* to register into cache. File: /config/templates/index.js */
		var templateUrl = `customPosts/${templateType}Modal.html`;
		var template = false; 
        if (!(template = vm.$templateCache.get( templateUrl ))){;
	        throw new Error(`Template ${templateUrl} does not exist`);
       	}
		vm.modal = vm.$ionicModal.fromTemplate( template, {
			scope: vm.$rootScope.$new(),
			animation: 'slide-in-up'
		});
		vm.$log.debug('[showInModal] template=', templateUrl);
		vm.modal.scope.modal = vm.modal;
    
        vm.modal.scope.item = {
            title: title,
			description: description,
            url: textOrUrl,
			text: textOrUrl,
        }
        vm.modal.show(); 
		
		// Cleanup the modal when we're done with it!
  		vm.modal.scope.$on('$destroy', function() {
			vm.$log.debug('[showInModal] destroy=', templateUrl);
  		});
  		// Execute action on hide modal
  		vm.modal.scope.$on('modal.hidden', function() {
    		// Execute action
			vm.$log.debug('[showInModal] modal.hidden=', templateUrl);
			vm.modal.scope.modal.remove();
  		});
  		// Execute action on remove modal
  		vm.modal.scope.$on('modal.removed', function() {
    		// Execute action
			vm.$log.debug('[showInModal] modal.removed=', templateUrl);
  		});
    }
	/* Modal */

}
