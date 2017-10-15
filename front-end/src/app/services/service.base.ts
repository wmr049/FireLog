import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';

import { Usuario } from '../pages/usuario/models/usuario';

export abstract class ServiceBase {

  token: string = '';

  protected urlServiceV1: string = 'http://localhost:3000/';
  protected urlServiceDockerV2: string = 'http://localhost:5000/v2';

  obterUsuario() {
    return JSON.parse(localStorage.getItem('eio.user'));
  }

  protected obterAuthHeader(): RequestOptions {
    this.token = localStorage.getItem('eio.token');

    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('x-access-token', this.token);
    const options = new RequestOptions({ headers });
    return options;
  }

  protected serviceError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    // console.error(error);
    return Observable.throw(error);
  }

  protected extractData(response: Response) {
    const body = response.json();
    return body.data || {};
  }
}
