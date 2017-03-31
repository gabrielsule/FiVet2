import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { CommonService } from '../../services/common.service';
import { AlertasService } from '../../services/alertas.service';
import { CaballosService } from '../../services/caballos.service';
import { Alerta } from '../../model/alerta';
import { Caballo } from '../../model/caballo';
import { NotificacionesPage } from './notificaciones';

@Component({
    templateUrl: 'notificaciones-view.html',
    providers: [CommonService, AlertasService, CaballosService]
})

export class NotificacionesViewPage {
    alertaEntity: Alerta;
    fecha: string;
    caballoEntity: Caballo = new Caballo();
    grupoDescripcion: string = "";

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private _commonService: CommonService,
        private _alertasService: AlertasService,
        private _caballosService: CaballosService,
        public toastCtrl: ToastController) {
    }

    ngOnInit() {
        this.alertaEntity = this.navParams.get("notificacionSelected");
        // let fechaNotificacion = this.navParams.get("fecha");
        this.getCaballoInfo(this.alertaEntity.Caballo, this.alertaEntity.FechaNotificacion);
    }

    getCaballoInfo(caballo: Caballo, fechaNotificacion: string) {
        // this._caballosService.getById(caballo.ID.toString())
        //     .subscribe(res => {
        //         this._commonService.showLoading("Proceasando..");
        //         console.log(res);
        //         this.caballoEntity = res;
        //         this.grupoDescripcion = this.getDescGrupoCaballo(this.caballoEntity);
        //         this.getCurrentDate(fechaNotificacion);
        //     }, error => {
        //         this._commonService.ShowErrorHttp(error, "Error al obtener la informacion del caballo");
        //     });
        this.caballoEntity=this.alertaEntity.Caballo;
        this._commonService.showLoading("Proceasando..");
        this.grupoDescripcion = this.getDescGrupoCaballo(this.caballoEntity);
        this.getCurrentDate(fechaNotificacion);
    }

    getCurrentDate(fecha: string) {
        this._alertasService.getCurrentDateString(fecha, null)
            .subscribe(res => {
                console.log(res);
                this.fecha = res;
                this._commonService.hideLoading();
            }, error => {
                this._commonService.ShowErrorHttp(error, "Error al obtener la fecha de la notificacion");
            });
    }

    // OBTENER NOMBRE DEL GRUPO DE CABALLO, SI LO POSEE
    getDescGrupoCaballo(caballo: Caballo): string {
        if (caballo.Grupo != null)
            return caballo.Grupo.Descripcion;
        else
            return "";
        // return "Grupo del caballo";
    }
}

