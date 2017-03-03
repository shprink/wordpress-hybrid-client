import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';

import { IMenuItem } from './../../components/menu-items/menu-items';
import { MenuMapping } from './../index';
import { Config } from './../../providers';

/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // tabs config
  tabsHighlight: boolean;
  tabsColor: string;
  tabsMode: string;
  tabsLayout: string;

  list: IMenuItem[] = [];
  menuMapping: {
    [key: string]: Component
  }
  @ViewChild('tabs') tabRef: Tabs;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public config: Config,
  ) {
    this.menuMapping = MenuMapping;

    this.tabsHighlight = this.config.getTabs('highlight', true);
    this.tabsColor = this.config.getTabs('color', 'primary');
    this.tabsLayout = this.config.getTabs('layout', 'icon-top');
    this.tabsMode = this.config.getTabs('mode');
  }

  ionViewDidLoad() {
    const options = this.navParams.get('options') || "{}";
    this.list = JSON.parse(options).list;

    setTimeout(() => { this.tabRef.select(0); }); // Hack to avoid blank screen
  }

  trackBy = (index: number, item) => index;
}
