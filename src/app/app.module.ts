import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
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

import { AngularFireModule} from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { CardModule } from 'primeng/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './shared/header/header.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { AdminComponent } from './modules/admin/admin.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    AdminComponent,
    FooterComponent
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
