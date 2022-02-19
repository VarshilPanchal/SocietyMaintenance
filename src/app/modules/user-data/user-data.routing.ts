import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseAndIncomeComponent } from './components/expense-and-income/expense-and-income.component';
import { PaySummaryComponent } from './components/pay-summary/pay-summary.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { UserDataComponent } from './user-data.component';

export const SAMPLE_ROUTES: Routes = [
    {
        path: '',
        component: UserDataComponent,
        children: [
            {
                path: 'user',
                component: UsersComponent
            },
            {
                path: 'pay-summary',
                component: PaySummaryComponent
            },
            {
                path: 'user-dashboard',
                component: UserDashboardComponent
            },
            {
                path: 'expense-income',
                component: ExpenseAndIncomeComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(SAMPLE_ROUTES)],
    exports: [RouterModule]
})

export class UserDataRoutingModule { }