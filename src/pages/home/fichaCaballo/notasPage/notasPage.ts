import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Caballo } from '../../../../model/caballo';
import { CommonService } from '../../../../services/common.service';
import { AlertasService } from '../../../../services/alertas.service';
import { AltaNotas } from './subPages/altaNotas';

@Component({
    selector: 'notas-caballo',
    templateUrl: 'notasPage.html',
    providers: [CommonService, AlertasService]
})
export class NotasPage {
    caballo: Caballo;
    notas: Array<Nota>;
    notasList: Array<Nota>;
    checkMode: boolean = false;
    searchMode: boolean = false;

    constructor(private navCtrl: NavController, private params: NavParams, public popoverCtrl: PopoverController,
                private _commonService: CommonService, private _alertasService: AlertasService) {}

    ngOnInit() {
        this.caballo = this.params.get("caballo");

        this._alertasService.getAllByIdCaballoTipoAlerta(this.caballo.ID, 5)
            .subscribe(
                notas => { 
                    this.notas = notas;
                    this.notasList = this.notas.slice();
                },
                console.error,
                () => { }
            );
    }

    cardPress(e) {
        if(!this.checkMode)
        {
            if (e.target.className.indexOf("card-header") >= 0 || e.target.className.indexOf("card-content") >= 0)
            {
                if(e.target.parentNode.className.indexOf("selected") < 0)
                    this.notas[e.target.parentNode.id].Selected = true;
            }
            else
            {
                if(e.target.className.indexOf("selected") < 0)
                    this.notas[e.target.id].Selected = true;
            }
            
            if(!this.checkMode)
                this.checkMode = true;
        }
        else 
            this.cardTap(e);
    }

    cardTap(e) {
        if(this.checkMode)
        {
            if (e.target.className.indexOf("card-header") >= 0 || e.target.className.indexOf("card-content") >= 0)
            {
                if (e.target.parentNode.className.indexOf("selected") >= 0)
                    this.notas[e.target.parentNode.id].Selected = false;
                else  
                    this.notas[e.target.parentNode.id].Selected = true;                  
            }
            else
            {
                if (e.target.className.indexOf("selected") >= 0)
                    this.notas[e.target.id].Selected = false;
                else
                    this.notas[e.target.id].Selected = true;
            }

        }
    }

    allSelected(e, item) {
        this.notas.forEach((item, index) => {
            this.notasList[index].Selected = e._checked;
        });
    }

    enableSearchMode() {
        this.searchMode = true;
        this.checkMode = false;

        this.notas.forEach((item, index) => {
            this.notas[index].Selected = false;
        });
    }

    disableCheckMode() {
        this.checkMode = false;
        this.notasList.forEach((item, index) => {
            this.notasList[index].Selected = false;
        });
    }

    deleteSelected(e) {
        this._commonService.showLoading("Eliminando..");

        var notasForDelete = new Array<number>();

        this.notas.forEach((item, index) => {
            if(this.notas[index].Selected)
                notasForDelete.push(this.notas[index].ID);
        });

        this._alertasService.deleteByIds(notasForDelete)
                .subscribe(data => {
                            this.disableCheckMode();
                            this._commonService.hideLoading();
                            this.navCtrl.push(NotasPage, {caballo: this.caballo});
                           }, 
                           error => console.log(error)
                           );

        this.checkMode = false;
    }

    htmlForCardContent(nota: Nota) {
        // if(nota.EsGrupal)
        //     return  "<br><b>" + nota.Titulo + "</b><br>" + nota.Descripcion;
        // else
        return nota.Descripcion;
    }

    findNotasByValue(ev: any) {
        this.notasList = this.findNotas(ev.target.value, this.notas);
    }

    findNotas(value: any, notas: Array<Nota>): Array<Nota> {
        if (value && value.trim() == '')
            return this.notas;
        else {
            return notas.filter((nota) => {
                return ((nota.Titulo.toUpperCase().indexOf(value.toUpperCase()) > -1)
                    || (nota.Descripcion.toUpperCase().indexOf(value.toUpperCase()) > -1));
            })
        }
    }

    newNota() {
        this.navCtrl.push(AltaNotas, {caballo: this.caballo});
    }

}

export class Nota {
    ID: number;
    Titulo: string;
    FechaNotificacion: Date;
    HoraNotificacion: number;
    TipoAlerta: number;
    Activa: boolean;
    Descripcion: string;
    CaballoID: number;
    Selected: boolean = false;

    constructor() {}
}