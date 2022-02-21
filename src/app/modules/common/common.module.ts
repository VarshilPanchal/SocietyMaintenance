import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/core/modules/modules/material/material/material.module';
import { CommonRoutingModule } from './common-routing.module';
import { CommonComponent } from './common.component';
import { ConfirmDialogueComponent } from './confirm-dialogue/confirm-dialogue.component';
import { LoginHeaderComponent } from './login-header/login-header.component';


@NgModule({
  declarations: [CommonComponent],
  imports: [
    CommonRoutingModule,
    MaterialModule
  ],
  exports: [
    
  ]
})
export class CommonModule { }
