import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { LocalStorageService } from 'src/app/core/services/localstorage-service/localstorage.service';
import { AdminServicesService } from '../services/admin-services.service';
import * as converter from 'number-to-words';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgxNumToWordsService, SUPPORTED_LANGUAGE } from 'ngx-num-to-words';
import { NumberToWordsPipe } from 'src/app/number-to-words.pipe';
import { COMMON_CONSTANTS } from 'src/app/core/constants/CommonConstants';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-expenseandincome',
  templateUrl: './expenseandincome.component.html',
  styleUrls: ['./expenseandincome.component.css']
})
export class ExpenseandincomeComponent implements OnInit {
  imageUrl = 'assets/img/logo_transparent.png';

  amount;
  payTypeList = [
    { name: 'Cash', code: 'Cash' },
    { name: 'Cheque', code: 'Cheque' },
    { name: 'OverDraft', code: 'OverDraft' },
  ];
  cols = [
    { header: 'Flat No.' },
    { header: 'Amount' },
    { header: 'Paid Through' },
    { header: 'Description' },
    { header: 'Receipt' },
  ];
  expenseCols = [
    { header: 'Paid To' },
    { header: 'Amount' },
    { header: 'Paid Through' },
    { header: 'Description' },
    { header: 'Action' },
  ];
  expenseFormGroup: FormGroup;
  expenseandincomeObject = {
    id: 'A101',
    createdDate: new Date(),
    updatedDate: new Date(),
    userMasterId: 'A101',
    description: 'maintainence',
    amountType: 'Credit',
    amount: 1000,
    payType: 'cheque',
    reading: ''
  };
  dataTableParams = {
    offset: 0,
    size: 10,
    sortField: 'NAME',
    sortOrder: 1,
    searchText: null
  };
  queryParam: URLSearchParams | undefined;
  amountData: { type: string; value: any; }[];
  incomeData = [];
  expenseData = [];
  otherPayment = [];
  voucherDialog = false;
  popupHeader: string;
  loginUserId: any;
  viewVoucherDialog: boolean;
  amountInWords: string;
  fetchData = [];
  expenseDataForVoucher: any;
  receiptDetail: any;
  balance = 0;
  // Paginator
  totalRecords: Number = 0;
  size = COMMON_CONSTANTS.MASTER_TABLE_ROW_SIZE;
  rowsPerPageOptions = COMMON_CONSTANTS.MASTER_TABLE_PAGINATE_DROPDOWN;
  totalRecordsForExpense: Number = 0;
  submitted = false;
  receiptDialog: boolean;
  receiptData: any;
  constructor(private adminService: AdminServicesService,
    private errorService: ErrorService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private angularFireDatabase: AngularFireDatabase,
    private ngxNumToWordsService: NgxNumToWordsService) { }

  ngOnInit(): void {
    // this.loginUserId = this.localStorageService.getItem('logInUserID');
    // this.addBulkIncome();
    this.getIncome();
    // // console.log(this.ngxNumToWordsService.inWords(100000, 'en'));
    // // console.log(converter.toWords(20000));

  }
  prepareQueryParam(paramObject: any) {
    const params = new URLSearchParams();
    // tslint:disable-next-line: forin
    for (const key in paramObject) {
      params.set(key, paramObject[key]);
    }
    return params;
  }
  handleChange(e?) {

  }

  addBulkIncome() {
    const data = [];
    // let fetchData;
    const fetchDataMap = [];

    // this.angularFireDatabase.object('amount/' + 'A104').valueChanges().subscribe(data => {
    //   // console.log(data);
    //   this.fetchData.push(data[0]);
    //   // console.log(this.fetchData)
    //   // fetchDataMap = Object.keys(data).map(key => ({ type: key, value: data[key] }));
    //   // // console.log(fetchDataMap)
    //   // fetchDataMap.forEach(data => {
    //   //   fetchData.push(data.value);
    //   // })
    //   this.fetchData.push(this.expenseandincomeObject);
    //   // console.log(this.fetchData)

    // });
    // // console.log(this.fetchData);
    // this.angularFireDatabase.database.ref('amount').child('A102').set(this.expenseandincomeObject);
    // data.push(this.expenseandincomeObject)
    // this.angularFireDatabase.database.ref('amount').child('A104').set(data)
    // // console.log(this.angularFireDatabase.database.ref('amount').child('A104').get());
    this.adminService.addIncome(this.expenseandincomeObject).subscribe(
      (data: any) => {
        // console.log(data);
        if (data.statusCode === '200' && data.message === 'OK') {
        }
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }

  getIncome() {
    this.balance = 0;
    this.queryParam = this.prepareQueryParam(this.dataTableParams);
    this.expenseData = [];
    this.amountData = [];
    this.incomeData = [];
    this.otherPayment = [];
    this.adminService.getIncomeAndExpenses(this.queryParam).subscribe(data => {
      if (data) {
        this.amountData = Object.keys(data).map(key => ({ type: key, value: data[key] }));
        this.amountData.forEach(
          (amount) => {
            if (amount.value.amountType === 'Credit') {
              if (amount.value?.otherPayment) {
                this.otherPayment.push(amount.value);
              }
              if (amount.value.id !== 'Balance') {
                this.incomeData.push(amount.value);
              }
              this.balance = this.balance + parseInt(amount.value.amount);
            } else if (amount.value.amountType === 'Debit') {
              this.expenseData.push(amount.value);
              this.balance = this.balance - parseInt(amount.value.amount);
            }
          });

        this.incomeData = this.incomeData.sort(
          (a, b) => {
            return (new Date(b.createdDate) as any) - (new Date(a.createdDate) as any);
          });

        this.expenseData = this.expenseData.sort(
          (a, b) => {
            return (new Date(b.createdDate) as any) - (new Date(a.createdDate) as any);
          });

        // console.log(this.balance);
        // console.log(this.incomeData);
        // console.log(this.expenseData);
        this.totalRecords = this.incomeData.length;
        this.totalRecordsForExpense = this.expenseData.length;
        if (data.statusCode === '200' && data.message === 'OK') {
          this.errorService.userNotification(data.statusCode, 'Get Data');
        }
      }
    });
  }
  createVoucher(): any {
    this.voucherDialog = true;
    this.popupHeader = 'Create Voucher';
    this.initializeExpenseFormGroup();
    this.expenseFormGroup.get('amount').valueChanges.subscribe(amount => {
      const wordsPipe = new NumberToWordsPipe();
      this.amountInWords = wordsPipe.transform(amount);
      // this.amountInWords = converter.toWords(amount);
    });
  }
  viewVoucher(expense): any {
    this.receiptDetail = expense;
    // console.log(this.receiptDetail);
    this.viewVoucherDialog = true;
    this.popupHeader = 'View Voucher';
  }
  initializeExpenseFormGroup() {
    this.expenseFormGroup = this.formBuilder.group({
      id: [],
      createdDate: new Date(),
      updatedDate: new Date(),
      userMasterId: '',
      amountType: 'Debit',
      payTo: ['', [Validators.required]],
      payType: ['', [Validators.required]],
      reading: '',
      amount: ['', [Validators.required]],
      description: ['', [Validators.required]],
      referenceNo: ['', [Validators.required]],
      bankName: ['', [Validators.required]]
    });
    this.expenseFormGroup.get('payType').valueChanges.subscribe(response => {
      if (response === 'Cheque' || response === 'OverDraft') {
        this.expenseFormGroup.addControl('referenceNo', new FormControl('', [Validators.required]));
        this.expenseFormGroup.addControl('bankName', new FormControl('', [Validators.required]));

      } else if (response === 'Cash') {
        this.expenseFormGroup.removeControl('referenceNo');
        this.expenseFormGroup.removeControl('bankName');
      }
    });
  }
  onSubmitExpense() {
    if (!this.expenseFormGroup.valid) {
      let controlName: string;
      // tslint:disable-next-line: forin
      for (controlName in this.expenseFormGroup.controls) {
        this.expenseFormGroup.controls[controlName].markAsDirty();
        this.expenseFormGroup.controls[controlName].updateValueAndValidity(); // Validate form field and show the message
      }
      this.submitted = true;
      return false;
    }
    // console.log(this.expenseFormGroup.value);
    this.expenseFormGroup.value.id = (this.expenseData.length) + 1;
    this.adminService.addIncome(this.expenseFormGroup.value).subscribe(
      (data: any) => {
        // console.log(data);
        this.hideExpenseDialog();
        this.getIncome();
        if (data.statusCode === '200' && data.message === 'OK') {

        }
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }
  hideExpenseDialog() {
    this.voucherDialog = false;
    this.initializeExpenseFormGroup();
  }
  hideVoucherDialog() {
    this.viewVoucherDialog = false;
  }
  exportPdf(): void {
    const DATA = document.getElementById('htmlData');

    // html2canvas(DATA).then(canvas => {
    //   const fileWidth = 208;
    //   const fileHeight = canvas.height * fileWidth / canvas.width;

    //   const FILEURI = canvas.toDataURL('image/png');
    //   const PDF = new jsPDF('p', 'mm', 'a4');
    //   const position = 0;
    //   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

    //   PDF.save('voucher-receipt.pdf');
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
      doc.addImage(img, 'JPEG', width * .250, 30, width * .50, height * .50);
      doc.save('voucher-receipt.pdf');
    });

  }
  showReceiptDialog(data) {
    this.receiptDialog = true;
    // console.log(data);
    this.receiptData = data;
  }
  hideReceiptDialog() {
    this.receiptDialog = false;
  }
  exportPdfForReceipt(receiptData): void {
    const DATA = document.getElementById('generatedReceiptTabel');
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
      doc.save(receiptData.userMasterId + '_payment-receipt.pdf');
    });

  }
}
