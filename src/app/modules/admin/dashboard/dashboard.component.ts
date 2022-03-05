import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { COMMON_CONSTANTS } from 'src/app/core/constants/CommonConstants';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { MaintenanceBillMaster } from 'src/app/shared/interfaces/MaintenanceBillMaster';
import { UserMaster } from 'src/app/shared/interfaces/UserMaster';
import { WaterMaintenanceBillMaster } from 'src/app/shared/interfaces/WaterMaintenanceBillMaster';
import { DashboardServicesService } from 'src/app/shared/services/dashboard-services.service';
import { AdminServicesService } from '../services/admin-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  billGeneratedUsers = [];


  lstofUser: any[] = [];
  lstOfFees: any[] = [];
  loginUserId;
  users;
  maintenanceData;
  listOfMaintenanceData;
  feesMasterData;
  flatNo = '';
  receiptGenerated = false;
  receiptDetail;
  count = 0;
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
  receivePaymentFormSubmitted = false;
  // Paginator
  totalRecords: Number = 0;
  size = COMMON_CONSTANTS.MASTER_TABLE_ROW_SIZE;
  rowsPerPageOptions = COMMON_CONSTANTS.MASTER_TABLE_PAGINATE_DROPDOWN;

  // DTO
  waterMaintenanceBillMaster: WaterMaintenanceBillMaster;
  maintenanceBillMaster: MaintenanceBillMaster;
  userMasterDto: UserMaster;
  remainingAmount = 0;

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
  maintainenceType = [
    { label: 'Tenant', value: 'MAINTENANCE_AMOUNT_TENANT' },
    { label: 'Own', value: 'MAINTENANCE_AMOUNT' },
  ];

  flatType = [
    { label: '2-BHK', value: 'TRANSFER_2_BHK' },
    { label: '3-BHK', value: 'TRANSFER_3_BHK' },
  ];
  receivePaymentDialog = false;
  receivePaymentForm: FormGroup;
  waterCalulatedAmount: any;

  constructor(
    private dashboardService: DashboardServicesService,
    private errorService: ErrorService,
    private _formBuilder: FormBuilder,
    private angularFireDatabase: AngularFireDatabase,
    private notificationService: NotificationService,
    private adminService: AdminServicesService,
    // private datePipe: DatePipe
  ) { }


  ngOnInit(): void {
    const date = new Date();
    // console.log(date);
    // console.log(new Date(date.getFullYear(), date.getMonth(), 1));
    // console.log(new Date(date.getFullYear(), date.getMonth() + 1, 0));

    // date.setMonth(date.getMonth() - 1);
    // const previousMonth = date.toLocaleString('default', { month: 'long' });

    // console.log(previousMonth);

    this.getSampleData();
    this.getMaintenanceAmountData();
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
    this.getFessMasterData();
    this.initializeTenatForm();
  }

  initializeTenatForm() {
    this.tenatForm = this._formBuilder.group({
      id: 'TENAT2022',
      type: ['TENAT', [Validators.required]],
      amount: [this.feesMasterData?.TENAT2022.amount ? this.feesMasterData.TENAT2022.amount : 0, [Validators.required]],
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
    this.getFessMasterData();
    this.initializeMaintenanceForm();
  }

  initializeMaintenanceForm() {
    this.maintenanceForm = this._formBuilder.group({
      id: '',
      type: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      createdDate: new Date().getTime(),
      updatedDate: new Date().getTime(),
      createdBy: 'Admin',
    });
    this.maintenanceForm.get('type').valueChanges.subscribe(response => {
      if (response === 'Tenant') {
        this.maintenanceForm.controls.amount.setValue(this.feesMasterData?.MAINTENANCE_AMOUNT_TENANT.amount);
      }
      else if (response === 'Own') {
        this.maintenanceForm.controls.amount.setValue(this.feesMasterData?.MAINTENANCE_AMOUNT.amount);
      }
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
    this.getFessMasterData();
    this.initializeWaterBillForm();
  }

  initializeWaterBillForm() {
    this.waterBillForm = this._formBuilder.group({
      id: 'WATER_BILL',
      type: ['WATER_BILL', [Validators.required]],
      amount: [this.feesMasterData?.WATER_BILL.amount ? this.feesMasterData?.WATER_BILL.amount : 0, [Validators.required]],
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
    this.getFessMasterData();
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

    this.TransferForm.get('type').valueChanges.subscribe(response => {
      if (response === 'TRANSFER_2_BHK') {
        this.TransferForm.controls.amount.setValue(this.feesMasterData?.TRANSFER_2_BHK.amount);
      }
      else if (response === 'TRANSFER_3_BHK') {
        this.TransferForm.controls.amount.setValue(this.feesMasterData?.TRANSFER_3_BHK.amount);
      }
    });
  }

  generateMaintenance(name): any {
    // this.waterMaintenanceBillMaster = new WaterMaintenanceBillMaster();
    this.generateMaintenanceDialog = true;
    this.generateMaintenanceFormSubmitted = false;
    this.flatNo = name;
    console.log(this.flatNo);
    this.popupHeader = `Generate Maintence for ${name}`;
    this.getUserMaster(name);
    this.initializeGenerateMaintenanceForm();
  }

  hideGenerateMaintenanceDialog(): any {
    this.generateMaintenanceFormSubmitted = false;
    // this.receiptGenerated = false;
    this.generateMaintenanceDialog = false;
    this.initializeGenerateMaintenanceForm();
  }

  opengenerateMaintenanceBillDialog(name): any {
    // this.waterMaintenanceBillMaster = new WaterMaintenanceBillMaster();
    this.generateMaintenanceBillDialog = true;
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
      maintenanceAmount: ['', [Validators.required]],
      waterAmount: [this.feesMasterData?.WATER_BILL.amount, [Validators.required]],
      amount: [''],
      amountReceived: [''],
      usedUnit: ['', [Validators.required]],
      previousReading: ['', [Validators.required]],
      currentReading: ['', [Validators.required]],
      maintenancePaid: [false, [Validators.required]],
      averageReading: [''],
      payType: ['Debit'],
      userMasterId: [this.flatNo],
      createdBy: 'Admin',
      createdDate: new Date().getTime(),
      updatedDate: '',
      maintainenceType: ['', [Validators.required]],
    });
    this.generateMaintenanceForm.get('maintainenceType').valueChanges.subscribe(response => {
      if (response === 'Tenant') {
        this.generateMaintenanceForm.controls.maintenanceAmount.setValue(this.feesMasterData?.MAINTENANCE_AMOUNT_TENANT.amount);
      }
      else if (response === 'Own') {
        this.generateMaintenanceForm.controls.maintenanceAmount.setValue(this.feesMasterData?.MAINTENANCE_AMOUNT.amount);
      }
    });
  }

  getSampleData() {
    this.dashboardService.dashboardGet().subscribe(
      (data: any) => {
        this.users = [];
        this.lstofUser = [];
        this.users = Object.keys(data).map(key => ({ type: key, value: data[key] }));
        this.users.forEach(
          (user) => {
            this.lstofUser.push(user.value);
          });
        this.totalRecords = this.users.length;

        // console.log('User list', this.lstofUser);

        if (data.statusCode === '200' && data.message === 'OK') {
          this.errorService.userNotification(data.statusCode, 'Get Data');
        }
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }

  getMaintenanceAmountData() {


    // const now = new Date();
    // let check;
    // if (
    //   (check.getFullYear() == now.getFullYear()) &&
    //   (check.getMonth() == now.getMonth()) &&
    //   (check.getDate() >= now.getDate())
    // ) {
    //   // remanining days in current month and today. Use > if you don't need today.
    // }

    // var nextMonth = now.getMonth() + 1
    // var nextYear = now.getFullYear()
    // if (nextMonth == 12) {
    //   nextMonth = 0
    //   nextYear++
    // }
    // if (
    //   (check.getFullYear() == nextYear) &&
    //   (check.getMonth() == nextMonth)
    // ) {
    //   // any day in next month. Doesn't include current month remaining days.
    // }

    // // let now = new Date();
    // now.setHours(12);
    // now.setMinutes(0);
    // now.setSeconds(0);
    // now.setMilliseconds(0);
    // const end_of_week = new Date(now.getTime() + (6 - now.getDay()) * 24 * 60 * 60 * 1000);
    // end_of_week.setHours(23);
    // end_of_week.setMinutes(59);
    // end_of_week.setSeconds(59); // gee, bye-bye leap second
    // if (check >= now && check <= end_of_week) {
    //   // between now and end of week
    //   console.log('now', now);
    //   console.log('end_of_week', end_of_week);
    // }

    // var p = new Date() -1;
    // var today = new Date();
    // var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    // console.log('lastDayOfMonth', lastDayOfMonth);

    // var a = new Date();
    // var b = new Date(a.getFullYear(), a.getMonth()); // Mon Apr 30 2018 00:00:00 GMT+0300 (EEST)
    // console.log(b);
    // var b = new Date(a.getFullYear(), a.getMonth() + 1, 0); // Mon Apr 30 2018 00:00:00 GMT+0300 (EEST)
    // console.log(b);
    // var b = new Date(a.getFullYear(), a.getMonth() + 2, 0); // Thu May 31 2018 00:00:00 GMT+0300 (EEST)
    // console.log(b);

    // const date = new Date();
    // let latest_date = DatePipe.transform(date, 'yyyy-MM-dd');
    // console.log(latest_date);
    // console.log(this.datePipe.transform(date, "yyyy-MM-dd")); //output : 2018-02-13

    // const dateTime = '2018-11-01 18:51:41';
    // const parts = dateTime.split(/[- :]/);

    // const month = parts[1];
    // const year = parts[0];

    // const currentdate = new Date();
    // let cur_month = currentdate.getMonth() + 1;
    // let cur_year = currentdate.getFullYear();

    // // tslint:disable-next-line: triple-equals
    // if (cur_month.toString() == month && year == cur_year.toString()) {
    //   alert('in this month');
    // } else {
    //   alert('not in this month');
    // }

    // var d = new Date();
    // console.log("d", d);
    // d.setMonth(d.getMonth() - 3);
    // console.log("d", d);

    // var b = new Date();
    // console.log(b.toLocaleDateString());
    // b.setMonth(b.getMonth() - 3);
    // console.log("b", b.toLocaleDateString());




    this.dashboardService.getMaintenanceAmountData().subscribe(
      (data: any) => {
        this.billGeneratedUsers = [];
        this.maintenanceData = [];
        this.listOfMaintenanceData = [];
        this.maintenanceData = Object.keys(data).map(key => ({ type: key, value: data[key] }));
        this.maintenanceData.forEach(
          (user) => {
            const date = new Date();
            const monthStartDate = new Date(date.getFullYear(), date.getMonth());
            const monthLastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            console.log(monthStartDate);
            console.log(monthLastDate);
            if (user.value.createdDate > monthStartDate && user.value.createdDate < monthLastDate) {
              this.billGeneratedUsers.push(user.value.userMasterId);
            } else {
              console.log('bill not generated');
            }
            this.listOfMaintenanceData.push(user.value);
          });
        // this.totalRecords = this.maintenanceData.length;

        // console.log('MaintenanceData list', this.listOfMaintenanceData);
        console.log('billGeneratedUsers list', this.billGeneratedUsers);

        if (data.statusCode === '200' && data.message === 'OK') {
          this.errorService.userNotification(data.statusCode, 'Get Data');
        }
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }

  idExist(user: UserMaster) {
    // this.billGeneratedUsers.includes(user.id);
    if (this.billGeneratedUsers.includes(user.id)) {
      // if (user.id === id) {
      return false;
    }
    return true;
  }

  getFessMasterData(): any {
    this.dashboardService.getFeesData().subscribe(
      (data: any) => {
        this.feesMasterData = data;
        if (data.statusCode === '200' && data.message === 'OK') {
          this.errorService.userNotification(data.statusCode, 'Get Data');
        }
        // console.log(this.feesMasterData);
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
    // console.log(this.waterMaintenanceBillMaster);

    this.angularFireDatabase.database.ref('feesmaster').child(this.waterMaintenanceBillMaster.id).set(this.waterMaintenanceBillMaster)
      .finally(this.hidetenatDialog());
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
    this.waterMaintenanceBillMaster.id = this.waterMaintenanceBillMaster.type;
    // console.log(this.waterMaintenanceBillMaster);
    this.angularFireDatabase.database.ref('feesmaster').child(this.waterMaintenanceBillMaster.id).set(this.waterMaintenanceBillMaster)
      .finally(this.hidemaintenanceDialog());
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
    // console.log(this.waterMaintenanceBillMaster);
    this.angularFireDatabase.database.ref('feesmaster').child(this.waterMaintenanceBillMaster.id).set(this.waterMaintenanceBillMaster)
      .finally(this.hideTransferDialog());
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
    // console.log(this.waterMaintenanceBillMaster);
    this.angularFireDatabase.database.ref('feesmaster').child(this.waterMaintenanceBillMaster.id).set(this.waterMaintenanceBillMaster)
      .finally(this.hideWaterBillDialog());
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
      return false;
    }

    this.receiptGenerated = true;
    let waterCalulatedAmount: number;
    this.maintenanceBillMaster = generateMaintenanceForm.value;
    if ((this.maintenanceBillMaster.currentReading && this.maintenanceBillMaster.previousReading)) {
      waterCalulatedAmount = (this.maintenanceBillMaster.currentReading - this.maintenanceBillMaster.previousReading) * this.maintenanceBillMaster.waterAmount;
    } else if (this.maintenanceBillMaster.averageReading) {
      waterCalulatedAmount = (this.maintenanceBillMaster.averageReading);

    }
    let totalAmount: number = waterCalulatedAmount;
    totalAmount = totalAmount + Number(this.maintenanceBillMaster.maintenanceAmount);
    this.maintenanceBillMaster.amount = totalAmount;
    this.remainingAmount = totalAmount;
    this.receiptDetail = generateMaintenanceForm.value;
    // console.log(this.maintenanceBillMaster);
    // tslint:disable-next-line: max-line-length
    // this.angularFireDatabase.database.ref('maintenancemaster').child(this.waterMaintenanceBillMaster).set(this.waterMaintenanceBillMaster);
    this.dashboardService.generatedMaintenanceBillPost(this.maintenanceBillMaster).subscribe(
      (data: any) => {
        // console.log(data);
        this.onSubmitUserMasterAmountUpdate();
        if (data.statusCode === '200' && data.message === 'OK') {
          this.errorService.userNotification(data.statusCode, 'Post Data');
        }
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }

  getUserMaster(id) {
    this.dashboardService.getUser(id).valueChanges().subscribe(
      (data: any) => {
        // console.log(data);
        if (data) {
          this.userMasterDto = data;
          // console.log(this.userMasterDto);
        } else {
          this.notificationService.error('Something Error', '');
        }
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }

  onSubmitUserMasterAmountUpdate() {
    this.userMasterDto.amount = this.userMasterDto.amount + this.remainingAmount;
    this.userMasterDto.updatedDate = new Date().getTime();
    this.angularFireDatabase.database.ref('user').child(this.userMasterDto.user_name).set(this.userMasterDto)
      .finally(() => { this.clearAll(); return true; })
      .catch(err => {
        this.notificationService.error(err, '');
        // console.log(err);
      });
  }

  clearAll() {
    this.userMasterDto = null;
    this.maintenanceBillMaster = null;
    this.remainingAmount = null;
    this.generateMaintenanceBillDialog = null;
    this.hideGenerateMaintenanceDialog();
    this.getSampleData();
    return true;
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
  showReceivePaymentDialog(data): any {
    // this.maintenanceBill = data;
    this.popupHeader = `Receive Payment For ${data}`;
    this.receivePaymentDialog = true;
    this.initializeReceivePaymentForm(data);
  }
  initializeReceivePaymentForm(data?) {
    this.receivePaymentForm = this._formBuilder.group({
      id: [],
      createdDate: new Date(),
      updatedDate: new Date(),
      userMasterId: data,
      amountType: 'Credit',
      payTo: [''],
      payType: ['', [Validators.required]],
      reading: '',
      amount: ['', [Validators.required]],
      description: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      referenceNo: ['', [Validators.required]],
    });
    this.receivePaymentForm.get('payType').valueChanges.subscribe(response => {
      if (response === 'Cheque') {
        this.receivePaymentForm.addControl('referenceNo', new FormControl('', [Validators.required]));
        this.receivePaymentForm.addControl('bankName', new FormControl('', [Validators.required]));
      }
      else if (response === 'Online') {
        this.receivePaymentForm.addControl('referenceNo', new FormControl('', [Validators.required]));
        this.receivePaymentForm.addControl('bankName', new FormControl('', [Validators.required]));
      } else if (response === 'Cash') {
        this.receivePaymentForm.removeControl('referenceNo');
        this.receivePaymentForm.removeControl('bankName');
      }
    });

  }
  getUserMasterForReceivePayment(id, user) {
    this.dashboardService.getUser(id).valueChanges().subscribe(
      (data: any) => {
        // console.log(data);
        if (data) {
          this.count = this.count + 1;
          if (this.count === 1) {
            this.userMasterDto = data;
            // console.log(this.userMasterDto);
            this.initializeReceivePaymentForm(user);
            return false;
            // this.onSubmitUserMasterAmountUpdate();
          }
        } else {
          this.notificationService.error('Something Error', '');
        }
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }
  onSubmitPayment() {
    if (!this.receivePaymentForm.valid) {
      let controlName: string;
      // tslint:disable-next-line: forin
      for (controlName in this.receivePaymentForm.controls) {
        this.receivePaymentForm.controls[controlName].markAsDirty();
        this.receivePaymentForm.controls[controlName].updateValueAndValidity(); // Validate form field and show the message
      }
      this.receivePaymentFormSubmitted = true;
      return false;
    }
    // console.log(this.receivePaymentForm.value);
    // this.receivePaymentFormSubmitted = true;
    this.adminService.addIncome(this.receivePaymentForm.value).subscribe(
      (data: any) => {
        // console.log(data);
        this.hidePaymentDialog();
        // this.getIncome();
        if (data.statusCode === '200' && data.message === 'OK') {

        }
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }
  hidePaymentDialog() {
    this.receivePaymentDialog = false;
    this.initializeReceivePaymentForm();
  }
}
