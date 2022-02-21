import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './core/modules/modules/material/material/material.module';
import { HttpService } from './core/services/http-services/http.service';
import { httpInterceptor } from './core/services/interceptor/httpInterceptor';
import { LocalStorageService } from './core/services/localstorage-service/localstorage.service';
import { NotificationService } from './core/services/notification/notification.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { CardModule } from 'primeng/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './modules/common/header/header.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { AdminComponent } from './modules/admin/admin.component';
import { FooterComponent } from './modules/common/footer/footer.component';
import { NgxNumToWordsModule } from 'ngx-num-to-words';
import { AuthGuard } from './core/gaurds/auth.guard';
import { AuthGuardAdmin } from './core/gaurds/auth.guardAdmin';
import { LoginHeaderComponent } from './modules/common/login-header/login-header.component';
// import { NumberToWordsPipe } from './number-to-words.pipe'; 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginHeaderComponent,
    FooterComponent,
    // NumberToWordsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxNumToWordsModule
    // MaterialModule,
  ],
  providers: [
    NotificationService,
    LocalStorageService,
    HttpService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: httpInterceptor,
      multi: true,
    },
    AuthGuard,
    AuthGuardAdmin,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
