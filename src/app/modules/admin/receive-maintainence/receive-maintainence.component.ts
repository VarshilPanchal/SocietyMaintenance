import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { COMMON_CONSTANTS } from 'src/app/core/constants/CommonConstants';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { AmountMaster } from 'src/app/shared/interfaces/AmountMaster';
import { MaintenanceBillMaster } from 'src/app/shared/interfaces/MaintenanceBillMaster';
import { UserMaster } from 'src/app/shared/interfaces/UserMaster';
import { DashboardServicesService } from 'src/app/shared/services/dashboard-services.service';
import { AdminServicesService } from '../services/admin-services.service';

@Component({
  selector: 'app-receive-maintainence',
  templateUrl: './receive-maintainence.component.html',
  styleUrls: ['./receive-maintainence.component.css']
})
export class ReceiveMaintainenceComponent implements OnInit {

  maintenanceData = [];
  lstofMaintenance = [];

  maintenanceBill;
  maintenanceReceipt;

  amountType;
  referenceNo;
  bankName;

  maintenanceBillDialog = false;
  maintenanceReceiptDialog = false;
  generateReceiptDialog = false;

  generateMaintenanceForm: FormGroup;
  popupHeader;

  maintenanceBillMaster: MaintenanceBillMaster;

  // User detail
  flatNo;
  userMasterDto: UserMaster;
  remainingAmount = 0;

  // Paginator
  totalRecords: Number = 0;
  size = COMMON_CONSTANTS.MASTER_TABLE_ROW_SIZE;
  rowsPerPageOptions = COMMON_CONSTANTS.MASTER_TABLE_PAGINATE_DROPDOWN;

  count = 0;
  cols = [
    { header: 'User Id' },
    { header: 'Amount' },
    { header: 'Used Unit' },
    { header: 'Previous Reading' },
    { header: 'Current Reading' },
    { header: 'Amount Received' },
    { header: 'Action' },
  ];

  generatedMintenanceColumns = [
    { label: 'Description' },
    { label: 'Amount/Unit' },
  ];

  paymentType = [
    { label: 'Cheque', value: 'CHAQUE' },
    { label: 'Cash', value: 'CASH' },
    { label: 'Online', value: 'ONLINE' },
  ];

  constructor(
    private dashboardService: DashboardServicesService,
    private adminService: AdminServicesService,
    private errorService: ErrorService,
    // tslint:disable-next-line: variable-name
    private _formBuilder: FormBuilder,
    private angularFireDatabase: AngularFireDatabase,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getSampleData();
    this.initializeGenerateMaintenanceForm();
  }

  hidemaintenanceBillDialog() {
    this.maintenanceBillDialog = false;
  }

  showMaintenanceBillDialog(data) {
    this.maintenanceBill = data;
    this.maintenanceBillDialog = true;
  }

  hidemaintenanceReceiptDialog() {
    this.maintenanceReceipt = null;
    this.maintenanceReceiptDialog = false;
  }

  showMaintenanceReceiptDialog(data) {
    this.maintenanceReceipt = data;
    console.log(this.maintenanceReceipt);
    this.maintenanceReceiptDialog = true;
  }

  hideGenerateReceiptDialog() {
    this.generateReceiptDialog = false;
  }

  showGenerateReceiptDialog(data): any {
    // this.maintenanceBill = data;
    this.popupHeader = `Receive Maintenance For ${data.userMasterid}`;
    this.generateReceiptDialog = true;
    this.initializeGenerateMaintenanceForm(data);
    this.getUserMaster(data.userMasterid, data);
  }

  initializeGenerateMaintenanceForm(data?) {
    this.generateMaintenanceForm = this._formBuilder.group({
      id: data?.id,
      maintenanceAmount: [data?.maintenanceAmount, [Validators.required]],
      waterAmount: [data?.waterAmount, [Validators.required]],
      amount: [data?.amount, [Validators.required]],
      amountReceived: [''],
      usedUnit: [data?.usedUnit, [Validators.required]],
      previousReading: [data?.previousReading, [Validators.required]],
      currentReading: [data?.currentReading, [Validators.required]],
      maintenancePaid: [true, [Validators.required]],
      averageReading: [data?.averageReading],
      payType: [data?.payType],
      amountType: [''],
      referenceNo: [''],
      bankName: [''],
      userMasterid: [data?.userMasterid],
      createdBy: 'Admin',
      createdDate: data?.createdDate,
      updatedDate: new Date().getTime(),
    });
  }

  onSubmitGenerateReceipt(generateMaintenanceForm) {
    console.log(generateMaintenanceForm.value);
    this.maintenanceBillMaster = generateMaintenanceForm.value;
    this.amountType = generateMaintenanceForm.value.amountType;
    this.referenceNo = generateMaintenanceForm.value.referenceNo;
    this.bankName = generateMaintenanceForm.value.bankName;
    this.remainingAmount = this.userMasterDto.amount - this.maintenanceBillMaster.amountReceived;
    console.log(this.maintenanceBillMaster);
    console.log(this.maintenanceBillMaster.id);

    this.angularFireDatabase.database.ref('maintenancemaster').child(this.maintenanceBillMaster.id).set(this.maintenanceBillMaster)
      .finally(() => {
        this.onSubmitUserMasterAmountUpdate();
        this.onSubmitIncome(this.maintenanceBillMaster);
        // this.onSubmitIncome(this.maintenanceBillMaster);
        console.log('completed');
      }
      )
      .catch(err => {
        this.notificationService.error(err, '');
        console.log(err);
      });
  }

  getUserMaster(id, user) {
    this.dashboardService.getUser(id).valueChanges().subscribe(
      (data: any) => {
        console.log(data);
        if (data) {
          this.count = this.count + 1;
          if (this.count === 1) {
            this.userMasterDto = data;
            console.log(this.userMasterDto);
            this.initializeGenerateMaintenanceForm(user);
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

  onSubmitUserMasterAmountUpdate() {
    if (this.count === 1) {
      this.userMasterDto.amount = this.remainingAmount;
      this.userMasterDto.updatedDate = new Date().getTime();
      this.angularFireDatabase.database.ref('user').child(this.userMasterDto.user_name).set(this.userMasterDto)
        // .finally(() => { this.clearAll(); return true; })
        .catch(err => {
          this.notificationService.error(err, '');
          console.log(err);
        });
    }
  }

  onSubmitIncome(incomeData: MaintenanceBillMaster) {

    const amountMaster = new AmountMaster();

    amountMaster.amount = incomeData.amountReceived;
    amountMaster.amountType = this.amountType.value;
    amountMaster.payType = 'CREDIT';
    amountMaster.userMasterid = incomeData.userMasterid;
    amountMaster.createdDate = new Date();
    amountMaster.updatedDate = new Date();
    amountMaster.MaintenanceAmount = incomeData.amount;
    amountMaster.referenceNo = this.referenceNo;
    amountMaster.bankName = this.bankName;

    this.adminService.addIncome(amountMaster).subscribe(
      (data: any) => {
        console.log(data);
        if (data) {
          this.clearAll();
        }
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }

  clearAll() {
    this.userMasterDto = null;
    this.maintenanceBillMaster = null;
    this.remainingAmount = null;
    this.hideGenerateReceiptDialog();
    this.hidemaintenanceBillDialog();
    this.getSampleData();
    this.count = 0;
    return true;
  }


  getSampleData(): any {
    this.dashboardService.getMaintenanceAmountData().subscribe(
      (data: any) => {
        this.lstofMaintenance = [];
        this.maintenanceData = [];
        console.log(data);
        this.maintenanceData = Object.keys(data).map(key => ({ type: key, value: data[key] }));
        this.maintenanceData.forEach(
          (e) => {
            e.value.id = e.type;
            console.log(e.type);
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


  viewMaintenanceBill(data) {
    console.log(this.maintenanceBill);
  }


  exportPdfForBill(): void {
    const DATA = document.getElementById('generatedBillTabel');

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

  exportPdfForReceipt(): void {
    const DATA = document.getElementById('generatedReceiptTabel');

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
