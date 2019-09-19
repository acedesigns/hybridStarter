/**
 * ====================================================
 *
 * Created by anele on 2019/05/02.
 *
 * ====================================================
 */


import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, Content, NavController, NavParams, AlertController, LoadingController, Loading, ModalController } from 'ionic-angular';

import { FeedPageService } from './feed.service';
import { Cart } from '../cart/cart';


@IonicPage()
@Component({
    selector: 'page-feed',
    templateUrl: 'feed.html',
})
export class FeedPage implements OnInit {

    loading	    : Loading;
    categoryItems : any;
    fetcreatives : any;

    @ViewChild('pageTop') pageTop: Content;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public modalCtrl: ModalController,
                private loadingCtrl: LoadingController, private alertCtrl: AlertController,
                private service: FeedPageService,) {

    }


    capitalize (string) {
        if (typeof string !== 'string') { return ''; }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    ngOnInit() {
        this.loadMarketProducts();
        this.getFeatured();
    }


    ionViewDidLoad() {
        //console.log('ionViewDidLoad FeedPage');
    }


    pageScroller(){
        this.pageTop.scrollToTop(3000);
    }


    disMissLoading() { this.loading.dismiss().catch(()=>{}); }


    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });

        this.loading.present();
    }


    showError(error) {
        let message = "";
        this.loading.dismiss();
        if (error === "token_expired") {
            message = "Please Log Out and Back In Again."
        }

        let alert = this.alertCtrl.create({
            title: "Error",
            subTitle: error,
            message : message,
            buttons: ['OK']
        });

        alert.present();
    }


    showSuccess(data) {
       let alert = this.alertCtrl.create({
           title: "Good Job",
           subTitle: data.message,
           buttons: [{
               text: 'OK',
               handler: (value) => {
                   alert.dismiss().then(() => {}).catch(()=>{});
                   return false;
               }
           }],
       });
       alert.present();
   }


    onItemClick(itemID : number) { this.navCtrl.push('SingleproductPage', {itemID : itemID}, { animate:true } );}


    openCart(){
        //this.modalCtrl.create(Cart).present();
        this.navCtrl.push('Cart', {}, { animate:true } );
    }


    getFeatured() {
      this.service.getFeatData()
        .subscribe(
          data => {
            this.fetcreatives = data.result;
          },
          error 	=> {
              this.showError(error);
          },

          () => {
              this.disMissLoading();
          }
        );
    }


    loadMarketProducts() {

        this.showLoading();

        this.service.getAllData()
            .subscribe(
                data => {
                    this.categoryItems 	= data.products;
                },

                error 	=> {
                    this.showError(error);
                },

                () => {
                    this.disMissLoading();
                }
            );
    }

}
