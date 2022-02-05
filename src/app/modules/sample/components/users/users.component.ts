import { Component, OnInit } from '@angular/core';
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
    private errorService: ErrorService) {
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
      user_name: "string",
      amount: 10
    };
    this.sampleService.samplePost(userObject).subscribe(
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
