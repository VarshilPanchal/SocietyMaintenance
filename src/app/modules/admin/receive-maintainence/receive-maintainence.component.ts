import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder } from '@angular/forms';
import { COMMON_CONSTANTS } from 'src/app/core/constants/CommonConstants';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { DashboardServicesService } from 'src/app/shared/services/dashboard-services.service';

@Component({
  selector: 'app-receive-maintainence',
  templateUrl: './receive-maintainence.component.html',
  styleUrls: ['./receive-maintainence.component.css']
})
export class ReceiveMaintainenceComponent implements OnInit {

  maintenanceData = [];
  lstofMaintenance = [];

  // Paginator
  totalRecords: Number = 0;
  size = COMMON_CONSTANTS.MASTER_TABLE_ROW_SIZE;
  rowsPerPageOptions = COMMON_CONSTANTS.MASTER_TABLE_PAGINATE_DROPDOWN;

  cols = [
    { header: 'User Id' },
    { header: 'Amount' },
    { header: 'Used Unit' },
    { header: 'Previous Reading' },
    { header: 'Current Reading' },
    { header: 'Payment Type' },
    { header: 'Action' },
  ];

  generatedMintenanceColumns = [
    { label: 'Description' },
    { label: 'Amount/Unit' },
  ];

  paymentType = [
    { label: 'Cheque' },
    { label: 'Cash' },
    { label: 'Online' },
  ];

  constructor(
    private dashboardService: DashboardServicesService,
    private errorService: ErrorService,
    // tslint:disable-next-line: variable-name
    private _formBuilder: FormBuilder,
    private angularFireDatabase: AngularFireDatabase
  ) { }

  ngOnInit(): void {
    this.getSampleData();
  }

  getSampleData(): any {
    this.dashboardService.getMaintenanceAmountData().subscribe(
      (data: any) => {
        console.log(data);
        this.maintenanceData = Object.keys(data).map(key => ({ type: key, value: data[key] }));
        this.maintenanceData.forEach(
          (e) => {
            this.lstofMaintenance.push(e.value);
          });
        this.totalRecords = this.maintenanceData.length;
        if (data.statusCode === '200' && data.message === 'OK') {
          this.errorService.userNotification(data.statusCode, 'Get Data');
        }
        console.log(this.lstofMaintenance);
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }

}
