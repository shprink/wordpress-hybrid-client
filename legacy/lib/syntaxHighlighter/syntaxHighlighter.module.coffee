# highlight code

# module.exports = angular.module 'wordpress-hybrid-client.syntaxHighlighter', [] if !IS_TECH

require 'highlight.js'
require 'highlight.js/styles/default.css'
require 'angular-highlightjs'

module.exports = angular.module 'wordpress-hybrid-client.syntaxHighlighter', [
    'hljs'
]

require "./syntaxHighlighter.filter.coffee"
require "./syntaxHighlighter.config.coffee"
