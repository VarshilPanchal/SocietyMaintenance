import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ErrorComponent } from './error.component';


export const ERROR_ROUTES: Routes = [
    { path: '', component: ErrorComponent },
];

@NgModule({
    imports: [RouterModule.forChild(ERROR_ROUTES)],
    exports: [RouterModule]
})

export class ErrorRoutingModule { }