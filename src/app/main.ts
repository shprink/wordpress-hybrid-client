import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import debug from 'debug';

import { AppModule } from './app.module';

const logApp = debug('App');
const logSW = debug('SW');

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(() => {
        logApp('Bootstrapped')
        if ('serviceWorker' in navigator && __SW_ENABLED__ ) {
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
