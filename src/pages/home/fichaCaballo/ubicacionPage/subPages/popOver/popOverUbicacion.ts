import { Component } from '@angular/core';
import { ViewController, NavParams, NavController } from 'ionic-angular';
import { CaballosService } from '../../../../../../services/caballos.service';
import { CommonService} from '../../../../../../services/common.service';
import { FichaCaballo } from '../../../fichaCaballo';
import { AdminUbicacionPage } from '../../adminUbicacion/adminUbicacion';

@Component({
    selector: 'popOverUbicacion',
    templateUrl: 'popOverUbicacion.html',
    providers: [CaballosService, CommonService]
})
export class PopOverUbicacion {
	establecimiento: any;
	caballo: any;

	constructor(public viewCtrl: ViewController, private params: NavParams, private navCtrl: NavController,
		private _caballosService: CaballosService, private _commonService: CommonService) {
		this.establecimiento = params.get("establecimiento");
		this.caballo = params.get("caballo");
	}

	editUbicacion() {
    	this.navCtrl.push(AdminUbicacionPage, {
    	      	establecimiento: this.establecimiento,
    	      	caballo: this.caballo,
    	      	isUpdate: true
    		}
    	);
  	}

  	deleteUbicacion() {
  		this._commonService.showLoading("Eliminando..");
	    this._caballosService.deleteEstablecimiento(this.establecimiento.ID)
	            .subscribe(data => {
	                this._commonService.hideLoading();
	                this.navCtrl.push(FichaCaballo, {unCaballo: this.caballo});
	            }, error => {
	            	this._commonService.showLoading("Eliminando..");
	                console.log(error);
	            });
  	}
}