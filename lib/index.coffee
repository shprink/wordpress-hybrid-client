# Create namespace
window.WPHC = window.WPHC || {}

require 'ionic-sdk/release/js/ionic.bundle.js'
require './angular-ios9-uiwebview.patch.js'
require 'angular-cache'
require 'angular-moment'
require 'moment'
require './font/font.coffee'
require 'ionic-native-transitions'
require 'expose?_!lodash'
require 'wp-api-angularjs'
require 'ng-mask/dist/ngMask.js'
require 'angular-fitvids'
require './config.js'
overwriteModule = require '../config/index.js'
customPostsModule = require './customPosts/index.js'
pagesModule = require './pages/index.js'
postsModule = require './posts/index.js'
searchModule = require './search/index.js'
authorsModule = require './authors/index.js'
taxonomiesModule = require './taxonomies/index.js'
filtersModule = require './filters/index.js'
directivesModule = require './directives/index.js'
languageModule = require './language/index.js'
templatesModule = require './templates/index.js'
paramsModule = require './params/index.js'
menuModule = require './menu/index.js'
bookmarkModule = require './bookmark/index.js'
accessibilityModule = require './accessibility/index.js'
loadingModule = require './loading/index.js'
authModule = require './auth/index.js'
composeModule = require './compose/index.js'

# Style entry point
require './scss/bootstrap'

module.exports = app = angular.module 'wordpress-hybrid-client', [
    'ionic'
    'ngIOS9UIWebViewPatch'
    'wordpress-hybrid-client.config'
    'ionic-native-transitions'
    'ui.router'
    'wp-api-angularjs'
    'angular-cache'
    'angularMoment'
    'ngMask'
    'fitVids'
    customPostsModule
    filtersModule
    pagesModule
    taxonomiesModule
    postsModule
    searchModule
    authorsModule
    languageModule
    paramsModule
    menuModule
    bookmarkModule
    accessibilityModule
    loadingModule
    authModule
    composeModule
    require('./cordova/cordova.module').name
    require('./cacheImg/cacheImg.module').name
    require('./syntaxHighlighter/syntaxHighlighter.module').name
    require('./init/init.module').name
    directivesModule
    templatesModule
    overwriteModule
]

app.config ($stateProvider, $urlRouterProvider) ->
    $stateProvider
    .state 'public',
    url: "/public"
    abstract: true
    views:
        '@' :
            template: require "./views/ion-menu.html"
            controller: "WPHCMainController as main"

    $urlRouterProvider.otherwise ($injector, $location) ->
        $WPHCConfig = $injector.get('$WPHCConfig');
        $state = $injector.get('$state');
        $state.go _.get($WPHCConfig, 'menu.defaultState.state'), _.get($WPHCConfig, 'menu.defaultState.params')

###
ANGULAR CONF
###
app.config ($logProvider, $compileProvider) ->
    $logProvider.debugEnabled if IS_PROD then false else true
    $compileProvider.debugInfoEnabled if IS_PROD then false else true

###
NATIVE TRANSITIONS CONF
###
app.config ($WPHCConfig, $ionicNativeTransitionsProvider) ->
    defaultOptions = _.get $WPHCConfig, 'cordova.nativeTransitions.defaultOptions'
    defaultTransition = _.get $WPHCConfig, 'cordova.nativeTransitions.defaultTransition'
    defaultBackTransition = _.get $WPHCConfig, 'cordova.nativeTransitions.defaultBackTransition'
    enabled = _.get $WPHCConfig, 'cordova.nativeTransitions.enabled'
    enabled = if _.isBoolean enabled then enabled else true
    $ionicNativeTransitionsProvider.setDefaultOptions defaultOptions if defaultOptions
    $ionicNativeTransitionsProvider.setDefaultTransition defaultTransition if defaultTransition
    $ionicNativeTransitionsProvider.setDefaultBackTransition defaultBackTransition if defaultBackTransition
    $ionicNativeTransitionsProvider.enable enabled

###
IONIC CONF
###
app.config require('./config/ionic.config.coffee');

###
REST CONF
###
app.config ($WPHCConfig, WpApiProvider, $httpProvider) ->
    WpApiProvider.setDefaultHttpProperties
        timeout: _.get($WPHCConfig, 'api.timeout') || 5000
    WpApiProvider.setBaseUrl _.get($WPHCConfig, 'api.baseUrl') || null
    $httpProvider.defaults.cache = false
    $httpProvider.interceptors.push ($log, $q, $injector, $WPHCConfig) ->
        request: (config) ->
            if _.startsWith config.url, $WPHCConfig.api.baseUrl
                config.headers['Accept-Language'] = $injector.get('$WPHCLanguage').getLocale()
            config || $q.resolve config

###
CACHE CONF
###
app.config ($WPHCConfig, CacheFactoryProvider) ->
    angular.extend(CacheFactoryProvider.defaults, _.get($WPHCConfig, 'cache.data') || {})

###
MEMORY STATS CONF
###
app.config ($WPHCConfig, $compileProvider) ->
    $compileProvider.debugInfoEnabled if IS_PROD then false else true

###
MAIN CONTROLLER
###
app.controller 'WPHCMainController' , ($log, $WPHCConfig) ->
    $log.info 'main controller'

    vm = @
    vm.exposeAsideWhen = _.get($WPHCConfig, 'menu.exposeAsideWhen') || 'large'
    vm.appVersion = wordpressHybridClient.version || null
    vm.appConfig = $WPHCConfig
    vm.appTitle = vm.appConfig.title || null
    vm

###
RUN
###
app.run ($rootScope, $log, $WPHCConfig, $translate, $WPHCLanguage, $ionicPlatform, $WPHCAccessibility, $cordovaSplashscreen, $WPHCInit) ->
    'ngInject';
    $rootScope.appLoaded = undefined
    # handling debug events
    if !IS_PROD
        $rootScope.$on '$stateNotFound', (event, unfoundState, fromState, fromParams) ->
            $log.info '$stateNotFound', unfoundState
        $rootScope.$on '$stateChangeError', (event, toState, toParams, fromState, fromParams, error) ->
            $log.info '$stateChangeError', error

    $WPHCAccessibility.updateBodyClass()

    $ionicPlatform.ready () ->
        $WPHCInit.init().finally ()->
            $rootScope.appLoaded = true;
            # For web debug
            if !ionic.Platform.isWebView()
                $translate.use $WPHCLanguage.getLocale()
            else
                $cordovaSplashscreen.hide()

    # Clean up appLoading
    # angular.element(document.querySelector 'html').removeClass 'app-loading'
    # angular.element(document.querySelector '#appLoaderWrapper').remove()
