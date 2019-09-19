/**
 * ====================================================
 *
 * Created by anele on 2019/06/21.
 *
 * ====================================================
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RegisterService } from './register.service';


 @IonicPage()
 @Component({
     selector: 'page-register',
     templateUrl: 'register.html',
 })
 export class RegisterPage {

     registerForm : FormGroup;
     loading	    : Loading;

     userData = { "name": "Mike", "surname": "Jones", "email": "mycoolemail@gmail.com", "password": "password", "regType": 3 };


     constructor(public navCtrl: NavController,public navParams: NavParams,
       private regService: RegisterService, private loadingCtrl: LoadingController,
       private formBuilder: FormBuilder, private alertCtrl: AlertController) {

         this.registerForm = this.formBuilder.group({
           name     : new FormControl('Mike', [Validators.required, Validators.pattern('[a-zA-Z ]*'),]),
           surname  : new FormControl('Jones', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z ]*'), ]),
           email    : new FormControl('mycoolemail@gmail.com', [Validators.required, Validators.minLength(6), Validators.email ]),
           password : new FormControl('password', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
           regType : new FormControl(3)
        });

     }


     ionViewDidLoad() {
         //console.log('ionViewDidLoad RegisterPage');
     }

     get f() { return this.registerForm.controls; }


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
						            this.navCtrl.setRoot("WelcomePage", {}, {animate:true});
                        return false;
                    }
                }
            ],
        });
        alert.present();
    }


     showPopup(title, text) {
         let alert = this.alertCtrl.create({
             title: title,
             subTitle: text,
             buttons: [
                 {
                     text: 'OK',
                     handler: data => {

                     }
                 }
             ]
         });
         alert.present();
     }


     onRegister(form) {
       this.showLoading();

       this.regService.doRegister(form.value)
        .subscribe(
          data => {
            this.showSuccess(data.json());
          },

          error => {
            this.showError(error);
          },

          () => {
            this.disMissLoading();
          }
        )
     }

 }
