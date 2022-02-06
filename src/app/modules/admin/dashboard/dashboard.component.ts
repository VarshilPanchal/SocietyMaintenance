import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { DashboardServicesService } from 'src/app/shared/services/dashboard-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService: DashboardServicesService,
    private errorService: ErrorService,
  ) { }

  users;

  ngOnInit(): void {
    this.getSampleData();
  }

  getSampleData() {
    this.dashboardService.dashboardGet().subscribe(
      (data: any) => {
        this.users = Object.keys(data).map(key => ({ type: key, value: data[key] }));
        this.users.forEach(
          user => {
            console.log(user);
          });
        console.log(this.users);

        this.users.forEach(user => {
          
        });

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
