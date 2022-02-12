import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { UserMaster } from 'src/app/shared/interfaces/UserMaster';
import { UserService } from '../../services/user-services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private userService: UserService,
    private errorService: ErrorService,
    private angularFireDatabase: AngularFireDatabase) {
  }

  users: UserMaster[] = [];
  cols = [
    { header: 'user_name' },
    { header: 'password' },
    { header: 'amount' }
  ]

  ngOnInit(): void {
    this.postData();
    // this.putData();
    this.getSampleData();
    // this.getSampleDataById();
  }

  postData() {
    const userObject = {
      id: "string",
      createdDate: new Date().getTime(),
      updatedDate: new Date().getTime(),
      password: "string",
      user_name: "A104",
      amount: 10
    };
    // this.userService.samplePostData(userObject);
    this.angularFireDatabase.database.ref('user').child('A104').set(userObject);
    // this.userService.samplePost(userObject).subscribe(
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

  putData() {
    const userObject = [
      {
        id: "string",
        createdDate: new Date(),
        updatedDate: new Date(),
        password: "string",
        user_name: "string",
        amount: 10
      }, {
        id: "string",
        createdDate: new Date(),
        updatedDate: new Date(),
        password: "string",
        user_name: "string",
        amount: 10
      },
      {
        id: "string",
        createdDate: new Date(),
        updatedDate: new Date(),
        password: "string",
        user_name: "string",
        amount: 10
      },
      {
        id: "string",
        createdDate: new Date(),
        updatedDate: new Date(),
        password: "string",
        user_name: "string",
        amount: 10
      },
      {
        id: "string",
        createdDate: new Date(),
        updatedDate: new Date(),
        password: "string",
        user_name: "string",
        amount: 10
      }
    ];
    this.userService.samplePut(userObject).subscribe(
      (data: any) => {
        console.log(data);
        if (data.statusCode === '200' && data.message === 'OK') {
          this.errorService.userNotification(data.statusCode, 'Post Data');
        }
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }


  getSampleData() {
    this.userService.sampleGet().subscribe(
      (data: any) => {
        // this.users = JSON.stringify(data);
        this.users = data;
        // this.users.forEach(e=>{
        //   console.log(new Date(e.createdDate));
        // })
        const users = Object.keys(data).map(key => ({ type: key, value: data[key] }));
        users.forEach(
          user => {
            console.log(new Date(user.value.createdDate));

          });
        console.log(this.users);

        if (data.statusCode === '200' && data.message === 'OK') {
          this.errorService.userNotification(data.statusCode, 'Get Data');
        }
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }


  getSampleDataById() {
    this.userService.sampleGetById().subscribe(
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
