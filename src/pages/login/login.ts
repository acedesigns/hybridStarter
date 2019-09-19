/**
 * ====================================================
 *
 * Created by anele on 2019/06/21.
 *
 * ====================================================
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Storage } from '@ionic/storage';

import { LoginService } from './login.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    loading	  : Loading;
    loginForm   : FormGroup;
    userData = { "email": "mycoolemail@gmail.com", "password": "password" };

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public alertCtrl : AlertController, public toastCtrl: ToastController,
                private service : LoginService, private formBuilder: FormBuilder,
                public storage: Storage,
                private loadingCtrl: LoadingController,) {

        this.loginForm = this.formBuilder.group({
            email		   : new FormControl('mycoolemail@gmail.com', [ Validators.required ] ),
            password   : new FormControl('password', [ Validators.required ] )
        });
    }


    ionViewDidLoad() {
      //console.log('ionViewDidLoad LoginPage');
    }

    doRegistration() {
      this.navCtrl.push('RegisterPage', {}, {animate:true});
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });

        this.loading.present();
    }


    disMissLoading() { this.loading.dismiss().catch(()=>{}); }


    showSuccess(data) {
        let alert = this.alertCtrl.create({
            title: "Good Job !",
            subTitle: "Successfully Authenticated",
            buttons: [
                {
                    text: 'OK',
                    handler: (value) => {
                        alert.dismiss().then(() => {}).catch(()=>{});
                        this.navCtrl.setRoot("Menu", {}, {animate:true});
                        return false;
                    }
                }
            ],
        });
        alert.present();
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


    emailSuccess() {
        let toast = this.toastCtrl.create({
            message: 'Email was sent successfully',
            duration: 3000,
            position: 'top',
            cssClass: 'dark-trans',
            closeButtonText: 'OK',
            showCloseButton: true
        });
        toast.present();
    }


    forgotPass() {
        let forgot = this.alertCtrl.create({
            title: 'Forgot Password?',
            message: "Enter you email address to send a reset link password.",
            inputs: [{
                name: 'email',
                placeholder: 'Email',
                type: 'email',
                value: 'acedesigns123@gmail.com'
            }],
            buttons: [{
                text: 'Cancel',
                handler: data => {
                    console.log('Cancel clicked');
                }},
                {
                    text: 'Send',
                    handler: data => {
                        console.log('Send clicked');
                        this.showLoading();

                        this.service.forgotMyPass(data)
                            .subscribe(
                                data => {
                                    //console.log( data.json() );
                                    this.emailSuccess()
                                },
                                error => {
                                    let alert = this.alertCtrl.create({
                                        title: "Reset Password Failed",
                                        subTitle: error.json().error,
                                        buttons: ['OK']
                                    });

                                    alert.present();

                                    setTimeout(() => {
                                        this.disMissLoading()
                                    }, 2000)
                                },
                                () => {
                                    this.disMissLoading()
                                }
                            );
                    }
                }]
        });

        forgot.present();
    }


    goHome() {
        this.navCtrl.push('WelcomePage', {}, {animate:true});
    }


    navToTabsPage(form){

        this.showLoading();

        this.service.doLogin(form.value)
            .subscribe(
                data	=> {
                    localStorage.setItem( 'token',  data.token);
                    localStorage.setItem( 'user', JSON.stringify( data.user ) );
                    this.showSuccess(data);
                },

                error 	=> {
                    this.showError( error );
                },

                () => {
                    //alert("DONE !!");
                    this.disMissLoading();

                }
            );
    }

}
