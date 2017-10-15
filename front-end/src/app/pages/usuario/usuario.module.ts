import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AppTranslationModule } from 'app/app.translation.module';
import { NgaModule } from 'app/theme/nga.module';
import { NguiTabModule } from '@ngui/tab';

import { routing } from './usuario.routing';

// Components
import { UsuarioComponent } from './usuario.component';
import { RegisterComponent } from 'app/pages/usuario/register/register.component';
import { LoginComponent } from 'app/pages/usuario/login/login.component';
import { ProfileComponent } from 'app/pages/usuario/profile/profile.component';
import { ModalComponent } from 'app/pages/usuario/profile/modal/modal.component';

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
    NgbModalModule,
    NguiTabModule,
  ],
  declarations: [
    UsuarioComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ModalComponent,
  ],
  providers: [
    UsuarioService,
  ],
  entryComponents: [
    ModalComponent,
  ],
})

export class UsuarioModule { }
