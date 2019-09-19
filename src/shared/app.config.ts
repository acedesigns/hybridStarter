/**
 * =============================================
 *
 * Created by anele on 2019/06/21.
 *
 * =============================================
 */

import { Headers } from '@angular/http';


export const appConfig = {
    apiUrl      : 'http://172.20.10.5:8080/api/',
    headers     : new Headers({
        'Content-Type' : 'application/json',
        'Accept'			: 'application/json',
        'X-Requested-With' 	: 'XMLHttpRequest',
        'Access-Control-Allow-Origin'	: '*',
        'Access-Control-Allow-Methods'	: 'POST, GET, OPTIONS, PUT, DELETE',
        'Access-Control-Allow-Headers'	: '*',
    }),
    userToken   : localStorage.getItem('toke') ? '?token=' + localStorage.getItem('token') : '',
    appName     : "Emarket Community"
};
