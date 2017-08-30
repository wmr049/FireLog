import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GenericResult } from '../models/genericResult';
import { GenericResultBase } from '../models/genericResultBase';
import { EstadoIntegracao } from '../models/estadoIntegracao';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EstadoIntegracaoService {
    //private baseUrl: string = "http://10.100.1.23/LFGAPI/api/FilaIntegracao/GetEstadoIntegracao";
    private baseUrl: string = "http://api.lfg.com.br/api/FilaIntegracao/GetEstadoIntegracao";

    constructor(private http: Http){

    }

    public getEstadoIntegracao() : Observable<GenericResult<EstadoIntegracao>>{
       return this.http.get(this.baseUrl)
           .map(res => res.json());        
    }
}




