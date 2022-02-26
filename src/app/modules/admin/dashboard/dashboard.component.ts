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
  lstofUser: any[] = [];
  lstOfFees: any[] = [];
  loginUserId;
  users;
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
    private adminService: AdminServicesService
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
      id: 'MAINTENANCE_AMOUNT',
      type: ['MAINTENANCE_AMOUNT', [Validators.required]],
      amount: [this.feesMasterData?.MAINTENANCE_AMOUNT.amount ? this.feesMasterData?.MAINTENANCE_AMOUNT.amount : 0, [Validators.required]],
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
      maintenanceAmount: [this.feesMasterData?.MAINTENANCE_AMOUNT.amount, [Validators.required]],
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
      updatedDate: ''
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
    console.log(this.waterMaintenanceBillMaster);
    this.angularFireDatabase.database.ref('feesmaster').child(this.waterMaintenanceBillMaster.id).set(this.waterMaintenanceBillMaster)
      .finally(this.hidemaintenanceDialog())
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
    console.log(this.waterMaintenanceBillMaster);
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
    let waterCalulatedAmount: number
    this.maintenanceBillMaster = generateMaintenanceForm.value;
    if ((this.maintenanceBillMaster.currentReading && this.maintenanceBillMaster.previousReading)) {
      waterCalulatedAmount = (this.maintenanceBillMaster.currentReading - this.maintenanceBillMaster.previousReading) * this.maintenanceBillMaster.waterAmount;
    } else if (this.maintenanceBillMaster.averageReading) {
      waterCalulatedAmount = (this.maintenanceBillMaster.averageReading) * this.maintenanceBillMaster.waterAmount;

    }
    let totalAmount: number = waterCalulatedAmount;
    totalAmount = totalAmount + Number(this.maintenanceBillMaster.maintenanceAmount);
    this.maintenanceBillMaster.amount = totalAmount;
    this.remainingAmount = totalAmount;
    this.receiptDetail = generateMaintenanceForm.value;
    console.log(this.maintenanceBillMaster);
    // tslint:disable-next-line: max-line-length
    // this.angularFireDatabase.database.ref('maintenancemaster').child(this.waterMaintenanceBillMaster).set(this.waterMaintenanceBillMaster);
    this.dashboardService.generatedMaintenanceBillPost(this.maintenanceBillMaster).subscribe(
      (data: any) => {
        console.log(data);
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
        console.log(data);
        if (data) {
          this.userMasterDto = data;
          console.log(this.userMasterDto);
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
        console.log(err);
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
      amountType: "Credit",
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
        this.receivePaymentForm.addControl('bankName', new FormControl('', [Validators.required]))
      }
      else if (response === 'Online') {
        this.receivePaymentForm.addControl('referenceNo', new FormControl('', [Validators.required]));
      } else if (response === 'Cash') {
        this.receivePaymentForm.removeControl('referenceNo');
        this.receivePaymentForm.removeControl('bankName');
      }
    })

  }
  getUserMasterForReceivePayment(id, user) {
    this.dashboardService.getUser(id).valueChanges().subscribe(
      (data: any) => {
        console.log(data);
        if (data) {
          this.count = this.count + 1;
          if (this.count === 1) {
            this.userMasterDto = data;
            console.log(this.userMasterDto);
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
    console.log(this.receivePaymentForm.value);
    // this.receivePaymentFormSubmitted = true;
    this.adminService.addIncome(this.receivePaymentForm.value).subscribe(
      (data: any) => {
        console.log(data);
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
