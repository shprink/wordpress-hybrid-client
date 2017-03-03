import modConfig from './config.js';
import modController from './controller.js';
import modPostsController from './posts.controller.js';
import modService from './service.js';
import modTagService from './tag.service.js';
import modCustomService from './custom.service.js';
import modCustomPostsService from './customPosts.service.js';
import modCategoryService from './category.service.js';

let mod = angular.module('wordpress-hybrid-client.taxonomies', []);

mod.config(modConfig);
mod.controller('WPHCTaxonomiesController', modController);
mod.controller('WPHCTaxonomiesPostsController', modPostsController);
mod.service('$WPHCTaxonomiesCategory', modCategoryService);
mod.service('$WPHCTaxonomiesTag', modTagService);
mod.service('$WPHCTaxonomiesCustom', modCustomService);
mod.service('$WPHCTaxonomiesCustomPosts', modCustomPostsService);
mod.service('$WPHCTaxonomies', modService);

export default mod = mod.name;
