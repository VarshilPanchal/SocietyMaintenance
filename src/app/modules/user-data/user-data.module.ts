import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataRoutingModule } from './user-data.routing';
import { UsersComponent } from './components/users/users.component';
import { UserDataComponent } from './user-data.component';
import { MaterialModule } from 'src/app/core/modules/modules/material/material/material.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PaySummaryComponent } from './components/pay-summary/pay-summary.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';



@NgModule({
  declarations: [
    UserDataComponent,
    UsersComponent,
    UserProfileComponent,
    PaySummaryComponent,
    UserDashboardComponent,
  ],
  imports: [
    CommonModule,
    UserDataRoutingModule,
    MaterialModule
  ]
})
export class UserDataModule { }
