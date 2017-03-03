import { TranslateService } from 'ng2-translate/ng2-translate';
import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { setZoom, cleanCache } from './../../actions/params';
import { AppState } from '../../reducers';
import { IParamsState } from './../../reducers';
import { Toast } from './../../providers';

/*
  Generated class for the Params page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-params',
  templateUrl: 'params.html'
})
export class ParamsPage {
  zoom: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private store: Store<AppState>,
    private toast: Toast,
    private translate: TranslateService,
  ) {
    store.select('params').take(1).subscribe((params: IParamsState) => this.zoom = params.zoom);
  }

  ionViewDidLoad() {
    console.log('[ParamsPage] ionViewDidLoad');
  }

  doUpdateZoom() {
    this.store.dispatch(setZoom(this.zoom));
  }

  doCleanCache() {
    let confirm = this.alertCtrl.create({
      title: this.translate.instant('CACHE_CLEAR'),
      message: this.translate.instant('CACHE_CLEAR_PROMPT'),
      buttons: [
        {
          text: this.translate.instant('CANCEL')
        },
        {
          text: this.translate.instant('OK'),
          handler: () => {
            this.store.dispatch(cleanCache());
            this.toast.show(this.translate.instant('CACHE_CLEARED'));
          }
        }
      ]
    });
    confirm.present();
  }
}
