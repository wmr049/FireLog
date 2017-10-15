import { Component, OnInit } from '@angular/core';
import { ManagerOrganizationService } from 'app/pages/manager/services/manager-organization.service';

@Component({
    selector: 'nga-manager-organization',
    styleUrls: ['./manager-organization.scss'],
    templateUrl: './manager-organization.html',
})

export class ManagerOrganizationComponent {

  emailParametersUser: any[];
  
    constructor(private _managerOrganizationService: ManagerOrganizationService) {
      this.emailParametersUser = _managerOrganizationService.emailParametersUser;
    }
    
}
