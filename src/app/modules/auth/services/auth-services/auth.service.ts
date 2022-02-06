import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMethodName } from 'src/app/core/constants/ApiMethodName';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { HttpService } from 'src/app/core/services/http-services/http.service';
import { LocalStorageService } from 'src/app/core/services/localstorage-service/localstorage.service';
import { AngularFirestore, Query, CollectionReference, } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

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
  db = AngularFireDatabase;
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

  getUser(queryParam): any {
    this.queryParam = this.prepareQueryParam(this.dataTableParams);
    const url = 'user.json' + '?' + queryParam;
  //   firebase.database().ref('/tests')
  // .orderByChild("serie").equalTo("0")
  // .on('value',(data: DataSnapshot) => {
  //   data.forEach((child: DataSnapshot) => {
  //     console.log(child.key, child.val());
  //   });
  // return this.fireServices.collection('users',ref => ref.where('username', '>=', "string").
    // return this.httpService.requestCall(url, ApiMethodName.GET);
    // return this.fireServices.collection('user',ref => ref.where('user_name').equalTo("string"));
    // fs.collection('items', ref => ref.where('size', '==', 'large'))
    // console.log(this.fireServices.collection('user',ref => ref.where('user_name', '==', "vinita")
    // .where('user_name', '==', "vinita" + '\uf8ff'))
    // .snapshotChanges())
    this.userRef = this.fireServices.collection('user').ref;
    console.log(this.angularFireDatabase.object('user'));
  //   this.userRef.child('Mv8uZX5J25RhR0s2qHA').orderByChild('user_name').equalTo('vinita').on("value", function(snapshot) {
  //     console.log(snapshot.val());
  //     snapshot.forEach(function(data) {
  //         console.log(data.key);
  //     });
  // });
    console.log(this.db.name)
    console.log(this.fireServices.collection('user').valueChanges());
    // return this.fireServices.collection('user').valueChanges();
    // return this.fireServices.collection('user',ref => ref.orderBy('-Mv8uZX5J25RhR0s2qHA.user_name').startAt('vi')).snapshotChanges();
    console.log(this.angularFireDatabase.database.ref('users'));
    return this.fireServices.collection('user', ref => ref.where('-Mv8uZX5J25RhR0s2qHA.user_name', '==', 'vinita')).snapshotChanges()
    
    // return this.fireServices.collection('user', ref => {
    //   let query : CollectionReference | Query = ref;
    //    query = query.where('user_name', '==', 'vinita')
    //   return query;
    // }).valueChanges();
    // return this.fireServices.collection('user', ref => ref.where('user_name', '==', 'string'));
  }


}
