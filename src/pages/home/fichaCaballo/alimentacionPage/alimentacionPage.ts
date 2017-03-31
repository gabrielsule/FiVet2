import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Caballo } from '../../../../model/caballo';
import { CommonService } from '../../../../services/common.service';
import { CaballosService } from '../../../../services/caballos.service';
import { FichaCaballo } from '../fichaCaballo';

@Component({
    selector: 'alimentacion-caballo',
    templateUrl: 'alimentacionPage.html',
    providers: [CommonService, CaballosService]
})
export class AlimentacionPage {
    caballo: Caballo;
    txtAlimentacion: string;

    constructor(private navCtrl: NavController, private params: NavParams, public popoverCtrl: PopoverController,
                private _commonService: CommonService, private _caballosService: CaballosService) {}

    ngOnInit() {
        this.caballo = this.params.get("caballo");
        this.txtAlimentacion = this.caballo.Alimentacion;
    }

    guardar() {
        this._commonService.showLoading("Guardando..");
        this._caballosService.saveAlimentacion(this.caballo.ID.toString(), this.txtAlimentacion)
            .subscribe(data => {
                this._commonService.hideLoading();
                this.caballo.Alimentacion = this.txtAlimentacion;
                this.navCtrl.push(FichaCaballo, {unCaballo: this.caballo});
            }, error => {
                console.log(error);
            });
    }

}