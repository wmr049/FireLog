import { Routes, RouterModule } from '@angular/router';

import { RepositoriesComponent } from './repositories.component';

const routes: Routes = [
  {
    path: '',
    component: RepositoriesComponent,
    },
];

export const routing = RouterModule.forChild(routes);
