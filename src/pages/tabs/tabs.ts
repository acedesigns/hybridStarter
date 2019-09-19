/**
 * ====================================================
 *
 * Created by anele on 2019/05/02.
 *
 * ====================================================
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
    name: 'Tabs'
})

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class Tabs {
    myIndex : number;

    tab1Root = 'FeedPage';
    tab2Root = 'ProfilePage';
    tab3Root = 'NotificationsPage';
    tab4Root = 'Cart';
    //tab4Root = 'Tab4';


    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.myIndex = navParams.data.tabIndex || 0;
    }


}
