module.exports = angular.module 'wordpress-hybrid-client.analytics'
    .config ($WPHCConfig, $analyticsProvider) ->
        if !$WPHCConfig.analytics.enabled or !$WPHCConfig.analytics.trackingId
            return

        if (!IS_PROD)
            $analyticsProvider.developerMode true
        $analyticsProvider.virtualPageviews $WPHCConfig.analytics.virtualPageTracking

    .run ($WPHCConfig) ->
        if !$WPHCConfig.analytics.enabled or !$WPHCConfig.analytics.trackingId
            return

        ((i, s, o, g, r, a, m) ->
            i['GoogleAnalyticsObject'] = r
            i[r] = i[r] or ->
                (i[r].q = i[r].q or []).push arguments
                return
            i[r].l = 1 * new Date
            a = s.createElement(o)
            m = s.getElementsByTagName(o)[0]
            a.async = 1
            a.src = g
            m.parentNode.insertBefore a, m
            return
        ) window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga'

        window.ga 'create', $WPHCConfig.analytics.trackingId, 'auto'
        window.ga 'set', '&uid', $WPHCConfig.analytics.userId
