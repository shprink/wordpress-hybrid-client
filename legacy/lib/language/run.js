export default function($log, $WPHCLanguage, $translate) {
    'ngInject';
    if (!ionic.Platform.isWebView()) {
        if ($WPHCLanguage.hasLocale()) {
            return $WPHCLanguage.setLocale($WPHCLanguage.getLocale());
        } else {
            return $WPHCLanguage.setLocale($WPHCLanguage.getPreferredLanguage());
        }
    }
}
