import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ServiceBase } from 'app/services/service.base';
import { Repositories } from 'app/pages/repositories/models/repositories';


@Injectable()
export class DockerService extends ServiceBase{

    constructor(private http:Http){super();}

    
    obterTodos(): Observable<Repositories[]>{
        return this.http
        .get(this.urlServiceDockerV2 + "_catalog")
        .map((res: Response) => <Repositories[]>res.json())
        .catch(super.serviceError);
    }

}