/**
 * ====================================================
 *
 * Created by anele on 2019/05/02.
 *
 * ====================================================
 */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Menu } from './menu';

@NgModule({

  declarations: [ Menu ],

  imports: [ IonicPageModule.forChild(Menu),],

})
export class MenuModule {}
