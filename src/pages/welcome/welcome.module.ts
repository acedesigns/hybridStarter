/**
 * ====================================================
 *
 * Created by anele on 2019/06/21.
 *
 * ====================================================
 */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatButtonModule } from '@angular/material';

import { WelcomePage } from './welcome';

@NgModule({
  declarations: [
    WelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage), MatButtonModule,
  ],
})
export class WelcomePageModule {}
