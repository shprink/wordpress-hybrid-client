module.exports = angular.module('wordpress-hybrid-client.syntaxHighlighter')
    .config ($WPHCConfig, hljsServiceProvider) ->
        hljsServiceProvider.setOptions $WPHCConfig.syntaxHighlighter
