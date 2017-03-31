import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular'
import { CommonService } from '../../../../services/common.service';
import { FichaCaballo } from '../../fichaCaballo/fichaCaballo';
import { Caballo } from '../../../../model/caballo';
import { CaballosService } from '../../../../services/caballos.service';
import { AdminCaballoPage } from '../../adminCaballo/adminCaballo';

@Component({
  selector: 'caballos-ind',
  templateUrl: 'caballosInd.html',
  providers: [CommonService, CaballosService]
})
export class CaballosInd {
  caballos: Array<Caballo>;
  caballosList: Array<Caballo>;

  constructor(private navController: NavController,
    private _caballosService: CaballosService,
    private _commonService: CommonService,
    public toastCtrl: ToastController) {
    this.caballos = new Array<Caballo>();
    this.caballosList = new Array<Caballo>();
    this.loadcaballos();
  }

  // CARGA DE CABALLOS
  loadcaballos(): void {
    this._commonService.showLoading("Procesando..");
    this._caballosService.getAll()
      // .subscribe(
      // caballos => this.caballos = caballos,
      // console.error,
      // () => { this.caballosList = this.caballos.slice(); }
      // );
      .subscribe(res => {
        console.log(res);
        this._commonService.hideLoading();
        this.caballos = res;
        this.caballosList = this.caballos.slice();
      }, error => {
        console.log(error);
        this._commonService.ShowToast(this.toastCtrl, this._commonService.TOAST_POSITION.bottom, "Error al cargar los caballos", 2000);
      });
  }

  // BÚSQUEDA EN LISTADO
  findCaballos(ev: any) {
    this.caballosList = this._caballosService.findCaballos(ev.target.value, this.caballos);
  }

  // OBTENER NOMBRE DEL GRUPO DE CABALLO, SI LO POSEE
  getDescGrupoCaballo(caballo: Caballo): string {
    if (caballo.Grupo != null)
      return caballo.Grupo.Descripcion;
    else
      return null;
  }

  // NAVEGACIÓN A FICHA DE CABALLO
  goToFicha(anIdCaballo: number): void {
    let caballoSeleccionado = this.caballosList.filter((caballo) => {
      return (caballo.ID == anIdCaballo);
    })[0];
    this.navController.push(FichaCaballo, {
      unCaballo: caballoSeleccionado
    });
  }

  // NAVEGACIÓN A NUEVA FICHA DE CABALLO
  goToNuevaFicha(): void {
    this.navController.push(AdminCaballoPage);
  }
}