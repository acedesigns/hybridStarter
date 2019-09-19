/**
 * =============================================
 *
 * Created by anele on 2019/06/19.
 *
 * =============================================
 */

import { Injectable } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export enum ConnectionStatusEnum {
    Online,
    Offline
}


@Injectable()
export class NetworkProvider {

    previousStatus;
    public status: ConnectionStatusEnum;
    private _status: BehaviorSubject<ConnectionStatusEnum> = new BehaviorSubject(null);

    constructor(public alertCtrl: AlertController,
                public network: Network,
                public eventCtrl: Events) {

        //console.log('Hello NetworkProvider Provider');

        this.previousStatus = ConnectionStatusEnum.Online;

    }


    public getNetworkType(): string {
        return this.network.type;
    }

    public initializeNetworkEvents(): void {

        this.network.onDisconnect().subscribe(() => {
            if (this.previousStatus === ConnectionStatusEnum.Online) {
                this.eventCtrl.publish('network:offline');
            }
            this.previousStatus = ConnectionStatusEnum.Offline;
        });

        this.network.onConnect().subscribe(() => {
            setTimeout(() => {
                if (this.previousStatus === ConnectionStatusEnum.Offline) {
                    this.eventCtrl.publish('network:online');
                }
                this.previousStatus = ConnectionStatusEnum.Online;
            }, 3000);
        });


    }


    public getNetworkStatus(): Observable<ConnectionStatusEnum> {
        return this._status.asObservable();
    }

    /*private setStatus(status: ConnectionStatusEnum) {
        this.status = status;
        this._status.next(this.status);
    }*/

}
