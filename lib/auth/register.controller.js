export default class {
    constructor($scope, $injector, WpApi) {
        'ngInject';

        this.loading = $injector.get('$WPHCLoading');
        this.config = $injector.get('$WPHCConfig');
        this.users = $injector.get('$wpApiUsers');
        this.loginService = $injector.get('$WPHCAuth');
        this.$log = $injector.get('$log');
        this.$filter = $injector.get('$filter');
        this.$state = $injector.get('$state');
        this.$http = $injector.get('$http');
        this.$ionicHistory = $injector.get('$ionicHistory');
        this.$ionicNavBarDelegate = $injector.get('$ionicNavBarDelegate');
        this.sliderOptions = {};
        $scope.data = {};
        
        this.fields = {
            jobTitle: [{
                value: 'safety_manager',
                name: 'Safety Manager'
            }, {
                value: 'foreman_supervisor',
                name: 'Forman / Supervisor'
            }, {
                value: 'tradesperson',
                name: 'Tradesperson'
            }, {
                value: 'owner_operator',
                name: 'Owner / Operator'
            }, {
                value: 'training_provider',
                name: 'Training Provider'
            }, {
                value: 'other',
                name: 'Other'
            }],
            trade: [{
                value: 'general_contractor',
                name: 'General Contractor'
            }, {
                value: 'carpenter',
                name: 'Carpenter'
            }, {
                value: 'roofer',
                name: 'Roofer' 
            }, {
                value: 'electrician',
                name: 'Electrician'
            }, {
                value: 'plumbing_hvac',
                name: 'Plumbing / HVAC'
            }, {
                value: 'masonry_worker',
                name: 'Masonry Worker'
            }, {
                value: 'painter',
                name: 'Painter'
            }, {
                value: 'insulator',
                name: 'Insulator'
            }, {
                value: 'laborer',
                name: 'Laborer'
            }, {
                value: 'plasterer',
                name: 'Plasterer'
            }, {
                value: 'cement_mason',
                name: 'Cement Mason'
            }, {
                value: 'other',
                name: 'Other'
            }],
            companySize: [{
                value: '10_below',
                name: '10 Workers or Less'
            }, {
                value: '11_25',
                name: '11 - 25 Workers'
            }, {
                value: '26_49',
                name: '26 - 49 Workers'
            }, {
                value: '50_99',
                name: '50 - 99 Workers'
            }, {
                value: '100_above',
                name: '100 Workers or More'
            }]
        };
        
        $scope.$watch(() => { return $scope.data.slider; }, (value) => {
            this.slider = value;
        });
    }
    
    next() {
        if (this.slider.isEnd) {
            this.register();
        } else {
            this.slider.slideNext();
        }
    }
    
    register() {
        this.form.$setSubmitted(true);
        this.error = null;
        if (this.form.$valid) {
            this.loading.show();
            this.processing = true;
            this.profile.username = this.loginService.emailToUsername(this.profile.email);
            this.profile.roles = ['contributor'];
            // Login as API Admin
            this.loginService.auth({
                username: this.config.auth.user,
                password: this.config.auth.password
            }).then((res) => {
                // Create new user
                return this.users.create(this.profile);
            }).then((res) => {
                this.$log.debug('User registered successfully');
                // Remove admin auth
                this.loginService.unauth();
                // Login as user
                return this.loginService.auth({
                    username: this.profile.username,
                    password: this.profile.password
                });
            }).then((res) => {
                this.$log.debug('User logged in successfully');
                this.$state.go(this.config.menu.defaultState.state, this.config.menu.defaultState.params);
                this.form.$setSubmitted(false);
            }).catch((err) => {
                let msg = err ? (err.data && err.data.message) ? err.data.message : err.message : this.$filter('translate')('auth.form.unknownError');
                msg = msg.replace('username', 'email address');
                this.$log.warn(msg);
                this.error = msg;
                this.slider.slideTo(0);
            }).finally(() => {
                this.loading.hide();
                this.processing = false;
            });
        } else {
            this.slider.slideTo(0);
        }
    }
}
