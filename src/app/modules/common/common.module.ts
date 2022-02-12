import { NgModule } from '@angular/core';
import { CommonRoutingModule } from './common-routing.module';
import { CommonComponent } from './common.component';


@NgModule({
  declarations: [CommonComponent],
  imports: [
    CommonRoutingModule
  ]
})
export class CommonModule { }
