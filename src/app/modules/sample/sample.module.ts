import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DemoComponent } from './components/demo/demo.component';
import { SampleComponent } from './sample.component';
import { SampleRoutingModule } from './sample.routing';



@NgModule({
  declarations: [
    SampleComponent,
    DemoComponent,
  ],
  imports: [
    CommonModule,
    SampleRoutingModule
  ]
})
export class SampleModule { }
