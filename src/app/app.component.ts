/**
 * ====================================================
 *
 * Created by anele on 2019/06/20.
 *
 * ====================================================
 */

import { Component } from '@angular/core';
import { Platform, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { NetworkProvider } from '../providers/network.provider';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    rootPage:any = "WelcomePage";

    constructor(public platform: Platform, public networkProv: NetworkProvider,
              public statusBar: StatusBar, public splashScreen: SplashScreen,
              public events: Events, public alertCtrl : AlertController,
              public network: Network,) {

        this.platform.ready().then(() => {
            this.initializeApp();
        });

    }


    showConnection(data) {
        let alert = this.alertCtrl.create({
            title: "No Connection",
            subTitle: "Seems you are not Connected",
            buttons: [
                {
                    text: 'OK',
                    handler: (value) => {
                        //this.platform.exitApp();
                        //navigator['app'].exitApp();
                        this.platform.backButton.subscribe(()=>{
                            //console.log ('exit');
                            //navigator['app'].exitApp();
                        });

                    }
                }
            ],
        });
        alert.present();
    }


    initializeApp(): void {
        /* Check networkStatus */

        this.networkProv.initializeNetworkEvents();

        this.events.subscribe('network:offline', () => {
            console.log('network:offline ==> ' + this.networkProv.getNetworkType());
            //this.showConnection(this.networkProv.getNetworkType());
        });

        this.events.subscribe('network:online', () => {
            console.log('network:online ==> ' + this.networkProv.getNetworkType());
            //this.showConnection(this.networkProv.getNetworkType())
        });

        /* Ionic stuff */
        this.statusBar.styleDefault();
        this.splashScreen.hide();
    }


}
