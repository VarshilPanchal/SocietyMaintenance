import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/modules/modules/material/material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ExpenseandincomeComponent } from './expenseandincome/expenseandincome.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReceiveMaintainenceComponent } from './receive-maintainence/receive-maintainence.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [ExpenseandincomeComponent,  AdminComponent,
    DashboardComponent,
    UserProfileComponent,
    ReceiveMaintainenceComponent,
    ChangePasswordComponent,],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule

  ]
})
export class AdminModule{}