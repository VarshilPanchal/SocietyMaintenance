import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PATH_CONSTANTS } from 'src/app/core/constants/PathConstants';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { LocalStorageService } from 'src/app/core/services/localstorage-service/localstorage.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { CustomValidator } from 'src/app/core/services/util/CustomValidator';
import { AuthService } from '../../services/auth-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  imageUrl = 'assets/img/logo_transparent.png';

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
  display: boolean = false;
  constructor(
    private authService: AuthService,
    private errorService: ErrorService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private route: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    const user = this.localStorageService.getLoginUserObject();
    if (user) {
      if (user.id === 'Admin') {
        this.route.navigate([PATH_CONSTANTS.ADMIN_DASHBOARD]);
      } else {
        this.route.navigate([PATH_CONSTANTS.USER_DASHBOARD]);
      }
    }

    this.loginForm = this.formBuilder.group({
      username: ['', CustomValidator.required],
      password: ['', CustomValidator.required]
    });
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
        if (data) {
          this.loginData = data;
          if (this.loginData.password === password) {
            // this.notificationService.success('Signin Succesfull','');
            this.localStorageService.setItem('user', this.loginData);
            // if (this.loginData.id === 'Admin') {
            //   this.route.navigate([PATH_CONSTANTS.ADMIN_DASHBOARD]);
            // } else {
            //   this.route.navigate([PATH_CONSTANTS.USER_DASHBOARD]);
            // }
            this.openDialog();
            // setTimeout(() => {
            // }, 100);
            // setTimeout(() => {
            //   window.location.reload();
            // }, 1500);
          } else {
            this.notificationService.error('Enter Valid password', '');
          }
        } else {
          this.notificationService.error('Invalid credentials', '');
        }

      },
      (err: Error) => {
        console.error(err);
      }
    );
  }
  openDialog() {
    this.display = true
  }
  onSubmitDialog() {
    if (this.loginData.id === 'Admin') {
      this.route.navigate([PATH_CONSTANTS.ADMIN_DASHBOARD]);
    } else {
      this.route.navigate([PATH_CONSTANTS.USER_DASHBOARD]);
    }
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
}
