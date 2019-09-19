/**
 * ====================================================
 *
 * Created by anele on 2019/06/10.
 *
 * ====================================================
 */

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class MapProvider {
	app: any;
	google_api_key: any;

	contentHeader: Headers = new Headers({'Content-Type': 'application/json'});

	constructor(public http: Http) {
    	this.google_api_key = 'API_KEY';
  	}


    getAddress(params) {
        let url = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + this.google_api_key + '&latlng=' + params.lat + ',' + params.long;
        return this.GET(url);
    }

    getStreetAddress(params) {
        let url = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + this.google_api_key + '&latlng=' + params.lat + ',' + params.long + '&result_type=street_address';
        return this.GET(url);
    }

  	GET(url) {
    	return this.http.get(url).map(res => res.json());
  	}

  	POST(url, params) {
		// let options = new RequestOptions({
		//   headers: this.contentHeader
		// });
		// return this.http.post(url, params, options).map(res => res.json());
	}

	DEL(url) {
		// let options = new RequestOptions({
		//   headers: this.contentHeader
		// });
		// return this.http.delete(url, options).map(res => res.json());
	}


}
