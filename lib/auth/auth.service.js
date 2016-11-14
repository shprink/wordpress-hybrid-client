export default class {
    constructor($injector) {
        'ngInject';
        
        this.config = $injector.get('$WPHCConfig');
        this.$http = $injector.get('$http');
        this.$window = $injector.get('$window');
        this.$filter = $injector.get('$filter');
        this.$q = $injector.get('$q');
        this.authUrl = `${this.config.api.baseUrl}/jwt-auth/v1`;
        this.token = this.$window.localStorage.getItem('token');
    }
    
    isLoggedIn() {
        return this.token ? true : false;
    }
    
    emailToUsername(email) {
        return email.replace(/[&\+\?;\s]/g, '');
    }
    
    validate() {
        let d = this.$q.defer();
        if (this.token) {
            this.$http.post(`${this.authUrl}/token/validate`, null, { timeout: 10000 }).then((res) => {
                d.resolve(res.data);
            }).catch((err) => {
                this.token = null;
                this.$window.localStorage.removeItem('token');
                d.reject(err.data);
            });
        } else {
            d.reject(this.$filter('translate')('auth.login.tokenMissing'));
        }
        return d.promise;
    }
    
    auth(data) {
        let d = this.$q.defer();
        this.$http.post(`${this.authUrl}/token`, data, { timeout: 10000 }).then((res) => {
            this.token = res.data.token;
            this.$window.localStorage.setItem('token', this.token);
            d.resolve(res.data);
        }).catch((err) => {
            d.reject(err.data);
        });
        return d.promise;
    }
    
    unauth() {
        this.token = null;
        this.$window.localStorage.removeItem('token');
    }
}
