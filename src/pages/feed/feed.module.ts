/**
 * ====================================================
 *
 * Created by anele on 2019/05/02.
 *
 * ====================================================
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { FeedPage } from './feed';
import { FeedPageService } from './feed.service';
import { HideFabDirective } from '../../directives/hide-fab';

@NgModule({

  declarations: [ FeedPage, HideFabDirective],

  imports: [IonicPageModule.forChild(FeedPage), HttpModule],

  exports : [ FeedPage ],

  providers: [ HttpModule, FeedPageService ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FeedPageModule {}
