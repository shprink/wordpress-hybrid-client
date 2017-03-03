import { Injectable } from '@angular/core';
import { ToastController, Platform } from 'ionic-angular';
import { Toast as NativeToast } from 'ionic-native';

import { Config } from './config';

/*
  Generated class for the Toast provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
const TOAST_DURATION = 3000;
const TOAST_POSITION = 'bottom';

@Injectable()
export class Toast {

  constructor(
    public toastCtrl: ToastController,
    public config: Config,
    public platform: Platform
  ) { }

  show(message = '') {
    if (this.platform.is('cordova')) {
      NativeToast.show(message, `${TOAST_DURATION}`, this.config.getToast('position', TOAST_POSITION)).subscribe();
    } else {
      this.toastCtrl.create({
        message,
        duration: this.config.getToast('duration', TOAST_DURATION)
      }).present();
    }
  }

}
