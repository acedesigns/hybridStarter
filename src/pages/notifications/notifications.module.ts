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

import { NotificationsPage } from './notifications';
import { NotificationsService } from './notifications.service';


@NgModule({
    declarations: [ NotificationsPage, ],

    imports: [ IonicPageModule.forChild(NotificationsPage), ],

    providers   : [ HttpModule, NotificationsService, ],

    exports     : [  ],

    schemas     : [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class NotificationsPageModule {}
