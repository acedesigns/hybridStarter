/**
 * ====================================================
 *
 * Created by anele on 2019/05/02.
 *
 * ====================================================
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { appConfig } from '../../shared/app.config';

@Injectable()
export class FeedPageService {

    token = localStorage.getItem('token');

    constructor( private http: Http) {
        //console.log(" FeedPageService ");
    }

    private LogResponse (resp : Response) {
        //console.log(resp);
    }

    private extractData (resp : Response) {
        //alert( resp.json().products );
        return resp.json()
    }

    private catchError( error: Response | any ) {
        //console.log(error);
        return Observable.throw( error.json().error   || "Server Error")
    }

    getAllData() {
        return this.http.get(appConfig.apiUrl + 'market?token='+ this.token, { headers : appConfig.headers })
            .do( this.LogResponse )
            .map( this.extractData )
            .catch( this.catchError )
    }

    getFeatData() {
        return this.http.get("../../assets/data/featured.json").map( this.extractData );
        //return this.http.get(appConfig.apiUrl + 'market?token='+ this.token, { headers : appConfig.headers });
    }
}
