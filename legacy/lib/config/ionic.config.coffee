module.exports = ($WPHCConfig, $ionicConfigProvider) ->
    'ngInject';
    viewsTransition = _.get $WPHCConfig, 'ionicConfig.views.transition'
    viewsMaxCache = _.get $WPHCConfig, 'ionicConfig.views.maxCache'
    viewsForwardCache = _.get $WPHCConfig, 'ionicConfig.views.forwardCache'
    scrollingJsScrolling = _.get $WPHCConfig, 'ionicConfig.scrolling.jsScrolling'
    backButtonIcon = _.get $WPHCConfig, 'ionicConfig.backButton.icon'
    backButtonPreviousTitleText = _.get $WPHCConfig, 'ionicConfig.backButton.previousTitleText'
    formCheckbox = _.get $WPHCConfig, 'ionicConfig.form.checkbox'
    formToggle = _.get $WPHCConfig, 'ionicConfig.form.toggle'
    spinnerIcon = _.get $WPHCConfig, 'ionicConfig.spinner.icon'
    tabsStyle = _.get $WPHCConfig, 'ionicConfig.tabs.style'
    tabsPosition = _.get $WPHCConfig, 'ionicConfig.tabs.position'
    templatesMaxPrefetch = _.get $WPHCConfig, 'ionicConfig.templates.maxPrefetch'
    navBarAlignTitle = _.get $WPHCConfig, 'ionicConfig.navBar.alignTitle'
    navBarPositionPrimaryButtons = _.get $WPHCConfig, 'ionicConfig.navBar.positionPrimaryButtons'
    navBarPositionSecondaryButtons = _.get $WPHCConfig, 'ionicConfig.navBar.positionSecondaryButtons'

    $ionicConfigProvider.views.transition viewsTransition if _.isString viewsTransition
    $ionicConfigProvider.views.maxCache viewsMaxCache if _.isNumber viewsMaxCache
    $ionicConfigProvider.views.forwardCache viewsForwardCache if _.isBoolean viewsForwardCache
    $ionicConfigProvider.scrolling.jsScrolling scrollingJsScrolling if _.isBoolean scrollingJsScrolling
    $ionicConfigProvider.backButton.icon backButtonIcon if _.isString backButtonIcon
    $ionicConfigProvider.backButton.previousTitleText backButtonPreviousTitleText if _.isBoolean backButtonPreviousTitleText
    $ionicConfigProvider.form.checkbox formCheckbox if _.isString formCheckbox
    $ionicConfigProvider.form.toggle formToggle if _.isString formToggle
    $ionicConfigProvider.spinner.icon spinnerIcon if _.isString spinnerIcon
    $ionicConfigProvider.tabs.style tabsStyle if _.isString tabsStyle
    $ionicConfigProvider.tabs.position tabsPosition if _.isString tabsPosition
    $ionicConfigProvider.templates.maxPrefetch templatesMaxPrefetch if templatesMaxPrefetch
    $ionicConfigProvider.navBar.alignTitle navBarAlignTitle if _.isString navBarAlignTitle
    $ionicConfigProvider.navBar.positionPrimaryButtons navBarPositionPrimaryButtons if _.isString navBarPositionPrimaryButtons
    $ionicConfigProvider.navBar.positionSecondaryButtons navBarPositionSecondaryButtons if _.isString navBarPositionSecondaryButtons
