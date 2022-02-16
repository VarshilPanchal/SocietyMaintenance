import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { COMMON_CONSTANTS } from 'src/app/core/constants/CommonConstants';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { MaintenanceBillMaster } from 'src/app/shared/interfaces/MaintenanceBillMaster';
import { WaterMaintenanceBillMaster } from 'src/app/shared/interfaces/WaterMaintenanceBillMaster';
import { DashboardServicesService } from 'src/app/shared/services/dashboard-services.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  lstofUser: any[] = [];
  lstOfFees: any[] = [];
  loginUserId;
  users;
  feesMasterData;
  flatNo = '';
  receiptGenerated = false;
  receiptDetail;

  // Dialog toggle
  tenatDialog = false;
  waterBillDialog = false;
  TransferDialog = false;
  maintenanceDialog = false;
  generateMaintenanceDialog = false;
  generateMaintenanceBillDialog = false;

  // Form
  popupHeader: string;
  tenatForm: FormGroup;
  maintenanceForm: FormGroup;
  waterBillForm: FormGroup;
  TransferForm: FormGroup;
  generateMaintenanceForm: FormGroup;

  // Form submitted
  tenatFormSubmitted = false;
  maintenanceFormSubmitted = false;
  waterBillFormSubmitted = false;
  TransferFormSubmitted = false;
  generateMaintenanceFormSubmitted = false;

  // Paginator
  totalRecords: Number = 0;
  size = COMMON_CONSTANTS.MASTER_TABLE_ROW_SIZE;
  rowsPerPageOptions = COMMON_CONSTANTS.MASTER_TABLE_PAGINATE_DROPDOWN;

  // DTO
  waterMaintenanceBillMaster: WaterMaintenanceBillMaster;
  maintenanceBillMaster: MaintenanceBillMaster;

  cols = [
    { header: 'Name' },
    { header: 'Pending Amount' },
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

  flatType = [
    { label: '2-BHK', value: 'TRANSFER_2_BHK' },
    { label: '3-BHK', value: 'TRANSFER_3_BHK' },
  ];

  constructor(
    private dashboardService: DashboardServicesService,
    private errorService: ErrorService,
    private _formBuilder: FormBuilder,
    private angularFireDatabase: AngularFireDatabase
  ) { }


  ngOnInit(): void {
    this.getSampleData();
    this.getFessMasterData();
    this.initializeMaintenanceForm();
    this.initializeTenatForm();
    this.initializeWaterBillForm();
    this.initializeGenerateMaintenanceForm();
    this.initializeTransferForm();
  }

  addTenatFees(): any {
    this.waterMaintenanceBillMaster = new WaterMaintenanceBillMaster();
    this.tenatDialog = true;
    this.popupHeader = 'Add Tenat Fees';
    this.initializeTenatForm();
  }

  hidetenatDialog(): any {
    this.waterMaintenanceBillMaster = new WaterMaintenanceBillMaster();
    this.tenatDialog = false;
    this.initializeTenatForm();
  }

  initializeTenatForm() {
    this.tenatForm = this._formBuilder.group({
      id: 'TENAT2022',
      type: ['TENAT', [Validators.required]],
      amount: ['', [Validators.required]],
      createdDate: new Date().getTime(),
      updatedDate: new Date().getTime(),
      createdBy: 'Admin',
    });
  }

  addMaintenanceFees(): any {
    this.waterMaintenanceBillMaster = new WaterMaintenanceBillMaster();
    this.maintenanceDialog = true;
    this.popupHeader = 'Add Maintenance Fees';
    this.initializeMaintenanceForm();
  }

  hidemaintenanceDialog(): any {
    this.waterMaintenanceBillMaster = new WaterMaintenanceBillMaster();
    this.maintenanceDialog = false;
    this.initializeMaintenanceForm();
  }

  initializeMaintenanceForm() {
    this.maintenanceForm = this._formBuilder.group({
      id: 'MAINTENANCE_AMOUNT',
      type: ['MAINTENANCE_AMOUNT', [Validators.required]],
      amount: ['', [Validators.required]],
      createdDate: new Date().getTime(),
      updatedDate: new Date().getTime(),
      createdBy: 'Admin',
    });
  }

  addWaterBillFees(): any {
    this.waterMaintenanceBillMaster = new WaterMaintenanceBillMaster();
    this.waterBillDialog = true;
    this.popupHeader = 'Add WaterBill Fees';
    this.initializeWaterBillForm();
  }

  hideWaterBillDialog(): any {
    this.waterMaintenanceBillMaster = new WaterMaintenanceBillMaster();
    this.waterBillDialog = false;
    this.initializeWaterBillForm();
  }

  initializeWaterBillForm() {
    this.waterBillForm = this._formBuilder.group({
      id: 'WATER_BILL',
      type: ['WATER_BILL', [Validators.required]],
      amount: ['', [Validators.required]],
      createdDate: new Date().getTime(),
      updatedDate: new Date().getTime(),
      createdBy: 'Admin',
    });
  }

  addTransferFees(): any {
    this.waterMaintenanceBillMaster = new WaterMaintenanceBillMaster();
    this.TransferDialog = true;
    this.popupHeader = 'Add Transfer Fees';
    this.initializeTransferForm();
  }

  hideTransferDialog(): any {
    this.waterMaintenanceBillMaster = new WaterMaintenanceBillMaster();
    this.TransferDialog = false;
    this.initializeTransferForm();
  }

  initializeTransferForm() {
    this.TransferForm = this._formBuilder.group({
      id: '',
      type: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      createdDate: new Date().getTime(),
      updatedDate: new Date().getTime(),
      createdBy: 'Admin',
    });
  }

  generateMaintenance(name): any {
    // this.waterMaintenanceBillMaster = new WaterMaintenanceBillMaster();
    this.generateMaintenanceDialog = true;
    this.popupHeader = `Generate Maintence for ${name}`;
    this.initializeGenerateMaintenanceForm();
  }

  hideGenerateMaintenanceDialog(): any {
    // this.receiptGenerated = false;
    this.generateMaintenanceDialog = false;
    this.initializeGenerateMaintenanceForm();
  }

  generateMaintenanceBill(name): any {
    // this.waterMaintenanceBillMaster = new WaterMaintenanceBillMaster();
    this.generateMaintenanceBillDialog = true;
    this.flatNo = name;
    // this.popupHeader = `Generated Maintence Bill for ${name}`;
    this.initializeGenerateMaintenanceForm();
  }

  hideGenerateMaintenanceBillDialog(): any {
    // this.receiptGenerated = false;
    this.flatNo = '';
    this.generateMaintenanceBillDialog = false;
  }

  initializeGenerateMaintenanceForm() {
    this.generateMaintenanceForm = this._formBuilder.group({
      id: '',
      maintenanceAmount: [this.feesMasterData?.MAINTENANCE_AMOUNT.amount, [Validators.required]],
      waterAmount: [this.feesMasterData?.WATER_BILL.amount, [Validators.required]],
      amount: [''],
      usedUnit: ['', [Validators.required]],
      previousReading: ['', [Validators.required]],
      currentReading: ['', [Validators.required]],
      // meterNotWorking: [false, [Validators.required]],
      averageReading: [''],
      payType: ['Debit'],
      userMasterid: ['A101'],
      createdBy: this.loginUserId,
      createdDate: new Date().getTime(),
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
        this.totalRecords = this.users.length;
        if (data.statusCode === '200' && data.message === 'OK') {
          this.errorService.userNotification(data.statusCode, 'Get Data');
        }
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }

  getFessMasterData(): any {
    this.dashboardService.getFeesData().subscribe(
      (data: any) => {
        this.feesMasterData = data;
        if (data.statusCode === '200' && data.message === 'OK') {
          this.errorService.userNotification(data.statusCode, 'Get Data');
        }
        console.log(this.feesMasterData);
        console.log(this.feesMasterData.MAINTENANCE_AMOUNT);
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }

  onSubmitTenatForm(): any {
    this.tenatFormSubmitted = true;
    if (!this.tenatForm.valid) {
      let controlName: string;
      // tslint:disable-next-line: forin
      for (controlName in this.tenatForm.controls) {
        this.tenatForm.controls[controlName].markAsDirty();
        this.tenatForm.controls[controlName].updateValueAndValidity(); // Validate form field and show the message
      }
      return false;
    }
    this.waterMaintenanceBillMaster = this.tenatForm.value;
    console.log(this.waterMaintenanceBillMaster);

    this.angularFireDatabase.database.ref('feesmaster').child(this.waterMaintenanceBillMaster.id).set(this.waterMaintenanceBillMaster);
    this.tenatFormSubmitted = false;
  }

  onSubmitMaintenanceForm() {
    this.maintenanceFormSubmitted = true;
    if (!this.maintenanceForm.valid) {
      let controlName: string;
      // tslint:disable-next-line: forin
      for (controlName in this.maintenanceForm.controls) {
        this.maintenanceForm.controls[controlName].markAsDirty();
        this.maintenanceForm.controls[controlName].updateValueAndValidity(); // Validate form field and show the message
      }
      return false;
    }
    this.waterMaintenanceBillMaster = this.maintenanceForm.value;
    console.log(this.waterMaintenanceBillMaster);
    this.angularFireDatabase.database.ref('feesmaster').child(this.waterMaintenanceBillMaster.id).set(this.waterMaintenanceBillMaster);
    this.maintenanceFormSubmitted = false;
  }

  onSubmitTransferFeesForm() {
    this.TransferFormSubmitted = true;
    if (!this.TransferForm.valid) {
      let controlName: string;
      // tslint:disable-next-line: forin
      for (controlName in this.TransferForm.controls) {
        this.TransferForm.controls[controlName].markAsDirty();
        this.TransferForm.controls[controlName].updateValueAndValidity(); // Validate form field and show the message
      }
      return false;
    }
    this.waterMaintenanceBillMaster = this.TransferForm.value;
    this.waterMaintenanceBillMaster.id = this.waterMaintenanceBillMaster.type;
    console.log(this.waterMaintenanceBillMaster);
    this.angularFireDatabase.database.ref('feesmaster').child(this.waterMaintenanceBillMaster.id).set(this.waterMaintenanceBillMaster);
    this.TransferFormSubmitted = false;
  }

  onSubmitWaterBillForm() {
    this.waterBillFormSubmitted = true;
    if (!this.waterBillForm.valid) {
      let controlName: string;
      // tslint:disable-next-line: forin
      for (controlName in this.waterBillForm.controls) {
        this.waterBillForm.controls[controlName].markAsDirty();
        this.waterBillForm.controls[controlName].updateValueAndValidity(); // Validate form field and show the message
      }
      return false;
    }
    this.waterMaintenanceBillMaster = this.waterBillForm.value;
    console.log(this.waterMaintenanceBillMaster);
    this.angularFireDatabase.database.ref('feesmaster').child(this.waterMaintenanceBillMaster.id).set(this.waterMaintenanceBillMaster);
    this.waterBillFormSubmitted = false;
  }

  GenerateMaintenanceBill(generateMaintenanceForm): any {
    if (!this.generateMaintenanceForm.valid) {
      let controlName: string;
      // tslint:disable-next-line: forin
      for (controlName in this.generateMaintenanceForm.controls) {
        this.generateMaintenanceForm.controls[controlName].markAsDirty();
        this.generateMaintenanceForm.controls[controlName].updateValueAndValidity(); // Validate form field and show the message
      }
      this.generateMaintenanceFormSubmitted = true;
      this.maintenanceBillMaster = generateMaintenanceForm.value;

      console.log(this.generateMaintenanceForm);
      console.log(this.generateMaintenanceForm.valid);
      console.log(this.maintenanceBillMaster);
      return false;
    }

    this.receiptGenerated = true;
    this.maintenanceBillMaster = generateMaintenanceForm.value;
    let totalAmount: number = this.maintenanceBillMaster.usedUnit * this.maintenanceBillMaster.waterAmount;
    totalAmount = totalAmount + Number(this.maintenanceBillMaster.maintenanceAmount);
    this.maintenanceBillMaster.amount = totalAmount;
    this.receiptDetail = generateMaintenanceForm.value;
    console.log(this.maintenanceBillMaster);
    // tslint:disable-next-line: max-line-length
    // this.angularFireDatabase.database.ref('maintenancemaster').child(this.waterMaintenanceBillMaster).set(this.waterMaintenanceBillMaster);
    this.dashboardService.generatedMaintenanceBillPost(this.maintenanceBillMaster).subscribe(
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

  exportPdf(): void {
    const DATA = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {
      const fileWidth = 208;
      const fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

      PDF.save('maintenance-receipt.pdf');
    });
  }

}
