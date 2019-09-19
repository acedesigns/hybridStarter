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

import { Cart } from './cart';
import { CartService } from './cart.service';

@NgModule({

    declarations: [ Cart,],

    imports: [ IonicPageModule.forChild(Cart), HttpModule ],

    exports : [ Cart ],

    providers: [ HttpModule, CartService ],

    schemas: [  ]
})
export class CartPageModule {}
