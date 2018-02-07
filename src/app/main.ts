import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import debug from 'debug';

import { WPHCModule } from './app.module';

const logApp = debug('App');
const logSW = debug('SW');

if (__PROD__) {
    enableProdMode();
}

// TODO: Move this to better place and include only wanted locale data
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

platformBrowserDynamic()
    .bootstrapModule(WPHCModule)
    .then(() => {
        logApp('Bootstrapped')
        if ('serviceWorker' in navigator && __SW_ENABLED__ && __PROD__) {
            navigator.serviceWorker.register('worker-basic.min.js')
                .then((reg) => {
                    if (reg.installing) {
                        logSW('installing');
                    } else if (reg.waiting) {
                        logSW('installed');
                    } else if (reg.active) {
                        logSW('active');
                    }
                })
                .catch(err => console.error('error', err));
        }
    });
