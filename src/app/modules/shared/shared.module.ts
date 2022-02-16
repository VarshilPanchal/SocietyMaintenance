import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberToWordsPipe } from 'src/app/number-to-words.pipe';



@NgModule({
  declarations: [NumberToWordsPipe],
  imports: [
    CommonModule
  ],
  exports: [
    NumberToWordsPipe
  ]
})
export class SharedModule { }
