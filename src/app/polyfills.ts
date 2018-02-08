import 'zone.js';

// TODO: Include only wanted locale data
if (!global.Intl) {
    require.ensure([
        'intl',
        'intl/locale-data/jsonp/fi.js',
        'intl/locale-data/jsonp/en.js'
    ], function (require) {
        require('intl');
        require('intl/locale-data/jsonp/en.js');
    });
}
