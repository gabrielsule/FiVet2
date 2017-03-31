import { Component } from '@angular/core';
import { ViewController, NavParams, NavController } from 'ionic-angular';
import { AdminCaballoPage } from '../../../../adminCaballo/adminCaballo';

@Component({
    selector: 'popOverDatos',
    templateUrl: 'popOverDatos.html'
})
export class PopOverDatos {
	caballo: any;

	constructor(public viewCtrl: ViewController, private params: NavParams, private navCtrl: NavController) {
		this.caballo = params.get("caballo");
	}

	close() {
    	this.viewCtrl.dismiss();
  	}

  	goToEdit() {
  		this.navCtrl.push(AdminCaballoPage, {
    	      	caballo: this.caballo
    		}
    	);
  	}
}