import modConfig from './config.js';
import modController from './controller.js';
import modService from './service.js';

let mod = angular.module('wordpress-hybrid-client.search', []);

mod.config(modConfig);
mod.controller('WPHCSearchController', modController);
mod.service('$WPHCSearch', modService);

export default mod = mod.name;
