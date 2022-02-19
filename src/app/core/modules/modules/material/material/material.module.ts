import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastrModule } from 'ngx-toastr';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListboxModule } from 'primeng/listbox';
import { PaginatorModule } from 'primeng/paginator';
import { AccordionModule } from 'primeng/accordion';
import { ChipsModule } from 'primeng/chips';
import { CarouselModule } from 'primeng/carousel';
import { PickListModule } from 'primeng/picklist';
import { CalendarModule } from 'primeng/calendar';
import { DataViewModule } from 'primeng/dataview';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { TimelineModule } from "primeng/timeline";
import { TabViewModule } from 'primeng/tabview';
import { RatingModule } from 'primeng/rating';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from "primeng/checkbox";
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import {MatDialogModule } from '@angular/material/dialog';
import {MatToolbarModule } from '@angular/material/toolbar';
const materialModule =
  [
    LayoutModule,
    CommonModule,
    ToastModule,
    RippleModule,
    TableModule,
    DropdownModule,
    DialogModule,
    InputTextModule,
    ButtonModule,

    TableModule,
    KeyFilterModule,
    TabViewModule,

    AutoCompleteModule,
    KeyFilterModule,
    MessagesModule,
    MessageModule,
    TooltipModule,
    ToastrModule,
    FieldsetModule,
    CardModule,
    PasswordModule,
    RadioButtonModule,
    InputNumberModule,
    ListboxModule,
    PaginatorModule,
    AccordionModule,
    ChipsModule,
    CarouselModule,
    PickListModule,
    DataViewModule,
    CalendarModule,
    OverlayPanelModule,
    InputTextareaModule,
    MultiSelectModule,
    TimelineModule,
    TabViewModule,
    RatingModule,
    ProgressSpinnerModule,
    InputMaskModule,
    CheckboxModule,
    AvatarModule,
    AvatarGroupModule,
    MatDialogModule,
    MatToolbarModule
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


