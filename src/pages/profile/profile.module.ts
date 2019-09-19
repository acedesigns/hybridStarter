/**
 * ====================================================
 *
 * Created by anele on 2019/06/24.
 *
 * ====================================================
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { ProfilePage } from './profile';
import { ProfileService } from './profile.service';
import { BrMaskerIonic } from '../../directives/input-mask';


@NgModule({

    declarations: [ ProfilePage, BrMaskerIonic, ],

    imports: [ IonicPageModule.forChild(ProfilePage), HttpModule,  ],

    providers   : [ HttpModule, ProfileService, ],

    exports     : [  ],

    schemas     : [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class ProfilePageModule {}
