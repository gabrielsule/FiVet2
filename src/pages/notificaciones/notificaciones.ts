import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { CommonService } from '../../services/common.service';
import { NotificacionesInsertPage } from './notificaciones-insert';
import { NotificacionesViewPage } from './notificaciones-view';
import { AlertasService } from '../../services/alertas.service';
import { Alerta, DateObject } from '../../model/alerta';
import { Utils} from '../../app/utils';

@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
  providers: [CommonService, AlertasService]
})
export class NotificacionesPage {

  notificacionList = [];
  currentDate: String = "";
  idPropietario: number = 2;
  isTomorrowFilter = false;
  isDeleting: boolean = false;
  isFutureNotifications: boolean = false;
  showFechaNotificacion: boolean = false;

  constructor(public navCtrl: NavController,
    public alertController: AlertController,
    private _commonService: CommonService,
    private _alertasService: AlertasService) { }

  ngOnInit() {
    this.isFutureNotifications = false;
    let dateTimeNow: DateObject = Utils.getDateNow();
    this.updateNotificationList(dateTimeNow, false);
  }

  goInsertNotificacion() {
    this.navCtrl.push(NotificacionesInsertPage);
  }

  goViewNotificacion(notificacion: Alerta) {
    /* Flag para determinar que no se este eliminando al mismo tiempo */
    if (!this.isDeleting) {
      console.log(notificacion);
      this.navCtrl.push(NotificacionesViewPage, { notificacionSelected: notificacion, fecha: this.currentDate });
    }
  }

  goTodayNotifications() {
    this.setFutureNotification(false);
    let dateTimeNow: DateObject = Utils.getDateNow();
    this.updateNotificationList(dateTimeNow, false);
  }

  goTomorrowNotifications() {
    this.setFutureNotification(false);
    let dateTimeNow: DateObject = Utils.getDateNow();
    dateTimeNow.DAY += 1;
    this.updateNotificationList(dateTimeNow, false);
  }

  goFutureNotifications() {
    this.setFutureNotification(true);
    let dateTimeNow: DateObject = Utils.getDateNow();
    dateTimeNow.DAY += 2;
    this.updateNotificationList(dateTimeNow, true);
  }

  updateNotificationList(dateObject: DateObject, filterByFuture: boolean) {
    this.getCurrentFecha(dateObject, this.idPropietario, filterByFuture);
  }

  getCurrentFecha(dateObject: DateObject, idPropietario: number, filterByFuture: boolean) {
    console.log(dateObject);
    this._commonService.showLoading("Proceasando..");
    this._alertasService.getCurrentDate(dateObject.YEAR.toString(), dateObject.addZeroDate(dateObject.MONTH), dateObject.addZeroDate(dateObject.DAY), null)
      .subscribe(res => {
        console.log(res);
        /* Indicar que se van a mostrar todas las notificaciones futuras */
        if (this.isFutureNotifications) {
          this.currentDate = "Desde '" + res + "' en adelante";
        }
        else { this.currentDate = res; }
        this.getAllNotificacionesByPropietarioId(idPropietario, dateObject, filterByFuture);
      }, error => {
        this._commonService.ShowErrorHttp(error, "Error obteniendo la fecha actual");
      });
  }

  getAllNotificacionesByPropietarioId(idPropietario: number, dateObject: DateObject, filterByFuture: boolean) {
    this._alertasService.getAllByIdPropetario(idPropietario, dateObject.ToString(), filterByFuture)
      .subscribe(res => {
        console.log(res);
        this.notificacionList = res;
        this._commonService.hideLoading();
      }, error => {
        this._commonService.ShowErrorHttp(error, "Error obteniendo las notificaciones");
      });
  }

  deleteNotification(notificacion: Alerta) {
    this.isDeleting = true;
    this._commonService.showLoading("Eliminando..");
    // this._alertasService.deleteById(notificacion.ID)
    //   .subscribe(res => {
    //     console.log(res);
    //     this.getAllNotificaciones();
    //   }, error => {
    //     this._commonService.ShowErrorHttp(error, "Error al eliminar la notificacion");
    //   });
    let listId = new Array<number>();
    listId.push(notificacion.ID);
    this._alertasService.deleteByIds(listId)
      .subscribe(res => {
        this._commonService.hideLoading();
        console.log(res);
        let dateTimeNow: DateObject = Utils.getDateNow();
        this.updateNotificationList(dateTimeNow, false);
        this.isDeleting = false;
      }, error => {
        this._commonService.ShowErrorHttp(error, "Error al eliminar la notificacion");
        this.isDeleting = false;
      });
  }

  setFutureNotification(isFutureNotification) {
    this.isFutureNotifications = isFutureNotification;
    this.showFechaNotificacion = isFutureNotification;
  }
}
