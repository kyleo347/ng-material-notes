import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ConfirmModalComponent>) { }

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
