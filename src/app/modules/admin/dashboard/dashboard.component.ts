import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { WaterMaintenanceBillMaster } from 'src/app/shared/interfaces/WaterMaintenanceBillMaster';
import { DashboardServicesService } from 'src/app/shared/services/dashboard-services.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { COMMON_CONSTANTS } from 'src/app/core/constants/CommonConstants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  lstofUser: any[] = [];
  loginUserId;
  users;
  flatNo = '';
  receiptGenerated = false;
  receiptDetail;

  //Dialog toggle
  tenatDialog = false;
  waterBillDialog = false;
  TransferDialog = false;
  maintenanceDialog = false;
  generateMaintenanceDialog = false;
  generateMaintenanceBillDialog = false;

  //Form
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

  //Paginator
  totalRecords: Number = 0;
  size = COMMON_CONSTANTS.MASTER_TABLE_ROW_SIZE;
  rowsPerPageOptions = COMMON_CONSTANTS.MASTER_TABLE_PAGINATE_DROPDOWN;

  //DTO
  waterMaintenanceBillMaster: WaterMaintenanceBillMaster;

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
    { label: 'Cheque', value: '' },
    { label: 'Cash', value: '' },
  ]

  constructor(
    private dashboardService: DashboardServicesService,
    private errorService: ErrorService,
    private _formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.getSampleData();
    this.initializeMaintenanceForm()
    this.initializeTenatForm();
    this.initializeWaterBillForm();
    this.initializeGenerateMaintenanceForm();
    this.initializeTransferForm();
  }

  addTenatFees(): any {
    this.tenatDialog = true;
    this.popupHeader = 'Add Tenat Fees';
    this.initializeTenatForm();
  }

  hidetenatDialog(): any {
    this.tenatDialog = false;
    this.initializeTenatForm();
  }

  initializeTenatForm() {
    this.tenatForm = this._formBuilder.group({
      id: '',
      amount: ['', [Validators.required]],
      createdBy: this.loginUserId,
    });
  }

  addMaintenanceFees(): any {
    this.maintenanceDialog = true;
    this.popupHeader = 'Add Maintenance Fees';
    this.initializeMaintenanceForm();
  }

  hidemaintenanceDialog(): any {
    this.maintenanceDialog = false;
    this.initializeMaintenanceForm();
  }

  initializeMaintenanceForm() {
    this.maintenanceForm = this._formBuilder.group({
      id: '',
      amount: ['', [Validators.required]],
      createdBy: this.loginUserId,
    });
  }

  addWaterBillFees(): any {
    this.waterBillDialog = true;
    this.popupHeader = 'Add WaterBill Fees';
    this.initializeWaterBillForm();
  }

  hideWaterBillDialog(): any {
    this.waterBillDialog = false;
    this.initializeWaterBillForm();
  }

  initializeWaterBillForm() {
    this.waterBillForm = this._formBuilder.group({
      id: '',
      amount: ['', [Validators.required]],
      createdBy: this.loginUserId,
    });
  }


  addTransferFees(): any {
    this.TransferDialog = true;
    this.popupHeader = 'Add Transfer Fees';
    this.initializeTransferForm();
  }

  hideTransferDialog(): any {
    this.TransferDialog = false;
    this.initializeTransferForm();
  }

  initializeTransferForm() {
    this.TransferForm = this._formBuilder.group({
      id: '',
      type: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      createdBy: this.loginUserId,
    });
  }

  generateMaintenance(name): any {
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
      maintenanceAmount: [1000, [Validators.required]],
      waterAmount: [10, [Validators.required]],
      amount: [10000, [Validators.required]],
      reading: [1000, [Validators.required]],
      usedUnit: [10, [Validators.required]],
      previousReading: [10, [Validators.required]],
      currentReading: [10, [Validators.required]],
      meterNotWorking: [false, [Validators.required]],
      averageReading: [10,],
      payType: ['debit', [Validators.required]],
      userMasterid: ['A101', [Validators.required]],
      createdBy: this.loginUserId,
      createdDate: new Date(),
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
        // console.log(this.lstofUser);
        // console.log(this.totalRecords);
        if (data.statusCode === '200' && data.message === 'OK') {
          this.errorService.userNotification(data.statusCode, 'Get Data');
        }
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }

  onSubmitTenatForm() {
  }

  onSubmitMaintenanceForm() {
  }

  onSubmitTransferFeesForm() {
  }

  onSubmitWaterBillForm() {
  }

  GenerateMaintenanceBill(generateMaintenanceForm) {

    if (!this.generateMaintenanceForm.valid) {
      let controlName: string;
      for (controlName in this.generateMaintenanceForm.controls) {
        this.generateMaintenanceForm.controls[controlName].markAsDirty();
        this.generateMaintenanceForm.controls[controlName].updateValueAndValidity(); // Validate form field and show the message
      }
      this.generateMaintenanceFormSubmitted = true;
      return false;
    }

    this.receiptGenerated = true;
    this.receiptDetail = generateMaintenanceForm.value;
    console.log(this.receiptDetail);
  }

  // exportPdf() {
  //   const doc = new jsPDF('p', 'pt');
  //   doc['autoTable'](this.exportColumns, this.products);
  //   // doc.autoTable(this.exportColumns, this.products);
  //   doc.save("products.pdf");
  // }
  // exportPdf() {
  //   import("jspdf").then(jsPDF => {
  //     import("jspdf-autotable").then(x => {
  //       const doc = new jsPDF.default(0, 0);
  //       doc.autoTable(this.exportColumns, this.lstofUser);
  //       doc.save('products.pdf');
  //     })
  //   })
  // }


  // exportExcelSubcontractorPaymentReport() {

  //   let excelData= [];
  //   this.lstofUser.forEach(element => {
  //     let JSON = {
  //       'Subcontractor Name': element.user_name,
  //       'Subcontractor Invoice Number': element.user_name,
  //       'Subcontractor Invoice Date': element.user_name ,
  //       'Subcontractor Invoice Amount': element.user_name,
  //       'Payment Expected Date': element.user_name,
  //     }
  //     excelData.push(JSON);
  //   });
  //   import("jspdf").then(jsPDF => {
  //     import("jspdf-autotable").then(x => {
  //       const doc = new jsPDF.default(0, 0);
  //       doc.autoTable(this.exportColumns, this.lstofUser);
  //       doc.save('products.pdf');
  //     })
  //   })
  //   import("xlsx").then(xlsx => {
  //     const worksheet = xlsx.utils.json_to_sheet(excelData);
  //     const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  //     this.saveAsExcelFile(excelBuffer, "subcontractor-payment");
  //   });
  // }

  exportPdf(): void {
    let DATA = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {
      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('maintenance-receipt.pdf');
    });
  }


  // public downloadAsPDF() {
  //   const doc = new jsPDF();
  //   const specialElementHandlers = {
  //     '#editor': function (element, renderer) {
  //       return true;
  //     }
  //   };
  //   const pdfTable = this.pdfTable.nativeElement;
  //   doc.fromHTML(pdfTable.innerHTML, 15, 15, {
  //     width: 190,
  //     'elementHandlers': specialElementHandlers
  //   });
  //   doc.save('tableToPdf.pdf');
  // }


  // exportAsPDF(divId)
  // {
  //     let data = document.getElementById('divId');  
  //     html2canvas(data).then(canvas => {
  //     const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
  //     let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
  //     // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
  //     pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
  //     pdf.save('Filename.pdf');   
  //   }); 
  // }

}
