/**
 * ====================================================
 *
 * Created by anele on 2019/06/22.
 *
 * ====================================================
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/catch';

import { appConfig } from '../../shared/app.config';

@Injectable()
export class SingleproductService {

    token = localStorage.getItem('token');


    constructor ( private http: Http, private storage: Storage ) { }

    private extractData (res : Response) {
        return res.json()
    }


    private catchError( error: Response | any ) {
        return Observable.throw( error.json().error   || "Server Error")
    }


    getProdById(prodID : number) {
        return this.http.get( appConfig.apiUrl + 'market/'+ prodID +'/?token='+ this.token, { headers : appConfig.headers } )
    }


    getData(data): Promise<any> {
        return new Promise<any> ( (resolve) => {
            this.storage.get('token').then( (token) => {
                let response = this.http.get( appConfig.apiUrl + 'market/'+ data +'?token='+ this.token , { headers : appConfig.headers });

                response.subscribe(
                    (data) => {
                        resolve( this.extractData(data) );
					},
					error => {
						this.catchError(error)
					},
					() => {}
				);
			});
		});
	};


}
