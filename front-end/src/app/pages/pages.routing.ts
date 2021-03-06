import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [

  {
    path: 'acesso-negado',
    loadChildren: 'app/pages/shared/acesso-negado/acesso-negado.module#AcessoNegadoModule',
  },

  {
    path: 'usuario',
    loadChildren: './usuario/usuario.module#UsuarioModule'
  },

  {
    path: 'pages',
    component: Pages,
    canActivate: [AuthService],
    children: [
      { path: '', redirectTo: 'usuario', pathMatch: 'full' },
      
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'main', loadChildren: './main/main.module#MainModule' },
      { path: 'manager', loadChildren: './manager/manager.module#ManagerModule' },
      { path: 'repositories', loadChildren: './repositories/repositories.module#RepositoriesModule' },
      { path: 'editors', loadChildren: './editors/editors.module#EditorsModule' },
      { path: 'components', loadChildren: './components/components.module#ComponentsModule' },
      { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
      { path: 'ui', loadChildren: './ui/ui.module#UiModule' },
      { path: 'forms', loadChildren: './forms/forms.module#FormsModule' },
      { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
      { path: 'maps', loadChildren: './maps/maps.module#MapsModule' },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
