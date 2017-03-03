import modConfig from './config.js';
import modPageController from './page.controller.js';
import modPagesController from './pages.controller.js';
import modPageService from './page.service.js';
import modPagesService from './pages.service.js';

let mod = angular.module('wordpress-hybrid-client.pages', []);

mod.config(modConfig);
mod.controller('WPHCPageController', modPageController);
mod.controller('WPHCPagesController', modPagesController);
mod.service('$WPHCPage', modPageService);
mod.service('$WPHCPages', modPagesService);

export default mod = mod.name;
