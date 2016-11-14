import 'angular-messages';
import modConfig from './config.js';
import modRun from './run.js';
import modLoginController from './login.controller.js';
import modUnauthController from './unauth.controller.js';
import modRegisterController from './register.controller.js';
import modWelcomeController from './welcome.controller.js';
import modAuthService from './auth.service.js';

let mod = angular.module('wordpress-hybrid-client.auth', ['ngMessages']);

mod.config(modConfig);
mod.run(modRun);
mod.controller('WPHCLoginController', modLoginController);
mod.controller('WPHCUnauthController', modUnauthController);
mod.controller('WPHCRegisterController', modRegisterController);
mod.controller('WPHCWelcomeController', modWelcomeController);
mod.service('$WPHCAuth', modAuthService);

export default mod = mod.name;
