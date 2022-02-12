import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMethodName } from 'src/app/core/constants/ApiMethodName';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { HttpService } from 'src/app/core/services/http-services/http.service';
import { LocalStorageService } from 'src/app/core/services/localstorage-service/localstorage.service';
import { AngularFirestore, Query, CollectionReference, } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  queryParam: URLSearchParams | undefined;
  dataTableParams = {
    offset: 0,
    size: 10,
    sortField: 'NAME',
    sortOrder: 1,
    searchText: null
  };
  
  // q = Query('user', where("username", "==", "CA"));
//   ref = firebase.database().ref("diagnostics")
// ref.orderByChild("key").equalTo("-LF2eRf1lHI6X3U6C7Yh")
  userRef;
  constructor(
    private httpService: HttpService,
    private storageService: LocalStorageService,
    private router: Router,
    private errorService: ErrorService,
    private fireServices: AngularFirestore,
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

  
  getUser(username): any {
    this.queryParam = this.prepareQueryParam(this.dataTableParams);
    return this.angularFireDatabase.object('user/' + username);
  }

  changePassword(username, data, password){
    return this.angularFireDatabase.object('user/' + username).set({
      amount: data.amount,
      createdDate: data.createdDate,
      id: data.id,
      updatedDate: data.updatedDate,
      user_name: data.user_name, 
      password: password
    })
  }


}
