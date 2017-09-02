import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RepositoriesComponent } from './repositories.component';
import { routing } from './repositories.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      routing,
  ],
  declarations: [
    RepositoriesComponent,
  ],
})
export class RepositoriesModule {}
