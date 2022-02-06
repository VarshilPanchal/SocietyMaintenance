import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(SAMPLE_ROUTES)],
    exports: [RouterModule]
})

export class UserDataRoutingModule { }