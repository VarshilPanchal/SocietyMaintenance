import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


export const AUTH_ROUTES: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'signup',
                component: SignupComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(AUTH_ROUTES)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }