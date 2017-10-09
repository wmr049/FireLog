import { Injectable } from '@angular/core';
import { ServiceBase } from 'app/services/service.base';
import { Usuario } from 'app/pages/usuario/models/usuario';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

@Injectable()
export class UsuarioService extends ServiceBase {

  constructor(private http: Http) { super(); }

  atualizarUsuario(usuario: Usuario): Observable<Usuario> {
    const options = this.obterAuthHeader();

    const response = this.http
      .put(this.urlServiceV1 + 'users/' + usuario.id, usuario, options)
      .map(super.extractData)
      .catch((super.serviceError));
    return response;
  }

  emailParametersUser = [
        {
          id: 1,
          log: 'SGA',
          summarydaily: true,
          newerrors: true,
          impactincreased: true,
          status: 'info',
        },
        {
          id: 2,
          log: 'Sala Virtual',
          summarydaily: false,
          newerrors: false,
          impactincreased: true,
          status: 'primary',
        },
        {
          id: 3,
          log: 'SEAVI',
          summarydaily: false,
          newerrors: false,
          impactincreased: false,
          status: 'success',
        },
        {
          id: 4,
          log: 'Portal do Aluno',
          summarydaily: true,
          newerrors: true,
          impactincreased: true,
          status: 'danger',
        },
        {
          id: 5,
          log: 'Extrato Bcash',
          summarydaily: true,
          newerrors: false,
          impactincreased: true,
          status: 'warning',
        },
      ];
}
