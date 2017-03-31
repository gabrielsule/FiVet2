import { Component } from '@angular/core';
import { NavParams, PopoverController } from 'ionic-angular';
import { Caballo } from '../../../model/caballo'
import { PopOverFichaCaballo } from './subPages/popOver/popOverFichaCaballo';

import { CaballosService } from '../../../services/caballos.service';

@Component({
	selector: 'ficha-caballo',
	templateUrl: 'fichaCaballo.html',
	providers: [CaballosService]
})
export class FichaCaballo {
	caballo: Caballo;
	menu: string;

	constructor(params: NavParams, private _caballosService: CaballosService, public popoverCtrl: PopoverController) {
		this.menu = "info";
		this.caballo = params.get("unCaballo");
	}

	openMenu(myEvent) {
        let popover = this.popoverCtrl.create(PopOverFichaCaballo, {idCaballo: this.caballo.ID});
        popover.present({
          ev: myEvent
        });
    }
}
