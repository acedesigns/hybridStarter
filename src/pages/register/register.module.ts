/**
 * ====================================================
 *
 * Created by anele on 2019/06/21.
 *
 * ====================================================
 */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';


import { RegisterPage } from './register';
import { RegisterService } from './register.service';

@NgModule({

  declarations: [RegisterPage ],

  imports: [ IonicPageModule.forChild(RegisterPage), HttpModule ],

  providers   : [ HttpModule, RegisterService ],

  exports     : [  ],

  schemas     : [ ],
})
export class RegisterPageModule {}
