export default function($stateProvider) {
    'ngInject';

    $stateProvider.decorator('views', (state, parent) => {
        var views = parent(state);
        if (state.name === 'public') {
            views['menu@public'] = {
                templateProvider: /*@ngInject*/ ($templateCache) => $templateCache.get('module/menu.html'),
                controller: 'WPHCMenuController as menuCtrl'
            };
        }
        return views;
    });
}
