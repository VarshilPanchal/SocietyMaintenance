import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiMethodName } from 'src/app/core/constants/ApiMethodName';
import { HttpService } from 'src/app/core/services/http-services/http.service';

import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class DashboardServicesService {

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
    private http: HttpClient,
    private angularFireDatabase: AngularFireDatabase
  ) { }

  prepareQueryParam(paramObject: any) {
    const params = new URLSearchParams();
    // tslint:disable-next-line: forin
    for (const key in paramObject) {
      params.set(key, paramObject[key]);
    }
    return params;
  }

  dashboardGet(): any {
    this.queryParam = this.prepareQueryParam(this.dataTableParams);
    const url = 'user.json' + '?' + this.queryParam;
    return this.httpService.requestCall(url, ApiMethodName.GET);
  }

  getFeesData(): any {
    this.queryParam = this.prepareQueryParam(this.dataTableParams);
    const url = 'feesmaster.json' + '?' + this.queryParam;
    // return this.http.get('https://societymaintenance-e775d-default-rtdb.firebaseio.com/FeesMaster');
    return this.httpService.requestCall(url, ApiMethodName.GET);
  }

  getMaintenanceAmountData(): any {
    this.queryParam = this.prepareQueryParam(this.dataTableParams);
    const url = 'maintenancemaster.json' + '?' + this.queryParam;
    // return this.http.get('https://societymaintenance-e775d-default-rtdb.firebaseio.com/FeesMaster');
    return this.httpService.requestCall(url, ApiMethodName.GET);
  }

  dashboardGetById(): any {
    return this.http.get('https://societymaintenance-e775d-default-rtdb.firebaseio.com/user/0');
  }

  // userGetById(id): any {
  //   return this.http.get('https://societymaintenance-e775d-default-rtdb.firebaseio.com/user/'+ id);
  // }

  getUser(username): any {
    this.queryParam = this.prepareQueryParam(this.dataTableParams);
    return this.angularFireDatabase.object('user/' + username);
  }

  dashboardPost(data: any): any {
    const url = 'user.json';
    return this.httpService.requestCall(url, ApiMethodName.POST, data);
  }

  generatedMaintenanceBillPost(data: any): any {
    const url = 'maintenancemaster.json';
    return this.httpService.requestCall(url, ApiMethodName.POST, data);
  }
  editMaintenanceBill(data: any): any {
    const url = 'maintenancemaster.json';
    return this.httpService.requestCall(url, ApiMethodName.PUT, data);
  }

  dashboardPut(data: any): any {
    const url = 'user.json';
    return this.httpService.requestCall(url, ApiMethodName.PUT, data);
  }

  dashboardDelete(data: any): any {
    const url = 'user.json';
    return this.httpService.requestCall(url, ApiMethodName.DELETE, data);
  }

}
