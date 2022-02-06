import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/modules/modules/material/material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ExpenseandincomeComponent } from './expenseandincome/expenseandincome.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [ExpenseandincomeComponent,  AdminComponent,
    DashboardComponent,],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule

  ]
})
export class AdminModule{}