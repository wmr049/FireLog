import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { routing } from './repositories.routing';

// components
import { ListRepositoriesComponent } from 'app/pages/repositories/list-repositories/list-repositories.component';
import { RepositoriesComponent } from 'app/pages/repositories';

// services
import { DockerService } from 'app/pages/repositories/services/docker.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      routing,
  ],
  declarations: [
    RepositoriesComponent,
    ListRepositoriesComponent,
  ],
  providers:[
    DockerService
  ]
})
export class RepositoriesModule {}
