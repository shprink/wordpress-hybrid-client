export default function($rootScope, $state, $WPHCConfig, $WPHCAuth) {
    'ngInject';

    $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
        // Redirect to default state when logged in and accessing any auth state
        if (toState.name.indexOf('auth') === 0 && toState.name !== 'auth.unauth') {
            if ($WPHCAuth.isLoggedIn()) {
                event.preventDefault();
                $state.go($WPHCConfig.menu.defaultState.state, $WPHCConfig.menu.defaultState.params);
            }
        }
        if ($WPHCConfig.auth.requireAuth) {
            // Redirect to auth default state when not logged in and accessing any app state
            if (toState.name.indexOf('public') === 0) {
                if (!$WPHCAuth.isLoggedIn()) {
                    event.preventDefault();
                    $state.go($WPHCConfig.auth.defaultState.state, $WPHCConfig.auth.defaultState.params);
                }
            }
        }
    });
}
