###
@ngdoc directive
@name wordpress - hybrid - client: wphcShowWhen
@restrict E
@description
Show an element when a certain media query match
http: //mcgivery.com/ionic-showwhen-directive/
###
module.exports = angular.module('wordpress-hybrid-client.directives').directive 'wphcShowWhen', ($window) ->
    restrict: 'A'
    link: ($scope, $element, $attr) ->
        debouncedCheck = ionic.debounce ->
          $scope.$apply ->
            checkExpose()
            return
          return
        , 300, false

        checkExpose = ->
          mq = if $attr.wphcShowWhen is 'large' then '(min-width:768px)' else $attr.wphcShowWhen
          if $window.matchMedia(mq).matches
            $element.removeClass 'ng-hide'
          else
            $element.addClass 'ng-hide'
          return

        onResize = ->
          debouncedCheck()
          return

        checkExpose()
        ionic.on 'resize', onResize, $window
        $scope.$on '$destroy', ->
          ionic.off 'resize', onResize, $window
          return
        return
