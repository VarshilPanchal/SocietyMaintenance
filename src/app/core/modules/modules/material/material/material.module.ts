import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import {ButtonModule} from 'primeng/button';


const materialModule = [CommonModule, CardModule,ButtonModule];

@NgModule({
  declarations: [],
  imports: [
    materialModule
  ],
  exports: [
    materialModule
  ]
})

export class MaterialModule { }
