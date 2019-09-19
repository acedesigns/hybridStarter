/**
 * ====================================================
 *
 * Created by anele on 2019/06/22.
 *
 * ====================================================
 */

import { Component } from '@angular/core';
import { DatePipe } from "@angular/common";
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { CheckoutService } from './checkout.service';
import { CartProvider } from '../../providers/cart.provider';

@IonicPage()
@Component({
    selector: 'page-checkout',
    templateUrl: 'checkout.html',
})
export class CheckoutPage {

    cartItems   : any[] = [];
    productAmt  : number = 0;
    totalAmount : number = 0;
    shippingFee : number = 300;
    userName    : any;
    userData    : any;
    loading	    : Loading;

    ourDate = new Date();
    pipe    = new DatePipe('en-UK');





    constructor(public navCtrl: NavController, public navParams: NavParams,
                private loadingCtrl: LoadingController, private alertCtrl: AlertController,
                private service: CheckoutService,
                private cartProvider: CartProvider,) {
        this.loadCartItems();

        this.userName =  JSON.parse(localStorage.getItem('user'));

        this.userData = {
            'urgency'   : this.pipe.transform(this.ourDate, 'yyyy/MM/dd'),
            'user_id'   : this.userName.user_id,
            'firstname' : this.userName.name,
            'lastname'  : this.userName.surname,
            'email'     : this.userName.email,
            'notes'     : 'do not dummage',
            'address'   : '123 main road',
            'orderReff' : 'appEMC-'+this.makeRandChar(8)+'-'+ new Date().getFullYear().toString().toUpperCase(),
        };


    }

    ionViewDidLoad() {
        //console.log('ionViewDidLoad CheckoutPage');
    }


    makeRandChar(length) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }


    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });

        this.loading.present();
    }


    disMissLoading() { this.loading.dismiss().catch(()=>{}); }


    showError(error) {
        this.loading.dismiss();

        let alert = this.alertCtrl.create({
            title: "Error",
            subTitle: error,
            buttons: ['OK']
        });

        alert.present();
    }


    showSuccess(data) {
        let alert = this.alertCtrl.create({
            title: "Good Job",
            subTitle: data.message,
            buttons: [
                {
                    text: 'OK',
                    handler: (value) => {
                        alert.dismiss().then(() => {}).catch(()=>{});
                        this.cartProvider.removeAllCartItems();
                        this.navCtrl.push('FeedPage', {}, {animate:true});
                        return false;
                    }
                }
            ],
        });
        alert.present();
    }


    placeOrder(userData, productAmt) {

        this.showLoading();
        //console.log(productAmt);
        let order = { oder : this.cartItems, user : userData, amount : productAmt };

        this.service.doShopping(order).subscribe(
            data => {
                console.log( data.json() );
                this.showSuccess(data.json())
            },

            error => {
                //console.log(error.json().error);
                this.showError( error.json().error );

                this.disMissLoading();

            },

            () => {
                this.disMissLoading();
            }
        )
    }


    loadCartItems() {

        this.cartProvider
            .getCartItems()
            .then(val => {
                this.cartItems = val;

                if (this.cartItems.length > 0) {
                    this.cartItems.forEach((value, index) => {
                        this.productAmt += parseInt(value.amount);
                    });

                    this.totalAmount = this.productAmt + this.shippingFee;
                }

            })
            .catch(err => {});
    }

}
