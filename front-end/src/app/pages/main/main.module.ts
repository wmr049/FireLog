import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainComponent } from './main.component';
import { routing } from './main.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      routing,
  ],
  declarations: [
    MainComponent,
  ],
})
export class MainModule {}
