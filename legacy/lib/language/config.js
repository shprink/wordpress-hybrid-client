export default function($translateProvider, $WPHCLanguageProvider, $translateSanitizationProvider) {
    'ngInject';

    var i, language, languages;
    languages = $WPHCLanguageProvider.getLanguages();
    for (i in languages) {
        language = languages[i];
        $translateProvider.translations(language, require(`../translations/${language}`));
    }
    $translateProvider
        .preferredLanguage($WPHCLanguageProvider.getPreferredLanguage())
        .registerAvailableLanguageKeys(languages, $WPHCLanguageProvider.getLanguagesMapping())
        .fallbackLanguage('en')
        .useSanitizeValueStrategy('escape');

    $translateSanitizationProvider.useStrategy('sanitizeParameters');
}
