import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Caballo } from '../../../../model/caballo';
import { PopOverDatos } from './subPages/popOver/popOverDatos';

@Component({
    selector: 'datos-caballo',
    templateUrl: 'datosPage.html'
})
export class DatosPage {
	caballo: Caballo;
    edadCaballo: number;

    constructor(private navCtrl: NavController, private params: NavParams, public popoverCtrl: PopoverController) {
    	this.caballo = params.get("unCaballo");
    }

    getDescPropietarioCaballo(): string {
        if(this.caballo.Propietario != null)
            return this.caballo.Propietario.Nombre + " " + this.caballo.Propietario.Apellido;
        else
            return "-";
    }

    getDescADNCaballo(): string {
        if(this.caballo.ADN)
            return "Sí";
        else
            return "No";
    }

    getFechaNacCaballo() {
        if(this.caballo.FechaNacimiento != null)
            return new Date(Date.parse(this.caballo.FechaNacimiento.toString())).toString();
        else
            return null;
    }

    getDescPadreCaballo(): string {
        if(this.caballo.Pedigree)
            return this.caballo.Pedigree.Padre;
        else
            return "-";
    }

    getDescMadreCaballo(): string {
        if(this.caballo.Pedigree)
            return this.caballo.Pedigree.Madre;
        else
            return "-";
    }

    getNombreCriadorCaballo(): string {
        if(this.caballo.Criador)
            return this.caballo.Criador.Nombre;
        else
            return "-";
    }

    getDescPaisCriadorCaballo(): string {
        if(this.caballo.Criador)
            return this.caballo.Criador.Pais.Descripcion;
        else
            return "-";
    }

    getEdadCaballo() {
        var today = new Date();
        var fechaNac = new Date(this.formatString(this.caballo.FechaNacimiento));
        var timeDiff = Math.abs(today.getTime() - fechaNac.getTime());   
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        return diffDays;
    }

    formatString(format): Date {
        var day   = parseInt(format.substring(0,2));
        var month  = parseInt(format.substring(3,5));
        var year   = parseInt(format.substring(6,10));
        return new Date(year, month-1, day);
    }

    openMenu(myEvent) {
        let popover = this.popoverCtrl.create(PopOverDatos, {caballo: this.caballo});
        popover.present({
          ev: myEvent
        });
    }
}