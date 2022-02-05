import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DemoComponent } from './components/demo/demo.component';
import { SampleComponent } from './sample.component';
import { SampleRoutingModule } from './sample.routing';
import { UsersComponent } from './components/users/users.component';



@NgModule({
  declarations: [
    SampleComponent,
    DemoComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    SampleRoutingModule
  ]
})
export class SampleModule { }
