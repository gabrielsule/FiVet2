import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Caballo } from '../../../../../model/caballo';
import { DatosPage } from '../../datosPage/datosPage';
import { UbicacionPage } from '../../ubicacionPage/ubicacionPage';
import { AlimentacionPage } from '../../alimentacionPage/alimentacionPage';
import { HerrajePage } from '../../herrajePage/herrajePage';
import { NotasPage } from '../../notasPage/notasPage';

@Component({
    selector: 'menuInfo-caballo',
    templateUrl: 'menuInformacion.html'
})
export class MenuInformacion {
    @Input('caballoSeleccionado') caballo: Caballo;

    constructor(private navCtrl: NavController) {}

    GoToDatos() {
    	this.navCtrl.push(DatosPage, {
    	      	unCaballo: this.caballo
    		}
    	);
	}

    GoToUbicacion() {
        this.navCtrl.push(UbicacionPage, {
                  caballo: this.caballo
            }
        );
    }

    GoToAlimentacion() {
        this.navCtrl.push(AlimentacionPage, {
                  caballo: this.caballo
            }
        );
    }

    GoToHerraje() {
        this.navCtrl.push(HerrajePage, {
                  caballo: this.caballo
            }
        );
    }

    GoToNotas() {
        this.navCtrl.push(NotasPage, {
                  caballo: this.caballo
            }
        );
    }
}