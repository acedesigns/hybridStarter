/**
 * ====================================================
 *
 * Created by anele on 2019/06/22.
 *
 * ====================================================
 */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { CheckoutPage } from './checkout';
import { CheckoutService } from './checkout.service';

@NgModule({

    declarations: [ CheckoutPage,],

    imports: [ IonicPageModule.forChild(CheckoutPage), HttpModule],

    exports : [ CheckoutPage ],

    providers: [ HttpModule, CheckoutService ],

    schemas: [  ]
})
export class CheckoutPageModule {}
