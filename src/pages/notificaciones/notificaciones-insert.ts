import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { CommonService } from '../../services/common.service';
import { AlertasService } from '../../services/alertas.service';
import { CaballosService } from '../../services/caballos.service';
import { Alerta } from '../../model/alerta';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificacionesPage } from './notificaciones';
import {Utils} from '../../app/utils'

@Component({
    templateUrl: 'notificaciones-insert.html',
    providers: [CommonService, AlertasService, CaballosService]
})

export class NotificacionesInsertPage {
    alertaEntity: Alerta;
    caballosList = [];
    tiposAlertaList = [];
    formNotificaciones: any;
    idPropietario: number = 2;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private _commonService: CommonService,
        private _alertasService: AlertasService,
        private _caballosService: CaballosService,
        private formBuilder: FormBuilder,
        public toastCtrl: ToastController) {
    }

    ngOnInit() {
        this.alertaEntity = new Alerta();
        this.alertaEntity.FechaNotificacion = Utils.getDateNow().ToString();
        this.getTiposAlerta();
        this.getAllCaballos();
        this.initForm();
    }

    initForm() {
        this.formNotificaciones = this.formBuilder.group({
            Titulo: [this.alertaEntity.Titulo, Validators.required],
            FechaNotificacion: [this.alertaEntity.FechaNotificacion, Validators.required],
            HoraNotificacion: [this.alertaEntity.HoraNotificacion, Validators.required],
            TipoNotificacion: [this.alertaEntity.TipoAlerta, Validators.required],
            Activa: [this.alertaEntity.Activa],
            Descripcion: [this.alertaEntity.Descripcion, Validators.required],
            Caballo: [this.alertaEntity.Caballo, Validators.required]
        });
    }

    getAllCaballos() {
        this._caballosService.getAllByPropietarioId(this.idPropietario)
            .subscribe(res => {
                console.log(res);
                this.caballosList = res;
            });
    }

    getTiposAlerta() {
        this._alertasService.getTipoAlerta()
            .subscribe(res => {
                console.log(res);
                this.tiposAlertaList = res;
            }, error => {
                this._commonService.ShowErrorHttp(error, "Error al obtener los tipos de notificaciones");
            });
    }

    saveNotificacion() {
        this._commonService.showLoading("Guardando..");
        console.log(this.formNotificaciones.value);
        this._alertasService.postNota(this.formNotificaciones.value)
            .subscribe(res => {
                console.log(res);
                this._commonService.hideLoading();
                this._commonService.ShowToast(this.toastCtrl, this._commonService.TOAST_POSITION.bottom, "El registro se guardo exitosamente", 2000);
                this.navCtrl.push(NotificacionesPage);
            }, error => {
                console.log(error);                
                this._commonService.ShowToast(this.toastCtrl, this._commonService.TOAST_POSITION.bottom, "Error al guardar el registro", 2000);
            });
    }
}

