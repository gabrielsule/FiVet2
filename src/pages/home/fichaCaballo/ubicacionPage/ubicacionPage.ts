import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController} from 'ionic-angular';
import { Caballo } from '../../../../model/caballo';
import { Establecimiento } from '../../../../model/establecimiento';
import { PopOverUbicacion } from './subPages/popOver/popOverUbicacion';
import { AdminUbicacionPage } from './adminUbicacion/adminUbicacion';
import { CommonService } from '../../../../services/common.service';
import { CaballosService } from '../../../../services/caballos.service';
import { GoogleMap,
         GoogleMapsEvent,
         GoogleMapsLatLng,
         CameraPosition,
         GoogleMapsMarkerOptions,
         GoogleMapsMarker } from 'ionic-native';
import { Geolocation } from 'ionic-native';


declare var google;

@Component({
    selector: 'ubicacion-caballo',
    templateUrl: 'ubicacionPage.html',
    providers: [CommonService, CaballosService]
})
export class UbicacionPage {
	caballo: Caballo;
    map: any;
    model: Establecimiento;
    @ViewChild('map') mapElement: ElementRef;

    constructor(private navCtrl: NavController, private params: NavParams, public popoverCtrl: PopoverController,
                private _commonService: CommonService, private _caballosService: CaballosService) {
    	this.caballo = this.params.get("caballo");
        this.model = new Establecimiento();
        this.loadModel();
    }

    // Load map only after view is initialize
    ngAfterViewInit() {
        this.loadMap();
    }

    loadModel() {
        this._commonService.showLoading("Cargando..");

        this._caballosService.getEstablecimientoByIdCaballo(this.caballo.ID.toString())
            .subscribe(
                establecimiento => this.model = establecimiento,
                err => { 
                    if (err.statusText == "Not Found")
                        this._commonService.hideLoading();
                    else
                        console.log(err); 
                }, 
                () => this._commonService.hideLoading()
            );
    }

    loadMap() {
       Geolocation.getCurrentPosition().then((position) => {
 
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
 
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
        }, (err) => {
        console.log(err);
        });
    }

    addInfoWindow(marker, content){
 
        let infoWindow = new google.maps.InfoWindow({
            content: content
        });
        
        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });
        
    }

    addMarker(){
 
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });
        
        let content = "<h4>Information!</h4>";          
        
        this.addInfoWindow(marker, content);
        
    }

    openMenu(myEvent) {
        let popover = this.popoverCtrl.create(PopOverUbicacion, {establecimiento: this.model, caballo: this.caballo});
        popover.present({
          ev: myEvent
        });
    }

    getLatitud() {
        return this.model.Ubicacion.split(';')[0];
    }

    getLongitud() {
        return this.model.Ubicacion.split(';')[1];
    }

    newUbicacion() {
        this.navCtrl.push(AdminUbicacionPage, {
                  establecimiento: null,
                  caballo: this.caballo,
                  idUpdate: false
            }
        );
    }
}