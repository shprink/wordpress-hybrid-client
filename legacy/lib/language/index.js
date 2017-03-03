import 'angular-translate';

import modProvider from './provider';
import modeConfig from './config';
import modRun from './run';

let mod = angular.module('bdit.language', [
    'pascalprecht.translate',
]);
mod.provider('$WPHCLanguage', modProvider);
mod.config(modeConfig);
mod.run(modRun);

export default mod = mod.name;
