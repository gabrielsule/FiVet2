import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { CaballosService } from '../../../../../services/caballos.service';
import { CommonService} from '../../../../../services/common.service';
import { Establecimiento } from '../../../../../model/establecimiento';
import { Mail } from '../../../../../model/mail';
import { NumeroTelefono } from '../../../../../model/numeroTelefono';
import { Caballo } from '../../../../../model/caballo';
import { UbicacionPage } from '../ubicacionPage';

@Component({
    selector: 'admin-ubicacion',
    templateUrl: 'adminUbicacion.html',
    providers: [CaballosService, CommonService]
})
export class AdminUbicacionPage {
    establecimiento: Establecimiento;
    isUpdate: boolean;
    caballo: Caballo;
    listadoMailsAux: Array<Mail>;
    listadoNumerosTelefonoAux: Array<NumeroTelefono>;
    inSubmit: boolean = false;

    constructor(private formBuilder: FormBuilder, private _caballosService: CaballosService, 
        private _commonService: CommonService, private navCtrl: NavController, private params: NavParams) {}

    ngOnInit() {
        this.establecimiento = this.params.get("establecimiento");
        this.isUpdate = this.params.get("isUpdate");
        this.caballo = this.params.get("caballo");
        if(!this.isUpdate) {
            this.establecimiento = new Establecimiento();
            this.listadoMailsAux = new Array<Mail>();
            this.listadoNumerosTelefonoAux = new Array<NumeroTelefono>();
            this.listadoMailsAux.push(new Mail());
            this.listadoNumerosTelefonoAux.push(new NumeroTelefono());
        }
        else {
            this.listadoMailsAux = this.establecimiento.Mails.slice();
            this.listadoNumerosTelefonoAux = this.establecimiento.Numeros.slice();
        }
    }

    agregarNumero() {
        this.listadoNumerosTelefonoAux.push(new NumeroTelefono());
    }

    eliminarNumero() {
        this.listadoNumerosTelefonoAux.pop();
    }

    agregarMail() {
        this.listadoMailsAux.push(new Mail());
    }

    eliminarMail() {
        this.listadoMailsAux.pop();
    }

    guardarEstablecimiento() {
        this.inSubmit = true;
        this._commonService.showLoading("Guardando..");
        this.establecimiento.Mails = this.listadoMailsAux.slice();
        this.establecimiento.Numeros = this.listadoNumerosTelefonoAux.slice();
        if(this.isUpdate)
        {
            this._caballosService.putEstablecimiento(this.establecimiento, this.caballo.ID.toString())
                .subscribe(data => {
                    this._commonService.hideLoading();
                    this.navCtrl.push(UbicacionPage, {caballo: this.caballo});
                }, error => {
                    console.log(error);
                });
        }
        else
        {
            this._caballosService.postEstablecimiento(this.establecimiento, this.caballo.ID.toString())
                .subscribe(data => {
                    this._commonService.hideLoading();
                    this.navCtrl.push(UbicacionPage, {caballo: this.caballo});
                }, error => {
                    console.log(error);
                });
        }        
    }
}