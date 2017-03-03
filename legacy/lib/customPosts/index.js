import modConfig from './config.js';
import modCustomPostController from './customPost.controller.js';
import modCustomPostsController from './customPosts.controller.js';
import modCustomPostService from './customPost.service.js';
import modCustomPostsService from './customPosts.service.js';
import wphcCustomPostsItem from './directives/item.js';
import wphcCustomPostsList from './directives/list.js';

let mod = angular.module('wordpress-hybrid-client.customPosts', []);

mod.config(modConfig);
mod.controller('WPHCCustomPostController', modCustomPostController);
mod.controller('WPHCCustomPostsController', modCustomPostsController);
mod.service('$WPHCCustomPost', modCustomPostService);
mod.service('$WPHCCustomPosts', modCustomPostsService);
mod.directive('wphcCustomPostsItem', wphcCustomPostsItem);
mod.directive('wphcCustomPostsList', wphcCustomPostsList);

export default mod = mod.name;
