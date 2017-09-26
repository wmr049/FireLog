import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileComponent } from './profile.component';
import { routing } from './profile.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      routing,
  ],
  declarations: [
    ProfileComponent,
  ],
})
export class MainModule {}
