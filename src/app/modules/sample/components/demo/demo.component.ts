import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { SampleService } from '../../services/sample-services/sample.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor(
    private sampleService: SampleService,
    private errorService: ErrorService) {
  }

  ngOnInit() {
    this.getSampleData();
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

  postData() {
    const regionObject = {
      createdBy: 'string',
      createdDate: '2021-10-08T09:53:34.718Z',
      enable: true,
      id: 'string',
      isEnable: true,
      name: 'custom region',
      updatedBy: 'string',
      updatedDate: '2021-10-08T09:53:34.718Z'
    };
    this.sampleService.samplePost(regionObject).subscribe(
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


  putData() {
    const regionObject = {
      createdBy: '1',
      createdDate: '2021-10-08T04:25:40.000+00:00',
      enable: true,
      id: '8addea44-4f9e-4888-b629-53fa19046350',
      isEnable: true,
      name: '1',
      updatedBy: '1',
      updatedDate: '2021-10-08T04:25:40.000+00:00'
    };
    this.sampleService.samplePut(regionObject).subscribe(
      (data: any) => {
        console.log(data);
        if (data.statusCode === '200' && data.message === 'OK') {
          this.errorService.userNotification(data.statusCode, 'Update Data');
        }
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }


  deleteData() {
    const regionObject = {
      id: '8addea44-4f9e-4888-b629-53fa19046350',
    };

    this.sampleService.sampleDelete(regionObject).subscribe(
      (data: any) => {
        console.log(data);
        if (data.statusCode === '200' && data.message === 'OK') {
          this.errorService.userNotification(data.statusCode, 'Delete Data');
        }
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }

}
