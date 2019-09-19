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
import { IonicStorageModule } from '@ionic/storage';

import { SingleproductPage } from './singleproduct';
import { SingleproductService } from './singleproduct.service';
import { CartProvider } from '../../providers/cart.provider';

@NgModule({
  declarations: [ SingleproductPage ],

  imports: [ IonicPageModule.forChild(SingleproductPage), HttpModule, IonicStorageModule.forRoot() ],

  providers   : [ HttpModule, SingleproductService, CartProvider ],

  exports     : [  ],

  schemas     : [ ],
})
export class SingleproductPageModule {}
