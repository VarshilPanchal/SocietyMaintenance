import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { AuthService } from '../../services/auth-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  dataTableParams = {
    offset: 0,
    size: 10,
    sortField: 'NAME',
    sortOrder: 1,
    searchText: null
  };
  queryParam: URLSearchParams | undefined;

  constructor(
   private authService: AuthService,
   private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.getSampleData();
  }
  prepareQueryParam(paramObject: any) {
    const params = new URLSearchParams();
    // tslint:disable-next-line: forin
    for (const key in paramObject) {
      params.set(key, paramObject[key]);
    }
    return params;
  }
  getSampleData() {
    let filterMap = new Map();
    this.queryParam = this.prepareQueryParam(this.dataTableParams);
    this.authService.getUser(this.queryParam).subscribe(
      (data: any) => {
        console.log(data);
        if (data.statusCode === '200' && data.message === 'OK') {
          this.errorService.userNotification(data.statusCode, 'Get Data');
        }
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }
}
