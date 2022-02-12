import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CommonComponent } from './common.component';

const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
        {
            path: 'about-us',
            component: AboutUsComponent
        },
      
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonRoutingModule { }
