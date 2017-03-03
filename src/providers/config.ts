import { Injectable } from '@angular/core';
import deepExtend from 'deep-extend';
import _get from 'lodash/get';

import defaultConfig from '../../config/config.default.cson';
import configOverwrite from '../../config/config.cson';

const rawConfig = deepExtend(defaultConfig, configOverwrite);

@Injectable()
export class Config {
    static getConfig() { return rawConfig };
    private config: Object = rawConfig;
    constructor() {
        console.info('app config', this.config);
    }
    getRaw = () => this.config;
    get = (path = '', otherwise = undefined) => _get(this.config, path, otherwise);
    getApi = (path = '', otherwise = undefined) => this.get(`api.${path}`, otherwise);
    getMenu = (path = '', otherwise = undefined) => this.get(`menu.${path}`, otherwise);
    getNative = (path = '', otherwise = undefined) => this.get(`native.${path}`, otherwise);
    getToast = (path = '', otherwise = undefined) => this.get(`toast.${path}`, otherwise);
    getTabs = (path = '', otherwise = undefined) => this.get(`tabs.${path}`, otherwise);
}
