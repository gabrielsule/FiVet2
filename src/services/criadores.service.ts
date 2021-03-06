import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings} from '../app/appSettings';


@Injectable()
export class CriadoresService {
    public actionUrl: string = AppSettings.API_ENDPOINT + "api/criador";

    constructor(private _http: Http) { }

    getAll(): any {
        return this._http.get(this.actionUrl)
            .map(response => response.json());
    }
}