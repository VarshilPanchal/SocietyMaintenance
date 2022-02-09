import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { LocalStorageService } from 'src/app/core/services/localstorage-service/localstorage.service';
import { AdminServicesService } from '../services/admin-services.service';
import * as converter from 'number-to-words';
@Component({
  selector: 'app-expenseandincome',
  templateUrl: './expenseandincome.component.html',
  styleUrls: ['./expenseandincome.component.css']
})
export class ExpenseandincomeComponent implements OnInit {

  cols = [
    { header: 'Amount' },
    { header: 'Paid Through' },
    { header: 'Description' },
  ]
  expenseCols = [
    { header: 'Amount' },
    { header: 'Paid Through' },
    { header: 'Description' },
    { header: 'Action' },
  ]
  expenseFormGroup: FormGroup;
   expenseandincomeObject = {
    id: "A102",
    createdDate: new Date(),
    updatedDate: new Date(),
    user_master_id: "A101",
    description: "description",
    amount_type: "Debit",
    amount: 500,
    pay_type: 'cash',
    reading: ''
  };
   dataTableParams = {
    offset: 0,
    size: 10,
    sortField: 'NAME',
    sortOrder: 1,
    searchText: `{"amount_type": 'Credit'}`
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

  constructor(private adminService: AdminServicesService,
              private errorService: ErrorService,
              private formBuilder: FormBuilder,
              private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.loginUserId = this.localStorageService.getItem('logInUserID');
    this.getIncome();
    console.log(converter.toWords(20000));
   
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

  addBulkIncome(){
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

  getIncome(){
    this.queryParam = this.prepareQueryParam(this.dataTableParams);
    this.expenseData = [];
    this.amountData = [];
    this.adminService.getIncomeAndExpenses(this.queryParam).subscribe(data=>{
      this.amountData = Object.keys(data).map(key => ({ type: key, value: data[key] }));
      this.amountData.forEach(
        (amount) => {
          if(amount.value.amount_type === 'Credit'){
            this.incomeData.push(amount.value)
          }else if (amount.value.amount_type === 'Debit'){
            this.expenseData.push(amount.value)
          }
        });
      console.log(this.incomeData);
      console.log(this.expenseData);
      if (data.statusCode === '200' && data.message === 'OK') {
        this.errorService.userNotification(data.statusCode, 'Get Data');
      }
    })
  }
  createVoucher(): any {
    this.voucherDialog = true;
    this.popupHeader = 'Create Voucher';
    this.initializeExpenseFormGroup();
    this.expenseFormGroup.get("amount").valueChanges.subscribe(amount=>{
      this.amountInWords = converter.toWords(amount);
    })
  }
  viewVoucher(): any {
    this.viewVoucherDialog = true;
    this.popupHeader = 'View Voucher';
  }
  initializeExpenseFormGroup(){
    this.expenseFormGroup = this.formBuilder.group({
      id: [],
      amount: ['', [Validators.required]],
      description: ['', [Validators.required]],
      updatedBy: this.loginUserId,
    });
  }
  onSubmitExpense(){
    console.log(this.expenseFormGroup.value);
  }
  hideExpenseDialog(){
    this.voucherDialog = false;
    this.initializeExpenseFormGroup();
  }
  hideVoucherDialog(){
    this.viewVoucherDialog = false;
  }
  }
