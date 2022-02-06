import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpenseandincomeComponent } from './expenseandincome/expenseandincome.component';
import { MaterialModule } from 'src/app/core/modules/modules/material/material/material.module';


@NgModule({
  declarations: [ExpenseandincomeComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AdminModule { }
