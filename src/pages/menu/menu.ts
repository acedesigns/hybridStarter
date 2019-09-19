/**
 * ====================================================
 *
 * Created by anele on 2019/05/02.
 *
 * ====================================================
 */

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';


export interface PageInterface {
    title     : string;
    pageName  : string;
    tabComponent? : any;
    index?    : any;
    icon      : string;
}


@IonicPage()
@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class Menu {

    @ViewChild(Nav) nav : Nav;

    rootPage = 'Tabs';
    userName    : any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private appCtrl : App,
                public storage: Storage,) {
        this.userName =  JSON.parse(localStorage.getItem('user'));
    }



    pages : PageInterface [] = [
        { title : 'Feed', pageName: 'Tabs', tabComponent: 'FeedPage', index : 0, icon: 'home' },
        { title : 'Profile', pageName: 'Tabs', tabComponent: 'ProfilePage', index : 1, icon: 'person' },
        { title : 'Notices', pageName: 'Tabs', tabComponent: 'NotificationsPage', index : 2, icon: 'notifications' }
    ];

    ionViewDidLoad() {
        //console.log('ionViewDidLoad MenuPage');
    }


    openPage( page : PageInterface ) {
        let params = {};

        if (page.index) {
            params = { tabIndex: page.index }
        }

        if ( this.nav.getActiveChildNavs() && page.index != undefined ) {
            this.nav.getActiveChildNavs()[0].select(page.index);
        } else {
            this.nav.setRoot(page.pageName, params);
        }
    }


    logUserOut() {
        this.storage.clear();
        localStorage.clear();
        //console.log( this.storage.clear() );
        this.appCtrl.getRootNav().setRoot("WelcomePage");
        //this.navCtrl.setRoot('WelcomePage', {}, {animate:true});
    }


    isActive( page : PageInterface ) {
        let childNav = this.nav.getActiveChildNavs().length > 0 ? this.nav.getActiveChildNavs()[0] : false;

        if ( childNav ) {
            if ( childNav.getSelected() && childNav.getSelected().root === page.tabComponent ) {
                return 'danger';
            }
            return;
        }

        if ( this.nav.getActive() && this.nav.getActive().name === page.pageName ) {
            return 'danger';
        }
    }

}
