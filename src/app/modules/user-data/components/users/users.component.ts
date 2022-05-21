import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { UserMaster } from 'src/app/shared/interfaces/UserMaster';
import { UserService } from '../../services/user-services/user.service';
import * as XLSX from 'xlsx';
import { AdminServicesService } from 'src/app/modules/admin/services/admin-services.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  file: File;
  arrayBuffer: any;
  filelist: any[];

  constructor(
    private userService: UserService,
    private errorService: ErrorService,
    private angularFireDatabase: AngularFireDatabase,
    private adminService: AdminServicesService) {
  }

  users: UserMaster[] = [];
  cols = [
    { header: 'user_name' },
    { header: 'password' },
    { header: 'amount' }
  ]

  ngOnInit(): void {
    // this.addfile();
    // this.postData();
    // this.putData();
    // this.getSampleData();
    // this.addBalance();
    // this.getSampleDataById();
  }

  postData() {
    const userObject = {
      id: "dummy",
      createdDate: new Date().getTime(),
      updatedDate: new Date().getTime(),
      password: "dummy@123",
      user_name: "Dummy",
      amount: 0,
      previousReading:"100"
    };
    // this.userService.samplePostData(userObject);
    this.angularFireDatabase.database.ref('user').child('dummy').set(userObject);
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
  addfile(event)     
  {  
    this.file= event.target.files[0];   
  // this.file= new File("assets/SoceityMaintenanceUsernameAndPassword.xlsx");    
  let fileReader = new FileReader();    
  fileReader.readAsArrayBuffer(this.file);     
  fileReader.onload = (e) => {    
      this.arrayBuffer = fileReader.result;    
      var data = new Uint8Array(this.arrayBuffer);    
      var arr = new Array();    
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
      var bstr = arr.join("");    
      var workbook = XLSX.read(bstr, {type:"binary"});    
      var first_sheet_name = workbook.SheetNames[0];    
      var worksheet = workbook.Sheets[first_sheet_name];     
      var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});   
      console.log(arraylist);  
      this.filelist = [];    
      this.filelist = arraylist;
      this.filelist.forEach(data=>{
      
      const userObject = {
        id: data.id,
        createdDate: new Date().getTime(),
        updatedDate: new Date().getTime(),
        password: data.password,
        user_name: data.user_name,
        amount: data.Amount,
        previousReading: data.previousReading
      };
      this.angularFireDatabase.database.ref('user').child(data.id).set(userObject);
    });
  }    
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
  addBalance(){
    const object = {
      id: 'Balance',
      createdDate: new Date(),
      updatedDate: new Date(),
      userMasterId: '',
      amountType: 'Credit',
      payTo: '',
      payType: '',
      reading: '',
      amount: 209802.52,
      description:'Manual Balance entry',
      bankName: '',
      referenceNo: '',
    }
    this.adminService.addIncome(object).subscribe(
      (data: any) => {
        // console.log(data);
        // this.hidePaymentDialog();
        // this.getIncome();
        if (data.statusCode === '200' && data.message === 'OK') {

        }
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }
}
