/**
 * ====================================================
 *
 * Created by anele on 2019/06/24.
 *
 * ====================================================
 */

import { Injectable } from '@angular/core';
import { Http, } from '@angular/http';

import { appConfig } from '../../shared/app.config';

@Injectable()
export class NotificationsService {

    token = localStorage.getItem('token');

    constructor ( private http: Http) {  }

}