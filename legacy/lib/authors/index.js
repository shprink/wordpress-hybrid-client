import modConfig from './config.js';
import modAuthorController from './author.controller.js';
import modAuthorsController from './authors.controller.js';
import modAuthorService from './author.service.js';
import modAuthorsService from './authors.service.js';

let mod = angular.module('wordpress-hybrid-client.authors', []);

mod.config(modConfig);
mod.controller('WPHCAuthorController', modAuthorController);
mod.controller('WPHCAuthorsController', modAuthorsController);
mod.service('$WPHCAuthor', modAuthorService);
mod.service('$WPHCAuthors', modAuthorsService);

export default mod = mod.name;
