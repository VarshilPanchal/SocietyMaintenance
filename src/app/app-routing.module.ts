import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/gaurds/auth.guard';
import { AuthGuardAdmin } from './core/gaurds/auth.guardAdmin';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth/login', data: { title: 'auth' } },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuardAdmin] },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(auth => auth.AuthModule) },
  { path: 'sample', loadChildren: () => import('./modules/sample/sample.module').then(m => m.SampleModule) },
  { path: 'users', loadChildren: () => import('./modules/user-data/user-data.module').then(m => m.UserDataModule), canActivate: [AuthGuard] },
  { path: 'common', loadChildren: () => import('./modules/common/common.module').then(m => m.CommonModule) },
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
