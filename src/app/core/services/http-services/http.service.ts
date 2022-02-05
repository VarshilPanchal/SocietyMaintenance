import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiMethodName } from '../../constants/ApiMethodName';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private error: ErrorService
  ) { }

  requestCall(api: string, method: ApiMethodName, data?: any): any {

    const url = `${environment.apiEndPoint}${api}`;

    let response: Observable<any>;

    switch (method) {
      case ApiMethodName.GET:
        return response = this.http.get(`${url}`).pipe(
          map((res: any) => {
            this.errorNotification(res);
            return res;
          }),
          catchError(async (err) => await this.handleError(err, this)));
        break;

      case ApiMethodName.POST:
        return response = this.http.post(`${url}`, data).pipe(
          map((res: any) => {
            this.errorNotification(res);
            return res;
          }),
          catchError(async (err) => await this.handleError(err, this)));
        break;

      case ApiMethodName.PUT:
        return response = this.http.put(`${url}`, data).pipe(
          map((res: any) => {
            this.errorNotification(res);
            return res;
          }),
          catchError(async (err) => await this.handleError(err, this)));
        break;

      case ApiMethodName.DELETE:
        return response = this.http.delete(`${url}`, data).pipe(
          map((res: any) => {
            this.errorNotification(res);
            return res;
          }),
          catchError(async (err) => await this.handleError(err, this)));
        break;

      default:
        break;
    }
  }

  private errorNotification(res: any) {
    // if (res.statusCode !== '200' && res) {
    //   if (res.message.length > 4) {
    //     this.error.userNotification(res.statusCode, res.message);
    //   } else {
    //     this.error.userNotification(res.statusCode, res.errorCode);
    //   }
    // }
  }

  handleError(error: HttpErrorResponse, self: this): any {
    console.log('Error Service', error);
    if (error.error instanceof ErrorEvent) {
      console.error('An error ocured', error.error.message);
    } else {
      this.error.whichError(error.status, error.message);
      return throwError({ error: error.message, status: error.status });
    }
  }

}
