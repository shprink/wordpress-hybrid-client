export default function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('public.params.pushNotifications', {
            url: "/pushNotifications",
            views: {
                'content@public': {
                    templateProvider: ($templateCache) => $templateCache.get('module/params/pushNotifications.html'),
                    controller: "WPHCParamsPushNotificationsController as paramsPushNotifCtrl"
                }
            }
        });
}
