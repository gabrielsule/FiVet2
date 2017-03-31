import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular'
import { FormBuilder, Validators } from '@angular/forms';
import { GenerosService } from '../../../services/generos.service';
import { PelajesService } from '../../../services/pelajes.service';
import { CriadoresService } from '../../../services/criadores.service';
import { CaballosService } from '../../../services/caballos.service';
import { CommonService} from '../../../services/common.service';
import { Caballo } from '../../../model/caballo';
import { Genero } from '../../../model/genero';
import { Pelaje } from '../../../model/pelaje';
import { Criador } from '../../../model/criador';
import { HomePage } from '../home';

@Component({
    selector: 'admin-caballo',
    templateUrl: 'adminCaballo.html',
    providers: [GenerosService, PelajesService, CriadoresService, CaballosService, CommonService]
})
export class AdminCaballoPage {
    isUpdate: boolean;
    caballo: Caballo;
    caballoForm: any;
    generos: Array<Genero>;
    pelajes: Array<Pelaje>;
    criadores: Array<Criador>;

    constructor(private formBuilder: FormBuilder, private _generosService: GenerosService,
        private _pelajesService: PelajesService, private _criadoresService: CriadoresService,
        private _caballosService: CaballosService, private _commonService: CommonService,
        private navCtrl: NavController, private params: NavParams) {}

    ngOnInit() {
        this.caballo = this.params.get("caballo");

        if (this.caballo == undefined) {
            this.isUpdate = false;
            this.caballo = new Caballo();
        }
        else 
            this.isUpdate = true;

        this.loadForm();
        this.loadDataForCombos();
    }

    loadDataForCombos() {
        // GÉNEROS
        this._generosService.getAll()
            .subscribe(
            generos => this.generos = generos,
            console.error,
            () => { }
            );

        // PELAJES
        this._pelajesService.getAll()
            .subscribe(
            pelajes => this.pelajes = pelajes,
            console.error,
            () => { }
            );

        // CRIADORES
        this._criadoresService.getAll()
            .subscribe(
            criadores => this.criadores = criadores,
            console.error,
            () => { }
            );
    }

    loadForm() {
        this.caballoForm = this.formBuilder.group({
            Nombre: [this.caballo.Nombre, Validators.required],
            Genero: [this.caballo.Genero.ID, Validators.required],
            Pelaje: [this.caballo.Pelaje.ID, Validators.required],
            FechaNacimiento: [this.caballo.FechaNacimiento != null ? this.caballo.FechaNacimiento : null],
            Padre: [this.caballo.Pedigree != null ? this.caballo.Pedigree.Padre : null],
            Madre: [this.caballo.Pedigree != null ? this.caballo.Pedigree.Madre : null],
            ADN: [this.caballo.ADN != null ? true : false],
            NumeroChip: [this.caballo.NumeroChip],
            NumeroId: [this.caballo.NumeroId],
            Criador: [this.caballo.Criador != null ? this.caballo.Criador.ID : null]
            // ,
            // NombrePer: [this.caballo.PersonaACargo.Nombre, Validators.required],
            // Telefono: [this.caballo.PersonaACargo.Telefono, Validators.required],
            // Email: [this.caballo.PersonaACargo.Mail, Validators.required]
        });
    }

    guardarCaballo() {
        this._commonService.showLoading("Guardando..");
        if(this.isUpdate) {
            this._caballosService.putCaballo(this.caballoForm.value, this.caballo.ID)
            .subscribe(data => {
                this._commonService.hideLoading();
                this.navCtrl.push(HomePage);
            }, error => {
                console.log(error);
            });
        }
        else {
            this._caballosService.postCaballo(this.caballoForm.value)
            .subscribe(data => {
                this._commonService.hideLoading();
                this.navCtrl.push(HomePage);
            }, error => {
                console.log(error);
            });
        }
        
    }
}