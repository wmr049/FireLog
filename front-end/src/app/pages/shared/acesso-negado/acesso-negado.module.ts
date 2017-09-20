import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AcessoNegadoComponent } from './acesso-negado.component';
import { routing } from './acesso-negado.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      routing,
  ],
  declarations: [
    AcessoNegadoComponent,
  ],
})

export class AcessoNegadoModule {}
