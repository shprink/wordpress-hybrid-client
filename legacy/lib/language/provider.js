export default function($WPHCConfig, $translateProvider) {
    'ngInject';

    var language, languages, languagesMapping, languagesTranslated, mapping, ref;
    languages = [];
    languagesTranslated = {};
    languagesMapping = {};
    _.forEach(_.get($WPHCConfig, 'translation.available'), (mapping, language) => {
        languages.push(language);
        languagesTranslated[language] = 'languages.' + language;
        angular.extend(languagesMapping, mapping);
    });

    return {
        getPreferredLanguage,
        getLanguages,
        getLanguagesMapping,
        $get: function(amMoment, $log, $ionicConfig, $filter) {
            'ngInject'; // jshint ignore:line

            return {
                locale: localStorage.getItem("locale") || getPreferredLanguage(),
                getPreferredLanguage,
                getLanguages,
                getLanguagesMapping,
                getLanguagesList: function() {
                    let displayedList = getDisplayedLanguages();
                    let filteredList = {};
                    _.each(languagesTranslated, (trans, code) => {
                        if(_.includes(displayedList, code)){
                            filteredList[code] = trans
                        }
                    });
                    return filteredList;
                },
                hasLocale: function() {
                    return localStorage.getItem("locale");
                },
                getLocale: function() {
                    return this.locale;
                },
                setLocale: function(locale) {
                    try {
                        this.locale = locale;
                        localStorage.setItem("locale", this.locale);
                        $translateProvider.use(this.locale);
                        $ionicConfig.backButton.text($filter('translate')('back'));
                        if (this.locale == 'zh') {
                            amMoment.changeLocale('zh-cn');
                        } else {
                            amMoment.changeLocale(this.locale);
                        }
                    } catch (error) {
                        $log.debug('[Language]', error);
                        localStorage.removeItem("locale");
                    }
                }
            };
        }
    };

    function getDisplayedLanguages() {
        return _.get($WPHCConfig, 'translation.displayed');
    }

    function getPreferredLanguage() {
        return _.get($WPHCConfig, 'translation.prefered');
    }

    function getLanguages() {
        return languages;
    }

    function getLanguagesMapping() {
        return languagesMapping;
    }
}
