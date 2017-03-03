###
@ngdoc directive
@name wordpress - hybrid - client: wphcInputEsc
@restrict E
@description
Blur input on Esc
@example
                    < pre >
</pre >
###
module.exports = angular.module('wordpress-hybrid-client.directives').directive 'wphcInputEsc', ->
    restrict: 'A'
    link: (scope, elem, attrs) ->
        ESCAPE_KEY = 27
        elem.bind 'keydown', (event) ->
            if event.keyCode is ESCAPE_KEY
                elem[0].blur()
