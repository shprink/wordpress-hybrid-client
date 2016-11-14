import modConfig from './config.js';
import modController from './controller.js';
import pushNotifications from './pushNotifications/index.js';

let mod = angular.module('wordpress-hybrid-client.params', [
    pushNotifications
]);

mod.config(modConfig);
mod.controller('WPHCParamsController', modController);

export default mod = mod.name;
