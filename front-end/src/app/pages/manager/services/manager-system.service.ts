import { Injectable } from '@angular/core';

@Injectable()
export class ManagerSystemService {


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
