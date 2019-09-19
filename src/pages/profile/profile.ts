/**
 * ====================================================
 *
 * Created by anele on 2019/05/02.
 *
 * ====================================================
 */

import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder} from "@angular/forms";
import { ProfileService } from './profile.service';
import { BrMaskerIonic } from  '../../directives/input-mask';

declare var google: any;


@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
    providers : [ BrMaskerIonic ]
})

export class ProfilePage  {

    loading	    : Loading;
    updateForm  : FormGroup;

    marker      : any;
    user        : any;
    profile     : any;
    map         : any;
    address     = '';

    @ViewChild('map') mapElement: ElementRef;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private service : ProfileService,
                private masker: BrMaskerIonic,
                public toastCtrl: ToastController,
                public   zone        : NgZone,
                private loadingCtrl: LoadingController, private alertCtrl: AlertController,
                private formBuilder: FormBuilder,) {

        this.getMyProfile();

        this.updateForm = this.formBuilder.group({
            email   : new FormControl(''),
            name    : new FormControl(''),
            surname : new FormControl(''),
            phone   : new FormControl(''),
            location    : new FormControl(''),
            user_id     : new FormControl(''),
        });
    }


    ionViewDidLoad() { /*console.log('ionViewDidLoad ProfilePage'); */}


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


    pullToRefresh(refresher) {
        //console.log('Begin async operation', refresher);
        this.getMyProfile();
        refresher.complete();

    }


    presentToast() {
        const toast = this.toastCtrl.create({
            message: 'Pull down the screen to see if the changes have taken place',
            duration: 4000,
            position: 'top'
        });

        toast.onDidDismiss(() => {
            //console.log('Dismissed toast');
        });

        toast.present();
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
                        this.presentToast();
                        return false;
                    }
                }
            ],
        });
        alert.present();
    }


    initializeMap(address) {

        let geocoder    = new google.maps.Geocoder();
        let infowindow  = new google.maps.InfoWindow({ content: address });
        let uberSyles = [
            {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [ {"color": "#d6e2e6" }]
            },

            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#cfd4d5"}]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#7492a8"}]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text.fill",
                "stylers": [{"lightness": 25}]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#dde2e3"}]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#cfd4d5"}]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#dde2e3"}]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#7492a8"}]
            },
            {
                "featureType": "landscape.natural.terrain",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#dde2e3"}]
            },
            {
                "featureType": "poi",
                "elementType": "labels.icon",
                "stylers": [{"saturation": -100}]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#588ca4"}]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#a9de83"}]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#bae6a1"}]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#c6e8b3"}]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#bae6a1"}]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {"saturation": -45},
                    {"lightness": 10},
                    {"visibility": "on"}]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#41626b"}]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#ffffff"}]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#c1d1d6"}]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#a6b5bb"}]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.icon",
                "stylers": [{"visibility": "on"}]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#9fb6bd"}]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#ffffff"}]
            },
            {
                "featureType": "transit",
                "elementType": "labels.icon",
                "stylers": [{"saturation": -70}]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#b4cbd4"}]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#588ca4"}]
            },
            {
                "featureType": "transit.station",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#008cb5"}]
            },
            {
                "featureType": "transit.station.airport",
                "elementType": "geometry.fill",
                "stylers": [{"saturation": -100}, {"lightness": -5}]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#a6cbe3"}]
            }
        ];

        geocoder.geocode( { 'address' : address }, ( results, status ) => {
            if( status == google.maps.GeocoderStatus.OK ) {

                // map.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});

                this.zone.run(() => {
                    let mapEle = this.mapElement.nativeElement;
                    this.map = new google.maps.Map(mapEle, {
                        zoom    : 15,
                        center  : results[0].geometry.location,

                        disableDefaultUI: true,
                        zoomControl     : false,
                        scaleControl    : false,
                        draggable       : false,
                        styles          : uberSyles
                    });

                    this.marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map : this.map,
                        title: 'Address on the Map'
                    });

                    this.marker.addListener('click', (event) => {
                        infowindow.open(this.map, this.marker);
                    });
                });

            } else {
                alert( 'Geocode was not successful for the following reason: ' + status );
            }

        });

    }


    getMyProfile() {
        this.showLoading();

        this.service.getProfile()
            .subscribe(

                data => {
                    let profile     = data.userProfile[0];
                    this.updateForm.patchValue({
                        user_id     : profile.user_id,
                        name        : profile.name,
                        email       : profile.email ,
                        surname     : profile.surname,
                        phone       : this.masker.writeCreateValue( profile.phone ),
                        location    : profile.location
                    });
                    if (!!google) {
                        this.initializeMap( profile.location );
                    }
                },

                error => {
                    this.showError(error);
                },

                () => {
                    this.disMissLoading();
                }
            );
    }


    updateInfo ( form ) {

        this.showLoading();
        this.service.updateProfile(form.value)
            .subscribe(
                data => {
                    this.showSuccess(data);
                },

                error => {
                    this.showError(error);
                },

                () => {
                    this.disMissLoading();
                }
            )
    }


    ngAfterViewInit() {
        let input = document.getElementById('autocomplete').getElementsByTagName('input')[0];
        let autocomplete = new google.maps.places.Autocomplete(input);

        autocomplete.addListener('place_changed', () => {
            let place = autocomplete.getPlace();
            this.updateForm.patchValue({
                location    : place.formatted_address
            });

        });
    }

}
