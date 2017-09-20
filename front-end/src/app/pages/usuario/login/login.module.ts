import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Login } from './login.component';
import { routing } from './login.routing';
import { AppTranslationModule } from 'app/app.translation.module';
import { NgaModule } from 'app/theme/nga.module';


@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Login
  ]
})
export class LoginModule {}
