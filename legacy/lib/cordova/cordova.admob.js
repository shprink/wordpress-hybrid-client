module.exports = angular.module('wordpress-hybrid-client.cordova')
    .run(($log, $WPHCConfig, $ionicPlatform) => {
        'ngInject';

        if (!_.get($WPHCConfig, 'cordova.admob.enabled')) {
            $log.info('[admob] disabled');
            return;
        }

        $log.info('[admob] enabled');

        $ionicPlatform.ready(() => {
            let bannerID = null;
            let interstitialID = null;
            let bannerPosition = 'BOTTOM_CENTER'
            if (/(android)/i.test(navigator.userAgent)) { // for android & amazon-fireos
                bannerID = _.get($WPHCConfig, 'cordova.admob.android.bannerID');
                interstitialID = _.get($WPHCConfig, 'cordova.admob.android.interstitialID');
                bannerPosition = _.get($WPHCConfig, 'cordova.admob.android.bannerPosition');
            } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
                bannerID = _.get($WPHCConfig, 'cordova.admob.ios.bannerID');
                interstitialID = _.get($WPHCConfig, 'cordova.admob.ios.interstitialID');
                bannerPosition = _.get($WPHCConfig, 'cordova.admob.ios.bannerPosition');
            } else { // for windows phone
                bannerID = _.get($WPHCConfig, 'cordova.admob.windows.bannerID');
                interstitialID = _.get($WPHCConfig, 'cordova.admob.windows.interstitialID');
                bannerPosition = _.get($WPHCConfig, 'cordova.admob.windows.bannerPosition');
            }
            $log.info('[admob] API exists?', typeof AdMob !== 'undefined');
            $log.debug('[admob] config', {
                bannerID,
                interstitialID,
                bannerPosition
            });

            if (AdMob && interstitialID) {
                AdMob.prepareInterstitial({
                    adId: interstitialID,
                    autoShow: true
                });
            }
            if (AdMob && bannerID) {
                AdMob.createBanner({
                    adId: bannerID,
                    position: AdMob.AD_POSITION[bannerPosition],
                    autoShow: true
                });
            }
        });
    });
