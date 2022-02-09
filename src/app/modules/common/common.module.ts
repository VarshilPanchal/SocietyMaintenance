import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonRoutingModule } from './common-routing.module';
import { CommonComponent } from './common.component';


@NgModule({
  declarations: [CommonComponent],
  imports: [
    CommonModule,
    CommonRoutingModule
  ]
})
export class CommonModule { }
