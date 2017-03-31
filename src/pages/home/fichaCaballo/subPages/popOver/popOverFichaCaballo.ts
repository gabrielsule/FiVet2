import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { HomePage } from '../../../home';
import { CaballosService } from '../../../../../services/caballos.service';
import { CommonService} from '../../../../../services/common.service';

@Component({
    selector: 'popOverFichaCaballo',
    templateUrl: 'popOverFichaCaballo.html',
    providers: [CaballosService, CommonService]
})
export class PopOverFichaCaballo {
	idCaballo: number;

	constructor(private params: NavParams, private navCtrl: NavController, 
    private _caballosService: CaballosService, private _commonService: CommonService) {
		this.idCaballo = params.get("idCaballo");
	}

  deleteCaballo() {
    this._commonService.showLoading("Eliminando..");
    this._caballosService.deleteCaballo(this.idCaballo)
            .subscribe(data => {
                this._commonService.hideLoading();
                this.navCtrl.push(HomePage);
            }, error => {
                console.log(error);
            });
  }
}