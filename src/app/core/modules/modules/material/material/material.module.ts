import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TabViewModule } from 'primeng/tabview';

const materialModule =
  [
    CommonModule,
    CardModule,
    ButtonModule,
    TableModule,
    KeyFilterModule,
    TabViewModule
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
