import { Component, OnInit } from '@angular/core';
import { ManagerSystemService } from 'app/pages/manager/services/manager-system.service';

@Component({
  selector: 'nga-manager-system',
  styleUrls: ['./manager-system.scss'],
  templateUrl: './manager-system.html',
})

export class ManagerSystemComponent {

  emailParametersUser: any[];

  constructor(private _managerSystemService: ManagerSystemService) {
    this.emailParametersUser = _managerSystemService.emailParametersUser;
  }

}
