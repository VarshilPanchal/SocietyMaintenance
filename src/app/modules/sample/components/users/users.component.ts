import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { SampleService } from '../../services/sample-services/sample.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private sampleService: SampleService,
    private errorService: ErrorService,
    private angularFireDatabase: AngularFireDatabase) {
  }
  ngOnInit(): void {
    this.postData();
    // this.getSampleData();
  }

  postData() {
    const userObject = {
      id: "string",
      createdDate: new Date(),
      updatedDate: new Date(),
      password: "string",
      user_name: "vinita",
      amount: 10
    }
    // const userObject = [{
    //   id: "string",
    //   createdDate: new Date(),
    //   updatedDate: new Date(),
    //   password: "string",
    //   user_name: "vinita",
    //   amount: 10
    // },
    // {
    //   id: "string",
    //   createdDate: new Date(),
    //   updatedDate: new Date(),
    //   password: "string",
    //   user_name: "vinita",
    //   amount: 10
    // },
    // {
    //   id: "string",
    //   createdDate: new Date(),
    //   updatedDate: new Date(),
    //   password: "string",
    //   user_name: "vinita",
    //   amount: 10
    // },
    // {
    //   id: "string",
    //   createdDate: new Date(),
    //   updatedDate: new Date(),
    //   password: "string",
    //   user_name: "vinita",
    //   amount: 10
    // }];
    this.angularFireDatabase.database.ref('user').child('A101').set(userObject);
    // this.sampleService.samplePut(userObject).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     if (data.statusCode === '200' && data.message === 'OK') {
    //       this.errorService.userNotification(data.statusCode, 'Post Data');
    //     }
    //   },
    //   (err: Error) => {
    //     console.error(err);
    //   }
    // );
  }

  
  getSampleData() {
    this.sampleService.sampleGet().subscribe(
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