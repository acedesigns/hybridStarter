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
export class CartService {

    constructor ( private http: Http) {  }


    public doShopping(credentials) {
        return this.http.post( appConfig.apiUrl + 'register', credentials, { headers : appConfig.headers } );
    }


}

