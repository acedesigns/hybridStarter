/**
 * ====================================================
 *
 * Created by anele on 2019/06/24.
 *
 * ====================================================
 */

import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { appConfig } from '../../shared/app.config';

@Injectable()
export class ProfileService {

    token = localStorage.getItem('token');
    ClientToken     = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

    constructor ( private http: Http) {  }


    private LogResponse (resp : Response) { /* console.log(resp); */ }


    private extractData (resp : Response) { return resp.json() }


    private catchError( error: Response | any ) {
        return Observable.throw( error.json().error || "Server Error")
    }


    public getProfile() {
        return this.http.get(appConfig.apiUrl + 'profile?token='+ this.token, { headers : appConfig.headers })
            .do( this.LogResponse )
            .map( this.extractData )
            .catch( this.catchError )
    }


    public updateProfile(data) {

        return this.http.post( appConfig.apiUrl + 'profile?token='+ this.token, data, { headers : appConfig.headers } )
            .map( this.extractData )
            .catch( this.catchError );

    }

    dataCapture ( sales ) {
        const body = JSON.stringify(sales);

        return this.http.post( appConfig.apiUrl + "sales/" + this.ClientToken, body, { headers : appConfig.headers} )
            .map( (response) =>  response )
            .catch( (error: Response) => Observable.throw(error) );

    }

}
