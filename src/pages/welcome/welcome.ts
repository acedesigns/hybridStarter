/**
 * ====================================================
 *
 * Created by anele on 2019/06/21.
 *
 * ====================================================
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {}


    ionViewDidLoad() {
        //console.log('ionViewDidLoad WelcomePage');
    }

    doRegistration() {
        this.navCtrl.push('RegisterPage', {}, {animate:true});
    }


    doLogIn() {
        this.navCtrl.push('LoginPage', {}, {animate:true});
    }

}
