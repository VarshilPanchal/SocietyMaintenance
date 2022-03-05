import {
    HttpEvent, HttpHandler, HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
// tslint:disable-next-line: class-name
export class httpInterceptor implements HttpInterceptor {

    count = 0;
    endPoint: any = environment.apiEndPoint;
    requestList = [
        // environment.apiEndPoint+'user/signUp',
        environment.apiEndPoint + 'oauth/token'
    ];
    constructor(
        private spinner: NgxSpinnerService,
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.regexForFilterData(req.url) || this.requestList.includes(req.url)) {
            return next.handle(req);
        } else {
            this.spinner.show();
            this.count++;
            return next.handle(req)
                .pipe(tap(
                    event => {},
                    error => console.log(error)
                ), finalize(() => {
                    this.count--;
                    if (this.router.url === '/') {
                        if (this.count === 0) {
                            setTimeout(() => {
                                if (this) {
                                    this.spinner.hide();
                                }
                            }, 0);
                        }
                    } else {
                        if (this.count === 0) {
                            setTimeout(() => {
                                if (this) {
                                    this.spinner.hide();
                                }
                            }, 1000);
                        }
                    }
                })
                );
        }
    }

    regexForFilterData(urlString: any): boolean {
        if (urlString.indexOf('/filterData') > -1 || urlString.indexOf('unreadCount/') > -1) {
            return true;
        } else {
            return false;
        }
    }
}
