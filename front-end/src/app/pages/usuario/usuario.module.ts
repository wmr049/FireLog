import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';

import { AppTranslationModule } from 'app/app.translation.module';
import { NgaModule } from 'app/theme/nga.module';

import { routing } from './usuario.routing';

// Components
import { UsuarioComponent } from './usuario.component';
import { RegisterComponent } from 'app/pages/usuario/register/register.component';
import { LoginComponent } from 'app/pages/usuario/login/login.component';
import { ProfileComponent } from 'app/pages/usuario/profile/profile.component';

// Services
import { UsuarioService } from 'app/pages/usuario/services/usuario.service';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    MatTabsModule,
  ],
  declarations: [
    UsuarioComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
  ],
  providers: [
    UsuarioService,
  ],
})

export class UsuarioModule {}
