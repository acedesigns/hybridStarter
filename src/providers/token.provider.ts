/**
 * ====================================================
 *
 * Created by anele on 2019/06/12.
 *
 * ====================================================
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { appConfig } from '../shared/app.config';


@Injectable()
export class TokenProvider {

	constructor( private http: Http, public storage: Storage,) {}

	getToken(): Promise<any> {
		return new Promise<any> ( (resolve) => {
			this.storage.get('token').then( (token) => {

				let response = this.http.get( appConfig.apiUrl + '?token='+ token , { headers : appConfig.headers });
				
				response.subscribe(
					(data) => {
						resolve( (data.json()) );
					},
					error => {
						console.log( "ERROR" );
						console.log( error.json() );
					},
					() => {}
				);
			});
		});
	};
}