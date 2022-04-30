import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxNumToWordsService } from 'ngx-num-to-words';
import { COMMON_CONSTANTS } from 'src/app/core/constants/CommonConstants';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { LocalStorageService } from 'src/app/core/services/localstorage-service/localstorage.service';
import { AdminServicesService } from 'src/app/modules/admin/services/admin-services.service';
import { NumberToWordsPipe } from 'src/app/number-to-words.pipe';

@Component({
  selector: 'app-expense-and-income',
  templateUrl: './expense-and-income.component.html',
  styleUrls: ['./expense-and-income.component.css']
})
export class ExpenseAndIncomeComponent implements OnInit {
  // Paginator
  totalRecords: Number = 0;
  size = COMMON_CONSTANTS.MASTER_TABLE_ROW_SIZE;
  rowsPerPageOptions = COMMON_CONSTANTS.MASTER_TABLE_PAGINATE_DROPDOWN;
  totalRecordsForExpense: Number = 0;
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
  ];
  expenseCols = [
    { header: 'Paid To' },
    { header: 'Amount' },
    { header: 'Paid Through' },
    { header: 'Description' },
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
  voucherDialog = false;
  popupHeader: string;
  loginUserId: any;
  viewVoucherDialog: boolean;
  amountInWords: string;
  fetchData = [];
  expenseDataForVoucher: any;
  receiptDetail: any;
  balance: any;

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
    // console.log(this.ngxNumToWordsService.inWords(100000, 'en'));
    // console.log(converter.toWords(20000));

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
    //   console.log(data);
    //   this.fetchData.push(data[0]);
    //   console.log(this.fetchData)
    //   // fetchDataMap = Object.keys(data).map(key => ({ type: key, value: data[key] }));
    //   // console.log(fetchDataMap)
    //   // fetchDataMap.forEach(data => {
    //   //   fetchData.push(data.value);
    //   // })
    //   this.fetchData.push(this.expenseandincomeObject);
    //   console.log(this.fetchData)

    // });
    // console.log(this.fetchData);
    // this.angularFireDatabase.database.ref('amount').child('A102').set(this.expenseandincomeObject);
    // data.push(this.expenseandincomeObject)
    // this.angularFireDatabase.database.ref('amount').child('A104').set(data)
    // console.log(this.angularFireDatabase.database.ref('amount').child('A104').get());
    this.adminService.addIncome(this.expenseandincomeObject).subscribe(
      (data: any) => {
        console.log(data);
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
    this.adminService.getIncomeAndExpenses(this.queryParam).subscribe(data => {
      if (data) {
        this.amountData = Object.keys(data).map(key => ({ type: key, value: data[key] }));
        this.amountData.forEach(
          (amount) => {
            if (amount.value.amountType === 'Credit') {
              if(amount.value.id !== 'Balance'){
                this.incomeData.push(amount.value);
              }
              this.balance = this.balance + parseInt(amount.value.amount);
            } else if (amount.value.amountType === 'Debit') {
              this.expenseData.push(amount.value);
              this.balance = this.balance - parseInt(amount.value.amount);
            }
          });
        console.log(this.balance);
        console.log(this.incomeData);
        console.log(this.expenseData);
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
    // this.expenseFormGroup.get("amount").valueChanges.subscribe(amount => {
    //   const wordsPipe = new NumberToWordsPipe();
    //   this.amountInWords = wordsPipe.transform(amount);
    //   // this.amountInWords = converter.toWords(amount);
    // })
  }
  viewVoucher(expense): any {
    this.receiptDetail = expense;
    this.viewVoucherDialog = true;
    this.popupHeader = 'View Voucher';
  }
  initializeExpenseFormGroup() {
    this.expenseFormGroup = this.formBuilder.group({
      id: [],
      createdDate: new Date(),
      updatedDate: new Date(),
      userMasterId: '',
      amount_type: 'Debit',
      payTo: ['', [Validators.required]],
      payType: ['', [Validators.required]],
      reading: '',
      amount: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
  onSubmitExpense() {
    console.log(this.expenseFormGroup.value);
    this.adminService.addIncome(this.expenseFormGroup.value).subscribe(
      (data: any) => {
        console.log(data);
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

}
