import modConfig from './config.js';
import modComposeController from './compose.controller.js';
import modComposeService from './compose.service.js';

let mod = angular.module('wordpress-hybrid-client.compose', []);

mod.config(modConfig);
mod.controller('WPHCComposeController', modComposeController);
mod.service('$WPHCCompose', modComposeService);

export default mod = mod.name;
