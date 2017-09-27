import { Routes, RouterModule } from '@angular/router';

import { RepositoriesComponent } from 'app/pages/repositories/repositories.component';
import { ListRepositoriesComponent } from 'app/pages/repositories/list-repositories/list-repositories.component';

const routes: Routes = [
  {
    path: '',
    component: RepositoriesComponent,
    children: [
      { path: 'list-repositories', component: ListRepositoriesComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
