import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AccelPage} from "../accel/accel";
import {RecordPage} from "../record/record";
import {ListPage} from "../list/list";

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

  settings: any = AccelPage;
  record: any = RecordPage;
  list: any = ListPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
