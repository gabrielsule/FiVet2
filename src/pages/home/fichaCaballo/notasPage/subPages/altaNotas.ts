import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { NotasPage } from '../notasPage';
import { AlertasService } from '../../../../../services/alertas.service';
import { CommonService } from '../../../../../services/common.service';
import { Caballo } from '../../../../../model/caballo';
import { Alerta } from '../../../../../model/alerta';
import {Utils} from '../../../../../app/utils'

@Component({
    selector: 'alta-notas',
    templateUrl: 'altaNotas.html',
    providers: [AlertasService, CommonService]
})
export class AltaNotas {
    nota: Alerta;
    caballo: Caballo;

    constructor(public navCtrl: NavController, private params: NavParams,
        private _alertasService: AlertasService,
        private _commonService: CommonService,
        public toastCtrl: ToastController) { }

    ngOnInit() {
        this.nota = new Alerta();
        this.nota.FechaNotificacion = Utils.getDateNow().ToString();
        this.caballo = this.params.get("caballo");
    }

    saveNota() {
        this._commonService.showLoading("Guardando..");
        this.nota.TipoAlerta = 5;
        this.nota.Descripcion = this.nota.Descripcion.replace(/\r?\n|\r/g, "<br>");
        this.nota.Caballo = this.caballo;
        console.log(this.nota);
        this._alertasService.postNota(this.nota)
            .subscribe(res => {
                console.log(res);
                this._commonService.hideLoading();
                this._commonService.ShowToast(this.toastCtrl, this._commonService.TOAST_POSITION.bottom, "El registro se guardo exitosamente", 2000);
                this.navCtrl.push(NotasPage, { caballo: this.caballo });
            }, error => {
                console.log(error);
                this._commonService.ShowToast(this.toastCtrl, this._commonService.TOAST_POSITION.bottom, "Error al guardar el registro", 2000);
            });
    }
}