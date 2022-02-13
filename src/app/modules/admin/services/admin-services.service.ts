import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMethodName } from 'src/app/core/constants/ApiMethodName';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { HttpService } from 'src/app/core/services/http-services/http.service';
import { LocalStorageService } from 'src/app/core/services/localstorage-service/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

  dataTableParams = {
    offset: 0,
    size: 10,
    sortField: 'NAME',
    sortOrder: 1,
    searchText: null
  };

  queryParam: URLSearchParams | undefined;

  constructor(
    private httpService: HttpService,
    private storageService: LocalStorageService,
    private router: Router,
    private errorService: ErrorService,
    private http: HttpClient
  ) { }
  prepareQueryParam(paramObject: any) {
    const params = new URLSearchParams();
    // tslint:disable-next-line: forin
    for (const key in paramObject) {
      params.set(key, paramObject[key]);
    }
    return params;
  }
  addIncome(data: any): any {
    const url = 'amount.json';
    return this.httpService.requestCall(url, ApiMethodName.POST, data);
  }
  getIncomeAndExpenses(dataTableParams): any {
    this.queryParam = this.prepareQueryParam(dataTableParams);
    const url = 'amount.json' + '?' + this.queryParam;
    return this.httpService.requestCall(url, ApiMethodName.GET);
  }

  sampleGet(): any {
    this.queryParam = this.prepareQueryParam(this.dataTableParams);
    const url = 'user.json' + '?' + this.queryParam;
    return this.httpService.requestCall(url, ApiMethodName.GET);
  }

  sampleGetById(): any {
    return this.http.get('https://societymaintenance-e775d-default-rtdb.firebaseio.com/user/0');
  }

  samplePost(data: any): any {
    const url = 'user.json';
    return this.httpService.requestCall(url, ApiMethodName.POST, data);
  }

  samplePut(data: any): any {
    const url = 'user.json';
    return this.httpService.requestCall(url, ApiMethodName.PUT, data);
  }

  sampleDelete(data: any): any {
    const url = 'user.json';
    return this.httpService.requestCall(url, ApiMethodName.DELETE, data);
  }


}
