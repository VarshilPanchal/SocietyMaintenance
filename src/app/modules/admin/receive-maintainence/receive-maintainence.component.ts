import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { COMMON_CONSTANTS } from 'src/app/core/constants/CommonConstants';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { AmountMaster } from 'src/app/shared/interfaces/AmountMaster';
import { MaintenanceBillMaster } from 'src/app/shared/interfaces/MaintenanceBillMaster';
import { UserMaster } from 'src/app/shared/interfaces/UserMaster';
import { DashboardServicesService } from 'src/app/shared/services/dashboard-services.service';
import { AuthService } from '../../auth/services/auth-services/auth.service';
import { AdminServicesService } from '../services/admin-services.service';

@Component({
  selector: 'app-receive-maintainence',
  templateUrl: './receive-maintainence.component.html',
  styleUrls: ['./receive-maintainence.component.css']
})
export class ReceiveMaintainenceComponent implements OnInit {

  imageUrl = 'assets/img/logo_transparent.png';

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
  generateMaintenanceFormSubmitted = false;

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
    { header: 'Create Date' },
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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getSampleData();
    // this.initializeGenerateMaintenanceForm();
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
    this.getUserData(data.userMasterId);

  }

  getUserData(flatNo) {
    this.authService.getUser(flatNo).valueChanges().subscribe(
      (data: any) => {
        this.remainingAmount = data.amount;
      });
  }

  hideGenerateReceiptDialog() {
    this.generateReceiptDialog = false;
  }

  showGenerateReceiptDialog(data): any {
    // this.maintenanceBill = data;
    this.popupHeader = `Receive Maintenance For ${data.userMasterId}`;
    this.generateReceiptDialog = true;
    this.getUserMaster(data.userMasterId, data);
    this.initializeGenerateMaintenanceForm(data);
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
      payType: ['', [Validators.required]],
      amountType: ['Credit'],
      description: [''],
      referenceNo: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      userMasterId: [data?.userMasterId],
      createdBy: 'Admin',
      createdDate: data?.createdDate,
      updatedDate: new Date().getTime(),
    });
    this.generateMaintenanceForm.get('payType').valueChanges.subscribe(response => {
      if (response === 'Cheque') {
        this.generateMaintenanceForm.addControl('referenceNo', new FormControl('', [Validators.required]));
        this.generateMaintenanceForm.addControl('bankName', new FormControl('', [Validators.required]));
      }
      else if (response === 'Online') {
        this.generateMaintenanceForm.addControl('referenceNo', new FormControl('', [Validators.required]));
        this.generateMaintenanceForm.addControl('bankName', new FormControl('', [Validators.required]));
      } else if (response === 'Cash') {
        this.generateMaintenanceForm.removeControl('referenceNo');
        this.generateMaintenanceForm.removeControl('bankName');
      }
    });
  }

  onSubmitGenerateReceipt(generateMaintenanceForm) {
    console.log(generateMaintenanceForm.value);

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
    amountMaster.payType = incomeData.payType;
    amountMaster.payTo = 'Admin';
    amountMaster.description = incomeData.description;
    amountMaster.amountType = this.amountType;
    amountMaster.userMasterId = incomeData.userMasterId;
    amountMaster.createdDate = new Date();
    amountMaster.updatedDate = new Date();
    amountMaster.MaintenanceAmount = incomeData.amount;
    amountMaster.referenceNo = this.referenceNo;
    amountMaster.bankName = this.bankName;

    console.log(amountMaster);
    console.log(incomeData);

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
        if (data) {
          this.maintenanceData = Object.keys(data).map(key => ({ type: key, value: data[key] }));
          this.maintenanceData.forEach(
            (e) => {
              e.value.id = e.type;
              console.log(e.type);
              this.lstofMaintenance.push(e.value);
            });
          this.lstofMaintenance = this.lstofMaintenance.sort(
            (a, b) => {
              return (new Date(b.createdDate) as any) - (new Date(a.createdDate) as any);
            }
          );
          this.totalRecords = this.maintenanceData.length;
          if (data.statusCode === '200' && data.message === 'OK') {
            this.errorService.userNotification(data.statusCode, 'Get Data');
          }
          console.log(this.lstofMaintenance);
        }
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

    // html2canvas(DATA).then(canvas => {
    //   const fileWidth = 208;
    //   const fileHeight = canvas.height * fileWidth / canvas.width;

    //   const FILEURI = canvas.toDataURL('image/png');
    //   const PDF = new jsPDF('portrait', 'px', 'a5');
    //   const position = 0;
    //   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

    //   PDF.save('maintenance-bill.pdf');
    // });

    // https://stackoverflow.com/questions/66963487/html2canvas-export-a4-size-regardless-of-window-size


    html2canvas(DATA).then(canvas => {
      let wid;
      let hgt;
      const img = canvas.toDataURL('image/png', (wid = canvas.width) * (hgt = canvas.height)); // image data of canvas
      const hratio = hgt / wid;
      const doc = new jsPDF({
        orientation: 'portrait'
      });

      const width = doc.internal.pageSize.width;
      // let height = doc.internal.pageSize.height;
      const height = width * hratio;
      doc.addImage(img, 'JPEG', width * .150, 30, width * .70, height * .70);
      doc.save('maintenance-bill.pdf');
    });

  }

  exportPdfForReceipt(): void {
    const DATA = document.getElementById('generatedReceiptTabel');

    // html2canvas(DATA).then(canvas => {
    //   const fileWidth = 208;
    //   const fileHeight = canvas.height * fileWidth / canvas.width;

    //   const FILEURI = canvas.toDataURL('image/png');
    //   const PDF = new jsPDF('p', 'mm', 'a4');
    //   const position = 0;
    //   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

    //   PDF.save('maintenance-receipt.pdf');
    // });

    // html2canvas(DATA).then(canvas => {
    //   let wid;
    //   let hgt;
    //   const img = canvas.toDataURL('image/png', (wid = canvas.width) * (hgt = canvas.height)); // image data of canvas
    //   const hratio = hgt / wid;
    //   const doc = new jsPDF({
    //     orientation: 'portrait'
    //   });

    //   const width = doc.internal.pageSize.width;
    //   let height = doc.internal.pageSize.height;
    //   // const height = width * hratio;
    //   doc.addImage(img, 'JPEG', width * .020, 20, width * .90, height * .90);
    //   doc.save('maintenance-receipt.pdf');
    // });

    html2canvas(DATA).then(canvas => {
      let wid;
      let hgt;
      const img = canvas.toDataURL('image/png', (wid = canvas.width) * (hgt = canvas.height)); // image data of canvas
      const hratio = hgt / wid;
      const doc = new jsPDF({
        orientation: 'portrait'
      });

      const width = doc.internal.pageSize.width;
      // let height = doc.internal.pageSize.height;
      const height = width * hratio;
      doc.addImage(img, 'JPEG', width * .150, 30, width * .70, height * .70);
      doc.save('maintenance-bill.pdf');
    });

  }

}
