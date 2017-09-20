import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { ServiceBase } from './service.base';
import { Usuario } from 'app/pages/usuario/models/usuario';

@Injectable()
export class UsuarioService extends ServiceBase {


  constructor(private http: Http) { super(); }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    const response = this.http
      .post(this.urlServiceV1 + 'users', usuario, options)
      .map(super.extractData)
      .catch(super.serviceError);

    return response;
  }

  login(usuario: Usuario): Observable<Usuario> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    const response = this.http
      .post(this.urlServiceV1 + 'users/authenticate ', usuario, options)
      .map(super.extractData)
      .catch((super.serviceError));
    return response;
  }
}
