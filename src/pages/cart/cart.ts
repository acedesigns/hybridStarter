/**
 * ====================================================
 *
 * Created by anele on 2019/06/22.
 *
 * ====================================================
 */

 // https://github.com/samarthagarwal/wooionic3

import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, Loading } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CartProvider } from '../../providers/cart.provider';

@IonicPage()
@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html',
})
export class Cart implements OnInit {

    cartItems   : any[] = [];
    totalAmount: number = 0;
    isCartItemLoaded: boolean = false;
    isEmptyCart: boolean = true;
    userName    : any;
    loading : Loading;


    constructor(public navCtrl: NavController, public navParams: NavParams,
                private cartService: CartProvider, private loadingCtrl: LoadingController,
                public storage: Storage, public viewCtrl: ViewController,) {

        this.userName =  JSON.parse(localStorage.getItem('user'));
        this.loadCartItems();

    }


    ngOnInit () { this.loadCartItems(); }


    ionViewDidLoad() {
        this.loadCartItems();
    }


    ionViewWillEnter() { this.loadCartItems(); }


    pullToRefresh(refresher) {
        //console.log('Begin async operation', refresher);
        this.loadCartItems();
        refresher.complete();

    }


    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }


    disMissLoading() { this.loading.dismiss().catch(()=>{}); }


    loadCartItems() {
        //this.showLoading();

        this.cartService
            .getCartItems()
            .then(val => {

                this.cartItems = val;

                if (this.cartItems.length > 0) {
                    this.cartItems.forEach((value, index) => {
                        this.totalAmount += parseInt(value.amount);
                    });
                    this.isEmptyCart = false;
                }

                this.isCartItemLoaded = true;
            })
            .catch(error => {
                //console.log(error)
            });
    }


    removeItem(item) {
        this.cartService.removeFromCart(item).then(() => {
            //this.loadCartItems();
            //this.navCtrl.push('FeedPage');
            this.navCtrl.setRoot("Menu", {}, {animate:true});
            //this.app.getRootNav().setRoot('Menu');
        });
    }


    goToShop(){ this.navCtrl.push('FeedPage'); }


    closeModal(){
        this.viewCtrl.dismiss();
    }


    checkout(){
       if(localStorage.getItem('user') != null){
           //this.navCtrl.push('CheckoutPage');
           this.navCtrl.push('CheckoutPage', {}, {animate:true});
       } else {
           this.navCtrl.push('Login', {next: 'Checkout'})
       }

    }


}
