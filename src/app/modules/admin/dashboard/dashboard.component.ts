import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { WaterMaintenanceBillMaster } from 'src/app/shared/interfaces/WaterMaintenanceBillMaster';
import { DashboardServicesService } from 'src/app/shared/services/dashboard-services.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  lstofUser: any[] = [];
  tenatDialog = false;
  waterBillDialog = false;
  maintenanceDialog = false;
  generateMaintenanceDialog = false;
  popupHeader: string;
  tenatForm: FormGroup;
  maintenanceForm: FormGroup;
  waterBillForm: FormGroup;
  generateMaintenanceForm: FormGroup;
  loginUserId;
  users;

  receiptGenerated = false;

  receiptDetail;


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
  ]

  waterMaintenanceBillMaster: WaterMaintenanceBillMaster;

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

  generateMaintenance(name): any {
    this.generateMaintenanceDialog = true;
    this.popupHeader = `Generate Maintence for ${name}`;
    this.initializeGenerateMaintenanceForm();
  }

  hideGenerateMaintenanceDialog(): any {
    this.receiptGenerated = false;
    this.generateMaintenanceDialog = false;
    this.initializeGenerateMaintenanceForm();
  }

  initializeGenerateMaintenanceForm() {
    this.generateMaintenanceForm = this._formBuilder.group({
      id: '',
      maintenanceAmount: [1000, [Validators.required]],
      waterAmount: [10, [Validators.required]],
      amount: [10000, [Validators.required]],
      reading: [1000, [Validators.required]],
      usedUnit: [10, [Validators.required]],
      amountType: ['', [Validators.required]],
      payType: ['debit', [Validators.required]],
      userMasterid: ['A101', [Validators.required]],
      createdBy: this.loginUserId,
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
        console.log(this.lstofUser);
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

  onSubmitWaterBillForm() {
  }

  GenerateMaintenance(generateMaintenanceForm) {
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
