import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PATH_CONSTANTS } from 'src/app/core/constants/PathConstants';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { LocalStorageService } from 'src/app/core/services/localstorage-service/localstorage.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { CustomValidator } from 'src/app/core/services/util/CustomValidator';
import { AuthService } from '../../auth/services/auth-services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  dataTableParams = {
    offset: 0,
    size: 10,
    sortField: 'NAME',
    sortOrder: 1,
    searchText: null
  };
  queryParam: URLSearchParams | undefined;
  loginForm: FormGroup;
  loginData;
  submitted = false;
  constructor(
   private authService: AuthService,
   private errorService: ErrorService,
   private formBuilder: FormBuilder,
   private notificationService: NotificationService,
   private route: Router,
   private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', CustomValidator.required],
      password: ['', CustomValidator.required]
    })
  }
  prepareQueryParam(paramObject: any) {
    const params = new URLSearchParams();
    // tslint:disable-next-line: forin
    for (const key in paramObject) {
      params.set(key, paramObject[key]);
    }
    return params;
  }
  onSubmit(loginForm) {
    if (!this.loginForm.valid) {
      CustomValidator.markFormGroupTouched(this.loginForm);
      this.submitted = true;
      return false;
    }
    const username = this.loginForm.controls.username.value as string;
    const password = this.loginForm.controls.password.value;

    this.authService.getUser(username).valueChanges().subscribe(
      (data: any) => {
        console.log(data);
        if(data){
          this.loginData = data;
          this.authService.changePassword(username, data, password)
          this.notificationService.error('Password Updated','');
        }else{
          this.notificationService.error('Invalid Username','');
        }
        
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }

}
