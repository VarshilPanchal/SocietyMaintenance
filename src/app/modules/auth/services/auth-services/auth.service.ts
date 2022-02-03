import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { HttpService } from 'src/app/core/services/http-services/http.service';
import { LocalStorageService } from 'src/app/core/services/localstorage-service/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
    private storageService: LocalStorageService,
    private router: Router,
    private errorService: ErrorService
  ) { }


}
