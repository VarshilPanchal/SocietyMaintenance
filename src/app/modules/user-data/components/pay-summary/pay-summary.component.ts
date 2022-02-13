import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { LocalStorageService } from 'src/app/core/services/localstorage-service/localstorage.service';
import { AdminServicesService } from 'src/app/modules/admin/services/admin-services.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pay-summary',
  templateUrl: './pay-summary.component.html',
  styleUrls: ['./pay-summary.component.css']
})
export class PaySummaryComponent implements OnInit {
  amountData: any[];
  userAmountData: any[];
  viewReceiptDialog = false;
  flatNo;
  recieptData: any;

  constructor(private adminService: AdminServicesService,
    private errorService: ErrorService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,) { }

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
  getPaymentData(){
    this.queryParam = this.prepareQueryParam(this.dataTableParams);
    this.amountData = [];
    this.userAmountData = [];
    this.adminService.getIncomeAndExpenses(this.queryParam).subscribe(data => {
      this.amountData = Object.keys(data).map(key => ({ type: key, value: data[key] }));
      this.amountData.forEach(
        (amount) => {
          if (amount.value.amount_type === 'Credit' && amount.value.user_master_id === 'A102') {
            this.userAmountData.push(amount.value)
          }
        });
      console.log(this.userAmountData);
      if (data.statusCode === '200' && data.message === 'OK') {
        this.errorService.userNotification(data.statusCode, 'Get Data');
      }
    }) 
  }
  viewReceipt(data){
      this.recieptData = data;
      this.viewReceiptDialog = true;
      this.flatNo = 'A102';
  
    }
    exportPdf(): void {
      let DATA = document.getElementById('htmlData');
  
      html2canvas(DATA).then(canvas => {
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
  
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
  
        PDF.save('payment-receipt.pdf');
      });
    }
    hideViewReceiptDialog(): any {
      this.viewReceiptDialog = false;
    }
}
