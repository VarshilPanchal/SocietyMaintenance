import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseandincomeComponent } from './expenseandincome/expenseandincome.component';
import { ReceiveMaintainenceComponent } from './receive-maintainence/receive-maintainence.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'expense-income',
        component: ExpenseandincomeComponent
      },
      {
        path: 'receive-maintainence',
        component: ReceiveMaintainenceComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
     
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
