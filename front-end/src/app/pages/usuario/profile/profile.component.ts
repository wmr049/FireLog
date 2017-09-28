import { Component } from '@angular/core';
import { ProfileService } from 'app/pages/profile/profile.service';

@Component({
  selector: 'nga-profile',
  styleUrls: ['./profile.scss'],
  templateUrl: './profile.html',
})
export class ProfileComponent {

  emailParametersUser: any[];

  constructor(private _profileService: ProfileService) {
    this.emailParametersUser = _profileService.emailParametersUser;
  }
}
