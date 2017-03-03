export default class {
    constructor($log, $cordovaSpinnerDialog, $ionicLoading) {
        'ngInject';
        this.$log = $log;
        this.$ionicLoading = $ionicLoading;
        this.$cordovaSpinnerDialog = $cordovaSpinnerDialog;
    }

    show(text) {
        if (!ionic.Platform.isWebView()) {
            let options = {};
            if (text) {
                options.template = text;
            }
            this.$log.debug('loading ionic show');
            return this.$ionicLoading.show(options);
        } else {
            this.$log.debug('loading native show');
            return this.$cordovaSpinnerDialog.show('', text, true);
        }
    }

    hide() {
        if (!ionic.Platform.isWebView()) {
            this.$log.debug('loading ionic hide');
            return this.$ionicLoading.hide();
        } else {
            this.$log.debug('loading native hide');
            return this.$cordovaSpinnerDialog.hide();
        }
    }
}
