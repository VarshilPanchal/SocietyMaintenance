import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-dialogue',
  templateUrl: './confirm-dialogue.component.html',
  styleUrls: ['./confirm-dialogue.component.css']
})
export class ConfirmDialogueComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message: string,
    title: string
  }, private mdDialogRef: MatDialogRef<ConfirmDialogueComponent>) {
    mdDialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  public cancel(): any {
    this.close(false);
  }
  public close(value): any {
    this.mdDialogRef.close(value);
  }
  public confirm(): any {
    this.close(true);
  }

  @HostListener('window:keyup.esc') onKeyUp(): any { this.mdDialogRef.disableClose = true; }

}
