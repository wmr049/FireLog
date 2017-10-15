import { Routes, RouterModule } from '@angular/router';

import { AcessoNegadoComponent } from './acesso-negado.component';

const routes: Routes = [
  {
    path: '',
    component: AcessoNegadoComponent,
    },
];

export const routing = RouterModule.forChild(routes);
