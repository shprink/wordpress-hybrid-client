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
        controller: ($scope, $element, $attrs, $log, $cordovaInAppBrowser, $ionicScrollDelegate) ->
            $element.on 'click', (event) ->
                event.preventDefault()
                $cordovaInAppBrowser.open $attrs.href, '_system'
    .directive 'wphcHref', () ->
        restrict: 'A'
        controller: ($scope, $element, $attrs, $log, $cordovaInAppBrowser, $ionicScrollDelegate) ->
            isAnchor = $attrs.href.lastIndexOf('#', 0) is 0

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
                    $cordovaInAppBrowser.open $attrs.href, '_system'
