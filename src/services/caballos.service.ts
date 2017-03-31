import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Caballo } from '../model/caballo';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppSettings} from '../app/appSettings';


@Injectable()
export class CaballosService {
    public actionUrlCaballo: string = AppSettings.API_ENDPOINT + "api/caballos";
    public actionUrlEstablecimientoCaballo: string = AppSettings.API_ENDPOINT + "api/establecimiento";
    public actionUrlAlimentacionCaballo: string = AppSettings.API_ENDPOINT + "api/alimentacion";

    constructor(private _http: Http) { }

    // CABALLOS
    getAll(): any {
        return this._http.get(this.actionUrlCaballo)
            .map(response => response.json());
    }

    getAllByPropietarioId(propietarioId): any {
        return this._http.get(this.actionUrlCaballo + "/" + propietarioId)
            .map(response => response.json());
    }

    getById(idCaballo: string): any {
        return this._http.get(this.actionUrlCaballo + "/" + idCaballo)
            .map(response => response.json());
    }

    postCaballo(caballo: Object): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let bodyString = JSON.stringify(caballo);

        return this._http.post(this.actionUrlCaballo, bodyString, options)
            .map(res => res.json());
    }

    putCaballo(caballo: Object, idCaballo: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let bodyString = JSON.stringify(caballo);

        return this._http.put(this.actionUrlCaballo + "/" + idCaballo, bodyString, options);
    }

    deleteCaballo(idCaballo: number) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.delete(this.actionUrlCaballo + "/" + idCaballo, options);
    }

    findCaballos(value: any, caballos: Array<Caballo>): Array<Caballo> {
        if (value && value.trim() == '')
            return caballos;
        else {
            return caballos.filter((caballo) => {
                return ((caballo.Nombre.toUpperCase().indexOf(value.toUpperCase()) > -1)
                    || (caballo.Grupo != null && caballo.Grupo.Descripcion.toUpperCase().indexOf(value.toUpperCase()) > -1));
            })
        }
    }

    // UBICACION
    getEstablecimientoByIdCaballo(idCaballo: string): any {
        return this._http.get(this.actionUrlEstablecimientoCaballo + "/" + idCaballo)
            .map(response => response.json());
    }

    deleteEstablecimiento(idEstablecimiento): any {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.delete(this.actionUrlEstablecimientoCaballo + "/delete/" + idEstablecimiento, options);
    }

    postEstablecimiento(establecimiento: Object, idCaballo: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let bodyString = JSON.stringify(establecimiento);

        return this._http.post(this.actionUrlEstablecimientoCaballo + "?idCaballo=" + idCaballo, bodyString, options);
    }

    putEstablecimiento(establecimiento: Object, idCaballo: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let bodyString = JSON.stringify(establecimiento);

        return this._http.put(this.actionUrlEstablecimientoCaballo + "?idCaballo=" + idCaballo, bodyString, options);
    }

    // ALIMENTACION
    saveAlimentacion(idCaballo: string, strAlimentacion: string): any {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let bodyString = JSON.stringify(strAlimentacion);

        return this._http.put(this.actionUrlAlimentacionCaballo + "/" + idCaballo, bodyString, options);
    }
}