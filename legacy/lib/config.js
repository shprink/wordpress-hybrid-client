import defaultConfig from '../config/config.default.cson';
import configOverwrite from '../config/config.cson';
import menu from '../config/menu.json';
import deepExtend from 'deep-extend';

let config = {};

config = deepExtend(defaultConfig, configOverwrite, _.get(window, 'WPHC.config'));

let mod = angular.module('wordpress-hybrid-client.config', []);

mod.constant('$WPHCConfig', config);
mod.constant('$WPHCMenu', menu);

export default mod;
