import templates from './templates/index.js';
import './icons/icon_48.png';
import './icons/icon_72.png';
import './icons/icon_96.png';
import './icons/icon_144.png';
import './icons/icon_168.png';
import './icons/icon_192.png';
import '!file?name=[name].[ext]!./manifest.json';

let mod = angular.module('wordpress-hybrid-client.overwriteModule', [
    templates
]);

export default mod = mod.name;
