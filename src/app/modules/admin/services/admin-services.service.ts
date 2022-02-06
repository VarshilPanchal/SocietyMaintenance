import { Injectable } from '@angular/core';
import { ApiMethodName } from 'src/app/core/constants/ApiMethodName';
import { HttpService } from 'src/app/core/services/http-services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {
  queryParam: URLSearchParams | undefined;

  constructor(private httpService: HttpService) { }

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
  
}
