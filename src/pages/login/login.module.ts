/**
 * ====================================================
 *
 * Created by anele on 2019/06/21.
 *
 * ====================================================
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { LoginPage } from './login';
import { LoginService } from './login.service';

@NgModule({
  declarations: [ LoginPage],

  imports: [ IonicPageModule.forChild(LoginPage), HttpModule, IonicStorageModule.forRoot() ],

  providers: [ HttpModule, LoginService ],

  exports: [  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LoginPageModule {}
