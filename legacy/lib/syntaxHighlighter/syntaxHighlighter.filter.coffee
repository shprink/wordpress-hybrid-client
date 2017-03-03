module.exports = angular.module 'wordpress-hybrid-client.syntaxHighlighter'
    .filter 'highlight', ->
        return (text) ->
            element = angular.element '<div></div>'
            element.append text
            all = angular.element(element[0].querySelectorAll 'pre')
            all.attr 'hljs', ''
            element.html()
