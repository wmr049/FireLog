import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';

import { ProfileComponent } from './profile.component';
import { routing } from './profile.routing';

// serviços
import { ProfileService } from 'app/pages/profile/profile.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    routing,
  ],
  declarations: [
    ProfileComponent,
  ],
  providers: [
    ProfileService,
  ],
})
export class ProfileModule {}
