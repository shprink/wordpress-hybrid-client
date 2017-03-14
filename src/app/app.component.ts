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
    
      const { oneSignal_enable, oneSignal_debug, oneSignal_appid } = this.config.get('cordova.oneSignal', {});
      if (oneSignal_enable){
        // Enable to debug issues.
        if (oneSignal_debug{
            window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
        }
        
        var notificationOpenedCallback = function(jsonData) {
            console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };

        window.plugins.OneSignal
            .startInit(oneSignal_appid)
            .handleNotificationOpened(notificationOpenedCallback)
            .endInit();
            
        // Call syncHashedEmail anywhere in your app if you have the user's email.
        // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
        // window.plugins.OneSignal.syncHashedEmail(oneSignal_userEmail);    
        
      }
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
