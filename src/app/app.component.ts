import { Store } from '@ngrx/store';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { AppState, IParamsState } from './../reducers';
import { Config } from './../providers';
import { MenuMapping } from './../pages';

@Component({
  template: `
    <menu [content]="content"></menu>
    <ion-nav #content [root]="rootPage"></ion-nav>
  `
})
export class WPHC {
  @ViewChild(Nav) nav: Nav;

  constructor(
    public translate: TranslateService,
    public platform: Platform,
    public store: Store<AppState>,
    public config: Config
  ) {

    store.select('params')
      .map((params: IParamsState) => {
        const appNode: any = document.querySelector('ion-app');
        appNode.style = `zoom: ${0.8 + (0.1 * params.zoom)}`
      })
      .subscribe();
    // Set the default language for translation strings, and the current language.
    translate.setDefaultLang('en');
    translate.use('en')

    platform.ready().then(() => {
      const { page, params } = this.config.get('defaultPage', {});

      if (page && MenuMapping[page]) { // redirect to default page
        this.nav.setRoot(MenuMapping[page], params);
      }

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
