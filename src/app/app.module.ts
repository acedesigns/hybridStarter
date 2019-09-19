/**
 * ====================================================
 *
 * Created by anele on 2019/06/20.
 *
 * ====================================================
 */

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
import { CartProvider } from '../providers/cart.provider';
import { NetworkProvider } from '../providers/network.provider';

@NgModule({

    declarations: [ MyApp, ],

    imports: [ BrowserModule, BrowserAnimationsModule, IonicModule.forRoot(MyApp), IonicStorageModule.forRoot() ],

    bootstrap: [IonicApp],

    entryComponents: [ MyApp, ],

    providers: [ StatusBar, SplashScreen, Network,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        CartProvider, NetworkProvider
    ]

})
export class AppModule {}
