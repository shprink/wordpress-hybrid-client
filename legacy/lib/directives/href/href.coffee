###
@ngdoc directive
@name wordpress - hybrid - client: wphcHref
@restrict E
@description
modify href behavior
###
module.exports = angular.module('wordpress-hybrid-client.directives')
    .directive 'wphcHrefInApp', () ->
        restrict: 'A'
        controller: ($scope, $element, $attrs, $log, $ionicScrollDelegate, $WPHCConfig) ->
            target = _.get($WPHCConfig, 'menu.externalLinkTarget') || '_system'
            options = _.get($WPHCConfig, 'menu.externalLinkOptions') || 'location=yes'
            $element.on 'click', (event) ->
                event.preventDefault()
                if _.get(window, 'cordova.InAppBrowser')
                    cordova.InAppBrowser.open $attrs.href, target, options
                else
                    window.open $attrs.href, '_blank'
    .directive 'wphcHref', () ->
        restrict: 'A'
        controller: ($scope, $element, $attrs, $log, $ionicScrollDelegate, $WPHCConfig) ->
            isAnchor = $attrs.href.lastIndexOf('#', 0) is 0
            target = _.get($WPHCConfig, 'menu.externalLinkTarget') || '_system'
            options = _.get($WPHCConfig, 'menu.externalLinkOptions') || 'location=yes'
            if isAnchor
                $element.on 'click', (event) ->
                    event.preventDefault()
                    anchor = $attrs.href.substr 1
                    element = angular.element document.getElementById(anchor)
                    if element.length is 0
                        element = angular.element document.getElementsByName(anchor)
                    if element.length is 0
                        return
                    $ionicScrollDelegate.scrollTo 0, element[0].offsetTop, true
            else
                $element.on 'click', (event) ->
                    event.preventDefault()
                    if _.get(window, 'cordova.InAppBrowser')
                        cordova.InAppBrowser.open $attrs.href, target, options
                    else
                        window.open $attrs.href, '_blank'
