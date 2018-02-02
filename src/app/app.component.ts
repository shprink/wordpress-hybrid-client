import { Store } from '@ngrx/store';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import debug from 'debug';

import { AppState, IParamsState } from './../reducers';
import { Config, PushNotifications, Storage, ServiceWorkerProvider } from './../providers';
import { MenuMapping } from './../pages';

const log = debug('App');

if (__DEV__) {
  debug.enable('*');
} else {
  debug.disable();
}

@Component({
  templateUrl: 'app.html'
})
export class WPHC {
  @ViewChild(Nav) nav: Nav;
  title: string

  constructor(
    public platform: Platform,
    public store: Store<AppState>,
    public config: Config,
    public pushNotif: PushNotifications,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public storage: Storage,
    public swProvider: ServiceWorkerProvider,
  ) {
    const appNode: any = document.querySelector('ion-app');

    this.title = config.get('title', '');

    this.platform.ready().then(() => {
      const { page, params } = this.config.get('defaultPage', {});
      log('Ready');

      this.storage.run();

      if (!location.hash && page && MenuMapping[page]) { // redirect to default page
        this.nav.setRoot(MenuMapping[page], params);
      }

      this.store.select(state => state.params).map((params: IParamsState) => {
        appNode.style = `zoom: ${0.8 + (0.1 * params.zoom)}`
      }).subscribe();

      pushNotif.init();
      swProvider.init();
      this.statusBar.styleDefault();
      setTimeout(() => { // A small delay to prevent flashing
        this.splashScreen.hide();
      }, 100);
    });
  }
}
