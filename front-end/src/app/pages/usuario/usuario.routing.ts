import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// components
import { UsuarioComponent } from './usuario.component';
import { ProfileComponent } from 'app/pages/usuario/profile/profile.component';
import { LoginComponent } from 'app/pages/usuario/login/login.component';
import { RegisterComponent } from 'app/pages/usuario/register/register.component';

// services auth
import { AuthService } from 'app/services/auth.service';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: "profile", canActivate: [AuthService], component: ProfileComponent },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
    ]
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
