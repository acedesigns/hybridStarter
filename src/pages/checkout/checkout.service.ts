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
export class CheckoutService {

    token = localStorage.getItem('token');

    constructor ( private http: Http) {  }



    public doShopping(credentials) {
        console.log(credentials);
        return this.http.post( appConfig.apiUrl + 'mobileOrder?token='+ this.token, credentials, { headers : appConfig.headers } );
    }


}

