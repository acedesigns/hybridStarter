/**
 * ====================================================
 *
 * Created by anele on 2019/06/21.
 *
 * ====================================================
 */

 import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Rx';
import { appConfig } from '../../shared/app.config';


@Injectable()
export class LoginService {

    constructor ( private http: Http) {  }

    private catchError( error: Response | any ) {
        //console.log(error);
        return Observable.throw( error.json().error   || "Server Error")
    }

    public doLogin(credentials) {
        return this.http.post( appConfig.apiUrl + 'login', credentials, { headers : appConfig.headers } )
            .map( (res) => {
                console.log(res);
                //res.json()
                const token     = res.json().token;
                const base64Url = token.split('.')[1];
                const base64    = base64Url.replace('-', '+').replace('_', '/');

                return { token : token, decoded : JSON.parse(window.atob(base64)), user : res.json().user[0] };
            } )
            .do(
                tokenData   => {
                    localStorage.setItem('token', tokenData.token)
                }
            )
            .catch( this.catchError );
    }


    forgotMyPass(email) {
        return this.http.post( appConfig.apiUrl + 'passwordForgot', email, { headers : appConfig.headers } )

    }
}
