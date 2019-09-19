/**
 * ====================================================
 *
 * Created by anele on 2019/06/24.
 *
 * ====================================================
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';



@IonicPage()
@Component({
    selector: 'page-notifications',
    templateUrl: 'notifications.html',
})
export class NotificationsPage {

    loading	    : Loading;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private alertCtrl: AlertController, private loadingCtrl: LoadingController,) {}


    ionViewDidLoad() {
        //console.log('ionViewDidLoad NotificationsPage');
    }

}
