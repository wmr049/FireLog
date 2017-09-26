import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../theme/nga.module';
import { AppTranslationModule } from 'app/app.translation.module';
import { Register } from './register.component';
import { routing } from './register.routing';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    AppTranslationModule,
    routing
  ],
  declarations: [
    Register
  ],
})
export class RegisterModule {}
