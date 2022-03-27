import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { LocalStorageService } from 'src/app/core/services/localstorage-service/localstorage.service';
import { AdminServicesService } from 'src/app/modules/admin/services/admin-services.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from 'src/app/modules/auth/services/auth-services/auth.service';
import { COMMON_CONSTANTS } from 'src/app/core/constants/CommonConstants';

@Component({
  selector: 'app-pay-summary',
  templateUrl: './pay-summary.component.html',
  styleUrls: ['./pay-summary.component.css']
})
export class PaySummaryComponent implements OnInit {
  imageUrl = 'assets/img/logo_transparent.png';

  amountData: any[];
  userAmountData: any[];
  viewReceiptDialog = false;
  flatNo;
  recieptData: any;
  remainingAmount: any;
  loggedInUserName: any;
  // Paginator
  totalRecords: Number = 0;
  size = COMMON_CONSTANTS.MASTER_TABLE_ROW_SIZE;
  rowsPerPageOptions = COMMON_CONSTANTS.MASTER_TABLE_PAGINATE_DROPDOWN;
  constructor(private adminService: AdminServicesService,
    private errorService: ErrorService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private authService: AuthService) { }

  lstofUser: any[] = [];
  cols = [
    { header: 'Amount' },
    { header: 'Date' },
    { header: 'Paid Through' },
    { header: 'Action' },
  ];
  queryParam: URLSearchParams | undefined;
  dataTableParams = {
    offset: 0,
    size: 10,
    sortField: 'NAME',
    sortOrder: 1,
    searchText: null
  };
  ngOnInit(): void {
    this.loggedInUserName = this.localStorageService.getLoginUserName();
    this.getPaymentData();
  }
  prepareQueryParam(paramObject: any) {
    const params = new URLSearchParams();
    // tslint:disable-next-line: forin
    for (const key in paramObject) {
      params.set(key, paramObject[key]);
    }
    return params;
  }
  getPaymentData() {
    this.queryParam = this.prepareQueryParam(this.dataTableParams);
    this.amountData = [];
    this.userAmountData = [];
    console.log(this.loggedInUserName);
    this.adminService.getIncomeAndExpenses(this.queryParam).subscribe(data => {
      if(data){
        this.amountData = Object.keys(data).map(key => ({ type: key, value: data[key] }));
        this.amountData.forEach(
          (amount) => {
            if (amount.value.amountType === 'Credit' && amount.value.userMasterId === this.loggedInUserName) {
              this.userAmountData.push(amount.value)
            }
          });
        console.log(this.userAmountData);
        this.totalRecords = this.userAmountData.length;
        if (data.statusCode === '200' && data.message === 'OK') {
          this.errorService.userNotification(data.statusCode, 'Get Data');
        }
      }
    })
  }
  viewReceipt(data) {
    this.recieptData = data;
    this.viewReceiptDialog = true;
    this.flatNo = this.loggedInUserName;
    this.getUserData(this.flatNo);

  }
  getUserData(flatNo) {
    this.authService.getUser(flatNo).valueChanges().subscribe(
      (data: any) => {
        this.remainingAmount = data.amount;
      });
  }
  exportPdf(): void {
    let DATA = document.getElementById('htmlData');
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
      doc.save('payment-receipt.pdf');
    });

  }
  hideViewReceiptDialog(): any {
    this.viewReceiptDialog = false;
  }
}
