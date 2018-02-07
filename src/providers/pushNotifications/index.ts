import { Injectable, Injector } from '@angular/core';

import { Config } from '../config';
import { PushNotificationsForWordPress } from './push-notifications-for-wordpress';

export * from './push-notifications-for-wordpress';

/*
  Generated class for the PushNotifications provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PushNotifications {
    instance: PushNotificationsForWordPress;

    constructor(
        public config: Config,
        public injector: Injector
    ) {
        // const plugin = this.config.getPushNotifications('plugin', 'push-notifications-for-wordpress');

        // if (plugin === 'push-notifications-for-wordpress') {
        //     this.instance = this.injector.get(PushNotificationsForWordPress, PushNotificationsForWordPress);
        // } else {
        //     throw new Error(`[PushNotifications] plugin "${plugin}" does not exists`);
        // }

    }

    init() {
        // this.instance.init();
    }
}
