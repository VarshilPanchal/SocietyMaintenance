import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay-summary',
  templateUrl: './pay-summary.component.html',
  styleUrls: ['./pay-summary.component.css']
})
export class PaySummaryComponent implements OnInit {

  constructor() { }

  lstofUser: any[] = [];
  cols = [
    { header: 'Name' },
    { header: 'Pending Amount' },
    { header: 'Action' },
  ];

  ngOnInit(): void {
  }

}
