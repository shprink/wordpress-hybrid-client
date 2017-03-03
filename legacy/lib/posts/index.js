import modConfig from './config.js';
import modPostsController from './posts.controller.js';
import modPostsService from './posts.service.js';
import modPostController from './post.controller.js';
import modPostService from './post.service.js';

let mod = angular.module('wordpress-hybrid-client.posts', []);

mod.config(modConfig);
mod.controller('WPHCPostsController', modPostsController);
mod.controller('WPHCPostController', modPostController);
mod.service('$WPHCPosts', modPostsService);
mod.service('$WPHCPost', modPostService);

export default mod = mod.name;
