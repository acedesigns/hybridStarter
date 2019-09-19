/**
 * ====================================================
 *
 * Created by anele on 2019/06/22.
 *
 * ====================================================
 */


import { Component, OnInit, } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController , LoadingController, ModalController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SingleproductService } from './singleproduct.service';
import { CartProvider } from '../../providers/cart.provider';



@IonicPage()
@Component({
    selector: 'page-singleproduct',
    templateUrl: 'singleproduct.html',
})
export class SingleproductPage implements OnInit {

    selectedProd    : any;
    productCount    : number = 1;
    loading	        : Loading;
    myCart          = [];
    newTotal        : any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController, public storage: Storage,
              public toastCtrl: ToastController, private cartService: CartProvider,

              private loadingCtrl: LoadingController, public alertCtrl : AlertController,
              public service : SingleproductService,
              ) {
        this.getSpecificProduct(navParams.get('itemID'));
    }

    ionViewWillEnter() {
        console.log("ionViewWillEnter");
    }


    ionViewDidLoad() {

        console.log("ionViewDidLoad");
        //this.selectedProd = this.navParams.get('itemID');
        this.cartService.getCartItems().then((val) => {
            //this.cartItems = val;
            //console.table(val);
        })
    }


    ngOnInit() {
        console.log("ngOnInit");
        this.selectedProd = this.navParams.get('itemID');
        let USERID = JSON.parse(localStorage.getItem('user'));
        //console.log( USERID.USERID );
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
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
            title: "Error",
            subTitle: error,
            buttons: ['OK']
        });
        alert.present();
    }



    getSpecificProduct( product ) {
        this.showLoading();
        //this.service.getProdById(product)


        this.service.getData(product)
            .then(
                data => {
                    //console.log(data);
                    this.selectedProd 	= data.product;
                },
                error 	=> {
                    console.log(error);
                }
            );
    }



    presentToast(name) {
        let toast = this.toastCtrl.create({
            message: `${name} has been added to cart`,
            duration: 4000,
            showCloseButton: true,
            position: 'top'
        });

        toast.onDidDismiss(() => {
            this.navCtrl.push('Menu');
        });
        toast.present();
    }


    addToCart(product) {

        let productPrice = this.productCount * parseInt(product.product_cost);
        let USERID = JSON.parse(localStorage.getItem('user'));
        //console.log( USERID.USERID );

        let cartProduct = {
            product_id  : product.id,
            user_id     : USERID.USERID,
            title       : product.product_name,
            quantity    : this.productCount,
            image       : product.product_image,
            amount      : productPrice,
            singlePrice : product.product_cost
        };

        this.cartService.addToCart(cartProduct).then((val) => {
            this.presentToast(cartProduct.title);
        });

    }


    decreaseProductCount() {
        if (this.productCount > 1) {
            this.productCount--;
        }
    }


    incrementProductCount() {
        this.productCount++;
    }


    openCart(){
        //this.modalCtrl.create(Cart).present();
        this.navCtrl.push('Cart', {}, { animate:true } );
    }


    onChangeQuantity(event, selectedProd) {
        let total = (event.target.value*selectedProd.product_cost);
        this.newTotal = total;
    }

}
