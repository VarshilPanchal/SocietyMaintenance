import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth', data: { title: 'auth' } },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(auth => auth.AuthModule) },
  { path: 'sample', loadChildren: () => import('./modules/sample/sample.module').then(m => m.SampleModule) },
  { path: 'users', loadChildren: () => import('./modules/user-data/user-data.module').then(m => m.UserDataModule) },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  {
    path: '404',
    loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule)
  },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
