import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';


const materialModule =
  [
    CommonModule,
    CardModule,
    ButtonModule,
    TableModule
  ];

@NgModule({
  declarations: [],
  imports: [
    materialModule
  ],
  exports: [
    materialModule
  ]
})

export class MaterialModule { }
