import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { WaterMaintenanceBillMaster } from 'src/app/shared/interfaces/WaterMaintenanceBillMaster';
import { DashboardServicesService } from 'src/app/shared/services/dashboard-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  lstofUser: any[] = [];
  tenatDialog = false;
  waterBillDialog = false;
  maintenanceDialog = false;
  generateMaintenanceDialog = false;
  popupHeader: string;
  tenatForm: FormGroup;
  maintenanceForm: FormGroup;
  waterBillForm: FormGroup;
  generateMaintenanceForm: FormGroup;
  loginUserId;
  users;


  cols = [
    { header: 'Name' },
    { header: 'Pending Amount' },
    { header: 'Action' },
  ];

  paymentType = [
    { label: 'Cheque' },
    { label: 'Cash' },
    { label: 'Online' },
  ]

  waterMaintenanceBillMaster: WaterMaintenanceBillMaster;

  constructor(
    private dashboardService: DashboardServicesService,
    private errorService: ErrorService,
    private _formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.getSampleData();
    this.initializeMaintenanceForm()
    this.initializeTenatForm();
    this.initializeWaterBillForm();
    this.initializeGenerateMaintenanceForm();
  }

  addTenatFees(): any {
    this.tenatDialog = true;
    this.popupHeader = 'Add Tenat Fees';
    this.initializeTenatForm();
  }

  hidetenatDialog(): any {
    this.tenatDialog = false;
    this.initializeTenatForm();
  }

  initializeTenatForm() {
    this.tenatForm = this._formBuilder.group({
      id: '',
      amount: ['', [Validators.required]],
      createdBy: this.loginUserId,
    });
  }

  addMaintenanceFees(): any {
    this.maintenanceDialog = true;
    this.popupHeader = 'Add Maintenance Fees';
    this.initializeMaintenanceForm();
  }

  hidemaintenanceDialog(): any {
    this.maintenanceDialog = false;
    this.initializeMaintenanceForm();
  }

  initializeMaintenanceForm() {
    this.maintenanceForm = this._formBuilder.group({
      id: '',
      amount: ['', [Validators.required]],
      createdBy: this.loginUserId,
    });
  }

  addWaterBillFees(): any {
    this.waterBillDialog = true;
    this.popupHeader = 'Add WaterBill Fees';
    this.initializeWaterBillForm();
  }

  hideWaterBillDialog(): any {
    this.waterBillDialog = false;
    this.initializeWaterBillForm();
  }

  initializeWaterBillForm() {
    this.waterBillForm = this._formBuilder.group({
      id: '',
      amount: ['', [Validators.required]],
      createdBy: this.loginUserId,
    });
  }

  generateMaintenance(name): any {
    this.generateMaintenanceDialog = true;
    this.popupHeader = `Generate Maintence for ${name}`;
    this.initializeGenerateMaintenanceForm();
  }

  hideGenerateMaintenanceDialog(): any {
    this.generateMaintenanceDialog = false;
    this.initializeGenerateMaintenanceForm();
  }

  initializeGenerateMaintenanceForm() {
    this.generateMaintenanceForm = this._formBuilder.group({
      id: '',
      maintenanceAmount: ['', [Validators.required]],
      waterAmount: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      reading: ['', [Validators.required]],
      amountType: ['', [Validators.required]],
      payType: ['', [Validators.required]],
      userMasterid: ['', [Validators.required]],
      createdBy: this.loginUserId,
    });
  }

  getSampleData() {
    this.dashboardService.dashboardGet().subscribe(
      (data: any) => {
        this.users = Object.keys(data).map(key => ({ type: key, value: data[key] }));
        this.users.forEach(
          (user) => {
            this.lstofUser.push(user.value);
          });
        console.log(this.lstofUser);
        if (data.statusCode === '200' && data.message === 'OK') {
          this.errorService.userNotification(data.statusCode, 'Get Data');
        }
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }

  onSubmitTenatForm() {
  }

  onSubmitMaintenanceForm() {
  }

  onSubmitWaterBillForm() {
  }

  GenerateMaintenance(generateMaintenanceForm) {
    console.log(generateMaintenanceForm);
  }


}
