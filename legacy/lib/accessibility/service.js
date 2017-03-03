export default function($log, $WPHCConfig, $document) {
    'ngInject';

    return {
        fontSize: localStorage.getItem("fontSize") || _.get($WPHCConfig, 'settings.parameters.defaultFontSize'),
        setFontSize: function(fontSize) {
            this.fontSize = fontSize;
            $log.info('setting font size', this.fontSize);
            localStorage.setItem("fontSize", this.fontSize);
            return this.updateBodyClass();
        },
        updateBodyClass: function() {
            var classes, key;
            classes = '';
            for (key in this.getFontSizeList()) {
                classes += ' font-' + key;
            }
            return angular.element($document[0].body).removeClass(classes).addClass('font-' + this.fontSize);
        },
        getFontSize: function() {
            return this.fontSize;
        },
        getFontSizeList: function() {
            return {
                "small": {
                    trans: "fontSize.small",
                    value: "small",
                    order: 0
                },
                "medium": {
                    trans: "fontSize.medium",
                    value: "medium",
                    order: 1
                },
                "large": {
                    trans: "fontSize.large",
                    value: "large",
                    order: 2
                },
                "x-large": {
                    trans: "fontSize.x-large",
                    value: "x-large",
                    order: 3
                },
                "xx-large": {
                    trans: "fontSize.xx-large",
                    value: "xx-large",
                    order: 4
                }
            };
        }
    }
}
